import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plumbing Company Website — Before & After | Liminal Group LLC",
  description: "See the difference between an outdated plumbing website and a modern, lead-focused redesign by Liminal Group.",
};

export default function PlumbingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Comic+Neue:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
