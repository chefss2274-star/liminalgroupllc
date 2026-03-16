// Liminal Group LLC - Clean Build v3
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

// SVG Logo Component
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
    <rect x="26" y="8" width="8" height="38" rx="1" fill="url(#doorGrad)" opacity="0.12" />
    <defs>
      <linearGradient id="doorGrad" x1="26" y1="8" x2="34" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2c3e50" />
        <stop offset="1" stopColor="#7c6955" />
      </linearGradient>
    </defs>
  </svg>
);


export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll reveal effect
  useEffect(() => {
    // Small delay to ensure DOM is fully ready after hydration
    const timer = setTimeout(() => {
      const revealEls = document.querySelectorAll(".reveal");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      revealEls.forEach((el) => revealObserver.observe(el));

      return () => revealObserver.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Close mobile nav on body overflow
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  // Smooth scroll for anchor links
  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileNavOpen(false);
    }
  }, []);


  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main" className="skip-link" data-testid="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header className="site-header" data-testid="site-header">
        <div className="container nav">
          <a
            href="#top"
            className="brand"
            aria-label="Liminal Group home"
            onClick={(e) => handleAnchorClick(e, "#top")}
            data-testid="brand-link"
          >
            <BrandMark />
            <span className="brand-lockup">
              <span className="brand-name">Liminal</span>
              <span className="brand-sub">Group LLC</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#services" onClick={(e) => handleAnchorClick(e, "#services")} data-testid="nav-services">
              Services
            </a>
            <a href="#demos" onClick={(e) => handleAnchorClick(e, "#demos")} data-testid="nav-demos">
              Demos
            </a>
            <a href="#pricing" onClick={(e) => handleAnchorClick(e, "#pricing")} data-testid="nav-pricing">
              Pricing
            </a>
            <Link href="/audit" data-testid="nav-audit">
              Audit
            </Link>
            <a href="#about" onClick={(e) => handleAnchorClick(e, "#about")} data-testid="nav-about">
              About
            </a>
            <Link href="/why-mobile" data-testid="nav-why-mobile">
              Why Mobile
            </Link>
          </nav>

          <Link
            href="/audit"
            className="nav-cta"
            data-testid="nav-cta"
          >
            Free Website Audit
          </Link>

          <button
            className={`menu-toggle ${mobileNavOpen ? "active" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            data-testid="menu-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <div
        className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}
        id="mobileNav"
        aria-hidden={!mobileNavOpen}
        data-testid="mobile-nav"
      >
        <a href="#services" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#services")}>
          Services
        </a>
        <a href="#demos" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#demos")}>
          Demo Websites
        </a>
        <a href="#pricing" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#pricing")}>
          Pricing
        </a>
        <Link href="/audit" className="mobile-nav-link">
          Website Audit
        </Link>
        <a href="#about" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#about")}>
          About
        </a>
        <Link href="/why-mobile" className="mobile-nav-link">
          Why Mobile
        </Link>
        <a href="#contact" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#contact")}>
          Contact
        </a>
      </div>

      {/* Main */}
      <main id="main" data-testid="main-content">
        {/* Hero */}
        <section className="hero" id="top" data-testid="hero-section" style={{position:'relative',overflow:'hidden',minHeight:'90vh',display:'flex',alignItems:'center',background:'radial-gradient(ellipse at 30% 40%, #2a1f18 0%, #0f0e0c 60%), radial-gradient(ellipse at 70% 60%, #1f1a14 0%, #0f0e0c 70%)'}}>

          <div className="container hero-content">
            <div className="hero-eyebrow reveal">Liminal Group LLC</div>
            <h1 className="reveal reveal-delay-1">
              Cross the
              <br />
              Threshold
            </h1>
            <p className="hero-desc reveal reveal-delay-2">
              Modern websites that help businesses move into their next stage online. We combine strategic
              thinking, clean design, and emerging tools to turn outdated sites into platforms that generate
              real customers.
            </p>
            <div className="hero-actions reveal reveal-delay-3">
              <Link href="/audit" className="btn btn-primary" data-testid="hero-cta-primary">
                Get Your Free Audit
              </Link>
              <a
                href="#demos"
                className="btn btn-secondary"
                onClick={(e) => handleAnchorClick(e, "#demos")}
                data-testid="hero-cta-secondary"
              >
                View Demo Websites
              </a>
            </div>
            <p className="hero-tagline reveal reveal-delay-4">
              Helping businesses cross the threshold into modern digital presence
            </p>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="trust-strip" data-testid="trust-strip">
          <div className="container">
            <div className="trust-strip-grid">
              <div className="trust-item reveal">
                <span className="trust-num">01</span>
                <span className="trust-label">Clarity</span>
                <span className="trust-desc">Clean messaging that tells visitors exactly what you do and why they should act now.</span>
              </div>
              <div className="trust-item reveal reveal-delay-1">
                <span className="trust-num">02</span>
                <span className="trust-label">Credibility</span>
                <span className="trust-desc">Modern design and trust signals that make your business feel established and reliable.</span>
              </div>
              <div className="trust-item reveal reveal-delay-2">
                <span className="trust-num">03</span>
                <span className="trust-label">Momentum</span>
                <span className="trust-desc">From free audit to live website — every step is built to move your business forward.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider" aria-hidden="true" />

        {/* Problem Statement */}
        <section className="section" id="services" data-testid="services-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">The Problem</div>
              <h2 className="section-title">
                Most Business Websites
                <br />
                Are Holding Them Back
              </h2>
              <p className="section-desc">
                Many small business websites are outdated, difficult to use on mobile, and fail to turn visitors
                into customers. Your website should be your best salesperson — for most businesses, it is their
                biggest missed opportunity.
              </p>
            </div>

            <div className="problem-grid">
              <article className="problem-card reveal" data-testid="problem-card-1">
                <span className="problem-num">01</span>
                <h3>Outdated design</h3>
                <p>
                  Old layouts quietly damage trust and make a business feel behind the times before a visitor
                  reads a word.
                </p>
              </article>
              <article className="problem-card reveal reveal-delay-1" data-testid="problem-card-2">
                <span className="problem-num">02</span>
                <h3>Poor mobile experience</h3>
                <p>
                  If a site is frustrating on a phone, leads disappear fast. Most visitors never give a second
                  chance.
                </p>
              </article>
              <article className="problem-card reveal reveal-delay-2" data-testid="problem-card-3">
                <span className="problem-num">03</span>
                <h3>Low search visibility</h3>
                <p>
                  Weak structure and basic SEO mistakes keep strong businesses from being found when customers
                  are looking.
                </p>
              </article>
              <article className="problem-card reveal reveal-delay-3" data-testid="problem-card-4">
                <span className="problem-num">04</span>
                <h3>Visitors don&apos;t convert</h3>
                <p>
                  No clear path, no strong call to action, and no lead capture means the site is leaking
                  opportunities every day.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Mobile Stats */}
        <section className="mobile-stats-section" data-testid="mobile-stats-section">
          <div className="container">
            <div className="mobile-stats-header reveal">
              <div className="section-label">Why Mobile Matters</div>
              <h2 className="mobile-stats-headline">Your Customers Are on Their Phones</h2>
            </div>
            <div className="mobile-stats-grid">
              <div className="mobile-stat reveal">
                <div className="mobile-stat-number">61%</div>
                <div className="mobile-stat-label">Mobile Traffic</div>
                <div className="mobile-stat-desc">of all website visits come from mobile devices</div>
              </div>
              <div className="mobile-stat reveal reveal-delay-1">
                <div className="mobile-stat-number">53%</div>
                <div className="mobile-stat-label">Bounce Rate</div>
                <div className="mobile-stat-desc">leave if a page takes over 3 seconds to load</div>
              </div>
              <div className="mobile-stat reveal reveal-delay-2">
                <div className="mobile-stat-number">74%</div>
                <div className="mobile-stat-label">Return Rate</div>
                <div className="mobile-stat-desc">more likely to return to a mobile-friendly site</div>
              </div>
              <div className="mobile-stat reveal reveal-delay-3">
                <div className="mobile-stat-number">50%</div>
                <div className="mobile-stat-label">Online Purchases</div>
                <div className="mobile-stat-desc">of all e-commerce sales happen on mobile</div>
              </div>
            </div>

            {/* Before/After Phone Mockup Comparison */}
            <div className="phone-comparison reveal">
              <div className="phone-comparison-grid">

                {/* ── BEFORE Phone ── */}
                <div className="phone-mockup-wrapper">
                  <div className="phone-badge phone-badge-before">Before</div>
                  <div className="phone-frame phone-frame-comparison">
                    <div className="phone-notch" />
                    <div className="phone-screen phone-screen-before">
                      <div className="phone-screen-inner">

                        {/* Tacky header */}
                        <div style={{ background: "#2a0e00", padding: "6px 5px 5px", textAlign: "center", borderBottom: "2px solid #8B6914" }}>
                          <div style={{ fontSize: "10px", fontFamily: "Georgia, 'Times New Roman', serif", color: "#d4a439", fontStyle: "italic", fontWeight: "bold", lineHeight: 1.1 }}>
                            Bella&apos;s Italian Kitchen
                          </div>
                          <div style={{ fontSize: "5px", color: "#9a7020", letterSpacing: "0.06em", marginTop: "1px" }}>EST. 1987 · AUTHENTIC ITALIAN CUISINE</div>
                        </div>

                        {/* 9 cramped nav links wrapping */}
                        <div style={{ background: "#3a1a00", padding: "3px 3px", display: "flex", flexWrap: "wrap", gap: "1px", justifyContent: "center", borderBottom: "1px solid #6b3a10" }}>
                          {["Home", "Menu", "Specials", "Catering", "Wine List", "Gallery", "Reviews", "About", "Contact"].map((link) => (
                            <span key={link} style={{ fontSize: "5px", color: "#d4a439", padding: "1px 2px", background: "#4a2200", border: "1px solid #6b3a10", whiteSpace: "nowrap" }}>{link}</span>
                          ))}
                        </div>

                        {/* Blinking specials button */}
                        <div style={{ background: "#3a1a00", padding: "4px 5px", textAlign: "center" }}>
                          <span className="bellas-blink" style={{ fontSize: "6px", background: "#cc0000", color: "#ffffff", padding: "2px 5px", display: "inline-block", border: "2px solid #ff4444", fontWeight: "bold", letterSpacing: "0.03em" }}>
                            ★ CLICK HERE FOR SPECIALS ★
                          </span>
                        </div>

                        {/* Wall of text + hours sidebar */}
                        <div style={{ background: "#3a1a00", padding: "5px 5px 4px", display: "flex", gap: "4px" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "6.5px", color: "#d4a439", fontWeight: "bold", fontStyle: "italic", fontFamily: "Georgia, serif", marginBottom: "3px" }}>Welcome to Bella&apos;s!</div>
                            <div style={{ fontSize: "5.5px", color: "#c4a87a", lineHeight: 1.55 }}>
                              We are a family-owned restaurant serving authentic Italian cuisine since 1987. Our recipes have been passed down through generations and we use only the freshest ingredients sourced locally. Come dine with us and experience the true taste of Italy right here in Indianapolis!
                            </div>
                          </div>
                          {/* Hours sidebar */}
                          <div style={{ width: "38px", flexShrink: 0, background: "#2a0e00", border: "1px solid #6b3a10", padding: "3px 2px", fontSize: "4.5px", color: "#c4a87a", lineHeight: 1.5 }}>
                            <div style={{ fontWeight: "bold", color: "#d4a439", marginBottom: "1px", fontSize: "5px" }}>HOURS</div>
                            <div>Mon–Thu</div>
                            <div>11am–9pm</div>
                            <div>Fri–Sat</div>
                            <div>11am–10pm</div>
                            <div>Sun: 12–8</div>
                            <div style={{ marginTop: "3px", borderTop: "1px solid #6b3a10", paddingTop: "2px" }}>
                              <div style={{ fontWeight: "bold", color: "#d4a439" }}>FAX:</div>
                              <div>317-555-0147</div>
                            </div>
                          </div>
                        </div>

                        {/* Daily Specials box */}
                        <div style={{ background: "#3a1a00", padding: "4px 5px", borderTop: "1px solid #6b3a10" }}>
                          <div style={{ border: "1px dashed #d4a439", padding: "3px 4px" }}>
                            <div style={{ fontSize: "6px", color: "#d4a439", fontWeight: "bold", textAlign: "center", marginBottom: "2px" }}>✦ DAILY SPECIALS ✦</div>
                            {[
                              "Monday: Pasta Night $12.99",
                              "Tuesday: 20% Off Pasta",
                              "Wednesday: BOGO Wine",
                              "Thursday: Family Platter $39.99",
                            ].map((s) => (
                              <div key={s} style={{ fontSize: "5px", color: "#c4a87a", lineHeight: 1.6 }}>• {s}</div>
                            ))}
                          </div>
                        </div>

                        {/* Menu list */}
                        <div style={{ background: "#2a0e00", padding: "4px 5px", borderTop: "1px solid #6b3a10" }}>
                          <div style={{ fontSize: "6px", color: "#d4a439", fontWeight: "bold", marginBottom: "2px" }}>OUR MENU</div>
                          {[
                            ["Fettuccine Alfredo", "$16.99"],
                            ["Chicken Parm", "$18.99"],
                            ["Lasagna", "$17.99"],
                            ["Pizza", "$14.99"],
                          ].map(([name, price]) => (
                            <div key={name} style={{ display: "flex", justifyContent: "space-between", fontSize: "5px", color: "#c4a87a", lineHeight: 1.7, borderBottom: "1px dotted #6b3a10" }}>
                              <span>{name}</span>
                              <span style={{ color: "#d4a439" }}>{price}</span>
                            </div>
                          ))}
                        </div>

                        {/* Facebook + footer */}
                        <div style={{ background: "#3a1a00", padding: "3px 5px", borderTop: "1px solid #6b3a10", textAlign: "center" }}>
                          <div style={{ fontSize: "5.5px", color: "#4a7bc4", marginBottom: "2px" }}>👍 Find Us On Facebook!</div>
                          <div style={{ fontSize: "5px", color: "#9a7020", fontStyle: "italic" }}>You are visitor #14,832</div>
                          <div style={{ fontSize: "4.5px", color: "#7a5518", marginTop: "1px" }}>Website by Mike&apos;s Web Design</div>
                          <div style={{ fontSize: "4px", color: "#5a3c10", marginTop: "1px" }}>© 1987–2009 Bella&apos;s Italian Kitchen. All rights reserved.</div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ── VS divider ── */}
                <div className="phone-vs-divider">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="var(--line)" strokeWidth="1.5" />
                    <path d="M7 10h6M13 10l-2-2M13 10l-2 2" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>vs</span>
                </div>

                {/* ── AFTER Phone ── */}
                <div className="phone-mockup-wrapper">
                  <div className="phone-badge phone-badge-after">After</div>
                  <div className="phone-frame phone-frame-comparison">
                    <div className="phone-notch" />
                    <div className="phone-screen phone-screen-after">
                      <div className="phone-screen-inner">

                        {/* Clean elegant header */}
                        <div style={{ background: "#1c1209", padding: "7px 9px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: "10px", fontFamily: "Georgia, 'Times New Roman', serif", color: "#e8d5b0", fontStyle: "italic" }}>Bella&apos;s</div>
                          <div style={{ fontSize: "6px", background: "#c8a96e", color: "#1c1209", padding: "3px 7px", borderRadius: "10px", fontWeight: "700" }}>Reserve</div>
                        </div>

                        {/* Dark hero section — flex-fills remaining space */}
                        <div style={{ background: "#1c1209", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "10px 9px", borderTop: "1px solid rgba(200,169,110,0.15)", borderBottom: "1px solid rgba(200,169,110,0.15)" }}>
                          <div style={{ fontSize: "5.5px", color: "#c8a96e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "7px" }}>Indianapolis, since 1998</div>
                          <div style={{ fontSize: "13px", fontFamily: "Georgia, 'Times New Roman', serif", color: "#f0e6cc", lineHeight: 1.25, marginBottom: "12px", fontStyle: "italic" }}>
                            Where Family<br />Meets la Tavola
                          </div>
                          <div style={{ fontSize: "6.5px", background: "#c8a96e", color: "#1c1209", padding: "5px 12px", borderRadius: "10px", fontWeight: "700", display: "inline-block" }}>
                            Reserve a Table
                          </div>
                        </div>

                        {/* Menu section */}
                        <div style={{ background: "#faf8f5", padding: "7px 9px 5px" }}>
                          <div style={{ fontSize: "5.5px", color: "#8a7055", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px", fontWeight: "700" }}>Tonight&apos;s Menu</div>
                          {[
                            { name: "Tagliatelle al Ragù", price: "$22" },
                            { name: "Branzino al Forno", price: "$28" },
                            { name: "Pappardelle ai Funghi", price: "$19" },
                          ].map((dish) => (
                            <div key={dish.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: "1px solid rgba(139,112,85,0.18)" }}>
                              <div style={{ fontSize: "7px", color: "#2a1f0f", fontFamily: "Georgia, serif", fontStyle: "italic" }}>{dish.name}</div>
                              <div style={{ fontSize: "7px", color: "#8a7055", fontWeight: "700" }}>{dish.price}</div>
                            </div>
                          ))}
                        </div>

                        {/* Dark CTA box */}
                        <div style={{ background: "#1c1209", padding: "10px 9px 11px", textAlign: "center" }}>
                          <div style={{ fontSize: "7.5px", fontFamily: "Georgia, serif", color: "#e8d5b0", fontStyle: "italic", marginBottom: "7px", lineHeight: 1.3 }}>
                            Your table is waiting.
                          </div>
                          <div style={{ fontSize: "6.5px", border: "1px solid #c8a96e", color: "#c8a96e", padding: "4px 12px", borderRadius: "10px", display: "inline-block" }}>
                            Book Online →
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* See what they experience link */}
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Link href="/why-mobile" className="btn btn-primary">
                  See what they experience →
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="section-divider" aria-hidden="true" />

        {/* Process */}
        <section className="section process-section" data-testid="process-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">The Process</div>
              <h2 className="section-title">Cross the Threshold</h2>
              <p className="section-desc">
                Liminal is built around transition. We help businesses move from outdated websites to modern
                digital platforms designed for clarity, trust, and customer action.
              </p>
            </div>

            <div className="process-grid reveal">
              <article className="process-step" data-testid="process-step-1">
                <span className="process-step-num">1</span>
                <h3>Website Audit</h3>
                <p>
                  We evaluate your current site and identify missed opportunities in design, usability,
                  messaging, and conversion flow.
                </p>
              </article>
              <article className="process-step" data-testid="process-step-2">
                <span className="process-step-num">2</span>
                <h3>Strategic Design</h3>
                <p>
                  We design a modern website focused on clarity, stronger trust signals, and a structure that
                  helps convert visitors into customers.
                </p>
              </article>
              <article className="process-step" data-testid="process-step-3">
                <span className="process-step-num">3</span>
                <h3>Launch &amp; Growth</h3>
                <p>
                  Your business moves into a stronger digital presence that looks sharper, feels more credible,
                  and works harder for you.
                </p>
              </article>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Demo Websites */}
        <section className="section" id="demos" data-testid="demos-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">Portfolio</div>
              <h2 className="section-title">
                See What a Modern Business
                <br />
                Website Looks Like
              </h2>
              <p className="section-desc">
                These demo concepts show the difference between outdated websites and modern lead-focused
                design. Each is built for a specific industry and conversion goal.
              </p>
            </div>

            <div className="demo-grid">
              {/* Demo Card 1 - Roofing */}
              <article className="demo-card reveal" data-testid="demo-card-roofing">
                <div className="demo-visual">
                  <div className="demo-image-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&q=80"
                      alt="Roofing company website preview"
                      className="demo-preview-img"
                      loading="lazy"
                    />
                    <div className="demo-image-overlay" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="demo-body">
                  <div className="demo-tag">Demo</div>
                  <h3>Roofing Company</h3>
                  <p>
                    Built to highlight trust, emergency call action, service clarity, and fast quote request
                    capture.
                  </p>
                  <div className="demo-footer">
                    <Link href="/demos/roofing" className="demo-link" aria-label="View roofing demo" data-testid="roofing-demo-link">
                      View Demo
                    </Link>
                    <span className="demo-note">Lead-focused structure</span>
                  </div>
                </div>
              </article>

              {/* Demo Card 2 - Plumbing */}
              <article className="demo-card reveal reveal-delay-1" data-testid="demo-card-plumbing">
                <div className="demo-visual">
                  <div className="demo-image-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80"
                      alt="Plumbing company website preview"
                      className="demo-preview-img"
                      loading="lazy"
                    />
                    <div className="demo-image-overlay" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="demo-body">
                  <div className="demo-tag">Demo</div>
                  <h3>Plumbing Company</h3>
                  <p>
                    Structured for immediate action with stronger service visibility, mobile usability, and a
                    clearer CTA path.
                  </p>
                  <div className="demo-footer">
                    <Link href="/demos/plumbing" className="demo-link" aria-label="View plumbing demo" data-testid="plumbing-demo-link">
                      View Demo
                    </Link>
                    <span className="demo-note">Built for calls &amp; quotes</span>
                  </div>
                </div>
              </article>

              {/* Demo Card 3 - Landscaping */}
              <article className="demo-card reveal reveal-delay-2" data-testid="demo-card-landscaping">
                <div className="demo-visual">
                  <div className="demo-image-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80"
                      alt="Landscaping business website preview"
                      className="demo-preview-img"
                      loading="lazy"
                    />
                    <div className="demo-image-overlay" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="demo-body">
                  <div className="demo-tag">Demo</div>
                  <h3>Landscaping Business</h3>
                  <p>
                    Designed to elevate visual credibility, simplify contact flow, and support local search
                    discovery.
                  </p>
                  <div className="demo-footer">
                    <Link href="/demos/landscaping" className="demo-link" aria-label="View landscaping demo" data-testid="landscaping-demo-link">
                      View Demo
                    </Link>
                    <span className="demo-note">Strong visual trust signals</span>
                  </div>
                </div>
              </article>

              {/* Demo Card 4 - Restaurant */}
              <article className="demo-card reveal reveal-delay-3" data-testid="demo-card-restaurant">
                <div className="demo-visual">
                  <div className="demo-image-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                      alt="Restaurant website preview"
                      className="demo-preview-img"
                      loading="lazy"
                    />
                    <div className="demo-image-overlay" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="demo-body">
                  <div className="demo-tag">Demo</div>
                  <h3>Restaurant</h3>
                  <p>
                    Built for cleaner menus, stronger visual presentation, reservation action, and easier
                    customer engagement.
                  </p>
                  <div className="demo-footer">
                    <Link href="/demos/restaurant" className="demo-link" aria-label="View restaurant demo" data-testid="restaurant-demo-link">
                      View Demo
                    </Link>
                    <span className="demo-note">Hospitality-ready layout</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Pricing */}
        <section className="section pricing-section" id="pricing" data-testid="pricing-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">Investment</div>
              <h2 className="section-title">
                Transparent Pricing,
                <br />
                Real Results
              </h2>
              <p className="section-desc">
                Every package is built mobile-first — because over 60% of your visitors are on their phone. You get a modern, responsive website designed for clarity, trust, and conversion on every screen size.
              </p>
            </div>

            <div className="pricing-grid">
              {/* Starter */}
              <div className="pricing-card reveal" data-testid="pricing-card-starter">
                <div className="pricing-tier">Modern Foundation</div>
                <h3>Modern Foundation</h3>
                <div className="pricing-amount">
                  <span className="pricing-dollar">$1,297</span>
                </div>
                <div className="pricing-note">Total project investment</div>

                <div className="pricing-split">
                  <div className="pricing-split-item">
                    <span className="pricing-split-label">Deposit</span>
                    <span className="pricing-split-value">$597</span>
                  </div>
                  <div className="pricing-split-item">
                    <span className="pricing-split-label">At Launch</span>
                    <span className="pricing-split-value">$700</span>
                  </div>
                </div>

                <ul className="pricing-features">
                  <li>Custom modern website design</li>
                  <li>Mobile-first, fully responsive on all devices</li>
                  <li>Thumb-friendly navigation &amp; tap targets</li>
                  <li>Basic on-page SEO setup</li>
                  <li>Two rounds of revisions</li>
                  <li>Launch-ready in 2–3 weeks</li>
                </ul>

                <a
                  href="https://buy.stripe.com/4gM9AUehF1CqdhD6ue0kE00"
                  className="pricing-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </div>

              {/* Growth (Featured) */}
              <div className="pricing-card featured reveal reveal-delay-1" data-testid="pricing-card-growth">
                <div className="pricing-badge">Most Popular</div>
                <div className="pricing-tier">Built to Convert</div>
                <h3>Built to Convert</h3>
                <div className="pricing-amount">
                  <span className="pricing-dollar">$1,897</span>
                </div>
                <div className="pricing-note">Total project investment</div>

                <div className="pricing-split">
                  <div className="pricing-split-item">
                    <span className="pricing-split-label">Deposit</span>
                    <span className="pricing-split-value">$897</span>
                  </div>
                  <div className="pricing-split-item">
                    <span className="pricing-split-label">At Launch</span>
                    <span className="pricing-split-value">$1,000</span>
                  </div>
                </div>

                <ul className="pricing-features">
                  <li>Everything in Starter</li>
                  <li>Advanced mobile speed optimization</li>
                  <li>Lead capture forms &amp; automation</li>
                  <li>Google Business integration</li>
                  <li>Analytics &amp; conversion tracking</li>
                  <li>AI-powered website audit report</li>
                  <li>Launch-ready in 2–4 weeks</li>
                </ul>

                <a
                  href="https://buy.stripe.com/3cI9AUc9xepc3H3g4O0kE03"
                  className="pricing-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </div>

              {/* Authority */}
              <div className="pricing-card reveal reveal-delay-2" data-testid="pricing-card-authority">
                <div className="pricing-tier">Full Digital Presence</div>
                <h3>Full Digital Presence</h3>
                <div className="pricing-amount">
                  <span className="pricing-dollar">$2,897</span>
                </div>
                <div className="pricing-note">Total project investment</div>

                <div className="pricing-split">
                  <div className="pricing-split-item">
                    <span className="pricing-split-label">Deposit</span>
                    <span className="pricing-split-value">$1,297</span>
                  </div>
                  <div className="pricing-split-item">
                    <span className="pricing-split-label">At Launch</span>
                    <span className="pricing-split-value">$1,600</span>
                  </div>
                </div>

                <ul className="pricing-features">
                  <li>Everything in Growth</li>
                  <li>Mobile performance monitoring &amp; tuning</li>
                  <li>Stripe payment integration</li>
                  <li>Booking or reservation system</li>
                  <li>Ongoing SEO content strategy</li>
                  <li>Before &amp; after case study page</li>
                  <li>Priority support &amp; faster delivery</li>
                </ul>

                <a
                  href="https://buy.stripe.com/8x26oIddBch45Pb05Q0kE05"
                  className="pricing-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Care Plan */}
            <div className="care-plan reveal" data-testid="care-plan">
              <div className="care-plan-text">
                <h4>Website Care Plan</h4>
                <p>
                  Hosting, security updates, uptime monitoring, and priority support. Without it, most
                  businesses end up paying $300–$500 for emergency fixes within the first six months.
                </p>
              </div>
              <div className="care-plan-pricing">
                <span className="care-plan-amount">$127</span>
                <span className="care-plan-period">per month</span>
                <span className="care-plan-annual">or $1,147/year (save 25%)</span>
              </div>
              <div className="care-plan-actions">
                <a
                  href="https://buy.stripe.com/3cI8wQ4H55SG4L76ue0kE07"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Monthly — $127/mo
                </a>
                <a
                  href="https://buy.stripe.com/6oUbJ2c9xepcb9v6ue0kE01"
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Annual — $1,147/yr
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Audit Form */}
        <section className="section audit-section" id="audit" data-testid="audit-section">
          <div className="container">
            <div className="audit-cta-block reveal">
              <div className="section-label">Free Audit</div>
              <h2 className="section-title">
                Find Out What Your
                <br />
                Website Is Missing
              </h2>
              <p className="section-desc">
                Get a free AI-powered audit of your site in minutes. We&apos;ll surface the biggest
                opportunities in design, mobile usability, lead capture, and trust signals.
              </p>
              <Link href="/audit" className="btn btn-primary" data-testid="audit-cta-link">
                Get Your Free Website Audit
              </Link>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* About */}
        <section className="section" id="about" data-testid="about-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">About</div>
              <h2 className="section-title">About Liminal</h2>
              <p className="section-desc">
                Liminal helps businesses move beyond outdated websites and into modern digital platforms that
                generate real customer engagement. The brand is built around transition, clarity, and forward
                movement.
              </p>
            </div>

            <div className="about-grid">
              <article className="about-card reveal" data-testid="about-card-1">
                <h3>Strategic digital transition</h3>
                <p>
                  Our approach combines strategic thinking, modern design, and emerging AI tools to help
                  businesses cross the threshold into their next stage online.
                </p>
                <div className="trait-row">
                  <div className="trait">
                    <strong>Clearer</strong>
                    <span>Messaging &amp; positioning</span>
                  </div>
                  <div className="trait">
                    <strong>Stronger</strong>
                    <span>Visual trust &amp; structure</span>
                  </div>
                  <div className="trait">
                    <strong>Faster</strong>
                    <span>Build cycles with AI</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="contact" data-testid="cta-section">
          <div className="container">
            <div className="cta-box reveal" data-testid="cta-box">
              <div>
                <h3>
                  Ready to Cross
                  <br />
                  the Threshold?
                </h3>
                <p>Start with a free website audit and discover how your business can move forward online.</p>
              </div>
              <div className="cta-actions">
                <Link
                  href="/audit"
                  className="btn-cta-primary"
                  data-testid="cta-audit-button"
                >
                  Request Website Audit
                </Link>
                <a href="mailto:admin@liminalgroupllc.com" className="btn-cta-secondary" data-testid="cta-email">
                  admin@liminalgroupllc.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer" data-testid="site-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="brand">
              <BrandMark className="brand-mark" style={{ width: 28, height: 28 }} />
              <span className="brand-lockup">
                <span className="brand-name" style={{ fontSize: "0.78rem" }}>
                  Liminal
                </span>
              </span>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#services" onClick={(e) => handleAnchorClick(e, "#services")}>
                Services
              </a>
              <a href="#demos" onClick={(e) => handleAnchorClick(e, "#demos")}>
                Demos
              </a>
              <a href="#pricing" onClick={(e) => handleAnchorClick(e, "#pricing")}>
                Pricing
              </a>
              <Link href="/audit">
                Audit
              </Link>
              <a href="#about" onClick={(e) => handleAnchorClick(e, "#about")}>
                About
              </a>
              <Link href="/why-mobile">
                Why Mobile
              </Link>
              <a href="mailto:admin@liminalgroupllc.com">Contact</a>
            </nav>
          </div>
          <p className="footer-copy" style={{ textAlign: "center", marginTop: 20 }}>
            &copy; 2026 Liminal Group LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
