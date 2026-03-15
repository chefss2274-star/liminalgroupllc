"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

// Success Check SVG
const SuccessCheck = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="24" fill="rgba(124,105,85,0.1)" />
    <path d="M16 24l6 6 10-12" stroke="#7c6955" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

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

  // Form validation
  const validateField = useCallback((name: string, value: string, type: string): boolean => {
    if (!value.trim()) return false;
    if (type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    if (type === "url") {
      return /^https?:\/\/.+\..+/.test(value);
    }
    return true;
  }, []);

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      const isValid = validateField(name, value, type);
      setFormErrors((prev) => ({ ...prev, [name]: !isValid }));
    },
    [validateField]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = e.target;
      if (formErrors[name]) {
        const isValid = validateField(name, value, type);
        if (isValid) {
          setFormErrors((prev) => ({ ...prev, [name]: false }));
        }
      }
    },
    [formErrors, validateField]
  );

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form) return;

      const formData = new FormData(form);
      const errors: Record<string, boolean> = {};
      let hasErrors = false;

      const fields = [
        { name: "name", type: "text" },
        { name: "business", type: "text" },
        { name: "website", type: "url" },
        { name: "email", type: "email" },
      ];

      fields.forEach(({ name, type }) => {
        const value = formData.get(name) as string;
        const isValid = validateField(name, value, type);
        if (!isValid) {
          errors[name] = true;
          hasErrors = true;
        }
      });

      setFormErrors(errors);
      if (hasErrors) return;

      setFormState("sending");

      try {
        // Formspree integration - replace YOUR_FORM_ID with actual Formspree form ID
        const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
        
        if (formspreeId) {
          const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
          });

          if (!response.ok) {
            throw new Error("Form submission failed");
          }
        } else {
          // Simulate submission if no Formspree ID configured
          await new Promise((resolve) => setTimeout(resolve, 800));
        }

        setFormState("success");
      } catch {
        setFormState("idle");
        alert("Something went wrong. Please try again or email us directly at hello@liminalgroupllc.com");
      }
    },
    [validateField]
  );

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
            <a href="#audit" onClick={(e) => handleAnchorClick(e, "#audit")} data-testid="nav-audit">
              Audit
            </a>
            <a href="#about" onClick={(e) => handleAnchorClick(e, "#about")} data-testid="nav-about">
              About
            </a>
          </nav>

          <a
            href="#audit"
            className="nav-cta"
            onClick={(e) => handleAnchorClick(e, "#audit")}
            data-testid="nav-cta"
          >
            Free Website Audit
          </a>

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
        <a href="#audit" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#audit")}>
          Website Audit
        </a>
        <a href="#about" className="mobile-nav-link" onClick={(e) => handleAnchorClick(e, "#about")}>
          About
        </a>
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
                <a
                  href="#audit"
                  className="btn btn-primary"
                  onClick={(e) => handleAnchorClick(e, "#audit")}
                  data-testid="hero-cta-primary"
                >
                  Get Your Free Audit
                </a>
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
                  <div className="mock-browser">
                    <div className="mock-toolbar">
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                    </div>
                    <div className="mock-content">
                      <div className="mock-sidebar">
                        <div className="mock-line" style={{ width: "80%" }}></div>
                        <div className="mock-line" style={{ width: "60%" }}></div>
                        <div className="mock-line" style={{ width: "45%" }}></div>
                        <div className="mock-block"></div>
                      </div>
                      <div className="mock-panels">
                        <div className="mock-panel"></div>
                        <div className="mock-panel"></div>
                      </div>
                    </div>
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
                  <div className="mock-browser">
                    <div className="mock-toolbar">
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                    </div>
                    <div className="mock-content">
                      <div className="mock-sidebar">
                        <div className="mock-line" style={{ width: "72%" }}></div>
                        <div className="mock-line" style={{ width: "55%" }}></div>
                        <div className="mock-line" style={{ width: "38%" }}></div>
                        <div className="mock-block"></div>
                      </div>
                      <div className="mock-panels">
                        <div className="mock-panel"></div>
                        <div className="mock-panel"></div>
                      </div>
                    </div>
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
                  <div className="mock-browser">
                    <div className="mock-toolbar">
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                    </div>
                    <div className="mock-content">
                      <div className="mock-sidebar">
                        <div className="mock-line" style={{ width: "76%" }}></div>
                        <div className="mock-line" style={{ width: "58%" }}></div>
                        <div className="mock-line" style={{ width: "42%" }}></div>
                        <div className="mock-block"></div>
                      </div>
                      <div className="mock-panels">
                        <div className="mock-panel"></div>
                        <div className="mock-panel"></div>
                      </div>
                    </div>
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
                  <div className="mock-browser">
                    <div className="mock-toolbar">
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                      <span className="mock-dot"></span>
                    </div>
                    <div className="mock-content">
                      <div className="mock-sidebar">
                        <div className="mock-line" style={{ width: "68%" }}></div>
                        <div className="mock-line" style={{ width: "50%" }}></div>
                        <div className="mock-line" style={{ width: "35%" }}></div>
                        <div className="mock-block"></div>
                      </div>
                      <div className="mock-panels">
                        <div className="mock-panel"></div>
                        <div className="mock-panel"></div>
                      </div>
                    </div>
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
                Every package includes a modern, mobile-optimized website built for clarity, trust, and
                conversion. Pick the level that matches where your business is headed.
              </p>
            </div>

            <div className="pricing-grid">
              {/* Starter */}
              <div className="pricing-card reveal" data-testid="pricing-card-starter">
                <div className="pricing-tier">Starter</div>
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
                  <li>Mobile-optimized and responsive</li>
                  <li>Basic on-page SEO setup</li>
                  <li>Two rounds of revisions</li>
                  <li>Launch-ready in 2–3 weeks</li>
                </ul>

                <a
                  href="#audit"
                  className="pricing-btn"
                  onClick={(e) => handleAnchorClick(e, "#audit")}
                >
                  Start with an Audit
                </a>
              </div>

              {/* Growth (Featured) */}
              <div className="pricing-card featured reveal reveal-delay-1" data-testid="pricing-card-growth">
                <div className="pricing-badge">Most Popular</div>
                <div className="pricing-tier">Growth</div>
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
                  <li>Lead capture forms &amp; automation</li>
                  <li>Google Business integration</li>
                  <li>Analytics &amp; conversion tracking</li>
                  <li>AI-powered website audit report</li>
                  <li>Launch-ready in 2–4 weeks</li>
                </ul>

                <a
                  href="#audit"
                  className="pricing-btn"
                  onClick={(e) => handleAnchorClick(e, "#audit")}
                >
                  Start with an Audit
                </a>
              </div>

              {/* Authority */}
              <div className="pricing-card reveal reveal-delay-2" data-testid="pricing-card-authority">
                <div className="pricing-tier">Authority</div>
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
                  <li>Stripe payment integration</li>
                  <li>Booking or reservation system</li>
                  <li>Ongoing SEO content strategy</li>
                  <li>Before &amp; after case study page</li>
                  <li>Priority support &amp; faster delivery</li>
                </ul>

                <a
                  href="#audit"
                  className="pricing-btn"
                  onClick={(e) => handleAnchorClick(e, "#audit")}
                >
                  Start with an Audit
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
            </div>
          </div>
        </section>

        {/* Audit Form */}
        <section className="section audit-section" id="audit" data-testid="audit-section">
          <div className="container">
            <div className="reveal">
              <div className="section-label">Lead Magnet</div>
              <h2 className="section-title">
                Find Out What Your
                <br />
                Website Is Missing
              </h2>
              <p className="section-desc">
                Request a free AI-powered website audit. We&apos;ll highlight the biggest opportunities for
                improvement in design, mobile usability, lead capture, and trust signals.
              </p>
            </div>

            <div className="audit-layout">
              <div className="audit-form-card reveal" data-testid="audit-form-card">
                {formState !== "success" ? (
                  <div id="auditFormWrapper">
                    <h3>Free Website Audit</h3>
                    <p>
                      Enter your details below and we&apos;ll send you a quick audit highlighting what&apos;s
                      working and what&apos;s not.
                    </p>

                    <form
                      ref={formRef}
                      id="auditForm"
                      noValidate
                      onSubmit={handleFormSubmit}
                      className={formState === "sending" ? "form-sending" : ""}
                      data-testid="audit-form"
                    >
                      <div className={`form-group ${formErrors.name ? "has-error" : ""}`}>
                        <label htmlFor="audit-name">
                          Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="audit-name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          required
                          autoComplete="name"
                          className={formErrors.name ? "error" : ""}
                          onBlur={handleInputBlur}
                          onChange={handleInputChange}
                          data-testid="input-name"
                        />
                        <div className="form-error">Please enter your name.</div>
                      </div>
                      <div className={`form-group ${formErrors.business ? "has-error" : ""}`}>
                        <label htmlFor="audit-business">
                          Business Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="audit-business"
                          name="business"
                          type="text"
                          placeholder="Your business name"
                          required
                          className={formErrors.business ? "error" : ""}
                          onBlur={handleInputBlur}
                          onChange={handleInputChange}
                          data-testid="input-business"
                        />
                        <div className="form-error">Please enter your business name.</div>
                      </div>
                      <div className={`form-group ${formErrors.website ? "has-error" : ""}`}>
                        <label htmlFor="audit-website">
                          Website URL <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="audit-website"
                          name="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          required
                          className={formErrors.website ? "error" : ""}
                          onBlur={handleInputBlur}
                          onChange={handleInputChange}
                          data-testid="input-website"
                        />
                        <div className="form-error">Please enter a valid website URL (include https://).</div>
                      </div>
                      <div className={`form-group ${formErrors.email ? "has-error" : ""}`}>
                        <label htmlFor="audit-email">
                          Email Address <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="audit-email"
                          name="email"
                          type="email"
                          placeholder="name@company.com"
                          required
                          autoComplete="email"
                          className={formErrors.email ? "error" : ""}
                          onBlur={handleInputBlur}
                          onChange={handleInputChange}
                          data-testid="input-email"
                        />
                        <div className="form-error">Please enter a valid email address.</div>
                      </div>
                      <button
                        className="btn btn-primary form-submit"
                        type="submit"
                        data-testid="submit-button"
                      >
                        {formState === "sending" ? "Sending..." : "Generate Website Audit"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="form-success active" id="auditSuccess" data-testid="form-success">
                    <SuccessCheck />
                    <h4>Audit Request Received</h4>
                    <p>We&apos;ll review your website and send a detailed audit to your inbox within 24 hours.</p>
                  </div>
                )}
              </div>

              <div className="audit-info reveal reveal-delay-1" data-testid="audit-info">
                <h3>What the audit covers</h3>
                <p>
                  The strongest audits point to revenue being lost — not just design being old. Here&apos;s what
                  we evaluate:
                </p>

                <div className="audit-checklist">
                  <div className="audit-item">
                    <div className="audit-icon" aria-hidden="true">
                      &#10003;
                    </div>
                    <div>
                      <strong>Mobile usability</strong>
                      <span>How well the site performs for the visitors most likely to bounce fast.</span>
                    </div>
                  </div>
                  <div className="audit-item">
                    <div className="audit-icon" aria-hidden="true">
                      &#10003;
                    </div>
                    <div>
                      <strong>Lead capture &amp; calls to action</strong>
                      <span>Whether the site gives people a clear path to call, book, or request a quote.</span>
                    </div>
                  </div>
                  <div className="audit-item">
                    <div className="audit-icon" aria-hidden="true">
                      &#10003;
                    </div>
                    <div>
                      <strong>Trust &amp; credibility signals</strong>
                      <span>
                        Reviews, proof, service clarity, and the structure that makes a business feel credible.
                      </span>
                    </div>
                  </div>
                  <div className="audit-item">
                    <div className="audit-icon" aria-hidden="true">
                      &#10003;
                    </div>
                    <div>
                      <strong>Overall design friction</strong>
                      <span>The weak points making people leave before they ever become customers.</span>
                    </div>
                  </div>
                </div>
              </div>
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

              <article className="about-card reveal reveal-delay-1" data-testid="about-card-2">
                <h3>What to customize next</h3>
                <p>
                  This version is a strong launch point. Replace placeholder form logic, demo links, and contact
                  information first. Then connect payments, proposals, and automated follow-up.
                </p>
                <div className="next-steps">
                  <div className="next-step">
                    <span className="step-num">1</span>
                    <span>Add your real email and contact details</span>
                  </div>
                  <div className="next-step">
                    <span className="step-num">2</span>
                    <span>Connect the audit form to your email/CRM workflow</span>
                  </div>
                  <div className="next-step">
                    <span className="step-num">3</span>
                    <span>Swap demo placeholders for live project links</span>
                  </div>
                  <div className="next-step">
                    <span className="step-num">4</span>
                    <span>Add Stripe payment or proposal flow when ready</span>
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
                <a
                  href="#audit"
                  className="btn-cta-primary"
                  onClick={(e) => handleAnchorClick(e, "#audit")}
                  data-testid="cta-audit-button"
                >
                  Request Website Audit
                </a>
                <a href="mailto:hello@liminalgroupllc.com" className="btn-cta-secondary" data-testid="cta-email">
                  hello@liminalgroupllc.com
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
              <a href="#audit" onClick={(e) => handleAnchorClick(e, "#audit")}>
                Audit
              </a>
              <a href="#about" onClick={(e) => handleAnchorClick(e, "#about")}>
                About
              </a>
              <a href="mailto:hello@liminalgroupllc.com">Contact</a>
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
