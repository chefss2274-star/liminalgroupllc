import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Website — Before & After | Liminal Group LLC",
  description: "See the difference between an outdated restaurant website and a modern, conversion-focused redesign by Liminal Group.",
};

export default function RestaurantDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600&family=Comic+Neue:wght@400;700&family=Lobster&family=Shadows+Into+Light&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
