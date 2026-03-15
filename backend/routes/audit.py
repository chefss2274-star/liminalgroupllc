from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
import httpx
import re
import os
import asyncio
import uuid
import resend
import logging
from datetime import datetime, timezone
from typing import Optional, List
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

# Setup logging
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Resend configuration
resend.api_key = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
NOTIFICATION_EMAIL = "hello@liminalgroupllc.com"

router = APIRouter(prefix="/api/audit", tags=["audit"])

class AuditRequest(BaseModel):
    name: str
    business: str
    website: str
    email: EmailStr

class CheckResult(BaseModel):
    label: str
    passed: bool
    detail: str
    category: str

class AuditResponse(BaseModel):
    success: bool
    url: str
    score: int
    checks: list[CheckResult]
    ai_summary: str = ""
    error: str = ""
    audit_id: str = ""

class AuditRecord(BaseModel):
    audit_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    business: str
    email: str
    website: str
    url: str
    score: int
    checks: list[dict]
    ai_summary: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    success: bool

class AuditListResponse(BaseModel):
    audits: List[dict]
    total: int

def analyze_html(html: str, url: str) -> list[CheckResult]:
    """Analyze HTML content and return a list of check results."""
    checks = []
    html_lower = html.lower()
    
    # 1. HTTPS Check
    is_https = url.startswith("https://")
    checks.append(CheckResult(
        label="HTTPS Security",
        passed=is_https,
        detail="Your site uses HTTPS encryption." if is_https else "Your site is not using HTTPS. This hurts trust and SEO.",
        category="Security"
    ))
    
    # 2. Viewport Meta Tag (Mobile Responsive)
    has_viewport = 'name="viewport"' in html_lower or "name='viewport'" in html_lower
    checks.append(CheckResult(
        label="Mobile Viewport",
        passed=has_viewport,
        detail="Viewport meta tag found — site should scale on mobile." if has_viewport else "No viewport meta tag. Site may not display correctly on mobile devices.",
        category="Mobile"
    ))
    
    # 3. Title Tag
    title_match = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
    has_title = title_match is not None and len(title_match.group(1).strip()) > 0
    title_text = title_match.group(1).strip() if title_match else ""
    checks.append(CheckResult(
        label="Page Title",
        passed=has_title,
        detail=f"Title found: \"{title_text[:60]}{'...' if len(title_text) > 60 else ''}\"" if has_title else "No page title found. This is critical for SEO and user experience.",
        category="SEO"
    ))
    
    # 4. Meta Description
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*name=["\']description["\']', html, re.IGNORECASE)
    has_desc = desc_match is not None and len(desc_match.group(1).strip()) > 0
    checks.append(CheckResult(
        label="Meta Description",
        passed=has_desc,
        detail="Meta description found — good for search result snippets." if has_desc else "No meta description. Search engines may show random text from your page.",
        category="SEO"
    ))
    
    # 5. H1 Tag
    h1_matches = re.findall(r'<h1[^>]*>([^<]*)</h1>', html, re.IGNORECASE)
    has_h1 = len(h1_matches) > 0
    h1_count = len(h1_matches)
    if has_h1 and h1_count == 1:
        detail = "Single H1 tag found — good heading structure."
    elif has_h1 and h1_count > 1:
        detail = f"Multiple H1 tags found ({h1_count}). Consider using only one main heading."
    else:
        detail = "No H1 tag found. Add a main heading for better SEO."
    checks.append(CheckResult(
        label="H1 Heading",
        passed=has_h1,
        detail=detail,
        category="SEO"
    ))
    
    # 6. Image Alt Text
    images = re.findall(r'<img[^>]*>', html, re.IGNORECASE)
    images_with_alt = len([img for img in images if 'alt=' in img.lower() and not re.search(r'alt=["\']["\']', img.lower())])
    total_images = len(images)
    if total_images == 0:
        alt_passed = True
        alt_detail = "No images found on the page."
    else:
        missing_ratio = (total_images - images_with_alt) / total_images
        alt_passed = missing_ratio < 0.3
        if alt_passed:
            alt_detail = f"{images_with_alt}/{total_images} images have alt text — good accessibility."
        else:
            alt_detail = f"Only {images_with_alt}/{total_images} images have alt text. Add descriptions for accessibility and SEO."
    checks.append(CheckResult(
        label="Image Alt Text",
        passed=alt_passed,
        detail=alt_detail,
        category="Accessibility"
    ))
    
    # 7. Links Check
    links = re.findall(r'<a[^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)
    internal_links = [l for l in links if l.startswith('/') or l.startswith('#') or url.split('/')[2] in l]
    has_links = len(internal_links) > 3
    checks.append(CheckResult(
        label="Internal Navigation",
        passed=has_links,
        detail=f"Found {len(internal_links)} internal links — good site structure." if has_links else "Few internal links found. Consider adding navigation to improve user flow.",
        category="UX"
    ))
    
    # 8. Call to Action
    cta_patterns = ['contact', 'call', 'book', 'schedule', 'quote', 'get started', 'sign up', 'buy', 'order', 'subscribe', 'free']
    cta_found = any(pattern in html_lower for pattern in cta_patterns)
    buttons = re.findall(r'<button[^>]*>|<a[^>]*class=["\'][^"\']*btn[^"\']*["\']', html, re.IGNORECASE)
    has_cta = cta_found or len(buttons) > 0
    checks.append(CheckResult(
        label="Call to Action",
        passed=has_cta,
        detail="Call-to-action elements detected — visitors have clear next steps." if has_cta else "No clear call-to-action found. Add buttons or links to guide visitors.",
        category="Conversion"
    ))
    
    # 9. Phone Number / Contact
    phone_pattern = r'[\(]?\d{3}[\)]?[-.\s]?\d{3}[-.\s]?\d{4}'
    has_phone = bool(re.search(phone_pattern, html))
    has_tel_link = 'tel:' in html_lower
    contact_found = has_phone or has_tel_link or 'contact' in html_lower
    checks.append(CheckResult(
        label="Contact Information",
        passed=contact_found,
        detail="Contact information or phone number detected." if contact_found else "No visible contact information. Make it easy for customers to reach you.",
        category="Conversion"
    ))
    
    # 10. Page Load Signals
    inline_style_size = len(re.findall(r'style=["\'][^"\']{500,}["\']', html))
    large_scripts = len(re.findall(r'<script[^>]*>[^<]{10000,}</script>', html, re.IGNORECASE))
    perf_good = inline_style_size == 0 and large_scripts == 0
    checks.append(CheckResult(
        label="Page Optimization",
        passed=perf_good,
        detail="No major inline bloat detected." if perf_good else "Large inline scripts or styles detected. Consider optimizing for faster loads.",
        category="Performance"
    ))
    
    return checks

async def generate_ai_summary(html: str, url: str, checks: list[CheckResult]) -> str:
    """Generate AI summary of the website audit."""
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        return "AI summary unavailable — API key not configured."
    
    passed_checks = [c for c in checks if c.passed]
    failed_checks = [c for c in checks if not c.passed]
    
    check_summary = "PASSED CHECKS:\n"
    for c in passed_checks:
        check_summary += f"- {c.label}: {c.detail}\n"
    check_summary += "\nFAILED CHECKS:\n"
    for c in failed_checks:
        check_summary += f"- {c.label}: {c.detail}\n"
    
    text_content = re.sub(r'<[^>]+>', ' ', html)
    text_content = re.sub(r'\s+', ' ', text_content)[:2000]
    
    prompt = f"""You are a website consultant for Liminal Group LLC, a web design agency. Analyze this website audit and provide a brief, actionable summary.

Website: {url}

Technical Audit Results:
{check_summary}

Page Content Preview:
{text_content[:1000]}

Write a 3-4 paragraph summary that:
1. Opens with a quick overall impression of the site
2. Highlights the 2-3 most important issues that are costing them customers
3. Notes what they're doing well (if anything)
4. Ends with a clear recommendation to work with Liminal Group

Keep it professional but direct. Use "you/your" to address the business owner. Don't be overly negative — frame issues as opportunities."""

    try:
        chat = LlmChat(
            api_key=api_key,
            session_id=f"audit-{url}",
            system_message="You are a helpful website consultant who provides clear, actionable advice."
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")
        
        response = await chat.send_message(UserMessage(text=prompt))
        return response
    except Exception as e:
        logger.error(f"AI summary error: {e}")
        return "We couldn't generate an AI summary for this site. Please contact us directly for a detailed manual review."

async def save_audit_to_db(audit_record: AuditRecord) -> None:
    """Save audit record to MongoDB."""
    try:
        doc = audit_record.model_dump()
        await db.audits.insert_one(doc)
        logger.info(f"Audit saved to database: {audit_record.audit_id}")
    except Exception as e:
        logger.error(f"Failed to save audit to database: {e}")

async def send_notification_email(audit_record: AuditRecord) -> None:
    """Send email notification about new audit."""
    if not resend.api_key:
        logger.warning("Resend API key not configured, skipping email notification")
        return
    
    # Build checklist HTML
    checks_html = ""
    for check in audit_record.checks:
        icon = "✓" if check["passed"] else "✗"
        color = "#27ae60" if check["passed"] else "#c0392b"
        checks_html += f"""
        <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8e4de;">
                <span style="color: {color}; font-weight: bold;">{icon}</span> {check["label"]}
            </td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8e4de; color: #5a5651;">
                {check["detail"]}
            </td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e8e4de; color: #8a857e; font-size: 12px;">
                {check["category"]}
            </td>
        </tr>
        """
    
    # Score color
    if audit_record.score >= 70:
        score_color = "#27ae60"
    elif audit_record.score >= 40:
        score_color = "#d4850a"
    else:
        score_color = "#c0392b"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f4f1; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <div style="background: #1a1a1a; padding: 24px 32px;">
                <h1 style="color: #ffffff; font-size: 18px; margin: 0; font-weight: 600; letter-spacing: 0.1em;">
                    LIMINAL GROUP
                </h1>
                <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 14px;">
                    New Website Audit Submission
                </p>
            </div>
            
            <!-- Lead Info -->
            <div style="padding: 32px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                    <div>
                        <h2 style="color: #1a1a1a; font-size: 24px; margin: 0 0 8px;">{audit_record.business}</h2>
                        <p style="color: #5a5651; margin: 0; font-size: 14px;">
                            <strong>{audit_record.name}</strong><br>
                            <a href="mailto:{audit_record.email}" style="color: #7c6955;">{audit_record.email}</a>
                        </p>
                    </div>
                    <div style="text-align: center; background: {score_color}15; padding: 16px 24px; border-radius: 12px;">
                        <div style="font-size: 36px; font-weight: bold; color: {score_color};">{audit_record.score}</div>
                        <div style="font-size: 11px; color: {score_color}; text-transform: uppercase; letter-spacing: 0.1em;">Score</div>
                    </div>
                </div>
                
                <div style="background: #f5f4f1; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                    <p style="margin: 0; color: #5a5651; font-size: 14px;">
                        <strong>Website:</strong> <a href="{audit_record.url}" style="color: #7c6955;">{audit_record.url}</a>
                    </p>
                    <p style="margin: 8px 0 0; color: #8a857e; font-size: 12px;">
                        Submitted: {audit_record.created_at[:19].replace('T', ' ')} UTC
                    </p>
                </div>
                
                <!-- Checklist -->
                <h3 style="color: #1a1a1a; font-size: 16px; margin: 24px 0 12px; border-bottom: 1px solid #e8e4de; padding-bottom: 8px;">
                    Audit Checklist
                </h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                    {checks_html}
                </table>
                
                <!-- AI Summary -->
                <h3 style="color: #1a1a1a; font-size: 16px; margin: 32px 0 12px; border-bottom: 1px solid #e8e4de; padding-bottom: 8px;">
                    AI Analysis
                </h3>
                <div style="background: #f5f4f1; padding: 20px; border-radius: 8px; font-size: 14px; line-height: 1.7; color: #5a5651; white-space: pre-wrap;">
{audit_record.ai_summary}
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f5f4f1; padding: 20px 32px; text-align: center;">
                <p style="margin: 0; color: #8a857e; font-size: 12px;">
                    This lead was captured via the Liminal Group website audit tool.
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New Audit Lead: {audit_record.business} (Score: {audit_record.score})",
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Notification email sent: {email.get('id')}")
    except Exception as e:
        logger.error(f"Failed to send notification email: {e}")

@router.post("/analyze", response_model=AuditResponse)
async def analyze_website(request: AuditRequest):
    """Analyze a website and return audit results."""
    url = request.website.strip()
    
    # Ensure URL has protocol
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url
    
    audit_id = str(uuid.uuid4())
    
    try:
        # Fetch the website HTML
        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True, verify=False) as client:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
            response = await client.get(url, headers=headers)
            
            if response.status_code != 200:
                return AuditResponse(
                    success=False,
                    url=url,
                    score=0,
                    checks=[],
                    error=f"Could not fetch website. Status code: {response.status_code}",
                    audit_id=audit_id
                )
            
            html = response.text
        
        # Analyze the HTML
        checks = analyze_html(html, url)
        
        # Calculate score
        passed_count = sum(1 for c in checks if c.passed)
        total_count = len(checks)
        score = int((passed_count / total_count) * 100) if total_count > 0 else 0
        
        # Generate AI summary
        ai_summary = await generate_ai_summary(html, url, checks)
        
        # Create audit record
        audit_record = AuditRecord(
            audit_id=audit_id,
            name=request.name,
            business=request.business,
            email=request.email,
            website=request.website,
            url=url,
            score=score,
            checks=[c.model_dump() for c in checks],
            ai_summary=ai_summary,
            success=True
        )
        
        # Save to database and send notification (non-blocking)
        asyncio.create_task(save_audit_to_db(audit_record))
        asyncio.create_task(send_notification_email(audit_record))
        
        return AuditResponse(
            success=True,
            url=url,
            score=score,
            checks=checks,
            ai_summary=ai_summary,
            audit_id=audit_id
        )
        
    except httpx.TimeoutException:
        return AuditResponse(
            success=False,
            url=url,
            score=0,
            checks=[],
            error="Request timed out. The website took too long to respond.",
            audit_id=audit_id
        )
    except Exception as e:
        return AuditResponse(
            success=False,
            url=url,
            score=0,
            checks=[],
            error=f"Error analyzing website: {str(e)}",
            audit_id=audit_id
        )

@router.get("/list", response_model=AuditListResponse)
async def list_audits(limit: int = 50, skip: int = 0):
    """Get list of all audits (admin endpoint)."""
    try:
        # Get total count
        total = await db.audits.count_documents({})
        
        # Get audits sorted by created_at descending, exclude MongoDB _id
        cursor = db.audits.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit)
        audits = await cursor.to_list(length=limit)
        
        return AuditListResponse(audits=audits, total=total)
    except Exception as e:
        logger.error(f"Failed to list audits: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch audits: {str(e)}")

@router.get("/{audit_id}")
async def get_audit(audit_id: str):
    """Get a single audit by ID."""
    try:
        audit = await db.audits.find_one({"audit_id": audit_id}, {"_id": 0})
        if not audit:
            raise HTTPException(status_code=404, detail="Audit not found")
        return audit
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get audit: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch audit: {str(e)}")
