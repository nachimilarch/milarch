import type { Metadata } from "next";
import TechHeader from "@/components/tech/TechHeader";
import TechFooter from "@/components/tech/TechFooter";
import JsonLd from "@/components/JsonLd";
import { techSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Milarch Tech | Software for healthcare and modern businesses" },
  description:
    "Milarch Tech builds custom billing systems, ERP, CMS, LMS and CRM, plus its own platforms for pharma field teams, WhatsApp-first businesses and recruitment. Hyderabad, India.",
  keywords: ["custom billing software", "ERP development", "CMS development", "LMS development", "CRM development", "WhatsApp chatbot", "software company Hyderabad", "Milarch Tech", "VaartaBot", "Cipher field force app"],
  alternates: { canonical: "/tech" },
  openGraph: {
    title: "Milarch Tech | Custom billing, ERP, CMS, LMS and CRM",
    description: "Custom business software and our own platforms for pharma field teams, WhatsApp-first businesses and recruitment agencies. Hyderabad, India.",
    url: "/tech",
    siteName: "Milarch",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo-tech.png", width: 1024, height: 1024, alt: "Milarch Tech logo" }],
  },
  twitter: { card: "summary", title: "Milarch Tech | Custom billing, ERP, CMS, LMS and CRM", images: ["/logo-tech.png"] },
};

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tech flex min-h-screen flex-col bg-[#F7F8FC] text-[#0E1033]">
      <JsonLd data={techSchema()} />
      <TechHeader />
      <main className="flex flex-grow flex-col">{children}</main>
      <TechFooter />
    </div>
  );
}
