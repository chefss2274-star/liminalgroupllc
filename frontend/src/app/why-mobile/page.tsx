"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function WhyMobilePage() {
  // Scroll reveal effect
  useEffect(() => {
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

  return (
    <>
      {/* Hero */}
      <section className="wm-hero" data-testid="wm-hero-section">
        <div className="wm-container">
          <div className="hero-label reveal visible">Why Mobile Matters</div>
          <h1 className="reveal rd1 visible">
            Your Website Is <span className="highlight">Losing Customers</span> Right Now
          </h1>
          <p className="hero-desc reveal rd2 visible">
            Over 60% of your visitors are on their phone. If your site isn&apos;t built for mobile, they&apos;re leaving before they ever become a customer. And most of them never come back.
          </p>
          <div className="hero-actions reveal rd3 visible">
            <Link href="/#audit" className="btn btn-dark" data-testid="wm-cta-audit">
              Get Your Free Audit
            </Link>
            <a href="#comparison" className="btn btn-outline" data-testid="wm-cta-comparison">
              See the Difference
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-strip" data-testid="wm-stats-section">
        <div className="stats-inner">
          <div className="stat-card reveal visible">
            <span className="stat-num">61<span className="pct">%</span></span>
            <span className="stat-label">Mobile Traffic</span>
            <span className="stat-desc">of all website visits come from mobile devices</span>
          </div>
          <div className="stat-card reveal rd1 visible">
            <span className="stat-num">53<span className="pct">%</span></span>
            <span className="stat-label">Bounce Rate</span>
            <span className="stat-desc">of mobile visitors leave if a page takes over 3 seconds to load</span>
          </div>
          <div className="stat-card reveal rd2 visible">
            <span className="stat-num">74<span className="pct">%</span></span>
            <span className="stat-label">Return Rate</span>
            <span className="stat-desc">of visitors are more likely to return to a mobile-friendly site</span>
          </div>
          <div className="stat-card reveal rd3 visible">
            <span className="stat-num">50<span className="pct">%</span></span>
            <span className="stat-label">Online Purchases</span>
            <span className="stat-desc">of all e-commerce sales now happen on mobile</span>
          </div>
        </div>
      </div>

      {/* Problem Cards */}
      <section className="wm-problem-section" data-testid="wm-problem-section">
        <div className="wm-container">
          <div className="section-label reveal">The Real Cost</div>
          <h2 className="section-title reveal rd1">
            A Bad Mobile Experience<br />Isn&apos;t a Design Problem
          </h2>
          <p className="section-desc reveal rd2">It&apos;s a revenue problem. Every frustrated visitor is a customer who went to your competitor instead.</p>

          <div className="wm-problem-grid">
            <div className="wm-problem-card reveal" data-testid="wm-problem-card-1">
              <span className="problem-icon">📸</span>
              <h3>Text too small to read</h3>
              <p>Visitors pinch and zoom trying to read your menu, services, or contact info. Most give up within 10 seconds.</p>
              <span className="cost">Lost: first impression</span>
            </div>
            <div className="wm-problem-card reveal rd1" data-testid="wm-problem-card-2">
              <span className="problem-icon">📱</span>
              <h3>Buttons too small to tap</h3>
              <p>The &quot;Call Now&quot; button that works on desktop becomes a tiny target on a phone. Missed taps turn into missed calls.</p>
              <span className="cost">Lost: direct leads</span>
            </div>
            <div className="wm-problem-card reveal rd2" data-testid="wm-problem-card-3">
              <span className="problem-icon">⏱</span>
              <h3>Slow load time</h3>
              <p>Unoptimized images and bloated code make the page crawl on mobile data. Over half your visitors leave before it loads.</p>
              <span className="cost">Lost: 53% of traffic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phone Comparison */}
      <section className="comparison-section" id="comparison" data-testid="wm-comparison-section">
        <div className="comparison-inner">
          <div className="comparison-header">
            <div className="section-label reveal" style={{ color: "rgba(255,255,255,0.4)" }}>Side by Side</div>
            <h2 className="section-title reveal rd1" style={{ color: "#fff" }}>
              What Your Customers<br />Actually See
            </h2>
            <p className="section-desc reveal rd2" style={{ color: "rgba(255,255,255,0.5)" }}>Same business. Same information. Completely different experience.</p>
          </div>

          <div className="phone-row">
            {/* Before Phone */}
            <div className="phone-col reveal">
              <span className="phone-col-label label-before">✗ Current Site on Mobile</span>
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="bad-mobile">
                    <div className="bm-header"><div className="bm-logo">Bella&apos;s Italian Kitchen</div></div>
                    <div className="bm-nav">
                      <a href="#">Home</a><a href="#">Menu</a><a href="#">Specials</a><a href="#">Catering</a>
                      <a href="#">Wine</a><a href="#">Gallery</a><a href="#">Reviews</a><a href="#">About</a>
                      <a href="#">Contact</a><a href="#">Gift Cards</a>
                    </div>
                    <div className="bm-hero">
                      <h2>Welcome to Bella&apos;s!</h2>
                      <p>Family owned and operated for over 25 years. Come experience authentic Italian!</p>
                    </div>
                    <div className="bm-body">
                      <a href="#" className="bm-btn">★ CLICK HERE FOR SPECIALS ★</a>
                      <h3>About Our Restaurant</h3>
                      <p>Welcome to Bella&apos;s Italian Kitchen! We are a family-owned Italian restaurant that has been serving the Indianapolis community since 1998. Our founder, Chef Antonio, brought his family recipes all the way from Naples, Italy and has been delighting customers with authentic Italian cuisine for over two decades.</p>
                      <p>We use only the freshest ingredients and make our pasta fresh daily in-house. Whether you&apos;re looking for a romantic dinner for two, a family celebration, or just a great meal, Bella&apos;s is the place for you!</p>
                      <div className="bm-sidebar">
                        <h4>📍 Location &amp; Hours</h4>
                        <p>1234 Main Street<br />Indianapolis, IN<br />Mon-Sun 11am-10pm<br />Phone: (317) 555-0187<br />Fax: (317) 555-0188</p>
                      </div>
                      <div className="bm-sidebar">
                        <h4>🎉 Daily Specials</h4>
                        <p>Monday: Pasta Night $12.99<br />Tuesday: 20% Off Pasta<br />Wednesday: BOGO Wine<br />Thursday: Family Platter</p>
                      </div>
                      <h3>Our Most Popular Dishes</h3>
                      <p>Fettuccine Alfredo......$16.99<br />Chicken Parm............$18.99<br />Lasagna Classica.....$17.99<br />Margherita Pizza.....$14.99</p>
                      <div className="bm-tiny">* Prices subject to change. Consuming raw or undercooked meats may increase risk of foodborne illness. You are visitor #14,832. Website by Mike&apos;s Web Design.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Annotations */}
            <div className="phone-annotations reveal rd2">
              <div className="annotation">
                <span className="ann-icon">👤</span>
                <span className="ann-text"><strong>Same visitor.</strong><br />Same phone.<br />Same business.</span>
              </div>
              <div className="annotation">
                <span className="ann-icon">→</span>
                <span className="ann-text">The only difference is <strong>how the site was built.</strong></span>
              </div>
              <div className="annotation">
                <span className="ann-icon">💰</span>
                <span className="ann-text">One converts.<br />One loses money <strong>every day.</strong></span>
              </div>
            </div>

            {/* After Phone */}
            <div className="phone-col reveal rd3">
              <span className="phone-col-label label-after">✓ Optimized for Mobile</span>
              <div className="phone-frame">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="good-mobile">
                    <div className="gm-header">
                      <span className="gm-logo">Bella&apos;s</span>
                      <a href="#" className="gm-btn">Reserve</a>
                    </div>
                    <div className="gm-hero">
                      <div className="gm-hero-eyebrow">Indianapolis, since 1998</div>
                      <h1>Where Family<br />Meets la Tavola</h1>
                      <p>Handmade pasta. Generations of recipes. A table that feels like home.</p>
                      <a href="#" className="gm-hero-btn">Reserve a Table</a>
                    </div>
                    <div className="gm-section">
                      <div className="gm-section-label">Our Story</div>
                      <h2>From Naples to Indianapolis</h2>
                      <p>Chef Antonio brought his family&apos;s recipes across the Atlantic in 1998. Every dish is made from scratch — fresh pasta daily, sauces simmered for hours.</p>
                    </div>
                    <div className="gm-section" style={{ paddingTop: 0 }}>
                      <div className="gm-section-label">From Our Kitchen</div>
                      <h2>A Taste of the Menu</h2>
                      <div className="gm-card"><h3>Burrata Caprese — 14</h3><p>Heirloom tomatoes, fresh burrata, basil oil</p></div>
                      <div className="gm-card"><h3>Fettuccine Alfredo — 17</h3><p>House-made fettuccine, aged parmesan cream</p></div>
                      <div className="gm-card"><h3>Chicken Parmigiana — 19</h3><p>Hand-breaded, house marinara, mozzarella</p></div>
                    </div>
                    <div className="gm-cta">
                      <h3>Your table is waiting</h3>
                      <p>Handmade pasta, warm hospitality, and a meal you&apos;ll talk about tomorrow.</p>
                      <a href="#" className="gm-cta-btn">Reserve a Table</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="changes-section" data-testid="wm-changes-section">
        <div className="wm-container">
          <div className="section-label reveal">What We Fix</div>
          <h2 className="section-title reveal rd1">
            Every Liminal Site Is<br />Mobile-First by Default
          </h2>
          <p className="section-desc reveal rd2">We don&apos;t &quot;make it work on mobile.&quot; We design for mobile first, then scale up to desktop.</p>

          <div className="changes-grid">
            <div className="change-card reveal" data-testid="wm-change-card-1">
              <div className="change-icon bad">✗</div>
              <div>
                <h3>Tiny, unreadable text</h3>
                <p>Desktop font sizes crammed onto a phone screen. Visitors squint, pinch, and leave.</p>
              </div>
            </div>
            <div className="change-card reveal rd1" data-testid="wm-change-card-2">
              <div className="change-icon good">✓</div>
              <div>
                <h3>Readable at every size</h3>
                <p>Fluid typography that scales to the screen. Clear hierarchy that guides the eye.</p>
              </div>
            </div>
            <div className="change-card reveal" data-testid="wm-change-card-3">
              <div className="change-icon bad">✗</div>
              <div>
                <h3>10-item navigation bar</h3>
                <p>A row of tiny links that wraps and stacks. Nothing is easy to find.</p>
              </div>
            </div>
            <div className="change-card reveal rd1" data-testid="wm-change-card-4">
              <div className="change-icon good">✓</div>
              <div>
                <h3>Clean mobile nav</h3>
                <p>Streamlined to what matters. One clear path to the action you want them to take.</p>
              </div>
            </div>
            <div className="change-card reveal" data-testid="wm-change-card-5">
              <div className="change-icon bad">✗</div>
              <div>
                <h3>No clear call to action</h3>
                <p>The customer has to hunt for a phone number or scroll through paragraphs to find a contact form.</p>
              </div>
            </div>
            <div className="change-card reveal rd1" data-testid="wm-change-card-6">
              <div className="change-icon good">✓</div>
              <div>
                <h3>Thumb-friendly CTAs</h3>
                <p>Large, tappable buttons within thumb reach. Call, book, or request a quote in one tap.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wm-cta-section" data-testid="wm-cta-section">
        <div className="wm-container">
          <div className="wm-cta-box reveal">
            <div>
              <h2>Find out what your<br />mobile visitors see</h2>
              <p>Every Liminal website package is built mobile-first — responsive design, fast load times, and thumb-friendly CTAs are included at every tier, not sold as an add-on. Start with a free audit.</p>
            </div>
            <div className="cta-actions">
              <Link href="/#audit" className="btn-cta-light" data-testid="wm-footer-cta-audit">
                Get Your Free Audit
              </Link>
              <Link href="/#pricing" className="btn-cta-ghost" data-testid="wm-footer-cta-pricing">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="wm-site-footer" data-testid="wm-footer">
        <p>© 2026 Liminal Group LLC. All rights reserved.</p>
      </footer>
    </>
  );
}
