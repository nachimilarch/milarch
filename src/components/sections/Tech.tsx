import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const IN_PRODUCTION = [
  { name: "Cipher", tagline: "Field force and billing app running Milarch Pharma's own sales team" },
  { name: "VaartaBot", tagline: "WhatsApp business platform with flow builder, broadcasts and CRM lead capture" },
  { name: "LadderStep", tagline: "HR, recruitment and outreach software for candidates and companies" },
  { name: "CertifyBusiness CRM", tagline: "Outbound CRM for a compliance and certification firm" },
];

const SERVICES = [
  "Pharmaceutical brand websites",
  "WhatsApp chatbot integration",
  "Healthcare web applications",
  "E-commerce and direct-to-consumer platforms",
  "Search engine optimisation (SEO) and digital marketing for pharma",
  "Application programming interface (API) and backend development",
];

export default function Tech() {
  return (
    <section id="tech" className="section bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="reveal">
          <Image src="/brand/milarch-tech.png" alt="Milarch Tech" width={88} height={86} className="h-20 w-auto" />
          <h2 className="mt-8 font-display text-4xl font-medium leading-tight tracking-tight text-foreground text-balance md:text-5xl">
            Milarch Tech builds the software behind healthcare businesses
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-[var(--muted)]">
            Engineering high-performance web ecosystems that power pharma brands, healthcare platforms and modern
            businesses.
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-3 text-sm text-foreground sm:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2BB2C2]" />
                {s}
              </li>
            ))}
          </ul>
          <a href="/#contact" className="btn-ghost mt-10">
            Discuss a project <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="reveal">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">In production today</h3>
          <ul className="mt-5 divide-y divide-[var(--border)] rounded-3xl border border-[var(--border)]">
            {IN_PRODUCTION.map((p, i) => (
              <li key={p.name} className="flex items-start gap-5 p-6">
                <span className="font-display text-sm text-[var(--muted)]">0{i + 1}</span>
                <div>
                  <p className="font-display text-xl font-medium text-foreground">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{p.tagline}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
