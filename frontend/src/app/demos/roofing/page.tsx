"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function RoofingDemo() {
  const [isAfter, setIsAfter] = useState(false);

  const switchView = useCallback(() => {
    setIsAfter((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchView();
      }
    },
    [switchView]
  );

  return (
    <>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: system-ui, sans-serif; overflow-x: hidden; background: #111; }

        /* ── Toggle Bar ── */
        .toggle-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
          background: #1a1a1a; border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 0 24px; height: 56px;
          display: flex; align-items: center; justify-content: center; gap: 20px;
        }
        .toggle-brand { position: absolute; left: 24px; font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.4); font-weight: 600; text-decoration: none; }
        .toggle-brand:hover { color: rgba(255,255,255,0.6); }
        .toggle-label { font-size: 0.82rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; transition: color 0.3s; cursor: pointer; user-select: none; color: rgba(255,255,255,0.35); }
        .toggle-label.active-label { color: #fff; }
        .toggle-switch { width: 56px; height: 28px; border-radius: 999px; background: #333; position: relative; cursor: pointer; transition: background 0.35s cubic-bezier(0.16,1,0.3,1); border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
        .toggle-switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 999px; background: #fff; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
        .toggle-switch.on { background: #c45a2d; }
        .toggle-switch.on::after { transform: translateX(28px); }
        .toggle-cta { position: absolute; right: 24px; font-size: 0.78rem; padding: 7px 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); text-decoration: none; transition: all 0.25s; font-weight: 600; }
        .toggle-cta:hover { border-color: #c45a2d; color: #fff; background: rgba(196,90,45,0.15); }

        .view-before, .view-after { padding-top: 56px; min-height: 100vh; }
        .view-before { display: block; }
        .view-after { display: none; }
        .view-before.hidden { display: none; }
        .view-after.visible { display: block; }

        /* ═══════════════════════════════════════════
           BEFORE — "Apex Roofing Solutions"
        ═══════════════════════════════════════════ */
        .before-site { background: #0a1628; color: #c8d0dc; font-family: Arial, sans-serif; line-height: 1.5; }

        .before-topbar { background: #cc2200; color: #fff; text-align: center; padding: 10px 16px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.04em; }
        .before-topbar span { animation: blink-slow 1.5s ease-in-out infinite; }
        @keyframes blink-slow { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

        .before-header { background: linear-gradient(180deg, #0d1f3c, #0a1628); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #cc2200; flex-wrap: wrap; gap: 12px; }
        .before-logo-text { font-family: 'Bangers', cursive; font-size: 2.2rem; color: #fff; text-shadow: 2px 2px 0 #cc2200; }
        .before-logo-sub { font-size: 0.8rem; color: #7a8da8; font-style: italic; }
        .before-contact-strip { text-align: right; }
        .before-contact-strip .phone { font-family: 'Permanent Marker', cursive; font-size: 1.4rem; color: #ffcc00; }
        .before-contact-strip .small { font-size: 0.75rem; color: #7a8da8; }

        .before-nav { background: #0d1f3c; display: flex; flex-wrap: wrap; justify-content: center; border-bottom: 2px solid rgba(204,34,0,0.3); }
        .before-nav a { color: #ffcc00; text-decoration: none; padding: 12px 16px; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-right: 1px solid rgba(255,255,255,0.06); }
        .before-nav a:hover { background: rgba(204,34,0,0.2); }

        .before-hero { height: 340px; background: linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.85) 100%), url('https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1200&q=70') center/cover; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; border-bottom: 3px solid #cc2200; }
        .before-hero h2 { font-family: 'Bangers', cursive; font-size: 2.8rem; color: #fff; text-shadow: 3px 3px 6px rgba(0,0,0,0.8); margin-bottom: 8px; }
        .before-hero p { color: #a0b0c8; font-size: 1rem; max-width: 500px; padding: 0 20px; margin-bottom: 16px; }
        .before-hero-btn { background: #cc2200; color: #fff; padding: 12px 24px; font-weight: 700; text-transform: uppercase; border-radius: 4px; text-decoration: none; font-size: 0.9rem; animation: blink-slow 2s ease-in-out infinite; }

        .before-content { max-width: 900px; margin: 0 auto; padding: 30px 20px; }
        .before-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
        .before-service-box { background: #0d1f3c; border: 2px solid #1a3158; border-radius: 6px; padding: 20px; text-align: center; }
        .before-service-box .icon { font-size: 2.4rem; margin-bottom: 8px; }
        .before-service-box h4 { font-family: 'Bangers', cursive; color: #ffcc00; font-size: 1.1rem; margin-bottom: 6px; }
        .before-service-box p { font-size: 0.82rem; color: #7a8da8; }
        .before-content h3 { font-family: 'Bangers', cursive; color: #ffcc00; font-size: 1.5rem; margin-bottom: 10px; border-bottom: 2px solid #1a3158; padding-bottom: 6px; }
        .before-content p { font-size: 0.9rem; color: #8a9ab0; margin-bottom: 14px; }

        .before-badges { display: flex; gap: 16px; justify-content: center; margin: 24px 0; flex-wrap: wrap; }
        .before-badge { background: #0d1f3c; border: 2px solid #1a3158; border-radius: 8px; padding: 16px 20px; text-align: center; min-width: 120px; }
        .before-badge .big { font-family: 'Permanent Marker', cursive; font-size: 1.6rem; color: #ffcc00; display: block; }
        .before-badge .label { font-size: 0.72rem; color: #7a8da8; text-transform: uppercase; letter-spacing: 0.06em; }

        .before-reviews { margin-top: 24px; }
        .before-review { background: #0d1f3c; border-left: 3px solid #cc2200; padding: 14px 16px; margin-bottom: 12px; border-radius: 0 6px 6px 0; }
        .before-review p { font-style: italic; font-size: 0.88rem; color: #a0b0c8; margin-bottom: 4px; }
        .before-review .author { font-size: 0.78rem; color: #ffcc00; font-weight: 700; }
        .before-stars { color: #ffcc00; letter-spacing: 2px; }

        .before-footer { background: #060e1c; border-top: 3px solid #cc2200; text-align: center; padding: 24px 16px; font-size: 0.8rem; color: #4a5a70; }
        .before-footer a { color: #cc2200; }

        /* ═══════════════════════════════════════════
           AFTER — "Apex Roofing" Liminal Redesign
        ═══════════════════════════════════════════ */
        .after-site { background: #f8f7f4; color: #1c1c1c; font-family: 'Archivo', system-ui, sans-serif; line-height: 1.65; }

        .after-topbar { background: #1c1c1c; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between; align-items: center; padding: 0 48px; height: 40px; font-size: 0.78rem; font-weight: 500; }
        .after-topbar a { color: #fff; text-decoration: none; font-weight: 700; }
        .after-topbar .emergency { color: #e8633a; font-weight: 700; }

        .after-header { display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 72px; background: rgba(248,247,244,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #e4e0d8; position: sticky; top: 56px; z-index: 50; }
        .after-logo { font-size: 1.3rem; font-weight: 800; color: #1c1c1c; letter-spacing: -0.02em; text-transform: uppercase; text-decoration: none; }
        .after-logo span { color: #c45a2d; }
        .after-nav a { font-size: 0.88rem; color: #5a5550; text-decoration: none; font-weight: 600; margin-left: 32px; transition: color 0.2s; }
        .after-nav a:hover { color: #1c1c1c; }
        .after-cta-btn { padding: 10px 24px; background: #c45a2d; color: #fff; border-radius: 8px; font-weight: 700; font-size: 0.85rem; text-decoration: none; transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .after-cta-btn:hover { background: #a84820; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(196,90,45,0.2); }

        .after-hero { height: 85vh; min-height: 560px; max-height: 800px; position: relative; display: flex; align-items: flex-end; overflow: hidden; background: linear-gradient(180deg, rgba(28,28,28,0.1) 0%, rgba(28,28,28,0.75) 100%), url('https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1600&q=80') center/cover; }
        .after-hero::before { content: ""; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events: none; z-index: 1; }
        .after-hero-content { position: relative; z-index: 2; padding: 0 48px 64px; max-width: 680px; }
        .after-hero-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: #e8633a; margin-bottom: 16px; }
        .after-hero h1 { font-family: 'Libre Baskerville', serif; font-size: clamp(2.8rem, 5.5vw, 4.2rem); line-height: 1.05; font-weight: 700; color: #fff; margin-bottom: 18px; }
        .after-hero-desc { font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 480px; margin-bottom: 28px; }
        .after-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .after-btn-primary { padding: 16px 32px; background: #c45a2d; color: #fff; border-radius: 8px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .after-btn-primary:hover { background: #a84820; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(196,90,45,0.25); }
        .after-btn-outline { padding: 16px 32px; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
        .after-btn-outline:hover { border-color: rgba(255,255,255,0.6); }

        /* Trust bar */
        .after-trust { background: #1c1c1c; padding: 24px 48px; display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
        .after-trust-item { text-align: center; color: #fff; }
        .after-trust-item .num { font-family: 'Libre Baskerville', serif; font-size: 1.8rem; font-weight: 700; display: block; }
        .after-trust-item .desc { font-size: 0.78rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }

        /* Services */
        .after-services { padding: 80px 48px; max-width: 1140px; margin: 0 auto; }
        .after-section-label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #c45a2d; margin-bottom: 14px; }
        .after-section-title { font-family: 'Libre Baskerville', serif; font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 700; line-height: 1.15; color: #1c1c1c; margin-bottom: 16px; }
        .after-section-desc { font-size: 1rem; color: #6a6560; max-width: 560px; }
        .after-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
        .after-service-card { background: #fff; border: 1px solid #e4e0d8; border-radius: 14px; overflow: hidden; transition: all 0.3s cubic-bezier(0.16,1,0.3,1); }
        .after-service-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .after-service-img { width: 100%; height: 180px; object-fit: cover; }
        .after-service-body { padding: 24px; }
        .after-service-body h3 { font-size: 1.1rem; font-weight: 700; color: #1c1c1c; margin-bottom: 8px; }
        .after-service-body p { font-size: 0.9rem; color: #6a6560; line-height: 1.6; }

        /* Reviews */
        .after-reviews { background: #f0ede6; padding: 80px 48px; }
        .after-reviews-inner { max-width: 1140px; margin: 0 auto; }
        .after-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
        .after-review-card { background: #fff; border: 1px solid #e4e0d8; border-radius: 14px; padding: 28px 24px; }
        .after-review-stars { color: #c45a2d; font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 12px; }
        .after-review-card p { font-size: 0.92rem; color: #4a4540; line-height: 1.65; margin-bottom: 16px; font-style: italic; }
        .after-review-author { font-size: 0.82rem; font-weight: 700; color: #1c1c1c; }
        .after-review-source { font-size: 0.72rem; color: #9a9590; }

        /* Gallery */
        .after-gallery { overflow: hidden; }
        .after-gallery-track { display: flex; gap: 6px; animation: gscroll 28s linear infinite; width: max-content; }
        .after-gallery-track:hover { animation-play-state: paused; }
        .after-gallery-img { width: 300px; height: 220px; object-fit: cover; flex-shrink: 0; }
        @keyframes gscroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* CTA */
        .after-cta-section { padding: 80px 48px; }
        .after-cta-box { max-width: 1140px; margin: 0 auto; background: #1c1c1c; border-radius: 16px; padding: 56px 48px; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
        .after-cta-box h2 { font-family: 'Libre Baskerville', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: #fff; margin-bottom: 8px; }
        .after-cta-box p { font-size: 0.95rem; color: rgba(255,255,255,0.5); max-width: 440px; }
        .after-cta-actions { display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap; }
        .after-btn-light { padding: 16px 32px; background: #f8f7f4; color: #1c1c1c; border-radius: 8px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
        .after-btn-light:hover { background: #c45a2d; color: #fff; }

        /* Footer */
        .after-footer { border-top: 1px solid #e4e0d8; padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; max-width: 1236px; margin: 0 auto; font-size: 0.82rem; color: #9a9590; }
        .after-footer-brand { font-weight: 800; color: #1c1c1c; text-transform: uppercase; font-size: 0.88rem; }
        .after-footer-links { display: flex; gap: 24px; }
        .after-footer-links a { color: #9a9590; text-decoration: none; }
        .after-footer-links a:hover { color: #1c1c1c; }

        /* Responsive */
        @media (max-width: 860px) {
          .after-header, .after-topbar, .after-hero-content, .after-services, .after-reviews, .after-cta-section { padding-left: 24px; padding-right: 24px; }
          .after-nav { display: none; }
          .after-services-grid, .after-reviews-grid { grid-template-columns: 1fr; }
          .after-trust { gap: 24px; padding: 20px 24px; }
          .after-cta-box { flex-direction: column; text-align: center; padding: 40px 28px; }
          .after-cta-actions { justify-content: center; }
          .after-footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px; }
          .after-footer-links { justify-content: center; }
          .before-services-grid { grid-template-columns: 1fr; }
          .toggle-brand, .toggle-cta { display: none; }
        }
        @media (max-width: 480px) {
          .after-hero h1 { font-size: 2.2rem; }
          .after-hero-actions { flex-direction: column; }
          .after-btn-primary, .after-btn-outline, .after-btn-light { width: 100%; text-align: center; }
          .before-logo-text { font-size: 1.6rem; }
          .before-hero h2 { font-size: 2rem; }
        }
      `}</style>

      {/* Toggle Bar */}
      <div className="toggle-bar" data-testid="toggle-bar">
        <Link href="/" className="toggle-brand">
          Liminal Group
        </Link>
        <span
          className={`toggle-label ${!isAfter ? "active-label" : ""}`}
          onClick={() => isAfter && switchView()}
          data-testid="label-before"
        >
          Before
        </span>
        <div
          className={`toggle-switch ${isAfter ? "on" : ""}`}
          role="switch"
          aria-checked={isAfter}
          tabIndex={0}
          aria-label="Toggle between before and after website views"
          onClick={switchView}
          onKeyDown={handleKeyDown}
          data-testid="toggle-switch"
        />
        <span
          className={`toggle-label ${isAfter ? "active-label" : ""}`}
          onClick={() => !isAfter && switchView()}
          data-testid="label-after"
        >
          After
        </span>
        <Link href="/#audit" className="toggle-cta" data-testid="toggle-cta">
          Get Your Free Audit &rarr;
        </Link>
      </div>

      {/* Before State */}
      <div className={`view-before ${isAfter ? "hidden" : ""}`} data-testid="view-before">
        <div className="before-site">
          <div className="before-topbar">
            <span>&#9888; STORM DAMAGE? CALL NOW FOR EMERGENCY REPAIRS! (317) 555-0199 &#9888;</span>
          </div>
          <header className="before-header">
            <div>
              <div className="before-logo-text">APEX ROOFING SOLUTIONS</div>
              <div className="before-logo-sub">Your Trusted Local Roofer Since 2005</div>
            </div>
            <div className="before-contact-strip">
              <div className="phone">&#9742; (317) 555-0199</div>
              <div className="small">Licensed &amp; Insured | Free Estimates</div>
            </div>
          </header>
          <nav className="before-nav">
            <a href="#">Home</a>
            <a href="#">Residential</a>
            <a href="#">Commercial</a>
            <a href="#">Storm Damage</a>
            <a href="#">Gutters</a>
            <a href="#">Siding</a>
            <a href="#">Gallery</a>
            <a href="#">Reviews</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Financing</a>
          </nav>
          <div className="before-hero">
            <h2>Indianapolis&apos; #1 Roofing Company!</h2>
            <p>We handle all your roofing needs from repairs to full replacements. Serving Central Indiana for over 18 years!</p>
            <a href="#" className="before-hero-btn">&#9733; GET YOUR FREE ESTIMATE TODAY &#9733;</a>
          </div>
          <div className="before-content">
            <h3>Our Roofing Services</h3>
            <div className="before-services-grid">
              <div className="before-service-box">
                <div className="icon">&#127968;</div>
                <h4>Residential Roofing</h4>
                <p>Complete roof replacement and repairs for homeowners</p>
              </div>
              <div className="before-service-box">
                <div className="icon">&#127959;</div>
                <h4>Commercial Roofing</h4>
                <p>Flat roofs, TPO, EPDM and metal roof systems</p>
              </div>
              <div className="before-service-box">
                <div className="icon">&#9888;</div>
                <h4>Storm Damage</h4>
                <p>Emergency repairs and insurance claim assistance</p>
              </div>
              <div className="before-service-box">
                <div className="icon">&#127746;</div>
                <h4>Gutter Systems</h4>
                <p>Seamless gutters, guards, and drainage solutions</p>
              </div>
              <div className="before-service-box">
                <div className="icon">&#128736;</div>
                <h4>Roof Inspections</h4>
                <p>Free inspections and detailed condition reports</p>
              </div>
              <div className="before-service-box">
                <div className="icon">&#128176;</div>
                <h4>Financing</h4>
                <p>Affordable monthly payment plans available!</p>
              </div>
            </div>
            <h3 style={{ marginTop: "30px" }}>Why Choose Apex?</h3>
            <p>
              Apex Roofing Solutions has been serving the Indianapolis area for over 18 years. We are fully licensed, bonded, and insured. Our team of experienced professionals provides top-quality workmanship on every project. We offer free estimates and competitive pricing on all services. Customer satisfaction is our #1 priority! Call us today at (317) 555-0199 to schedule your free roof inspection!
            </p>
            <div className="before-badges">
              <div className="before-badge">
                <span className="big">18+</span>
                <span className="label">Years in Business</span>
              </div>
              <div className="before-badge">
                <span className="big">5,000+</span>
                <span className="label">Roofs Completed</span>
              </div>
              <div className="before-badge">
                <span className="big">4.9★</span>
                <span className="label">Google Rating</span>
              </div>
              <div className="before-badge">
                <span className="big">A+</span>
                <span className="label">BBB Rating</span>
              </div>
            </div>
            <h3>What Our Customers Say</h3>
            <div className="before-reviews">
              <div className="before-review">
                <div className="before-stars">★★★★★</div>
                <p>&quot;Great job on our roof!! Very professional crew. Cleaned everything up. Highly recommend!!!&quot;</p>
                <span className="author">— Mike T., Fishers</span>
              </div>
              <div className="before-review">
                <div className="before-stars">★★★★★</div>
                <p>&quot;They helped us with our insurance claim after the hail storm. Made the whole process easy.&quot;</p>
                <span className="author">— Sarah K., Carmel</span>
              </div>
              <div className="before-review">
                <div className="before-stars">★★★★★</div>
                <p>&quot;Fast, affordable, and quality work. Will use again for our gutters.&quot;</p>
                <span className="author">— James R., Greenwood</span>
              </div>
            </div>
            <p style={{ marginTop: "24px", fontSize: "0.82rem", color: "#4a5a70", textAlign: "center", fontStyle: "italic" }}>
              * Financing available with approved credit. License #RC123456. Call for details.
            </p>
          </div>
          <footer className="before-footer">
            <p>Apex Roofing Solutions | 4567 Industrial Blvd, Indianapolis, IN 46220</p>
            <p style={{ marginTop: "8px" }}>&copy; 2024 Apex Roofing Solutions. All Rights Reserved. | <a href="#">Website by Dave&apos;s Digital</a></p>
          </footer>
        </div>
      </div>

      {/* After State */}
      <div className={`view-after ${isAfter ? "visible" : ""}`} data-testid="view-after">
        <div className="after-site">
          <div className="after-topbar">
            <span><span className="emergency">Storm damage?</span> Call for same-day emergency service.</span>
            <a href="tel:3175550199">(317) 555-0199</a>
          </div>
          <header className="after-header">
            <a href="#" className="after-logo">Apex <span>Roofing</span></a>
            <nav className="after-nav">
              <a href="#">Services</a>
              <a href="#">About</a>
              <a href="#">Reviews</a>
              <a href="#">Gallery</a>
            </nav>
            <a href="#" className="after-cta-btn">Get Free Estimate</a>
          </header>

          <section className="after-hero">
            <div className="after-hero-content">
              <div className="after-hero-eyebrow">Indianapolis &bull; Licensed &amp; Insured</div>
              <h1>Roofing Done Right.<br />Every Time.</h1>
              <p className="after-hero-desc">18 years protecting Indianapolis homes. From storm damage repair to full replacements — fast response, honest pricing, and work we stand behind.</p>
              <div className="after-hero-actions">
                <a href="#" className="after-btn-primary">Get Your Free Estimate</a>
                <a href="tel:3175550199" className="after-btn-outline">Call (317) 555-0199</a>
              </div>
            </div>
          </section>

          <div className="after-trust">
            <div className="after-trust-item"><span className="num">18+</span><span className="desc">Years Experience</span></div>
            <div className="after-trust-item"><span className="num">5,000+</span><span className="desc">Roofs Completed</span></div>
            <div className="after-trust-item"><span className="num">4.9</span><span className="desc">Google Rating</span></div>
            <div className="after-trust-item"><span className="num">A+</span><span className="desc">BBB Accredited</span></div>
            <div className="after-trust-item"><span className="num">Same-Day</span><span className="desc">Emergency Service</span></div>
          </div>

          <section className="after-services">
            <div className="after-section-label">Services</div>
            <h2 className="after-section-title">What We Do</h2>
            <p className="after-section-desc">Every project gets the same attention — thorough inspection, clear pricing, quality materials, and a crew that cleans up when the job is done.</p>
            <div className="after-services-grid">
              <article className="after-service-card">
                <img className="after-service-img" src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" alt="Residential roof with new shingles" loading="lazy" />
                <div className="after-service-body">
                  <h3>Residential Roofing</h3>
                  <p>Full replacements and repairs with manufacturer-backed warranties and honest estimates.</p>
                </div>
              </article>
              <article className="after-service-card">
                <img className="after-service-img" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="Commercial building roof" loading="lazy" />
                <div className="after-service-body">
                  <h3>Commercial Roofing</h3>
                  <p>Flat roofs, TPO, EPDM, and metal systems for warehouses, offices, and retail.</p>
                </div>
              </article>
              <article className="after-service-card">
                <img className="after-service-img" src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80" alt="Storm damaged roof being repaired" loading="lazy" />
                <div className="after-service-body">
                  <h3>Storm Damage &amp; Insurance</h3>
                  <p>Same-day emergency response. We handle the insurance paperwork so you don&apos;t have to.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="after-reviews">
            <div className="after-reviews-inner">
              <div className="after-section-label">Reviews</div>
              <h2 className="after-section-title">What Homeowners Say</h2>
              <div className="after-reviews-grid">
                <div className="after-review-card">
                  <div className="after-review-stars">★★★★★</div>
                  <p>&quot;Professional crew, fair pricing, and they left the yard cleaner than they found it. Our new roof looks incredible.&quot;</p>
                  <div className="after-review-author">Mike T.</div>
                  <div className="after-review-source">Fishers, IN — Google Review</div>
                </div>
                <div className="after-review-card">
                  <div className="after-review-stars">★★★★★</div>
                  <p>&quot;They walked us through the entire insurance claim after the hail storm. Made a stressful situation feel manageable.&quot;</p>
                  <div className="after-review-author">Sarah K.</div>
                  <div className="after-review-source">Carmel, IN — Google Review</div>
                </div>
                <div className="after-review-card">
                  <div className="after-review-stars">★★★★★</div>
                  <p>&quot;Fast response, showed up when they said they would, and the price came in under the estimate. That never happens.&quot;</p>
                  <div className="after-review-author">James R.</div>
                  <div className="after-review-source">Greenwood, IN — Google Review</div>
                </div>
              </div>
            </div>
          </section>

          <section className="after-gallery">
            <div className="after-gallery-track">
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=640&q=80" alt="Completed roof project" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=640&q=80" alt="New residential shingles" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&q=80" alt="Construction work" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=640&q=80" alt="Roof repair in progress" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=640&q=80" alt="Beautiful home exterior" loading="lazy" />
              {/* Duplicate for seamless loop */}
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
            </div>
          </section>

          <section className="after-cta-section">
            <div className="after-cta-box">
              <div>
                <h2>Protect your home.<br />Start with a free estimate.</h2>
                <p>No pressure, no surprises. Just an honest assessment and a clear quote you can count on.</p>
              </div>
              <div className="after-cta-actions">
                <a href="#" className="after-btn-light">Get Free Estimate</a>
                <a href="tel:3175550199" className="after-btn-outline" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>Call (317) 555-0199</a>
              </div>
            </div>
          </section>

          <footer className="after-footer">
            <span className="after-footer-brand">Apex Roofing</span>
            <nav className="after-footer-links">
              <a href="#">Services</a>
              <a href="#">About</a>
              <a href="#">Reviews</a>
              <a href="#">Contact</a>
            </nav>
            <span>&copy; 2026 Apex Roofing. Indianapolis, IN.</span>
          </footer>
        </div>
      </div>
    </>
  );
}
