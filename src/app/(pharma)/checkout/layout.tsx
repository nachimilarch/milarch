import type { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: true }, alternates: { canonical: null } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
