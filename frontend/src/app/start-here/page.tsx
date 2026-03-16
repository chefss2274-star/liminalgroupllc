"use client";

import { useState } from "react";
import Link from "next/link";

const BrandMark = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={`brand-mark ${className}`}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={style}
  >
    <path d="M28 8L28 46" stroke="#2c3e50" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M28 46L14 52" stroke="#2c3e50" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M28 46L42 52" stroke="#5a5651" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
    <rect x="26" y="8" width="8" height="38" rx="1" fill="url(#doorGradSH)" opacity="0.12" />
    <defs>
      <linearGradient id="doorGradSH" x1="26" y1="8" x2="34" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2c3e50" />
        <stop offset="1" stopColor="#7c6955" />
      </linearGradient>
    </defs>
  </svg>
);

const leftDeliverables = [
  "Custom designed homepage",
  "Mobile-first responsive layout",
  "Contact form with email delivery",
  "Google Maps integration",
  "Basic SEO setup",
];

const rightDeliverables = [
  "Up to 4 pages total",
  "Fast-loading optimized build",
  "SSL certificate included",
  "30 days of post-launch support",
  "Delivered in under 2 weeks",
];

const timelineSteps = [
  { days: "Days 1–2", title: "Discovery & Strategy", body: "We learn your business, your customers, and your goals. You fill out one simple intake form." },
  { days: "Days 3–5", title: "Design", body: "We build your homepage design and get your approval before writing a single line of code." },
  { days: "Days 6–10", title: "Development", body: "Your site is built, mobile-optimized, and connected to your domain." },
  { days: "Days 11–13", title: "Review & Revisions", body: "You review the full site. We make your requested changes." },
  { days: "Day 14", title: "Launch", body: "Your site goes live. You get 30 days of support included." },
];

