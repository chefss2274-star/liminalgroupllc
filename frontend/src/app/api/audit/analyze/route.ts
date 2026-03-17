import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CheckResult {
  label: string;
  passed: boolean;
  detail: string;
  category: string;
}

function analyzeHtml(html: string, url: string): CheckResult[] {
  const checks: CheckResult[] = [];
  const lower = html.toLowerCase();

  // 1. HTTPS
  const isHttps = url.startsWith("https://");
  checks.push({
    label: "HTTPS Security",
    passed: isHttps,
    detail: isHttps
      ? "Your site uses HTTPS encryption."
      : "Your site is not using HTTPS. This hurts trust and SEO.",
    category: "Security",
  });

  // 2. Mobile Viewport
  const hasViewport =
    lower.includes('name="viewport"') || lower.includes("name='viewport'");
  checks.push({
    label: "Mobile Viewport",
    passed: hasViewport,
    detail: hasViewport
      ? "Viewport meta tag found — site should scale on mobile."
      : "No viewport meta tag. Site may not display correctly on mobile devices.",
    category: "Mobile",
  });

  // 3. Title Tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const hasTitle = !!titleMatch && titleMatch[1].trim().length > 0;
  const titleText = titleMatch ? titleMatch[1].trim() : "";
  checks.push({
    label: "Page Title",
    passed: hasTitle,
    detail: hasTitle
      ? `Title found: "${titleText.slice(0, 60)}${titleText.length > 60 ? "..." : ""}"`
      : "No page title found. This is critical for SEO and user experience.",
    category: "SEO",
  });

  // 4. Meta Description
  const descMatch =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  const hasDesc = !!descMatch && descMatch[1].trim().length > 0;
  checks.push({
    label: "Meta Description",
    passed: hasDesc,
    detail: hasDesc
      ? "Meta description found — good for search result snippets."
      : "No meta description. Search engines may show random text from your page.",
    category: "SEO",
  });

  // 5. H1 Tag
  const h1Matches = html.match(/<h1[^>]*>[^<]*<\/h1>/gi) || [];
  const hasH1 = h1Matches.length > 0;
  const h1Count = h1Matches.length;
  checks.push({
    label: "H1 Heading",
    passed: hasH1,
    detail:
      h1Count === 1
        ? "Single H1 tag found — good heading structure."
        : h1Count > 1
        ? `Multiple H1 tags found (${h1Count}). Consider using only one main heading.`
        : "No H1 tag found. Add a main heading for better SEO.",
    category: "SEO",
  });

  // 6. Image Alt Text
  const images = html.match(/<img[^>]*>/gi) || [];
  const withAlt = images.filter(
    (img) => /alt=/i.test(img) && !/alt=[""][""]/i.test(img)
  ).length;
  const totalImgs = images.length;
  const altPassed =
    totalImgs === 0 || (totalImgs - withAlt) / totalImgs < 0.3;
  checks.push({
    label: "Image Alt Text",
    passed: altPassed,
    detail:
      totalImgs === 0
        ? "No images found on the page."
        : altPassed
        ? `${withAlt}/${totalImgs} images have alt text — good accessibility.`
        : `Only ${withAlt}/${totalImgs} images have alt text. Add descriptions for accessibility and SEO.`,
    category: "Accessibility",
  });

  // 7. Internal Navigation
  const links = html.match(/href=["']([^"']+)["']/gi) || [];
  const internalLinks = links.filter((l) => {
    const href = l.replace(/href=["']/i, "").replace(/["']$/, "");
    const domain = url.split("/")[2] || "";
    return href.startsWith("/") || href.startsWith("#") || href.includes(domain);
  });
  const hasLinks = internalLinks.length > 3;
  checks.push({
    label: "Internal Navigation",
    passed: hasLinks,
    detail: hasLinks
      ? `Found ${internalLinks.length} internal links — good site structure.`
      : "Few internal links found. Consider adding navigation to improve user flow.",
    category: "UX",
  });

  // 8. Call to Action
  const ctaPatterns = [
    "contact", "call", "book", "schedule", "quote",
    "get started", "sign up", "buy", "order", "subscribe", "free",
  ];
  const hasCta =
    ctaPatterns.some((p) => lower.includes(p)) ||
    /<button[^>]*>|<a[^>]*class=["'][^"']*btn[^"']*["']/i.test(html);
  checks.push({
    label: "Call to Action",
    passed: hasCta,
    detail: hasCta
      ? "Call-to-action elements detected — visitors have clear next steps."
      : "No clear call-to-action found. Add buttons or links to guide visitors.",
    category: "Conversion",
  });

  // 9. Contact Information
  const hasPhone = /[\(]?\d{3}[\)]?[-.\s]?\d{3}[-.\s]?\d{4}/.test(html);
  const hasTel = lower.includes("tel:");
  const contactFound = hasPhone || hasTel || lower.includes("contact");
  checks.push({
    label: "Contact Information",
    passed: contactFound,
    detail: contactFound
      ? "Contact information or phone number detected."
      : "No visible contact information. Make it easy for customers to reach you.",
    category: "Conversion",
  });

  // 10. Page Optimization
  const largeInlineStyles =
    (html.match(/style=["'][^"']{500,}["']/gi) || []).length;
  const largeInlineScripts =
    (html.match(/<script[^>]*>[^<]{10000,}<\/script>/gi) || []).length;
  const perfGood = largeInlineStyles === 0 && largeInlineScripts === 0;
  checks.push({
    label: "Page Optimization",
    passed: perfGood,
    detail: perfGood
      ? "No major inline bloat detected."
      : "Large inline scripts or styles detected. Consider optimizing for faster loads.",
    category: "Performance",
  });

  return checks;
}

async function generateAiSummary(
  url: string,
  checks: CheckResult[],
  html: string
): Promise<{ text: string; error: string }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("[audit/ai] ANTHROPIC_API_KEY is not set — skipping AI summary");
    return { text: "", error: "ANTHROPIC_API_KEY is not configured." };
  }

  console.log(`[audit/ai] Key prefix: ${apiKey.slice(0, 10)}... | Model: claude-sonnet-4-20250514`);

  const passed = checks.filter((c) => c.passed);
  const failed = checks.filter((c) => !c.passed);

  const checkSummary =
    "PASSED:\n" +
    passed.map((c) => `- ${c.label}: ${c.detail}`).join("\n") +
    "\n\nFAILED:\n" +
    failed.map((c) => `- ${c.label}: ${c.detail}`).join("\n");

  const textContent = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 1000);

  const prompt = `Website: ${url}

Technical Audit Results:
${checkSummary}

Page Content Preview:
${textContent}

Write a 3-4 paragraph summary that:
1. Opens with a quick overall impression of the site
2. Highlights the 2-3 most important issues that are costing them customers
3. Notes what they're doing well (if anything)
4. Ends with a clear recommendation to work with Liminal Group

Keep it professional but direct. Use "you/your" to address the business owner. Don't be overly negative — frame issues as opportunities.

Do not use markdown formatting of any kind. No asterisks, no pound signs, no bold, no headers. Use plain prose only. Separate sections with line breaks. Use section labels like "Overall Impression:", "Key Opportunities:", "What's Working Well:", and "Recommendation:" as plain text followed by a colon, nothing else.

Do not comment on or suggest expanding the business's geographic service area. Do not suggest the business is limiting itself by serving a local or regional market. Local market focus is intentional and should not be flagged as an opportunity or weakness.

In the Recommendation section, position Liminal Group as the solution to the specific issues found in this audit. Reference the actual failures detected. Do not claim that Liminal Group specializes in or has specific experience with the prospect's industry. Instead use language like: "Liminal Group can help address these issues", "Liminal Group works with businesses like yours", or "these are exactly the kinds of improvements Liminal Group delivers." Keep the recommendation confident and specific to the audit findings without making unverifiable claims about industry expertise or specialization.

Never reference Liminal Group's past clients, portfolio, or track record in specific industries. Focus only on what the audit found and what can be fixed. Let the findings do the selling.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    console.log("[audit/ai] Sending request to Anthropic API...");
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: "You are a website consultant for Liminal Group LLC, a web design agency based in Indianapolis, Indiana. This tool analyzes a prospect's website and identifies opportunities for improvement. The recommendation section should always position Liminal Group as the solution and encourage the prospect to reach out or view pricing. Keep the tone consultative and confident, not generic. Never use markdown formatting — no asterisks, no pound signs, no headers, no bold. Plain prose only.",
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    console.log(`[audit/ai] Anthropic responded — status: ${response.status}, ok: ${response.ok}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `[audit/ai] Anthropic API error — status: ${response.status}, body: ${errorBody}`
      );
      console.error(`[audit/ai] Full error body: ${errorBody}`);
      return { text: "", error: `Anthropic API error ${response.status}: ${errorBody.slice(0, 200)}` };
    }

    const data = await response.json();
    console.log("[audit/ai] Anthropic response received, stop_reason:", data?.stop_reason);

    const text = data?.content?.[0]?.text ?? "";
    if (!text) {
      console.error("[audit/ai] Unexpected response shape:", JSON.stringify(data));
      return { text: "", error: `Unexpected response shape: ${JSON.stringify(data).slice(0, 200)}` };
    }
    return { text, error: "" };
  } catch (err: unknown) {
    const isAbort =
      err instanceof Error && (err.name === "AbortError" || err.name === "TimeoutError");
    const errMsg = isAbort ? "Anthropic API call timed out after 8s" : `Fetch error: ${err instanceof Error ? err.message : String(err)}`;
    console.error(`[audit/ai] ${errMsg}`);
    return { text: "", error: errMsg };
  }
}

