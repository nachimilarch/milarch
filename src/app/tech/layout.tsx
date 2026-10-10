import type { Metadata } from "next";
import TechHeader from "@/components/tech/TechHeader";
import TechFooter from "@/components/tech/TechFooter";

export const metadata: Metadata = {
  title: { absolute: "Milarch Tech | Software for healthcare and modern businesses" },
  description:
    "Milarch Tech builds field-force apps, WhatsApp platforms, CRMs and healthcare web apps. Four products live in production. Hyderabad, India.",
};

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tech flex min-h-screen flex-col bg-[#F7F8FC] text-[#0E1033]">
      <TechHeader />
      <main className="flex flex-grow flex-col">{children}</main>
      <TechFooter />
    </div>
  );
}
