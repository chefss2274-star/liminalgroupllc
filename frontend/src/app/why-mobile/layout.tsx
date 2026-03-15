import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Mobile Matters — Your Website Is Losing Customers | Liminal Group LLC",
  description: "Over 60% of your visitors are on their phone. If your site isn't built for mobile, you're losing customers every day. See the difference.",
};

export default function WhyMobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