async function sendAdminNotification(params: {
  name: string;
  business: string;
  website: string;
  email: string;
  score: number;
  aiSummary: string;
}) {
  const { name, business, website, email, score, aiSummary } = params;
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[audit/email] RESEND_API_KEY not set — skipping notification");
    return;
  }

  const scoreLabel = score >= 70 ? "Good" : score >= 40 ? "Needs Work" : "Poor";
  const scoreColor = score >= 70 ? "#27ae60" : score >= 40 ? "#d4850a" : "#c0392b";

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f8f5; padding: 32px;">
      <div style="background: #1a1712; border-radius: 8px; padding: 24px 32px; margin-bottom: 24px;">
        <p style="color: #c9a84c; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 8px;">Liminal Group</p>
        <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0;">New Audit Submission</h1>
      </div>

      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e8e4de; padding: 24px 32px; margin-bottom: 16px;">
        <h2 style="font-size: 14px; font-weight: 600; color: #5a5651; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px;">Lead Info</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #8a857e; font-size: 13px; width: 110px;">Name</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a857e; font-size: 13px;">Business</td><td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${business}</td></tr>
          <tr><td style="padding: 8px 0; color: #8a857e; font-size: 13px;">Website</td><td style="padding: 8px 0;"><a href="${website}" style="color: #7c6955; font-size: 14px;">${website}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #8a857e; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7c6955; font-size: 14px;">${email}</a></td></tr>
        </table>
      </div>

      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e8e4de; padding: 24px 32px; margin-bottom: 16px; text-align: center;">
        <p style="color: #8a857e; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Audit Score</p>
        <p style="font-size: 48px; font-weight: 700; color: ${scoreColor}; margin: 0; line-height: 1;">${score}</p>
        <p style="color: ${scoreColor}; font-size: 13px; font-weight: 600; margin: 4px 0 0;">${scoreLabel}</p>
      </div>

      ${aiSummary ? `
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e8e4de; padding: 24px 32px; margin-bottom: 16px;">
        <h2 style="font-size: 14px; font-weight: 600; color: #5a5651; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 16px;">AI Summary</h2>
        <p style="color: #3a3530; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-line;">${aiSummary}</p>
      </div>
      ` : ""}

      <div style="text-align: center; padding: 8px;">
        <a href="mailto:${email}?subject=Your%20Website%20Audit%20Results%20%E2%80%94%20${encodeURIComponent(business)}&body=Hi%20${encodeURIComponent(name)}%2C%0A%0AThank%20you%20for%20using%20Liminal%20Group%27s%20free%20website%20audit%20tool.%20I%20reviewed%20your%20results%20for%20${encodeURIComponent(business)}%20and%20would%20love%20to%20discuss%20how%20we%20can%20help.%0A%0ABest%2C%0ALiminal%20Group"
          style="display: inline-block; background: #1a1712; color: #c9a84c; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 14px; font-weight: 600; letter-spacing: 0.05em;">
          Reply to ${name} →
        </a>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Liminal Group Audit <audit@liminalgroupllc.com>",
      to: ["admin@liminalgroupllc.com"],
      replyTo: email,
      subject: `New Audit: ${business} — Score ${score}/100`,
      html,
    });
    console.log(`[audit/email] Notification sent for ${business} (${email})`);
  } catch (err) {
    console.error("[audit/email] Failed to send notification:", err);
  }
}

