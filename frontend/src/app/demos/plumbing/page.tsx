"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

export default function PlumbingDemo() {
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
        .toggle-switch.on{background:#2a7de1}
        .toggle-switch.on::after{transform:translateX(28px)}
        .toggle-cta{position:absolute;right:24px;font-size:0.78rem;padding:7px 16px;border-radius:999px;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.6);text-decoration:none;transition:all 0.25s;font-weight:600}
        .toggle-cta:hover{border-color:#2a7de1;color:#fff;background:rgba(42,125,225,0.15)}
        
        .view-before,.view-after{padding-top:56px;min-height:100vh}
        .view-before{display:block}
        .view-after{display:none}
        .view-before.hidden{display:none}
        .view-after.visible{display:block}

        /* ═══ BEFORE — "Reliable Plumbing & Drain" ═══ */
        .before-site{background:#e8f4f8;color:#1a3344;font-family:'Comic Neue',cursive,sans-serif;line-height:1.5}
        .before-topbar{background:#006699;color:#fff;text-align:center;padding:8px 16px;font-size:0.82rem;font-weight:700}
        .before-header{background:linear-gradient(180deg,#004d73,#003852);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-bottom:4px solid #00aaff}
        .before-logo{display:flex;align-items:center;gap:12px}
        .before-logo .icon{font-size:2.4rem}
        .before-logo-text{font-size:1.6rem;font-weight:700;color:#fff;text-shadow:1px 1px 0 #003852}
        .before-logo-sub{font-size:0.75rem;color:#66bbdd}
        .before-phone{font-size:1.5rem;font-weight:700;color:#00aaff;text-align:right}
        .before-phone-sub{font-size:0.72rem;color:#88ccdd}
        .before-nav{background:#005580;display:flex;flex-wrap:wrap;justify-content:center;border-bottom:3px solid #00aaff}
        .before-nav a{color:#99ddff;text-decoration:none;padding:10px 14px;font-size:0.82rem;font-weight:700;text-transform:uppercase;border-right:1px solid rgba(255,255,255,0.1)}
        .before-nav a:hover{background:rgba(0,170,255,0.15)}
        .before-hero{height:300px;background:linear-gradient(180deg,rgba(0,77,115,0.5),rgba(0,56,82,0.85)),url('https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&q=70') center/cover;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;border-bottom:4px solid #00aaff}
        .before-hero h2{font-size:2.2rem;color:#fff;text-shadow:2px 2px 6px rgba(0,0,0,0.7);margin-bottom:8px}
        .before-hero p{color:#aaddee;font-size:0.95rem;max-width:480px;padding:0 20px;margin-bottom:14px}
        .before-hero-btn{background:#00aaff;color:#fff;padding:12px 24px;font-weight:700;text-transform:uppercase;border-radius:4px;text-decoration:none;font-size:0.88rem}
        .before-content{max-width:860px;margin:0 auto;padding:30px 20px}
        .before-content h3{color:#006699;font-size:1.3rem;margin:20px 0 10px;border-bottom:2px dashed #aaddee;padding-bottom:6px}
        .before-content p{font-size:0.9rem;color:#2a4a5a;margin-bottom:12px}
        .before-service-list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:12px}
        .before-service-item{background:#fff;border:2px solid #aaddee;border-radius:6px;padding:14px;display:flex;align-items:center;gap:10px}
        .before-service-item .icon{font-size:1.6rem;flex-shrink:0}
        .before-service-item span{font-size:0.88rem;font-weight:700;color:#004d73}
        .before-coupon{background:#ffee00;border:3px dashed #cc9900;border-radius:8px;padding:20px;text-align:center;margin:24px 0}
        .before-coupon h4{font-size:1.4rem;color:#cc3300;margin-bottom:4px}
        .before-coupon p{font-size:0.85rem;color:#664400}
        .before-footer{background:#003852;text-align:center;padding:20px 16px;font-size:0.78rem;color:#4488aa;border-top:4px solid #00aaff}
        .before-footer a{color:#00aaff}

        /* ═══ AFTER — "Reliable Plumbing" Liminal Redesign ═══ */
        .after-site{background:#f6f8fa;color:#1a1e24;font-family:'Plus Jakarta Sans',system-ui,sans-serif;line-height:1.65}
        .after-topbar{background:#1a1e24;color:rgba(255,255,255,0.65);display:flex;justify-content:space-between;align-items:center;padding:0 48px;height:40px;font-size:0.78rem;font-weight:500}
        .after-topbar a{color:#fff;text-decoration:none;font-weight:700}
        .after-topbar .urg{color:#3b9eff;font-weight:700}
        .after-header{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:72px;background:rgba(246,248,250,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #e2e6ec;position:sticky;top:56px;z-index:50}
        .after-logo{font-size:1.3rem;font-weight:800;color:#1a1e24;letter-spacing:-0.01em;text-decoration:none}
        .after-logo span{color:#2a7de1}
        .after-nav a{font-size:0.88rem;color:#5a6170;text-decoration:none;font-weight:600;margin-left:32px;transition:color 0.2s}
        .after-nav a:hover{color:#1a1e24}
        .after-cta-btn{padding:10px 24px;background:#2a7de1;color:#fff;border-radius:999px;font-weight:700;font-size:0.85rem;text-decoration:none;transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
        .after-cta-btn:hover{background:#1a65c0;transform:translateY(-1px);box-shadow:0 6px 20px rgba(42,125,225,0.2)}

        .after-hero{height:85vh;min-height:540px;max-height:780px;position:relative;display:flex;align-items:flex-end;overflow:hidden;background:linear-gradient(180deg,rgba(26,30,36,0.1),rgba(26,30,36,0.78)),url('https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80') center/cover}
        .after-hero::before{content:"";position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
        .after-hero-content{position:relative;z-index:2;padding:0 48px 60px;max-width:660px}
        .after-hero-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#5baaff;margin-bottom:16px}
        .after-hero h1{font-family:'Fraunces',serif;font-size:clamp(2.6rem,5.5vw,4rem);line-height:1.05;font-weight:700;color:#fff;margin-bottom:18px}
        .after-hero-desc{font-size:1.1rem;color:rgba(255,255,255,0.65);max-width:460px;margin-bottom:28px}
        .after-hero-actions{display:flex;gap:12px;flex-wrap:wrap}
        .after-btn-p{padding:16px 32px;background:#2a7de1;color:#fff;border-radius:999px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
        .after-btn-p:hover{background:#1a65c0;transform:translateY(-1px);box-shadow:0 8px 24px rgba(42,125,225,0.25)}
        .after-btn-o{padding:16px 32px;background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:999px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
        .after-btn-o:hover{border-color:rgba(255,255,255,0.6)}

        .after-trust{background:#1a1e24;padding:24px 48px;display:flex;justify-content:center;gap:48px;flex-wrap:wrap}
        .after-trust-item{text-align:center;color:#fff}
        .after-trust-item .num{font-family:'Fraunces',serif;font-size:1.8rem;font-weight:700;display:block}
        .after-trust-item .desc{font-size:0.78rem;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;font-weight:600}

        .after-services{padding:80px 48px;max-width:1140px;margin:0 auto}
        .after-sl{font-size:0.72rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#2a7de1;margin-bottom:14px}
        .after-st{font-family:'Fraunces',serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:700;line-height:1.15;color:#1a1e24;margin-bottom:16px}
        .after-sd{font-size:1rem;color:#5a6170;max-width:540px}
        .after-services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
        .after-svc{background:#fff;border:1px solid #e2e6ec;border-radius:14px;overflow:hidden;transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}
        .after-svc:hover{box-shadow:0 12px 40px rgba(0,0,0,0.06);transform:translateY(-2px)}
        .after-svc-img{width:100%;height:180px;object-fit:cover}
        .after-svc-body{padding:24px}
        .after-svc-body h3{font-size:1.1rem;font-weight:700;color:#1a1e24;margin-bottom:8px}
        .after-svc-body p{font-size:0.9rem;color:#5a6170;line-height:1.6}

        .after-reviews{background:#edf1f7;padding:80px 48px}
        .after-reviews-inner{max-width:1140px;margin:0 auto}
        .after-reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
        .after-rc{background:#fff;border:1px solid #e2e6ec;border-radius:14px;padding:28px 24px}
        .after-rc-stars{color:#2a7de1;font-size:0.9rem;letter-spacing:2px;margin-bottom:12px}
        .after-rc p{font-size:0.92rem;color:#3a4050;line-height:1.65;margin-bottom:16px;font-style:italic}
        .after-rc-author{font-size:0.82rem;font-weight:700;color:#1a1e24}
        .after-rc-source{font-size:0.72rem;color:#8a90a0}

        .after-cta-section{padding:80px 48px}
        .after-cta-box{max-width:1140px;margin:0 auto;background:#1a1e24;border-radius:16px;padding:56px 48px;display:flex;justify-content:space-between;align-items:center;gap:40px}
        .after-cta-box h2{font-family:'Fraunces',serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;color:#fff;margin-bottom:8px}
        .after-cta-box p{font-size:0.95rem;color:rgba(255,255,255,0.5);max-width:440px}
        .after-cta-acts{display:flex;gap:12px;flex-shrink:0;flex-wrap:wrap}
        .after-btn-l{padding:16px 32px;background:#f6f8fa;color:#1a1e24;border-radius:999px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
        .after-btn-l:hover{background:#2a7de1;color:#fff}

        .after-footer{border-top:1px solid #e2e6ec;padding:32px 48px;display:flex;justify-content:space-between;align-items:center;max-width:1236px;margin:0 auto;font-size:0.82rem;color:#8a90a0}
        .after-footer-brand{font-weight:800;color:#1a1e24;font-size:0.88rem}
        .after-footer-links{display:flex;gap:24px}
        .after-footer-links a{color:#8a90a0;text-decoration:none}
        .after-footer-links a:hover{color:#1a1e24}

        @media(max-width:860px){
          .after-header,.after-topbar,.after-hero-content,.after-services,.after-reviews,.after-cta-section{padding-left:24px;padding-right:24px}
          .after-nav{display:none}
          .after-services-grid,.after-reviews-grid{grid-template-columns:1fr}
          .after-trust{gap:24px;padding:20px 24px}
          .after-cta-box{flex-direction:column;text-align:center;padding:40px 28px}
          .after-cta-acts{justify-content:center}
          .after-footer{flex-direction:column;gap:12px;text-align:center;padding:24px}
          .after-footer-links{justify-content:center}
          .before-service-list{grid-template-columns:1fr}
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
          <div className="before-topbar">&#128374; 24/7 EMERGENCY SERVICE — CALL (317) 555-0234 NOW! &#128374;</div>
          <header className="before-header">
            <div className="before-logo">
              <span className="icon">&#128682;</span>
              <div>
                <div className="before-logo-text">Reliable Plumbing &amp; Drain</div>
                <div className="before-logo-sub">Serving Indianapolis Since 2001</div>
              </div>
            </div>
            <div>
              <div className="before-phone">&#9742; (317) 555-0234</div>
              <div className="before-phone-sub">Licensed | Bonded | Insured</div>
            </div>
          </header>
          <nav className="before-nav">
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Drains</a>
            <a href="#">Water Heaters</a>
            <a href="#">Sump Pumps</a>
            <a href="#">Remodeling</a>
            <a href="#">Specials</a>
            <a href="#">Reviews</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <div className="before-hero">
            <h2>Your Trusted Local Plumber!</h2>
            <p>From leaky faucets to complete bathroom remodels, we do it all! No job is too big or too small for our experienced team.</p>
            <a href="#" className="before-hero-btn">&#9733; SCHEDULE SERVICE NOW &#9733;</a>
          </div>
          <div className="before-content">
            <h3>Our Plumbing Services</h3>
            <div className="before-service-list">
              <div className="before-service-item"><span className="icon">&#128682;</span><span>Drain Cleaning &amp; Repair</span></div>
              <div className="before-service-item"><span className="icon">&#127809;</span><span>Water Heater Install &amp; Repair</span></div>
              <div className="before-service-item"><span className="icon">&#128678;</span><span>Emergency Plumbing 24/7</span></div>
              <div className="before-service-item"><span className="icon">&#128705;</span><span>Bathroom Remodeling</span></div>
              <div className="before-service-item"><span className="icon">&#9889;</span><span>Sump Pump Services</span></div>
              <div className="before-service-item"><span className="icon">&#128167;</span><span>Leak Detection &amp; Repair</span></div>
            </div>
            <div className="before-coupon">
              <h4>&#127881; SPECIAL OFFER! &#127881;</h4>
              <p>$25 OFF Any Service Over $150!<br />Mention this ad when you call. Cannot be combined with other offers. Expires 12/31/2024.</p>
            </div>
            <h3>About Reliable Plumbing</h3>
            <p>Reliable Plumbing &amp; Drain has been providing quality plumbing services to the greater Indianapolis area for over 20 years. Our team of licensed, bonded, and insured plumbers are ready to handle any plumbing issue you may have. We pride ourselves on prompt service, fair pricing, and quality workmanship. When you need a plumber you can count on, call Reliable!</p>
            <h3>Customer Reviews</h3>
            <p>&#11088;&#11088;&#11088;&#11088;&#11088; &quot;Called them at 2am when our basement flooded. They were here in 30 minutes!&quot; — Jennifer M.</p>
            <p>&#11088;&#11088;&#11088;&#11088;&#11088; &quot;Fair prices, honest work. Our go-to plumber.&quot; — Dave W.</p>
            <p>&#11088;&#11088;&#11088;&#11088;&#11088; &quot;Fixed the problem fast and didn&apos;t try to upsell us.&quot; — Amy L.</p>
          </div>
          <footer className="before-footer">
            <p>&copy; 2024 Reliable Plumbing &amp; Drain | <a href="#">Website by QuickSites Pro</a></p>
          </footer>
        </div>
      </div>

      {/* After State */}
      <div className={`view-after ${isAfter ? "visible" : ""}`} data-testid="view-after">
        <div className="after-site">
          <div className="after-topbar">
            <span><span className="urg">24/7 Emergency Service</span> — We answer every call.</span>
            <a href="tel:3175550234">(317) 555-0234</a>
          </div>
          <header className="after-header">
            <a href="#" className="after-logo">Reliable <span>Plumbing</span></a>
            <nav className="after-nav">
              <a href="#">Services</a>
              <a href="#">About</a>
              <a href="#">Reviews</a>
            </nav>
            <a href="#" className="after-cta-btn">Schedule Service</a>
          </header>

          <section className="after-hero">
            <div className="after-hero-content">
              <div className="after-hero-eyebrow">Indianapolis &bull; 24/7 Emergency Service</div>
              <h1>The Plumber Who<br />Shows Up on Time</h1>
              <p className="after-hero-desc">20+ years serving Indianapolis. Honest pricing, licensed technicians, and a response time that doesn&apos;t leave you waiting.</p>
              <div className="after-hero-actions">
                <a href="#" className="after-btn-p">Schedule Service</a>
                <a href="tel:3175550234" className="after-btn-o">Call (317) 555-0234</a>
              </div>
            </div>
          </section>

          <div className="after-trust">
            <div className="after-trust-item"><span className="num">20+</span><span className="desc">Years Experience</span></div>
            <div className="after-trust-item"><span className="num">24/7</span><span className="desc">Emergency Service</span></div>
            <div className="after-trust-item"><span className="num">4.9</span><span className="desc">Google Rating</span></div>
            <div className="after-trust-item"><span className="num">30 min</span><span className="desc">Avg Response Time</span></div>
          </div>

          <section className="after-services">
            <div className="after-sl">Services</div>
            <h2 className="after-st">We Fix It Right<br />the First Time</h2>
            <p className="after-sd">No guesswork, no upselling. Just clear diagnosis, fair pricing, and work that lasts.</p>
            <div className="after-services-grid">
              <article className="after-svc">
                <img className="after-svc-img" src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80" alt="Plumber working under sink" loading="lazy" />
                <div className="after-svc-body">
                  <h3>Drain Cleaning &amp; Repair</h3>
                  <p>Clogged drains, slow lines, and sewer backups cleared fast with upfront pricing.</p>
                </div>
              </article>
              <article className="after-svc">
                <img className="after-svc-img" src="https://images.unsplash.com/photo-504328345606-18bbc8c9d7d1?w=600&q=80" alt="Water heater installation" loading="lazy" />
                <div className="after-svc-body">
                  <h3>Water Heater Services</h3>
                  <p>Tank and tankless installation, repair, and same-day replacement when you need hot water now.</p>
                </div>
              </article>
              <article className="after-svc">
                <img className="after-svc-img" src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80" alt="Modern bathroom renovation" loading="lazy" />
                <div className="after-svc-body">
                  <h3>Bathroom Remodeling</h3>
                  <p>From fixture upgrades to full remodels — designed around your budget and timeline.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="after-reviews">
            <div className="after-reviews-inner">
              <div className="after-sl">Reviews</div>
              <h2 className="after-st">What Homeowners Say</h2>
              <div className="after-reviews-grid">
                <div className="after-rc">
                  <div className="after-rc-stars">★★★★★</div>
                  <p>&quot;Called at 2am when our basement flooded. They were here in 30 minutes and had it under control within the hour.&quot;</p>
                  <div className="after-rc-author">Jennifer M.</div>
                  <div className="after-rc-source">Indianapolis — Google Review</div>
                </div>
                <div className="after-rc">
                  <div className="after-rc-stars">★★★★★</div>
                  <p>&quot;Fair prices, honest work. They explained everything before starting and the final bill matched the quote exactly.&quot;</p>
                  <div className="after-rc-author">Dave W.</div>
                  <div className="after-rc-source">Carmel, IN — Google Review</div>
                </div>
                <div className="after-rc">
                  <div className="after-rc-stars">★★★★★</div>
                  <p>&quot;Fixed the problem fast and didn&apos;t try to upsell us on things we didn&apos;t need. That&apos;s rare and we appreciate it.&quot;</p>
                  <div className="after-rc-author">Amy L.</div>
                  <div className="after-rc-source">Fishers, IN — Google Review</div>
                </div>
              </div>
            </div>
          </section>

          <section className="after-cta-section">
            <div className="after-cta-box">
              <div>
                <h2>Plumbing problem?<br />We&apos;ll be there.</h2>
                <p>Schedule a service call or speak directly with a licensed plumber right now.</p>
              </div>
              <div className="after-cta-acts">
                <a href="#" className="after-btn-l">Schedule Service</a>
                <a href="tel:3175550234" className="after-btn-o" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>Call (317) 555-0234</a>
              </div>
            </div>
          </section>

          <footer className="after-footer">
            <span className="after-footer-brand">Reliable Plumbing</span>
            <nav className="after-footer-links">
              <a href="#">Services</a>
              <a href="#">About</a>
              <a href="#">Reviews</a>
              <a href="#">Contact</a>
            </nav>
            <span>&copy; 2026 Reliable Plumbing. Indianapolis, IN.</span>
          </footer>
        </div>
      </div>
    </>
  );
}
