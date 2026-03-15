"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function LandscapingDemo() {
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
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:system-ui,sans-serif;overflow-x:hidden;background:#111}

        /* Toggle Bar */
        .toggle-bar{position:fixed;top:0;left:0;right:0;z-index:9999;background:#1a1a1a;border-bottom:1px solid rgba(255,255,255,0.08);padding:0 24px;height:56px;display:flex;align-items:center;justify-content:center;gap:20px}
        .toggle-brand{position:absolute;left:24px;font-size:0.72rem;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.4);font-weight:600;text-decoration:none}
        .toggle-brand:hover{color:rgba(255,255,255,0.6)}
        .toggle-label{font-size:0.82rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;transition:color 0.3s;cursor:pointer;user-select:none;color:rgba(255,255,255,0.35)}
        .toggle-label.active-label{color:#fff}
        .toggle-switch{width:56px;height:28px;border-radius:999px;background:#333;position:relative;cursor:pointer;transition:background 0.35s cubic-bezier(0.16,1,0.3,1);border:1px solid rgba(255,255,255,0.1);flex-shrink:0}
        .toggle-switch::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:999px;background:#fff;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);box-shadow:0 2px 6px rgba(0,0,0,0.3)}
        .toggle-switch.on{background:#4a7c3f}
        .toggle-switch.on::after{transform:translateX(28px)}
        .toggle-cta{position:absolute;right:24px;font-size:0.78rem;padding:7px 16px;border-radius:999px;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);text-decoration:none;transition:all 0.25s;font-weight:600}
        .toggle-cta:hover{border-color:#4a7c3f;color:#fff;background:rgba(74,124,63,0.15)}

        .view-before,.view-after{padding-top:56px;min-height:100vh}
        .view-before{display:block}
        .view-after{display:none}
        .view-before.hidden{display:none}
        .view-after.visible{display:block}

        /* ═══ BEFORE — "Green Thumb Landscaping" ═══ */
        .before-site{background:#f0f7e6;color:#2a3a1a;font-family:Verdana,sans-serif;line-height:1.5}
        .before-header{background:linear-gradient(180deg,#2d5a1e,#1a3a10);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-bottom:4px solid #4caf50}
        .before-logo-text{font-size:1.8rem;font-weight:700;color:#88cc44;text-shadow:1px 1px 0 #0a1a00}
        .before-logo-sub{font-size:0.75rem;color:#6a9a40}
        .before-phone{font-size:1.3rem;font-weight:700;color:#ffcc00;text-align:right}
        .before-phone-sub{font-size:0.72rem;color:#6a9a40}
        .before-nav{background:#1a3a10;display:flex;flex-wrap:wrap;justify-content:center;border-bottom:3px solid #4caf50}
        .before-nav a{color:#88cc44;text-decoration:none;padding:10px 14px;font-size:0.8rem;font-weight:700;text-transform:uppercase;border-right:1px solid rgba(255,255,255,0.08)}
        .before-nav a:hover{background:rgba(76,175,80,0.2)}
        .before-hero{height:300px;background:linear-gradient(180deg,rgba(26,58,16,0.4),rgba(26,58,16,0.8)),url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=70') center/cover;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;border-bottom:4px solid #4caf50}
        .before-hero h2{font-size:2.2rem;color:#fff;text-shadow:2px 2px 6px rgba(0,0,0,0.7);margin-bottom:8px}
        .before-hero p{color:#b0d890;font-size:0.95rem;max-width:480px;padding:0 20px;margin-bottom:14px}
        .before-hero-btn{background:#4caf50;color:#fff;padding:12px 24px;font-weight:700;text-transform:uppercase;border-radius:4px;text-decoration:none;font-size:0.88rem}
        .before-content{max-width:860px;margin:0 auto;padding:30px 20px}
        .before-content h3{color:#2d5a1e;font-size:1.3rem;margin:20px 0 10px;border-bottom:2px dashed #a0cc80;padding-bottom:6px}
        .before-content p{font-size:0.88rem;color:#3a5a28;margin-bottom:12px}
        .before-services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px}
        .before-svc{background:#fff;border:2px solid #a0cc80;border-radius:6px;padding:16px;text-align:center}
        .before-svc .icon{font-size:2rem;margin-bottom:6px}
        .before-svc h4{font-size:0.95rem;color:#2d5a1e;margin-bottom:4px}
        .before-svc p{font-size:0.78rem;color:#5a7a48}
        .before-seasonal{background:#ffee88;border:3px dashed #cc9900;border-radius:8px;padding:20px;text-align:center;margin:24px 0}
        .before-seasonal h4{font-size:1.3rem;color:#cc6600;margin-bottom:4px}
        .before-seasonal p{font-size:0.85rem;color:#664400}
        .before-footer{background:#1a3a10;text-align:center;padding:20px 16px;font-size:0.78rem;color:#4a6a38;border-top:4px solid #4caf50}
        .before-footer a{color:#88cc44}

        /* ═══ AFTER — "Green Thumb" Liminal Redesign ═══ */
        .after-site{background:#faf9f6;color:#1e2118;font-family:'Outfit',system-ui,sans-serif;line-height:1.65}
        .after-header{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:72px;background:rgba(250,249,246,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #e4e2d8;position:sticky;top:56px;z-index:50}
        .after-logo{font-size:1.3rem;font-weight:700;color:#1e2118;letter-spacing:-0.01em;text-decoration:none}
        .after-logo span{color:#4a7c3f}
        .after-nav a{font-size:0.88rem;color:#6a6e60;text-decoration:none;font-weight:600;margin-left:32px;transition:color 0.2s}
        .after-nav a:hover{color:#1e2118}
        .after-cta-btn{padding:10px 24px;background:#4a7c3f;color:#fff;border-radius:999px;font-weight:700;font-size:0.85rem;text-decoration:none;transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
        .after-cta-btn:hover{background:#3a6430;transform:translateY(-1px);box-shadow:0 6px 20px rgba(74,124,63,0.2)}

        .after-hero{height:88vh;min-height:560px;max-height:820px;position:relative;display:flex;align-items:flex-end;overflow:hidden;background:linear-gradient(180deg,rgba(30,33,24,0.05),rgba(30,33,24,0.72)),url('https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80') center/cover}
        .after-hero::before{content:"";position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
        .after-hero-content{position:relative;z-index:2;padding:0 48px 64px;max-width:660px}
        .after-hero-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#7aaa60;margin-bottom:16px}
        .after-hero h1{font-family:'Lora',serif;font-size:clamp(2.8rem,5.5vw,4.2rem);line-height:1.05;font-weight:600;color:#fff;margin-bottom:18px}
        .after-hero h1 em{font-style:italic;color:rgba(255,255,255,0.7)}
        .after-hero-desc{font-size:1.1rem;color:rgba(255,255,255,0.65);max-width:480px;margin-bottom:28px}
        .after-hero-actions{display:flex;gap:12px;flex-wrap:wrap}
        .after-btn-p{padding:16px 32px;background:#4a7c3f;color:#fff;border-radius:999px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
        .after-btn-p:hover{background:#3a6430;transform:translateY(-1px);box-shadow:0 8px 24px rgba(74,124,63,0.25)}
        .after-btn-o{padding:16px 32px;background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:999px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
        .after-btn-o:hover{border-color:rgba(255,255,255,0.6)}

        .after-services{padding:80px 48px;max-width:1140px;margin:0 auto}
        .after-sl{font-size:0.72rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#4a7c3f;margin-bottom:14px}
        .after-st{font-family:'Lora',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:600;line-height:1.15;color:#1e2118;margin-bottom:16px}
        .after-sd{font-size:1rem;color:#6a6e60;max-width:540px}
        .after-services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
        .after-svc{background:#fff;border:1px solid #e4e2d8;border-radius:16px;overflow:hidden;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
        .after-svc:hover{box-shadow:0 12px 40px rgba(0,0,0,0.06);transform:translateY(-2px)}
        .after-svc-img{width:100%;height:200px;object-fit:cover}
        .after-svc-body{padding:24px}
        .after-svc-body h3{font-size:1.1rem;font-weight:700;color:#1e2118;margin-bottom:8px}
        .after-svc-body p{font-size:0.9rem;color:#6a6e60;line-height:1.6}

        .after-gallery{overflow:hidden}
        .after-gallery-track{display:flex;gap:6px;animation:gscroll 32s linear infinite;width:max-content}
        .after-gallery-track:hover{animation-play-state:paused}
        .after-gallery-img{width:320px;height:240px;object-fit:cover;flex-shrink:0}
        @keyframes gscroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        .after-reviews{background:#f0ede4;padding:80px 48px}
        .after-reviews-inner{max-width:1140px;margin:0 auto}
        .after-reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
        .after-rc{background:#fff;border:1px solid #e4e2d8;border-radius:14px;padding:28px 24px}
        .after-rc-stars{color:#4a7c3f;font-size:0.9rem;letter-spacing:2px;margin-bottom:12px}
        .after-rc p{font-size:0.92rem;color:#3a3e30;line-height:1.65;margin-bottom:16px;font-style:italic}
        .after-rc-author{font-size:0.82rem;font-weight:700;color:#1e2118}
        .after-rc-source{font-size:0.72rem;color:#8a8e80}

        .after-cta-section{padding:80px 48px}
        .after-cta-box{max-width:1140px;margin:0 auto;background:#1e2118;border-radius:16px;padding:56px 48px;display:flex;justify-content:space-between;align-items:center;gap:40px}
        .after-cta-box h2{font-family:'Lora',serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:600;color:#fff;margin-bottom:8px}
        .after-cta-box p{font-size:0.95rem;color:rgba(255,255,255,0.5);max-width:440px}
        .after-cta-acts{display:flex;gap:12px;flex-shrink:0;flex-wrap:wrap}
        .after-btn-l{padding:16px 32px;background:#faf9f6;color:#1e2118;border-radius:999px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
        .after-btn-l:hover{background:#4a7c3f;color:#fff}

        .after-footer{border-top:1px solid #e4e2d8;padding:32px 48px;display:flex;justify-content:space-between;align-items:center;max-width:1236px;margin:0 auto;font-size:0.82rem;color:#8a8e80}
        .after-footer-brand{font-weight:800;color:#1e2118;font-size:0.88rem}
        .after-footer-links{display:flex;gap:24px}
        .after-footer-links a{color:#8a8e80;text-decoration:none}
        .after-footer-links a:hover{color:#1e2118}

        @media(max-width:860px){
          .after-header,.after-hero-content,.after-services,.after-reviews,.after-cta-section{padding-left:24px;padding-right:24px}
          .after-nav{display:none}
          .after-services-grid,.after-reviews-grid{grid-template-columns:1fr}
          .after-cta-box{flex-direction:column;text-align:center;padding:40px 28px}
          .after-cta-acts{justify-content:center}
          .after-footer{flex-direction:column;gap:12px;text-align:center;padding:24px}
          .after-footer-links{justify-content:center}
          .before-services-grid{grid-template-columns:1fr}
          .toggle-brand,.toggle-cta{display:none}
        }
        @media(max-width:480px){
          .after-hero h1{font-size:2.2rem}
          .after-hero-actions,.after-cta-acts{flex-direction:column}
          .after-btn-p,.after-btn-o,.after-btn-l{width:100%;text-align:center}
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
          <header className="before-header">
            <div>
              <div className="before-logo-text">&#127793; Green Thumb Landscaping</div>
              <div className="before-logo-sub">Beautiful Yards, Happy Customers!</div>
            </div>
            <div>
              <div className="before-phone">&#9742; (317) 555-0312</div>
              <div className="before-phone-sub">Free Estimates!</div>
            </div>
          </header>
          <nav className="before-nav">
            <a href="#">Home</a>
            <a href="#">Lawn Care</a>
            <a href="#">Landscaping</a>
            <a href="#">Hardscaping</a>
            <a href="#">Snow Removal</a>
            <a href="#">Irrigation</a>
            <a href="#">Gallery</a>
            <a href="#">Reviews</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <div className="before-hero">
            <h2>Your Dream Yard Starts Here!</h2>
            <p>Full-service landscaping for residential and commercial properties across Central Indiana.</p>
            <a href="#" className="before-hero-btn">&#127793; GET YOUR FREE ESTIMATE &#127793;</a>
          </div>
          <div className="before-content">
            <h3>Our Services</h3>
            <div className="before-services-grid">
              <div className="before-svc">
                <div className="icon">&#127793;</div>
                <h4>Lawn Maintenance</h4>
                <p>Weekly mowing, edging, trimming &amp; blowing</p>
              </div>
              <div className="before-svc">
                <div className="icon">&#127800;</div>
                <h4>Landscape Design</h4>
                <p>Custom gardens, flower beds &amp; plantings</p>
              </div>
              <div className="before-svc">
                <div className="icon">&#129704;</div>
                <h4>Hardscaping</h4>
                <p>Patios, retaining walls &amp; walkways</p>
              </div>
              <div className="before-svc">
                <div className="icon">&#127784;</div>
                <h4>Snow Removal</h4>
                <p>Commercial &amp; residential plowing</p>
              </div>
              <div className="before-svc">
                <div className="icon">&#128166;</div>
                <h4>Irrigation</h4>
                <p>Sprinkler install, repair &amp; winterization</p>
              </div>
              <div className="before-svc">
                <div className="icon">&#127795;</div>
                <h4>Tree Service</h4>
                <p>Trimming, removal &amp; stump grinding</p>
              </div>
            </div>
            <div className="before-seasonal">
              <h4>&#127774; SPRING SPECIAL! &#127774;</h4>
              <p>Book your spring cleanup by March 31st and get 15% OFF!<br />Call (317) 555-0312 to schedule. Limited availability!</p>
            </div>
            <h3>Why Choose Green Thumb?</h3>
            <p>
              Green Thumb Landscaping has been beautifying Indianapolis yards for over 15 years. We are fully licensed and insured with a team of experienced professionals who take pride in every project. We offer free estimates and competitive pricing. Our goal is to make your outdoor space the envy of the neighborhood! From simple lawn maintenance to complete landscape transformations, no project is too big or too small.
            </p>
            <h3>Customer Reviews</h3>
            <p>&#11088;&#11088;&#11088;&#11088;&#11088; &quot;Our yard has never looked better! The crew is always professional and on time.&quot; — Karen S.</p>
            <p>&#11088;&#11088;&#11088;&#11088;&#11088; &quot;Amazing patio work. Completely transformed our backyard.&quot; — Tom &amp; Lisa D.</p>
            <p>&#11088;&#11088;&#11088;&#11088;&#11088; &quot;Reliable snow removal all winter. Never had to worry.&quot; — Mark J.</p>
          </div>
          <footer className="before-footer">
            <p>&copy; 2024 Green Thumb Landscaping LLC | <a href="#">Site by EZ Web Builder</a></p>
          </footer>
        </div>
      </div>

      {/* After State */}
      <div className={`view-after ${isAfter ? "visible" : ""}`} data-testid="view-after">
        <div className="after-site">
          <header className="after-header">
            <a href="#" className="after-logo">Green Thumb <span>Landscaping</span></a>
            <nav className="after-nav">
              <a href="#">Services</a>
              <a href="#">Projects</a>
              <a href="#">About</a>
              <a href="#">Reviews</a>
            </nav>
            <a href="#" className="after-cta-btn">Free Estimate</a>
          </header>

          <section className="after-hero">
            <div className="after-hero-content">
              <div className="after-hero-eyebrow">Indianapolis &bull; 15+ Years</div>
              <h1>Landscapes That<br />Make You <em>Stay Outside</em></h1>
              <p className="after-hero-desc">From weekly lawn care to full outdoor transformations — we design, build, and maintain spaces people actually use.</p>
              <div className="after-hero-actions">
                <a href="#" className="after-btn-p">Get Your Free Estimate</a>
                <a href="tel:3175550312" className="after-btn-o">Call (317) 555-0312</a>
              </div>
            </div>
          </section>

          <section className="after-services">
            <div className="after-sl">Services</div>
            <h2 className="after-st">What We Do</h2>
            <p className="after-sd">Year-round care for properties that deserve more than just a mow-and-go.</p>
            <div className="after-services-grid">
              <article className="after-svc">
                <img className="after-svc-img" src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80" alt="Beautifully maintained lawn" loading="lazy" />
                <div className="after-svc-body">
                  <h3>Lawn Care &amp; Maintenance</h3>
                  <p>Weekly mowing, seasonal cleanups, fertilization, and weed control that keeps your yard dialed in year-round.</p>
                </div>
              </article>
              <article className="after-svc">
                <img className="after-svc-img" src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80" alt="Custom landscape garden design" loading="lazy" />
                <div className="after-svc-body">
                  <h3>Landscape Design &amp; Planting</h3>
                  <p>Custom gardens, native plantings, and seasonal color designed to match your property and your vision.</p>
                </div>
              </article>
              <article className="after-svc">
                <img className="after-svc-img" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Stone patio and outdoor living space" loading="lazy" />
                <div className="after-svc-body">
                  <h3>Hardscaping &amp; Outdoor Living</h3>
                  <p>Patios, retaining walls, fire pits, and walkways — built to last and designed to be used.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="after-gallery">
            <div className="after-gallery-track">
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=640&q=80" alt="Lush green lawn" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=640&q=80" alt="Garden bed with flowers" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&q=80" alt="Stone patio" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=640&q=80" alt="Garden pathway" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=640&q=80" alt="Backyard landscape" loading="lazy" />
              {/* Duplicate for seamless loop */}
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1558904541-efa843a96f01?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
            </div>
          </section>

          <section className="after-reviews">
            <div className="after-reviews-inner">
              <div className="after-sl">Reviews</div>
              <h2 className="after-st">What Homeowners Say</h2>
              <div className="after-reviews-grid">
                <div className="after-rc">
                  <div className="after-rc-stars">★★★★★</div>
                  <p>&quot;Our yard has never looked this good. The crew is consistent, professional, and actually cares about the details.&quot;</p>
                  <div className="after-rc-author">Karen S.</div>
                  <div className="after-rc-source">Carmel, IN — Google Review</div>
                </div>
                <div className="after-rc">
                  <div className="after-rc-stars">★★★★★</div>
                  <p>&quot;They designed and built our patio from scratch. Completely transformed our backyard into a space we actually use now.&quot;</p>
                  <div className="after-rc-author">Tom &amp; Lisa D.</div>
                  <div className="after-rc-source">Fishers, IN — Google Review</div>
                </div>
                <div className="after-rc">
                  <div className="after-rc-stars">★★★★★</div>
                  <p>&quot;Reliable snow removal all winter long. Never once had to worry about our parking lot. They just show up and handle it.&quot;</p>
                  <div className="after-rc-author">Mark J.</div>
                  <div className="after-rc-source">Indianapolis — Google Review</div>
                </div>
              </div>
            </div>
          </section>

          <section className="after-cta-section">
            <div className="after-cta-box">
              <div>
                <h2>Ready to love<br />your yard again?</h2>
                <p>Start with a free estimate. No pressure, no commitments — just a conversation about what&apos;s possible.</p>
              </div>
              <div className="after-cta-acts">
                <a href="#" className="after-btn-l">Get Free Estimate</a>
                <a href="tel:3175550312" className="after-btn-o" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>Call (317) 555-0312</a>
              </div>
            </div>
          </section>

          <footer className="after-footer">
            <span className="after-footer-brand">Green Thumb Landscaping</span>
            <nav className="after-footer-links">
              <a href="#">Services</a>
              <a href="#">Projects</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </nav>
            <span>&copy; 2026 Green Thumb Landscaping. Indianapolis, IN.</span>
          </footer>
        </div>
      </div>
    </>
  );
}