export async function POST(req: NextRequest) {
  let body: { name?: string; business?: string; website?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, url: "", score: 0, checks: [], ai_summary: "", error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name = "", business = "", website, email = "" } = body;

  if (!website) {
    return NextResponse.json(
      { success: false, url: "", score: 0, checks: [], ai_summary: "", error: "Website URL is required." },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, url: "", score: 0, checks: [], ai_summary: "", error: "A valid email address is required." },
      { status: 400 }
    );
  }

  let url = website.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  console.log(`[audit] Starting analysis for: ${url}`);

  try {
    const fetchRes = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!fetchRes.ok) {
      console.error(`[audit] Failed to fetch ${url} — status: ${fetchRes.status}`);
      return NextResponse.json({
        success: false,
        url,
        score: 0,
        checks: [],
        ai_summary: "",
        error: `Could not fetch website. Status code: ${fetchRes.status}`,
      });
    }

    const html = await fetchRes.text();
    console.log(`[audit] Fetched ${html.length} bytes from ${url}`);

    const checks = analyzeHtml(html, url);
    const passedCount = checks.filter((c) => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);
    console.log(`[audit] Analysis complete — score: ${score}/100, passed: ${passedCount}/${checks.length}`);

    const aiResult = await generateAiSummary(url, checks, html);
    console.log(`[audit] AI summary length: ${aiResult.text.length} chars${aiResult.error ? `, error: ${aiResult.error}` : ""}`);

    // Fire-and-forget admin notification
    sendAdminNotification({
      name: name || "Unknown",
      business: business || "Unknown",
      website: url,
      email,
      score,
      aiSummary: aiResult.text,
    });

    return NextResponse.json({
      success: true,
      url,
      score,
      checks,
      ai_summary: aiResult.text,
      ai_error: aiResult.error || undefined,
    });
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError");
    const message = isTimeout
      ? "Request timed out. The website took too long to respond."
      : `Error analyzing website: ${err instanceof Error ? err.message : String(err)}`;
    console.error(`[audit] ${message}`);
    return NextResponse.json({
      success: false,
      url,
      score: 0,
      checks: [],
      ai_summary: "",
      error: message,
    });
  }
}
