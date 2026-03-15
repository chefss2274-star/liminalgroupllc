"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function RestaurantDemo() {
  const [isAfter, setIsAfter] = useState(false);

  const switchView = useCallback(() => {
    setIsAfter((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle keyboard events for toggle
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
        /* ═══════════════════════════════════════════
           GLOBAL / TOGGLE SHELL
        ═══════════════════════════════════════════ */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          font-family: system-ui, sans-serif;
          overflow-x: hidden;
          background: #111;
        }

        /* ── Liminal branded toggle bar ── */
        .toggle-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: #1a1a1a;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 0 24px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .toggle-brand {
          position: absolute;
          left: 24px;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
          text-decoration: none;
        }

        .toggle-brand:hover {
          color: rgba(255,255,255,0.6);
        }

        .toggle-label {
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: color 0.3s;
          cursor: pointer;
          user-select: none;
        }

        .toggle-label-before { color: rgba(255,255,255,0.35); }
        .toggle-label-after { color: rgba(255,255,255,0.35); }

        .toggle-label.active-label { color: #fff; }

        .toggle-switch {
          width: 56px;
          height: 28px;
          border-radius: 999px;
          background: #333;
          position: relative;
          cursor: pointer;
          transition: background 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        .toggle-switch::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: #fff;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        .toggle-switch.on {
          background: #7c6955;
        }

        .toggle-switch.on::after {
          transform: translateX(28px);
        }

        .toggle-cta {
          position: absolute;
          right: 24px;
          font-size: 0.78rem;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.25s;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .toggle-cta:hover {
          border-color: #7c6955;
          color: #fff;
          background: rgba(124,105,85,0.15);
        }

        /* ── View containers ── */
        .view-before, .view-after {
          padding-top: 56px;
          min-height: 100vh;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .view-before { display: block; }
        .view-after { display: none; }

        .view-before.hidden { display: none; }
        .view-after.visible { display: block; }

        /* ═══════════════════════════════════════════
           ▼ BEFORE STATE — "Bella's Italian Kitchen"
           Realistic bad restaurant website circa 2012
        ═══════════════════════════════════════════ */

        .before-site {
          background: #1a0a00;
          color: #e8d5b0;
          font-family: 'Comic Neue', cursive, sans-serif;
          line-height: 1.5;
        }

        /* Terrible tiled background texture */
        .before-site::before {
          content: "";
          position: fixed;
          inset: 0;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.03) 3px,
              rgba(0,0,0,0.03) 4px
            ),
            radial-gradient(ellipse at 30% 20%, #2a1200 0%, #0d0500 80%);
          z-index: -1;
          pointer-events: none;
        }

        .before-header {
          text-align: center;
          padding: 20px 16px 10px;
          border-bottom: 3px double #8b6914;
          background: linear-gradient(180deg, #1a0a00, #0d0500);
        }

        .before-header h1 {
          font-family: 'Lobster', cursive;
          font-size: 3rem;
          color: #d4a439;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(212,164,57,0.2);
          margin-bottom: 4px;
        }

        .before-header .tagline {
          font-family: 'Shadows Into Light', cursive;
          font-size: 1.1rem;
          color: #b8956a;
          font-style: italic;
        }

        /* Terrible nav with too many items */
        .before-nav {
          background: linear-gradient(180deg, #3a1a00, #2a0e00);
          border-bottom: 2px solid #8b6914;
          border-top: 1px solid #5a3000;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0;
          padding: 0;
        }

        .before-nav a {
          color: #d4a439;
          text-decoration: none;
          padding: 12px 14px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-right: 1px solid rgba(139,105,20,0.3);
          transition: background 0.15s;
        }

        .before-nav a:hover {
          background: rgba(212,164,57,0.15);
        }

        .before-nav a:last-child { border-right: none; }

        /* Autoplay-esque hero banner */
        .before-hero {
          position: relative;
          height: 320px;
          background:
            linear-gradient(180deg, rgba(26,10,0,0.5) 0%, rgba(26,10,0,0.8) 100%),
            linear-gradient(135deg, #3a1500, #1a0800, #2a1000, #0d0400);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          border-bottom: 3px solid #8b6914;
          overflow: hidden;
        }

        .before-hero::before {
          content: "🍝";
          font-size: 10rem;
          position: absolute;
          opacity: 0.06;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .before-hero h2 {
          font-family: 'Lobster', cursive;
          font-size: 2.6rem;
          color: #d4a439;
          text-shadow: 3px 3px 8px rgba(0,0,0,0.9);
          margin-bottom: 12px;
        }

        .before-hero p {
          font-size: 1.05rem;
          color: #c4a87a;
          max-width: 500px;
          padding: 0 20px;
        }

        .before-flash {
          display: inline-block;
          margin-top: 14px;
          padding: 10px 20px;
          background: #cc0000;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          border-radius: 4px;
          animation: blink-slow 1.8s ease-in-out infinite;
          letter-spacing: 0.1em;
        }

        @keyframes blink-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Content area — wall of text + cluttered layout */
        .before-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .before-two-col {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .before-main-col {
          flex: 1.4;
          min-width: 280px;
        }

        .before-side-col {
          flex: 0.6;
          min-width: 200px;
        }

        .before-content h3 {
          font-family: 'Lobster', cursive;
          color: #d4a439;
          font-size: 1.5rem;
          margin-bottom: 10px;
          border-bottom: 1px dashed #5a3000;
          padding-bottom: 6px;
        }

        .before-content p {
          font-size: 0.92rem;
          margin-bottom: 14px;
          color: #c4a87a;
          line-height: 1.6;
        }

        /* Terrible inline menu with bad formatting */
        .before-menu-section {
          margin-top: 20px;
        }

        .before-menu-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px dotted rgba(139,105,20,0.3);
          font-size: 0.9rem;
        }

        .before-menu-item .name {
          color: #e8d5b0;
          font-weight: 700;
        }

        .before-menu-item .price {
          color: #d4a439;
          font-weight: 700;
        }

        .before-menu-item .desc {
          font-size: 0.78rem;
          color: #8a7050;
          display: block;
          font-style: italic;
        }

        /* Sidebar clutter */
        .before-sidebar-box {
          background: rgba(58,26,0,0.6);
          border: 2px solid #5a3000;
          border-radius: 6px;
          padding: 16px;
          margin-bottom: 16px;
          text-align: center;
        }

        .before-sidebar-box h4 {
          font-family: 'Lobster', cursive;
          color: #d4a439;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .before-sidebar-box p {
          font-size: 0.82rem;
          color: #a08060;
          margin-bottom: 0;
        }

        .before-hours-table {
          width: 100%;
          font-size: 0.8rem;
          border-collapse: collapse;
          margin-top: 8px;
        }

        .before-hours-table td {
          padding: 4px 8px;
          border-bottom: 1px dotted rgba(139,105,20,0.2);
          color: #b8956a;
        }

        .before-hours-table td:last-child {
          text-align: right;
          color: #e8d5b0;
        }

        /* Visitor counter lol */
        .before-counter {
          font-size: 0.72rem;
          color: #5a4030;
          text-align: center;
          margin-top: 8px;
          font-style: italic;
        }

        /* Footer — maximum cheese */
        .before-footer {
          background: #0d0500;
          border-top: 3px double #8b6914;
          text-align: center;
          padding: 24px 16px;
          font-size: 0.8rem;
          color: #6a5030;
        }

        .before-footer .social-text {
          color: #8b6914;
          font-weight: 700;
          margin-bottom: 6px;
          font-size: 0.85rem;
        }

        .before-footer a {
          color: #d4a439;
          text-decoration: underline;
        }

        .before-marquee {
          background: #cc0000;
          color: #fff;
          font-weight: 700;
          padding: 8px 0;
          font-size: 0.82rem;
          overflow: hidden;
          white-space: nowrap;
          letter-spacing: 0.06em;
        }

        .before-marquee span {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }


        /* ═══════════════════════════════════════════
           ▼ AFTER STATE — "Bella's" Liminal Redesign
           Modern, warm, editorial restaurant site
        ═══════════════════════════════════════════ */

        .after-site {
          background: #faf8f5;
          color: #2a2520;
          font-family: 'Source Sans 3', system-ui, sans-serif;
          line-height: 1.65;
          font-weight: 400;
        }

        /* ── After: Header ── */
        .after-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 72px;
          border-bottom: 1px solid #e8e2da;
          background: rgba(250,248,245,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: sticky;
          top: 56px;
          z-index: 50;
        }

        .after-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #2a2520;
          letter-spacing: 0.02em;
          text-decoration: none;
        }

        .after-logo span {
          font-weight: 400;
          font-style: italic;
          color: #8a7a6a;
          font-size: 0.85em;
          margin-left: 6px;
        }

        .after-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .after-nav-links a {
          font-size: 0.88rem;
          color: #6a6058;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }

        .after-nav-links a:hover { color: #2a2520; }

        .after-reserve-btn {
          padding: 10px 24px;
          background: #2a2520;
          color: #faf8f5;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          letter-spacing: 0.02em;
        }

        .after-reserve-btn:hover {
          background: #8a6a4a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(42,37,32,0.12);
        }

        /* ── After: Hero ── */
        .after-hero {
          height: 85vh;
          min-height: 560px;
          max-height: 800px;
          position: relative;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(42,37,32,0.15) 0%, rgba(42,37,32,0.5) 40%, rgba(42,37,32,0.88) 100%),
            url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80') center/cover no-repeat;
        }

        /* Subtle grain overlay */
        .after-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .after-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 48px 64px;
          max-width: 720px;
        }

        .after-hero-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(250,248,245,0.5);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .after-hero-eyebrow::before {
          content: "";
          width: 40px;
          height: 1px;
          background: rgba(250,248,245,0.3);
        }

        .after-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 6vw, 4.5rem);
          line-height: 1;
          font-weight: 400;
          color: #faf8f5;
          margin-bottom: 18px;
          letter-spacing: -0.01em;
        }

        .after-hero h1 em {
          font-style: italic;
          color: rgba(250,248,245,0.7);
        }

        .after-hero-desc {
          font-size: 1.1rem;
          color: rgba(250,248,245,0.65);
          max-width: 480px;
          margin-bottom: 28px;
          line-height: 1.7;
        }

        .after-hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .after-btn-light {
          padding: 14px 28px;
          background: #faf8f5;
          color: #2a2520;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }

        .after-btn-light:hover {
          background: #fff;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .after-btn-ghost {
          padding: 14px 28px;
          background: transparent;
          color: #faf8f5;
          border: 1px solid rgba(250,248,245,0.25);
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s;
        }

        .after-btn-ghost:hover {
          border-color: rgba(250,248,245,0.6);
        }

        /* ── After: About strip ── */
        .after-about {
          padding: 80px 48px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .after-about-text .label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a6a4a;
          margin-bottom: 16px;
        }

        .after-about-text h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 400;
          line-height: 1.15;
          color: #2a2520;
          margin-bottom: 16px;
        }

        .after-about-text p {
          font-size: 1rem;
          color: #6a6058;
          line-height: 1.75;
        }

        .after-about-visual {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .after-about-img {
          grid-column: 1 / -1;
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-radius: 14px;
          margin-bottom: 4px;
        }

        .after-about-card {
          background: #f0ebe4;
          border-radius: 14px;
          padding: 28px 22px;
          text-align: center;
        }

        .after-about-card .num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #2a2520;
          display: block;
          margin-bottom: 4px;
        }

        .after-about-card .desc {
          font-size: 0.82rem;
          color: #8a7a6a;
          line-height: 1.4;
        }

        /* ── After: Menu preview ── */
        .after-menu-section {
          background: #2a2520;
          color: #faf8f5;
          padding: 80px 48px;
        }

        .after-menu-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .after-menu-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .after-menu-header .label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(250,248,245,0.4);
          margin-bottom: 14px;
        }

        .after-menu-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 400;
          line-height: 1.1;
        }

        .after-menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .after-menu-card {
          background: rgba(250,248,245,0.04);
          border: 1px solid rgba(250,248,245,0.08);
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }

        .after-menu-card:hover {
          background: rgba(250,248,245,0.07);
          transform: translateY(-2px);
        }

        .after-menu-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .after-menu-card-body {
          padding: 24px;
        }

        .after-menu-card .cat-label {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(250,248,245,0.35);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .after-dish {
          padding: 12px 0;
          border-bottom: 1px solid rgba(250,248,245,0.06);
        }

        .after-dish:last-child { border-bottom: none; }

        .after-dish-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2px;
        }

        .after-dish-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: #faf8f5;
        }

        .after-dish-price {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          color: rgba(250,248,245,0.5);
          flex-shrink: 0;
          margin-left: 12px;
        }

        .after-dish-desc {
          font-size: 0.82rem;
          color: rgba(250,248,245,0.35);
          line-height: 1.4;
        }

        .after-view-full {
          text-align: center;
          margin-top: 40px;
        }

        .after-view-full a {
          padding: 14px 32px;
          border: 1px solid rgba(250,248,245,0.2);
          border-radius: 999px;
          color: #faf8f5;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-block;
          transition: all 0.25s;
        }

        .after-view-full a:hover {
          border-color: rgba(250,248,245,0.5);
          background: rgba(250,248,245,0.05);
        }

        /* ── After: Gallery strip ── */
        .after-gallery {
          padding: 0;
          overflow: hidden;
        }

        .after-gallery-track {
          display: flex;
          gap: 6px;
          animation: gallery-scroll 30s linear infinite;
          width: max-content;
        }

        .after-gallery-track:hover {
          animation-play-state: paused;
        }

        .after-gallery-img {
          width: 320px;
          height: 240px;
          object-fit: cover;
          flex-shrink: 0;
          display: block;
        }

        @keyframes gallery-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── After: Location / Hours / CTA ── */
        .after-info {
          padding: 80px 48px;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }

        .after-info-card {
          background: #f0ebe4;
          border-radius: 16px;
          padding: 32px 28px;
        }

        .after-info-card .card-label {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8a6a4a;
          margin-bottom: 14px;
        }

        .after-info-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #2a2520;
          margin-bottom: 10px;
        }

        .after-info-card p {
          font-size: 0.92rem;
          color: #6a6058;
          line-height: 1.6;
        }

        .after-hours-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(42,37,32,0.06);
          font-size: 0.88rem;
        }

        .after-hours-row:last-child { border-bottom: none; }

        .after-hours-day { color: #6a6058; }
        .after-hours-time { color: #2a2520; font-weight: 500; }

        /* ── After: CTA ── */
        .after-cta {
          padding: 80px 48px;
        }

        .after-cta-box {
          max-width: 1100px;
          margin: 0 auto;
          background: #2a2520;
          border-radius: 20px;
          padding: 56px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }

        .after-cta-box h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 400;
          color: #faf8f5;
          margin-bottom: 8px;
        }

        .after-cta-box p {
          font-size: 0.95rem;
          color: rgba(250,248,245,0.55);
          max-width: 440px;
        }

        .after-cta-actions {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        /* ── After: Footer ── */
        .after-footer {
          border-top: 1px solid #e8e2da;
          padding: 32px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1196px;
          margin: 0 auto;
        }

        .after-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          color: #2a2520;
        }

        .after-footer-links {
          display: flex;
          gap: 24px;
        }

        .after-footer-links a {
          font-size: 0.82rem;
          color: #8a7a6a;
          text-decoration: none;
          transition: color 0.2s;
        }

        .after-footer-links a:hover { color: #2a2520; }

        .after-footer-copy {
          font-size: 0.78rem;
          color: #b0a898;
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════ */
        @media (max-width: 860px) {
          .after-header { padding: 0 24px; }
          .after-nav-links { display: none; }
          .after-hero-content { padding: 0 24px 48px; }
          .after-about { padding: 56px 24px; grid-template-columns: 1fr; gap: 32px; }
          .after-menu-section { padding: 56px 24px; }
          .after-menu-grid { grid-template-columns: 1fr; }
          .after-info { padding: 56px 24px; grid-template-columns: 1fr; }
          .after-cta { padding: 56px 24px; }
          .after-cta-box { flex-direction: column; text-align: center; padding: 40px 28px; }
          .after-cta-actions { justify-content: center; }
          .after-footer { padding: 24px; flex-direction: column; gap: 12px; text-align: center; }
          .after-footer-links { justify-content: center; }

          .before-two-col { flex-direction: column; }

          .toggle-brand { display: none; }
          .toggle-cta { display: none; }
        }

        @media (max-width: 480px) {
          .after-hero { min-height: 480px; }
          .after-hero h1 { font-size: 2.4rem; }
          .after-hero-actions { flex-direction: column; }
          .after-btn-light, .after-btn-ghost { width: 100%; text-align: center; }
          .after-about-visual { grid-template-columns: 1fr 1fr; }
          .before-header h1 { font-size: 2rem; }
          .before-hero h2 { font-size: 1.8rem; }
        }
      `}</style>

      {/* Toggle Bar */}
      <div className="toggle-bar" data-testid="toggle-bar">
        <Link href="/" className="toggle-brand">
          Liminal Group
        </Link>
        <span
          className={`toggle-label toggle-label-before ${!isAfter ? "active-label" : ""}`}
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
          className={`toggle-label toggle-label-after ${isAfter ? "active-label" : ""}`}
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
          <div className="before-marquee">
            <span>
              🔥 SPECIAL: 20% OFF ALL PASTA DISHES EVERY TUESDAY!! &nbsp;&nbsp;&bull;&nbsp;&nbsp;
              NOW ACCEPTING RESERVATIONS FOR VALENTINE&apos;S DAY!!
              &nbsp;&nbsp;&bull;&nbsp;&nbsp; CALL US AT (317) 555-0187
              &nbsp;&nbsp;&bull;&nbsp;&nbsp; GIFT CARDS AVAILABLE!!
              &nbsp;&nbsp;&bull;&nbsp;&nbsp; 🔥 SPECIAL: 20% OFF ALL PASTA DISHES EVERY TUESDAY!!
              &nbsp;&nbsp;&bull;&nbsp;&nbsp;
            </span>
          </div>

          <header className="before-header">
            <h1>Bella&apos;s Italian Kitchen</h1>
            <p className="tagline">~ Authentic Italian Cuisine Since 1998 ~</p>
          </header>

          <nav className="before-nav">
            <a href="#">Home</a>
            <a href="#">Menu</a>
            <a href="#">Specials</a>
            <a href="#">Catering</a>
            <a href="#">Wine List</a>
            <a href="#">Gallery</a>
            <a href="#">Reviews</a>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Gift Cards</a>
          </nav>

          <div className="before-hero">
            <h2>Welcome to Bella&apos;s!</h2>
            <p>
              Family owned and operated for over 25 years. Come experience the taste of Italy right
              here in Indianapolis!
            </p>
            <span className="before-flash">&#9733; CLICK HERE FOR SPECIALS &#9733;</span>
          </div>

          <div className="before-content">
            <div className="before-two-col">
              <div className="before-main-col">
                <h3>About Our Restaurant</h3>
                <p>
                  Welcome to Bella&apos;s Italian Kitchen! We are a family-owned Italian restaurant
                  that has been serving the Indianapolis community since 1998. Our founder, Chef
                  Antonio, brought his family recipes from Naples, Italy and has been delighting
                  customers with authentic Italian cuisine for over two decades. We use only the
                  freshest ingredients and make our pasta fresh daily in-house. Whether you&apos;re
                  looking for a romantic dinner for two, a family celebration, or just a great meal,
                  Bella&apos;s is the place for you!
                </p>
                <p>
                  We offer dine-in, carryout, and catering services for events of all sizes. Please
                  call us to discuss your catering needs. We would love to be part of your special
                  occasion!
                </p>

                <h3>Our Most Popular Dishes</h3>
                <div className="before-menu-section">
                  <div className="before-menu-item">
                    <div>
                      <span className="name">Fettuccine Alfredo</span>
                      <span className="desc">Creamy alfredo sauce with fresh parmesan</span>
                    </div>
                    <span className="price">$16.99</span>
                  </div>
                  <div className="before-menu-item">
                    <div>
                      <span className="name">Chicken Parmigiana</span>
                      <span className="desc">Breaded chicken breast with marinara and mozzarella</span>
                    </div>
                    <span className="price">$18.99</span>
                  </div>
                  <div className="before-menu-item">
                    <div>
                      <span className="name">Lasagna Classica</span>
                      <span className="desc">Layers of pasta, meat sauce, ricotta, and mozzarella</span>
                    </div>
                    <span className="price">$17.99</span>
                  </div>
                  <div className="before-menu-item">
                    <div>
                      <span className="name">Margherita Pizza</span>
                      <span className="desc">San Marzano tomatoes, fresh mozzarella, basil</span>
                    </div>
                    <span className="price">$14.99</span>
                  </div>
                  <div className="before-menu-item">
                    <div>
                      <span className="name">Shrimp Scampi</span>
                      <span className="desc">Sauteed shrimp in garlic butter wine sauce over linguine</span>
                    </div>
                    <span className="price">$21.99</span>
                  </div>
                </div>

                <p style={{ marginTop: "20px", fontStyle: "italic", fontSize: "0.85rem", color: "#8a7050" }}>
                  * Menu prices subject to change. Please call for current pricing. Consuming raw or
                  undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of
                  foodborne illness.
                </p>
              </div>

              <div className="before-side-col">
                <div className="before-sidebar-box">
                  <h4>🍴 Daily Specials</h4>
                  <p>
                    Monday: Pasta Night $12.99
                    <br />
                    Tuesday: 20% Off All Pasta
                    <br />
                    Wednesday: Wine Night BOGO
                    <br />
                    Thursday: Family Platter $39.99
                    <br />
                    Friday: Chef&apos;s Special
                  </p>
                </div>

                <div className="before-sidebar-box">
                  <h4>📍 Location</h4>
                  <p>
                    1234 Main Street
                    <br />
                    Indianapolis, IN 46204
                    <br />
                    <br />
                    Phone: (317) 555-0187
                    <br />
                    Fax: (317) 555-0188
                  </p>
                </div>

                <div className="before-sidebar-box">
                  <h4>🕐 Hours</h4>
                  <table className="before-hours-table">
                    <tbody>
                      <tr><td>Monday</td><td>11am - 9pm</td></tr>
                      <tr><td>Tuesday</td><td>11am - 9pm</td></tr>
                      <tr><td>Wednesday</td><td>11am - 9pm</td></tr>
                      <tr><td>Thursday</td><td>11am - 10pm</td></tr>
                      <tr><td>Friday</td><td>11am - 11pm</td></tr>
                      <tr><td>Saturday</td><td>12pm - 11pm</td></tr>
                      <tr><td>Sunday</td><td>12pm - 8pm</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="before-sidebar-box">
                  <h4>⭐ Reviews</h4>
                  <p>
                    &quot;Best Italian food in Indy!!&quot; - Google Review
                    <br />
                    <br />
                    &quot;Love the lasagna!!&quot; - Yelp
                    <br />
                    <br />
                    &quot;Great family atmosphere&quot; - TripAdvisor
                  </p>
                </div>

                <div className="before-counter">You are visitor #14,832</div>
              </div>
            </div>
          </div>

          <footer className="before-footer">
            <p className="social-text">Find Us On Facebook!</p>
            <p>
              <a href="#">www.facebook.com/bellasitaliankitchen</a>
            </p>
            <p style={{ marginTop: "12px" }}>
              &copy; 2024 Bella&apos;s Italian Kitchen. All Rights Reserved.
              <br />
              Website designed by Mike&apos;s Web Design
            </p>
          </footer>
        </div>
      </div>

      {/* After State */}
      <div className={`view-after ${isAfter ? "visible" : ""}`} data-testid="view-after">
        <div className="after-site">
          <header className="after-header">
            <a href="#" className="after-logo">
              Bella&apos;s <span>Italian Kitchen</span>
            </a>
            <nav className="after-nav-links">
              <a href="#">Menu</a>
              <a href="#">About</a>
              <a href="#">Private Events</a>
              <a href="#">Gift Cards</a>
            </nav>
            <a href="#" className="after-reserve-btn">
              Reserve a Table
            </a>
          </header>

          <section className="after-hero">
            <div className="after-hero-content">
              <div className="after-hero-eyebrow">Indianapolis, since 1998</div>
              <h1>
                Where Family
                <br />
                Meets <em>la Tavola</em>
              </h1>
              <p className="after-hero-desc">
                Handmade pasta. Generations of recipes. A table that feels like home. Bella&apos;s
                has been part of the Indianapolis community for over 25 years.
              </p>
              <div className="after-hero-actions">
                <a href="#" className="after-btn-light">
                  Reserve a Table
                </a>
                <a href="#" className="after-btn-ghost">
                  View Our Menu
                </a>
              </div>
            </div>
          </section>

          <section className="after-about">
            <div className="after-about-text">
              <div className="label">Our Story</div>
              <h2>
                From Naples to
                <br />
                Indianapolis
              </h2>
              <p>
                Chef Antonio brought his family&apos;s recipes across the Atlantic in 1998 with a
                simple belief: food should feel like home. Every dish at Bella&apos;s is made from
                scratch — fresh pasta daily, sauces simmered for hours, and ingredients sourced
                with care. Three generations later, we&apos;re still cooking the way Nonna taught
                us.
              </p>
            </div>
            <div className="after-about-visual">
              <img
                className="after-about-img"
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Chef preparing fresh pasta in a warm kitchen"
                loading="lazy"
              />
              <div className="after-about-card">
                <span className="num">25+</span>
                <span className="desc">Years serving Indianapolis</span>
              </div>
              <div className="after-about-card">
                <span className="num">Fresh</span>
                <span className="desc">Pasta made daily in-house</span>
              </div>
              <div className="after-about-card">
                <span className="num">3rd</span>
                <span className="desc">Generation family recipes</span>
              </div>
              <div className="after-about-card">
                <span className="num">4.8</span>
                <span className="desc">Average rating, 1,200+ reviews</span>
              </div>
            </div>
          </section>

          <section className="after-menu-section">
            <div className="after-menu-inner">
              <div className="after-menu-header">
                <div className="label">From Our Kitchen</div>
                <h2>A Taste of the Menu</h2>
              </div>

              <div className="after-menu-grid">
                <div className="after-menu-card">
                  <img
                    className="after-menu-card-img"
                    src="https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80"
                    alt="Burrata caprese with heirloom tomatoes"
                    loading="lazy"
                  />
                  <div className="after-menu-card-body">
                    <div className="cat-label">Antipasti</div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Burrata Caprese</span>
                        <span className="after-dish-price">14</span>
                      </div>
                      <div className="after-dish-desc">Heirloom tomatoes, fresh burrata, basil oil</div>
                    </div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Calamari Fritti</span>
                        <span className="after-dish-price">13</span>
                      </div>
                      <div className="after-dish-desc">
                        Lightly fried, served with marinara and lemon aioli
                      </div>
                    </div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Arancini</span>
                        <span className="after-dish-price">12</span>
                      </div>
                      <div className="after-dish-desc">
                        Crispy risotto balls, fontina, San Marzano dip
                      </div>
                    </div>
                  </div>
                </div>

                <div className="after-menu-card">
                  <img
                    className="after-menu-card-img"
                    src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=600&q=80"
                    alt="Fresh pasta with herbs"
                    loading="lazy"
                  />
                  <div className="after-menu-card-body">
                    <div className="cat-label">Pasta</div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Fettuccine Alfredo</span>
                        <span className="after-dish-price">17</span>
                      </div>
                      <div className="after-dish-desc">House-made fettuccine, aged parmesan cream</div>
                    </div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Lasagna Classica</span>
                        <span className="after-dish-price">18</span>
                      </div>
                      <div className="after-dish-desc">
                        Bolognese, béchamel, three cheeses, fresh basil
                      </div>
                    </div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Shrimp Scampi</span>
                        <span className="after-dish-price">22</span>
                      </div>
                      <div className="after-dish-desc">
                        Gulf shrimp, garlic butter, white wine, linguine
                      </div>
                    </div>
                  </div>
                </div>

                <div className="after-menu-card">
                  <img
                    className="after-menu-card-img"
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
                    alt="Grilled meat dish with vegetables"
                    loading="lazy"
                  />
                  <div className="after-menu-card-body">
                    <div className="cat-label">Secondi</div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Chicken Parmigiana</span>
                        <span className="after-dish-price">19</span>
                      </div>
                      <div className="after-dish-desc">
                        Hand-breaded, house marinara, melted mozzarella
                      </div>
                    </div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Branzino</span>
                        <span className="after-dish-price">28</span>
                      </div>
                      <div className="after-dish-desc">
                        Pan-seared, lemon caper butter, roasted vegetables
                      </div>
                    </div>
                    <div className="after-dish">
                      <div className="after-dish-top">
                        <span className="after-dish-name">Veal Marsala</span>
                        <span className="after-dish-price">26</span>
                      </div>
                      <div className="after-dish-desc">
                        Scallopini, wild mushrooms, marsala reduction
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="after-view-full">
                <a href="#">View Full Menu</a>
              </div>
            </div>
          </section>

          <section className="after-gallery">
            <div className="after-gallery-track">
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&q=80" alt="Beautifully plated fine dining dish" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=640&q=80" alt="Wine being poured at dinner table" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=640&q=80" alt="Hands making fresh pasta dough" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=640&q=80" alt="Fresh ingredients on a wooden board" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=640&q=80" alt="Warm restaurant interior with bar" loading="lazy" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=640&q=80" alt="Pizza being prepared in kitchen" loading="lazy" />
              {/* Duplicate set for seamless loop */}
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
              <img className="after-gallery-img" src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=640&q=80" alt="" loading="lazy" aria-hidden="true" />
            </div>
          </section>

          <section className="after-info">
            <div className="after-info-card">
              <div className="card-label">Visit Us</div>
              <h3>1234 Main Street</h3>
              <p>
                Indianapolis, IN 46204
                <br />
                <br />
                <a href="tel:3175550187" style={{ color: "#8a6a4a", fontWeight: 600, textDecoration: "none" }}>
                  (317) 555-0187
                </a>
              </p>
            </div>

            <div className="after-info-card">
              <div className="card-label">Hours</div>
              <div className="after-hours-row">
                <span className="after-hours-day">Mon – Wed</span>
                <span className="after-hours-time">11am – 9pm</span>
              </div>
              <div className="after-hours-row">
                <span className="after-hours-day">Thu</span>
                <span className="after-hours-time">11am – 10pm</span>
              </div>
              <div className="after-hours-row">
                <span className="after-hours-day">Fri – Sat</span>
                <span className="after-hours-time">11am – 11pm</span>
              </div>
              <div className="after-hours-row">
                <span className="after-hours-day">Sunday</span>
                <span className="after-hours-time">12pm – 8pm</span>
              </div>
            </div>

            <div className="after-info-card">
              <div className="card-label">Private Events</div>
              <h3>Host with Us</h3>
              <p>
                Our private dining room seats up to 40 guests. Perfect for rehearsal dinners,
                birthdays, and corporate gatherings.
              </p>
              <a href="#" style={{ display: "inline-block", marginTop: "12px", fontSize: "0.88rem", fontWeight: 600, color: "#8a6a4a", textDecoration: "none" }}>
                Inquire &rarr;
              </a>
            </div>
          </section>

          <section className="after-cta">
            <div className="after-cta-box">
              <div>
                <h2>Your table is waiting</h2>
                <p>
                  Join us for an evening of handmade pasta, warm hospitality, and the kind of meal
                  you&apos;ll talk about tomorrow.
                </p>
              </div>
              <div className="after-cta-actions">
                <a href="#" className="after-btn-light">
                  Reserve a Table
                </a>
                <a href="tel:3175550187" className="after-btn-ghost">
                  Call (317) 555-0187
                </a>
              </div>
            </div>
          </section>

          <footer className="after-footer">
            <span className="after-footer-brand">Bella&apos;s Italian Kitchen</span>
            <nav className="after-footer-links">
              <a href="#">Menu</a>
              <a href="#">About</a>
              <a href="#">Private Events</a>
              <a href="#">Gift Cards</a>
              <a href="#">Contact</a>
            </nav>
            <span className="after-footer-copy">&copy; 2026 Bella&apos;s Italian Kitchen</span>
          </footer>
        </div>
      </div>
    </>
  );
}
