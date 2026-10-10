import { ArrowRight, Boxes, Code2, Database, Globe, MessageCircle, Search, ShoppingCart } from "lucide-react";
import CircuitField from "@/components/tech/CircuitField";
import ContactForm from "@/components/sections/ContactForm";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { techProducts, techServices } from "@/data/tech";

const SERVICE_ICONS = [Globe, MessageCircle, Boxes, ShoppingCart, Search, Database];

const PRINCIPLES = [
  {
    title: "Backend first",
    body: "Anyone can build a nice front end. We start with the data and the APIs that have to survive real orders, real patients and real sales teams.",
  },
  {
    title: "Proven, boring stack",
    body: "Node.js, Next.js and PostgreSQL. Choices that are easy to hire for and easy to maintain, not tools picked to look good on a résumé.",
  },
  {
    title: "We use what we build",
    body: "Milarch Pharma is our own pharmaceutical company. Cipher runs its field team every day, so we know what healthcare businesses need from software.",
  },
];

export default function TechHome() {
  return (
    <>
      {/* Hero */}
      <section className="tech-grid relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40 lg:px-8">
        <CircuitField className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#0A0918_20%,transparent_70%)]" />

        <div className="relative mx-auto grid max-w-site items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="tech-eyebrow rise">Milarch Tech · Hyderabad</p>
            <h1 className="rise rise-1 mt-6 font-tech text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Software that runs <span className="text-[#2BD3D8]">real businesses</span>.
            </h1>
            <p className="rise rise-2 mt-6 max-w-xl text-lg leading-relaxed text-[#A19FC2]">
              We build the platforms behind pharma field teams, WhatsApp-first businesses, recruitment agencies and
              compliance firms. Live systems handling real orders and real sales teams every day.
            </p>
            <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="tech-btn !px-6 !py-3.5">
                Start a project <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#work" className="tech-btn-ghost !px-6 !py-3.5">
                See our work
              </a>
            </div>
          </div>

          {/* Status panel */}
          <div className="rise rise-3 tech-card overflow-hidden shadow-[0_30px_80px_-30px_rgba(43,211,216,0.35)]">
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E5195F]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFC20E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#2BD3D8]" />
              <span className="ml-3 font-mono text-xs text-white/40">milarch-tech / production</span>
            </div>
            <ul className="divide-y divide-white/[0.06] font-mono text-sm">
              {techProducts.map((p) => (
                <li key={p.name} className="flex items-center gap-4 px-5 py-4">
                  <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-[#3EE08F] shadow-[0_0_10px_#3EE08F]" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-white">{p.name}</span>
                    <span className="block truncate text-xs text-white/45">{p.kind}</span>
                  </span>
                  <span className="rounded-full bg-[#3EE08F]/10 px-2.5 py-1 text-[11px] text-[#3EE08F]">live</span>
                </li>
              ))}
            </ul>
            <p className="border-t border-white/[0.06] px-5 py-3 font-mono text-xs text-white/40">
              4 products · 4 industries · all in production
            </p>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-site">
          <div className="reveal max-w-2xl">
            <p className="tech-eyebrow">Our work</p>
            <h2 className="mt-4 font-tech text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Built for real problems, running today
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {techProducts.map((p, i) => (
              <article key={p.name} className="reveal tech-card group relative overflow-hidden p-7 md:p-9">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#2BD3D8]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#2BD3D8]/15" />
                <p className="font-mono text-xs text-white/40">0{i + 1} · {p.kind}</p>
                <h3 className="mt-3 font-tech text-3xl font-semibold text-white">{p.name}</h3>
                <p className="mt-4 leading-relaxed text-[#A19FC2]">{p.problem}</p>
                <ul className="mt-6 grid gap-2.5 text-sm text-white/85">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-3 shrink-0 rounded-full bg-[#2BD3D8]" />
                      {f}
                    </li>
                  ))}
                </ul>
                {p.note && (
                  <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2BD3D8]/10 px-3 py-1.5 text-xs font-medium text-[#2BD3D8]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2BD3D8]" /> {p.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-white/[0.06] bg-[#0E0C20] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-site">
          <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="tech-eyebrow">Services</p>
              <h2 className="mt-4 max-w-2xl font-tech text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                What we can build for you
              </h2>
            </div>
            <p className="max-w-sm text-[#A19FC2]">
              Specialists in healthcare and pharma, and just as comfortable with any business that runs on WhatsApp and
              spreadsheets today.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {techServices.map((s, i) => {
              const Icon = SERVICE_ICONS[i] ?? Code2;
              return (
                <div key={s.title} className="reveal bg-[#0E0C20] p-7 transition-colors hover:bg-[#141230]">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#2BD3D8]/10 text-[#2BD3D8]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-tech text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A19FC2]">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-site">
          <p className="tech-eyebrow reveal">How we build</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="reveal border-t border-white/15 pt-6">
                <h3 className="font-tech text-2xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-[#A19FC2]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="reveal relative mx-auto max-w-site overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-[#16133A] to-[#0E0C20] px-6 py-14 sm:px-10 md:px-14 md:py-16">
          <CircuitField className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="font-tech text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                Running your business on spreadsheets and WhatsApp groups?
              </h2>
              <p className="mt-5 max-w-md text-lg text-[#A19FC2]">That&apos;s exactly the gap we close. Tell us what you need.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://wa.me/917083820068" target="_blank" rel="noopener noreferrer" className="tech-btn !px-6 !py-3.5">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp +91 70838 20068
                </a>
                <a href="mailto:info@milarch.in?subject=Milarch%20Tech%20project" className="tech-btn-ghost !px-6 !py-3.5">
                  info@milarch.in
                </a>
              </div>
            </div>
            <ContactForm dark />
          </div>
        </div>
      </section>
    </>
  );
}
