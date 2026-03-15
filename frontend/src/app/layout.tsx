import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liminal Group LLC | Cross the Threshold",
  description: "Liminal helps businesses move beyond outdated websites and into modern digital platforms that generate real customer engagement.",
  keywords: "web design, business websites, website audit, digital strategy, Indiana web design",
  authors: [{ name: "Liminal Group LLC" }],
  openGraph: {
    type: "website",
    title: "Liminal Group LLC — Cross the Threshold",
    description: "Modern websites that help businesses move into their next stage online.",
    url: "https://liminalgroupllc.com",
    siteName: "Liminal Group LLC",
    images: [
      {
        url: "https://liminalgroupllc.com/liminal_social_icon_centered.png",
        width: 1200,
        height: 630,
        alt: "Liminal Group LLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liminal Group LLC — Cross the Threshold",
    description: "Modern websites that help businesses move into their next stage online.",
    images: ["https://liminalgroupllc.com/liminal_social_icon_centered.png"],
  },
  icons: {
    icon: "/liminal_favicon_centered.png",
    apple: "/liminal_social_icon_centered.png",
  },
  alternates: {
    canonical: "https://liminalgroupllc.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Liminal Group LLC",
              description: "Modern websites and digital strategy for businesses ready to move forward online.",
              url: "https://liminalgroupllc.com",
              email: "admin@liminalgroupllc.com",
              areaServed: {
                "@type": "State",
                name: "Indiana",
              },
              serviceType: ["Web Design", "Website Audit", "Digital Strategy"],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
