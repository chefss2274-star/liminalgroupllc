import { NextRequest, NextResponse } from "next/server";

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

  console.log(`[audit/ai] Key prefix: ${apiKey.slice(0, 10)}... | Model: claude-haiku-4-5-20251001`);

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

  const prompt = `You are a website consultant for Liminal Group LLC, a web design agency. Analyze this website audit and provide a brief, actionable summary.

Website: ${url}

Technical Audit Results:
${checkSummary}

Page Content Preview:
${textContent}

Write a 3-4 paragraph summary that:
1. Opens with a quick overall impression of the site
2. Highlights the 2-3 most important issues that are costing them customers
3. Notes what they're doing well (if anything)
4. Ends with a clear recommendation to work with Liminal Group

Keep it professional but direct. Use "you/your" to address the business owner. Don't be overly negative — frame issues as opportunities.`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: "You are a helpful website consultant who provides clear, actionable advice for small business owners.",
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

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

  const { website } = body;
  if (!website) {
    return NextResponse.json(
      { success: false, url: "", score: 0, checks: [], ai_summary: "", error: "Website URL is required." },
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
