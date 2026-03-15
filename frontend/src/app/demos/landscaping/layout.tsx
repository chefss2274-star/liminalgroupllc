import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landscaping Business Website — Before & After | Liminal Group LLC",
  description: "See the difference between an outdated landscaping website and a modern, visual-first redesign by Liminal Group.",
};

export default function LandscapingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
