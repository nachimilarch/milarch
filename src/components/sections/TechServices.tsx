"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Globe, MessageSquare, Monitor, ShoppingCart, TrendingUp, Server, Briefcase, MessagesSquare, Receipt, Building2 } from "lucide-react";

const caseStudies = [
  {
    name: "LadderStep",
    tagline: "HR, Recruitment & Outreach SaaS",
    description:
      "Full-stack hiring platform with candidate and company portals, cold outreach campaigns (email + WhatsApp), interview and offer management, training services, and placement-fee billing.",
    accentColor: "#3B82F6",
    Icon: Briefcase,
  },
  {
    name: "VaartaBot",
    tagline: "WhatsApp Business Platform",
    description:
      "Multi-tenant WhatsApp automation for businesses — visual conversation flow builder, broadcast campaigns, template management, and CRM-integrated lead capture, powering outreach for our own products and client CRMs alike.",
    accentColor: "#25D366",
    Icon: MessagesSquare,
  },
  {
    name: "Cipher",
    tagline: "Field Force & Billing App",
    description:
      "Mobile and web platform running Milarch Pharma's own sales team — daily call reports, attendance, expense claims, RCPA tracking, and billing, with role-based admin oversight.",
    accentColor: "#EC4899",
    Icon: Receipt,
  },
  {
    name: "CertifyBusiness CRM",
    tagline: "Outbound CRM for Compliance Services",
    description:
      "Multi-channel CRM for lead generation and client management — contact lists, email and WhatsApp campaigns, reply tracking, and pipeline management for a business compliance and certification firm.",
    accentColor: "#8B5CF6",
    Icon: Building2,
  },
];

const services = [
  {
    number: "01",
    title: "Pharmaceutical Brand Websites",
    description:
      "Custom websites for pharma brands, product detail pages, HCP portals, and patient education platforms. Built for trust, compliance awareness, and conversion.",
    accentColor: "#25D366",
    accentEnd: "#00B09B",
    Icon: Globe,
  },
  {
    number: "02",
    title: "WhatsApp Chatbot Integration",
    description:
      "AI-powered WhatsApp bots for patient queries, product FAQs, doctor detailing support, and appointment scheduling. Integrated with Twilio and custom backends.",
    accentColor: "#3B82F6",
    accentEnd: "#2563EB",
    Icon: MessageSquare,
  },
  {
    number: "03",
    title: "Healthcare Web Applications",
    description:
      "Full-stack web apps for clinic management, prescription tracking, patient onboarding, and telemedicine workflows.",
    accentColor: "#F59E0B",
    accentEnd: "#D97706",
    Icon: Monitor,
  },
  {
    number: "04",
    title: "E-Commerce & D2C Platforms",
    description:
      "Direct-to-consumer storefronts for pharmaceutical and wellness brands — product catalogues, secure checkout, prescription upload, and order tracking.",
    accentColor: "#EC4899",
    accentEnd: "#DB2777",
    Icon: ShoppingCart,
  },
  {
    number: "05",
    title: "SEO & Digital Marketing for Pharma",
    description:
      "Search engine optimisation, content marketing, and performance campaigns targeting healthcare professionals and patients in Tier-1 and Tier-2 Indian cities.",
    accentColor: "#06B6D4",
    accentEnd: "#0891B2",
    Icon: TrendingUp,
  },
  {
    number: "06",
    title: "API & Backend Development",
    description:
      "RESTful APIs, database architecture, and backend services for healthcare platforms — built with Node.js, Next.js, and PostgreSQL.",
    accentColor: "#8B5CF6",
    accentEnd: "#7C3AED",
    Icon: Server,
  },
];

export default function TechServices() {
  return (
    <section id="tech" className="relative py-24 px-4 overflow-hidden z-20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-20">
          <span className="text-electric font-mono tracking-widest text-sm uppercase mb-4 block">Tech Division</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text-tech tracking-tighter mb-6">
            Milarch Tech —<br />Digital Solutions
          </h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-md">
            Engineering high-performance web ecosystems that power pharma brands, healthcare platforms, and modern businesses.
          </p>
        </div>

        {/* Asymmetric service list */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4">
          <div className="flex flex-col gap-4">
            {services.filter((_, i) => i % 2 === 0).map((service, i) => (
              <ServiceCard key={service.number} service={service} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:mt-10">
            {services.filter((_, i) => i % 2 === 1).map((service, i) => (
              <ServiceCard key={service.number} service={service} index={i * 2 + 1} />
            ))}
          </div>
        </div>

        {/* What we've built */}
        <div className="mt-24">
          <p className="text-electric font-mono tracking-widest text-sm uppercase mb-3">What We&apos;ve Built</p>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10 tracking-tighter">
            Real products, in production
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.name} study={study} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      style={{
        backgroundImage: `linear-gradient(160deg, ${study.accentColor}1c 0%, ${study.accentColor}05 45%, transparent 75%)`,
      }}
      className="glass rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-md p-6"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: `${study.accentColor}15` }}
        >
          <study.Icon className="w-5 h-5" style={{ color: study.accentColor }} />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-display font-bold text-foreground leading-snug">{study.name}</h4>
          <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: study.accentColor }}>
            {study.tagline}
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{study.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      style={{
        ["--card-accent" as string]: service.accentColor,
        backgroundImage: `linear-gradient(160deg, ${service.accentColor}1c 0%, ${service.accentColor}05 45%, transparent 75%)`,
      } as CSSProperties}
      className="accent-card group glass rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-md"
    >
      {/* Gradient top bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${service.accentColor}, ${service.accentEnd})` }}
      />
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: `${service.accentColor}15` }}
          >
            <service.Icon className="w-5 h-5" style={{ color: service.accentColor }} />
          </div>
          <div className="flex-1">
            <div className="mb-1.5">
              <span
                className="text-xs font-mono font-bold tracking-widest"
                style={{ color: service.accentColor }}
              >
                {service.number}
              </span>
            </div>
            <h3 className="text-base font-display font-bold text-foreground mb-2 leading-snug">
              {service.title}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
