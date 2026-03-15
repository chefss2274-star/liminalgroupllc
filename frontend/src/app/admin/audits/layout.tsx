import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit Dashboard | Liminal Group Admin",
  description: "View and manage website audit submissions",
};

export default function AdminAuditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
