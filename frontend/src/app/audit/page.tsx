"use client";

import { useState } from "react";
import Link from "next/link";

interface CheckResult {
  label: string;
  passed: boolean;
  detail: string;
  category: string;
}

interface AuditResult {
  success: boolean;
  url: string;
  score: number;
  checks: CheckResult[];
  ai_summary: string;
  error?: string;
}

type Phase = "form" | "loading" | "results";

export default function AuditPage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    website: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loadingText, setLoadingText] = useState("Connecting to your website...");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.business.trim()) newErrors.business = "Business name is required";
    if (!formData.website.trim()) newErrors.website = "Website URL is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setPhase("loading");
    
    // Simulate loading phases
    const loadingMessages = [
      "Connecting to your website...",
      "Analyzing page structure...",
      "Checking mobile responsiveness...",
      "Evaluating SEO signals...",
      "Generating AI insights...",
    ];
    
    let messageIndex = 0;
    const loadingInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 2000);

    try {
      const response = await fetch(`${API_URL}/api/audit/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          business: formData.business,
          website: formData.website,
          email: formData.email,
        }),
      });

      const data = await response.json();
      clearInterval(loadingInterval);
      setResult(data);
      setPhase("results");
    } catch (error) {
      clearInterval(loadingInterval);
      setResult({
        success: false,
        url: formData.website,
        score: 0,
        checks: [],
        ai_summary: "",
        error: "Failed to analyze website. Please try again.",
      });
      setPhase("results");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return { bg: "rgba(39,174,96,0.12)", text: "#27ae60" };
    if (score >= 40) return { bg: "rgba(212,133,10,0.12)", text: "#d4850a" };
    return { bg: "rgba(192,57,43,0.12)", text: "#c0392b" };
  };

  const resetForm = () => {
    setPhase("form");
    setFormData({ name: "", business: "", website: "", email: "" });
    setErrors({});
    setResult(null);
  };

  return (
    <>
      {/* Header */}
      <header className="audit-header" data-testid="audit-header">
        <Link href="/" className="audit-brand">Liminal Group</Link>
        <Link href="/#pricing" className="audit-header-cta">View Pricing</Link>
      </header>

      {/* Form Phase */}
      {phase === "form" && (
        <section className="audit-hero" data-testid="audit-form-section">
          <div className="audit-label">
            <span className="audit-label-line"></span>
            Free Website Audit
          </div>
          <h1 className="audit-h1">See What Your Website Is Costing You</h1>
          <p className="audit-desc">
            Enter your URL below and get an instant AI-powered audit. We&apos;ll analyze your site for mobile readiness, SEO fundamentals, conversion signals, and more — in under 30 seconds.
          </p>

          <form className="audit-form-card" onSubmit={handleSubmit} data-testid="audit-form">
            <h2 className="audit-form-title">Generate Your Audit</h2>
            <p className="audit-form-desc">All fields required. Your audit results will appear instantly on this page.</p>

            <div className="audit-form-group">
              <label className="audit-form-label">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={`audit-input ${errors.name ? "audit-input-error" : ""}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="audit-input-name"
              />
              {errors.name && <span className="audit-error-text">{errors.name}</span>}
            </div>

            <div className="audit-form-group">
              <label className="audit-form-label">Business Name</label>
              <input
                type="text"
                placeholder="Your business name"
                className={`audit-input ${errors.business ? "audit-input-error" : ""}`}
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                data-testid="audit-input-business"
              />
              {errors.business && <span className="audit-error-text">{errors.business}</span>}
            </div>

            <div className="audit-form-group">
              <label className="audit-form-label">Website URL</label>
              <input
                type="text"
                placeholder="https://yourwebsite.com"
                className={`audit-input ${errors.website ? "audit-input-error" : ""}`}
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                data-testid="audit-input-website"
              />
              {errors.website && <span className="audit-error-text">{errors.website}</span>}
            </div>

            <div className="audit-form-group">
              <label className="audit-form-label">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className={`audit-input ${errors.email ? "audit-input-error" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                data-testid="audit-input-email"
              />
              {errors.email && <span className="audit-error-text">{errors.email}</span>}
            </div>

            <button type="submit" className="audit-btn" data-testid="audit-submit-btn">
              Generate Website Audit
            </button>
          </form>
        </section>
      )}

      {/* Loading Phase */}
      {phase === "loading" && (
        <div className="audit-loading-wrap" data-testid="audit-loading">
          <div className="audit-spinner"></div>
          <p className="audit-loading-text">Analyzing your website</p>
          <p className="audit-loading-subtext">{loadingText}</p>
        </div>
      )}

      {/* Results Phase */}
      {phase === "results" && result && (
        <section className="audit-results-wrap" data-testid="audit-results-section">
          {!result.success ? (
            <div className="audit-error-card">
              <h2>Unable to Analyze Website</h2>
              <p>{result.error}</p>
              <button onClick={resetForm} className="audit-btn">Try Again</button>
            </div>
          ) : (
            <div className="audit-report-card">
              {/* Report Header */}
              <div className="audit-report-header">
                <div>
                  <span className="audit-report-brand">Liminal Group Audit</span>
                  <h2 className="audit-report-title">{formData.business}</h2>
                  <p className="audit-report-url">{result.url}</p>
                </div>
                <div
                  className="audit-score-circle"
                  style={{
                    background: getScoreColor(result.score).bg,
                    color: getScoreColor(result.score).text,
                  }}
                  data-testid="audit-score"
                >
                  <span className="audit-score-num">{result.score}</span>
                  <span className="audit-score-label">Score</span>
                </div>
              </div>

              {/* Check Results */}
              <div className="audit-report-body">
                {result.checks.map((check, index) => (
                  <div key={index} className="audit-check-row" data-testid={`audit-check-${index}`}>
                    <div className={`audit-check-icon ${check.passed ? "audit-check-pass" : "audit-check-fail"}`}>
                      {check.passed ? "✓" : "✗"}
                    </div>
                    <div>
                      <div className="audit-check-label">{check.label}</div>
                      <div className="audit-check-detail">{check.detail}</div>
                      <div className="audit-check-cat">{check.category}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Summary */}
              <div className="audit-ai-section">
                <h3 className="audit-ai-title">AI Analysis Summary</h3>
                {result.ai_summary ? (
                  <p className="audit-ai-text">{result.ai_summary}</p>
                ) : (
                  <p className="audit-ai-loading">Generating AI insights...</p>
                )}
              </div>

              {/* CTA Bar */}
              <div className="audit-cta-bar">
                <p className="audit-cta-text">Ready to fix these issues and start converting more visitors?</p>
                <Link href="/#pricing" className="audit-cta-btn" data-testid="audit-cta-pricing">
                  View Pricing &amp; Packages
                </Link>
              </div>
            </div>
          )}

          <button onClick={resetForm} className="audit-reset-btn" data-testid="audit-reset-btn">
            ← Run Another Audit
          </button>
        </section>
      )}

      {/* Footer */}
      <footer className="audit-footer" data-testid="audit-footer">
        <p>© 2026 Liminal Group LLC. All rights reserved.</p>
      </footer>
    </>
  );
}
