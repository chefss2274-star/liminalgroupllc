# Liminal Group LLC - Website

A modern, responsive marketing website built with Next.js and React, featuring scroll reveal animations, mobile navigation, and a lead capture form.

## Features

- **Single-page layout** with smooth scroll navigation
- **Scroll-triggered reveal animations** using Intersection Observer
- **Mobile hamburger menu** with full-screen overlay
- **Form validation** with error states and success confirmation
- **Formspree integration** for form submissions
- **SEO optimized** with structured data, OG tags, and meta descriptions
- **Fully responsive** design for all screen sizes

## Sections

1. Hero - Main value proposition and CTAs
2. Problem Statement - Pain points for business websites
3. Process - Three-step approach
4. Demo Websites - Portfolio showcase
5. Audit Form - Lead capture with validation
6. About - Company information
7. CTA - Final call to action
8. Footer - Navigation links

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn

### Installation

```bash
cd frontend
yarn install
```

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
yarn build
```

### Production

```bash
yarn start
```

## Vercel Deployment

1. Push this repository to GitHub
2. Import the project to Vercel
3. Set the root directory to `frontend`
4. Add environment variable (optional):
   - `NEXT_PUBLIC_FORMSPREE_ID`: Your Formspree form ID

### One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID for audit form submissions | No (form simulates success if not set) |

## Formspree Setup

1. Go to [Formspree](https://formspree.io/)
2. Create a new form
3. Copy your form ID (e.g., `xyzabc123`)
4. Add to `.env.local` or Vercel environment variables:
   ```
   NEXT_PUBLIC_FORMSPREE_ID=xyzabc123
   ```

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: CSS Custom Properties (CSS Variables)
- **Fonts**: DM Sans, DM Serif Display (Google Fonts)
- **Form Handling**: Formspree
- **Deployment**: Vercel

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── globals.css      # All styles (CSS custom properties)
│       ├── layout.tsx       # Root layout with metadata & fonts
│       └── page.tsx         # Main page component with all sections
├── public/                  # Static assets (favicons)
├── .env.local              # Environment variables
├── .env.example            # Example environment file
├── vercel.json             # Vercel configuration
└── package.json            # Dependencies
```

## Customization

### Colors (in globals.css)

```css
:root {
  --bg: #f5f4f1;           /* Main background */
  --surface: #ffffff;       /* Card background */
  --text: #1a1a1a;         /* Primary text */
  --accent-warm: #7c6955;  /* Accent color */
}
```

### Contact Information

Update the email address in:
- `src/app/page.tsx` - CTA section and footer mailto links

### Demo Links

Replace "Coming Soon" links in the demo cards section when ready.

## License

© 2026 Liminal Group LLC. All rights reserved.
