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
        <section className="hero" id="top" data-testid="hero-section">
          <div className="container hero-layout">
            <div>
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
                <Link
                  href="/audit"
                  className="btn btn-primary"
                  data-testid="hero-cta-primary"
                >
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
            </div>

            <aside className="hero-card reveal reveal-delay-2" aria-label="What Liminal delivers">
              <div className="hero-card-brand">
                <BrandMark className="brand-mark" style={{ width: 44, height: 44 }} />
                <span className="brand-lockup">
                  <span className="brand-name" style={{ fontSize: "0.82rem" }}>
                    Liminal
                  </span>
                  <span className="brand-sub">Cross the Threshold</span>
                </span>
              </div>

              <div className="metric">
                <span className="metric-label">Clarity</span>
                <span className="metric-desc">
                  Clean messaging that tells visitors exactly what you do and why they should act now.
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Credibility</span>
                <span className="metric-desc">
                  Modern design and trust signals that make your business feel established and reliable.
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Momentum</span>
                <span className="metric-desc">
                  From free audit to live website — every step is built to move your business forward.
                </span>
              </div>
            </aside>
          </div>
        </section>

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
              <div className="section-label" style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.2)" }}>Why Mobile Matters</div>
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
            <div className="phone-comparison reveal" style={{ marginTop: "3rem" }}>
              <div className="phone-comparison-grid">
                {/* Before Phone */}
                <div className="phone-mockup-wrapper">
                  <div className="phone-badge phone-badge-before">Before</div>
                  <div className="phone-frame">
                    <div className="phone-notch" />
                    <div className="phone-screen phone-screen-before">
                      <div className="phone-screen-inner">
                        {/* Bad nav */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", padding: "6px 4px", borderBottom: "1px solid #ccc", background: "#f0f0f0" }}>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>Home</span>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>About Us</span>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>Services</span>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>Portfolio</span>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>Contact</span>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>Blog</span>
                          <span style={{ fontSize: "7px", color: "#333", whiteSpace: "nowrap" }}>FAQ</span>
                        </div>
                        {/* Wall of text */}
                        <div style={{ padding: "6px 5px" }}>
                          <div style={{ fontSize: "8px", fontWeight: "bold", color: "#111", lineHeight: 1.2, marginBottom: "4px" }}>Welcome to Our Business Website! We Offer Many Great Services for You</div>
                          <div style={{ fontSize: "6px", color: "#555", lineHeight: 1.4, marginBottom: "4px" }}>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco.
                          </div>
                          <div style={{ fontSize: "6px", color: "#555", lineHeight: 1.4, marginBottom: "4px" }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.
                          </div>
                          <div style={{ fontSize: "6px", color: "#777", lineHeight: 1.4, marginBottom: "4px" }}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi.
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginTop: "4px" }}>
                            <div style={{ fontSize: "6px", background: "#ddd", padding: "2px 3px", borderRadius: "2px", color: "#333" }}>Learn More</div>
                            <div style={{ fontSize: "6px", background: "#ddd", padding: "2px 3px", borderRadius: "2px", color: "#333" }}>Click Here</div>
                            <div style={{ fontSize: "6px", background: "#ddd", padding: "2px 3px", borderRadius: "2px", color: "#333" }}>Read More</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* After Phone */}
                <div className="phone-mockup-wrapper">
                  <div className="phone-badge phone-badge-after">After</div>
                  <div className="phone-frame">
                    <div className="phone-notch" />
                    <div className="phone-screen phone-screen-after">
                      <div className="phone-screen-inner">
                        {/* Clean header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", background: "#1a1a2e" }}>
                          <span style={{ fontSize: "8px", fontWeight: "bold", color: "#fff", letterSpacing: "0.5px" }}>Bistro&nbsp;Co.</span>
                          <div style={{ fontSize: "7px", background: "#c8a96e", color: "#1a1a2e", padding: "3px 6px", borderRadius: "8px", fontWeight: "bold" }}>Reserve</div>
                        </div>
                        {/* Hero image area */}
                        <div style={{ height: "40px", background: "linear-gradient(135deg, #2c3e50, #4a6741)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Fine Dining</span>
                        </div>
                        {/* Readable headline */}
                        <div style={{ padding: "8px 8px 4px" }}>
                          <div style={{ fontSize: "9px", fontWeight: "bold", color: "#1a1a2e", lineHeight: 1.3, marginBottom: "3px" }}>Fresh Ingredients,<br />Unforgettable Meals</div>
                          <div style={{ fontSize: "6.5px", color: "#666", lineHeight: 1.5 }}>Open daily · Downtown location</div>
                        </div>
                        {/* Clean menu cards */}
                        <div style={{ padding: "4px 8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#f8f6f2", borderRadius: "5px", padding: "4px 5px" }}>
                            <div style={{ width: "18px", height: "18px", background: "#e8dcc8", borderRadius: "3px", flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: "7px", fontWeight: "bold", color: "#1a1a2e" }}>Dinner Menu</div>
                              <div style={{ fontSize: "6px", color: "#888" }}>Seasonal favorites</div>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#f8f6f2", borderRadius: "5px", padding: "4px 5px" }}>
                            <div style={{ width: "18px", height: "18px", background: "#e8dcc8", borderRadius: "3px", flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: "7px", fontWeight: "bold", color: "#1a1a2e" }}>Happy Hour</div>
                              <div style={{ fontSize: "6px", color: "#888" }}>3pm – 6pm daily</div>
                            </div>
                          </div>
                        </div>
                        {/* Prominent CTA */}
                        <div style={{ padding: "6px 8px" }}>
                          <div style={{ fontSize: "8px", background: "#c8a96e", color: "#1a1a2e", textAlign: "center", padding: "5px", borderRadius: "6px", fontWeight: "bold" }}>
                            Book a Table →
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* See what they experience link */}
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Link href="/why-mobile" className="mobile-stats-link">
                  See what they experience →
                </Link>
              </div>
            </div>
          </div>
        </section>
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
                  Get Started — $597 Deposit
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
                  Get Started — $897 Deposit
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
                  Get Started — $1,297 Deposit
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