export default function StartHere() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="container nav">
          <Link href="/" className="brand" aria-label="Liminal Group home">
            <BrandMark />
            <span className="brand-lockup">
              <span className="brand-name">Liminal</span>
              <span className="brand-sub">Group LLC</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            <Link href="/#services">Services</Link>
            <Link href="/#demos">Demos</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/audit">Audit</Link>
            <Link href="/#about">About</Link>
            <Link href="/why-mobile">Why Mobile</Link>
            <Link href="/start-here" style={{ color: "#c9a84c" }}>Start Here</Link>
          </nav>

          <Link href="/audit" className="nav-cta">Free Website Audit</Link>

          <button
            className={`menu-toggle ${mobileNavOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`mobile-nav ${mobileNavOpen ? "open" : ""}`} aria-hidden={!mobileNavOpen}>
        <Link href="/#services" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Services</Link>
        <Link href="/#demos" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Demos</Link>
        <Link href="/#pricing" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Pricing</Link>
        <Link href="/audit" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Website Audit</Link>
        <Link href="/#about" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>About</Link>
        <Link href="/why-mobile" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Why Mobile</Link>
        <Link href="/start-here" className="mobile-nav-link" style={{ color: "#c9a84c" }} onClick={() => setMobileNavOpen(false)}>Start Here</Link>
      </div>

      <main>
        {/* ── SECTION 1: HERO ─────────────────────────── */}
        <section className="hero" id="top">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-line-glow" aria-hidden="true" />
          <div className="hero-vline" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-eyebrow">FOR BUSINESSES STARTING FROM ZERO</div>
              <h1>No Website Yet?<br />Good.</h1>
              <p className="hero-desc">
                Starting from scratch is an advantage. No broken code to fix, no bad first impressions to undo. Just a clean foundation built right the first time.
              </p>
            </div>
            <div className="hero-mobile-divider" aria-hidden="true" />
            <div className="hero-right">
              <span style={{ display: "block", width: "40px", height: "1px", background: "#c9a84c", marginBottom: "20px" }} aria-hidden="true" />
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", letterSpacing: "0.2em", fontWeight: 500, textTransform: "uppercase", marginBottom: "12px" }}>
                READY TO BUILD?
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", letterSpacing: "0.05em", marginBottom: "28px" }}>
                Your business deserves a real web presence.
              </p>
              <a
                href="https://buy.stripe.com/4gM9AUehF1CqdhD6ue0kE00"
                className="hero-btn-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Build My Site →
              </a>
              <Link href="/demos/restaurant" className="hero-btn-ghost">
                See Example Sites →
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: CLEAN SLATE ADVANTAGE ────────── */}
        <section style={{ background: "#1a1712", padding: "120px 0" }}>
          <div className="sh-section-inner">
            <p style={{ color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px", textAlign: "center" }}>
              THE CLEAN SLATE ADVANTAGE
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 600, textAlign: "center", marginBottom: "48px", lineHeight: 1.2 }}>
              You&apos;re Not Behind. You&apos;re Just Getting Started Right.
            </h2>
            <div className="sh-cards">
              {[
                { num: "01", title: "No Baggage", body: "No outdated code, broken plugins, or embarrassing first impressions to clean up. We build on a clean foundation from day one." },
                { num: "02", title: "Built to Convert", body: "Your site won't just exist — it will work. Every page designed to turn visitors into calls, bookings, and customers." },
                { num: "03", title: "Live in Under 2 Weeks", body: "Most clients go from zero to live website in 14 days or less. You'll have a professional web presence before the month is out." },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "8px", padding: "40px 32px" }}>
                  <div style={{ color: "#c9a84c", fontSize: "2rem", fontWeight: 700, marginBottom: "16px" }}>{num}</div>
                  <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px" }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHAT YOU GET ──────────────────── */}
        <section style={{ background: "#1c1a15", padding: "120px 0" }}>
          <div className="sh-section-inner-md">
            <p style={{ color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
              THE MODERN FOUNDATION PACKAGE
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 600, marginBottom: "20px", lineHeight: 1.2 }}>
              Everything You Need. Nothing You Don&apos;t.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "560px", margin: "0 auto 48px", fontSize: "1rem", lineHeight: 1.7 }}>
              Our Modern Foundation package is built specifically for businesses launching their first professional website.
            </p>

            <div className="sh-deliverables">
              <div>
                {leftDeliverables.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#ffffff", fontSize: "1rem", lineHeight: 2 }}>
                    <span style={{ color: "#c9a84c", fontWeight: 600, flexShrink: 0 }}>—</span>
                    {item}
                  </div>
                ))}
              </div>
              <div>
                {rightDeliverables.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#ffffff", fontSize: "1rem", lineHeight: 2 }}>
                    <span style={{ color: "#c9a84c", fontWeight: 600, flexShrink: 0 }}>—</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <p style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}>Starting at $1,297</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "8px" }}>One-time project fee. No subscriptions, no surprises.</p>
            </div>

            <a
              href="https://buy.stripe.com/4gM9AUehF1CqdhD6ue0kE00"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", border: "1px solid #c9a84c", color: "#c9a84c", background: "transparent", padding: "18px 48px", borderRadius: "6px", fontSize: "1rem", letterSpacing: "0.08em", textDecoration: "none" }}
            >
              Start My Project →
            </a>
          </div>
        </section>

        {/* ── SECTION 4: TIMELINE ──────────────────────── */}
        <section style={{ background: "#1a1712", padding: "120px 0" }}>
          <div className="sh-section-inner-md">
            <p style={{ color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
              YOUR LAUNCH TIMELINE
            </p>
            <h2 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 600, marginBottom: "64px", lineHeight: 1.2 }}>
              From Zero to Live in 14 Days
            </h2>

            <div style={{ position: "relative", paddingLeft: "48px", textAlign: "left" }}>
              {/* Vertical connecting line */}
              <div style={{ position: "absolute", left: "4px", top: "8px", bottom: "8px", width: "2px", background: "rgba(201,168,76,0.3)" }} aria-hidden="true" />

              {timelineSteps.map(({ days, title, body }, i) => (
                <div key={i} style={{ position: "relative", marginBottom: i < timelineSteps.length - 1 ? "48px" : 0 }}>
                  {/* Gold dot */}
                  <div style={{ position: "absolute", left: "-48px", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: "#c9a84c" }} aria-hidden="true" />
                  <p style={{ color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{days}</p>
                  <h3 style={{ color: "#ffffff", fontWeight: 600, fontSize: "1.05rem", marginBottom: "8px" }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FINAL CTA ─────────────────────── */}
        <section style={{ background: "#1f1d19", padding: "120px 0", textAlign: "center" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 48px" }}>
            <h2 style={{ color: "#ffffff", fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "20px" }}>
              Your First Website Should Make a Statement.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "40px" }}>
              Let&apos;s build something you&apos;re proud to hand out on a business card.
            </p>
            <div className="sh-cta-btns">
              <a
                href="https://buy.stripe.com/4gM9AUehF1CqdhD6ue0kE00"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: "#c9a84c", color: "#1a1712", fontWeight: 600, padding: "18px 48px", borderRadius: "6px", fontSize: "1rem", letterSpacing: "0.04em", textDecoration: "none", display: "inline-block" }}
              >
                Build My Site →
              </a>
              <Link
                href="/demos/restaurant"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.55)", background: "transparent", padding: "18px 48px", borderRadius: "6px", fontSize: "1rem", letterSpacing: "0.04em", textDecoration: "none", display: "inline-block" }}
              >
                View Example Sites →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
