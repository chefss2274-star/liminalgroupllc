import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Audit | Liminal Group LLC",
  description: "Get an instant AI-powered audit of your website. See what's working, what's broken, and what's costing you customers.",
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
