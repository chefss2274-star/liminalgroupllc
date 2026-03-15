import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roofing Company Website — Before & After | Liminal Group LLC",
  description: "See the difference between an outdated roofing website and a modern, lead-focused redesign by Liminal Group.",
};

export default function RoofingDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Bangers&family=Permanent+Marker&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
