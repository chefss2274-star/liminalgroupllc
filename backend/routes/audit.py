from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, HttpUrl
import httpx
import re
import os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

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
    # Also check for buttons
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
    
    # 10. Page Load Signals (basic - check for large inline styles/scripts)
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
    
    # Prepare check summary
    passed_checks = [c for c in checks if c.passed]
    failed_checks = [c for c in checks if not c.passed]
    
    check_summary = "PASSED CHECKS:\n"
    for c in passed_checks:
        check_summary += f"- {c.label}: {c.detail}\n"
    check_summary += "\nFAILED CHECKS:\n"
    for c in failed_checks:
        check_summary += f"- {c.label}: {c.detail}\n"
    
    # Extract some text content from HTML for context
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
        print(f"AI summary error: {e}")
        return "We couldn't generate an AI summary for this site. Please contact us directly for a detailed manual review."

@router.post("/analyze", response_model=AuditResponse)
async def analyze_website(request: AuditRequest):
    """Analyze a website and return audit results."""
    url = request.website.strip()
    
    # Ensure URL has protocol
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url
    
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
                    error=f"Could not fetch website. Status code: {response.status_code}"
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
        
        return AuditResponse(
            success=True,
            url=url,
            score=score,
            checks=checks,
            ai_summary=ai_summary
        )
        
    except httpx.TimeoutException:
        return AuditResponse(
            success=False,
            url=url,
            score=0,
            checks=[],
            error="Request timed out. The website took too long to respond."
        )
    except Exception as e:
        return AuditResponse(
            success=False,
            url=url,
            score=0,
            checks=[],
            error=f"Error analyzing website: {str(e)}"
        )
