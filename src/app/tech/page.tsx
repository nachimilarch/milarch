import { ArrowRight } from "lucide-react";
import HeroCircuit from "@/components/tech/HeroCircuit";
import { CipherArt, LadderArt, VaartaArt } from "@/components/tech/ProductArt";
import { BillingArt, CmsArt, CrmArt, ErpArt, LmsArt } from "@/components/tech/SolutionArt";
import ContactForm from "@/components/sections/ContactForm";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { techProducts, techServices, techSolutions } from "@/data/tech";

const PRODUCT_ART: Record<string, () => JSX.Element> = {
  Cipher: CipherArt,
  VaartaBot: VaartaArt,
  LadderStep: LadderArt,
};
const PRODUCT_TINTS = ["#E8F7F8", "#E9F6EF", "#EEEDFA"];
const SOLUTION_ART: Record<(typeof techSolutions)[number]["id"], () => JSX.Element> = {
  billing: BillingArt,
  erp: ErpArt,
  cms: CmsArt,
  lms: LmsArt,
  crm: CrmArt,
};
/* Bento layout: billing and ERP get the wide cards */
const SOLUTION_SPAN = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

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
const STACK = ["Node.js", "Next.js", "PostgreSQL", "WhatsApp Business API"];

export default function TechHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
        <div className="tech-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-[#D6F3F4] opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[#E4E3F8] opacity-70 blur-3xl" />

        <div className="relative mx-auto grid max-w-site items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="tech-eyebrow rise">
              <span className="live-dot h-2 w-2 rounded-full bg-[#16A36A]" /> Milarch Tech · Hyderabad
            </p>
            <h1 className="rise rise-1 mt-6 font-tech text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]">
              Software that runs <span className="tech-grad-text">real businesses</span>.
            </h1>
            <p className="rise rise-2 mt-6 max-w-xl text-lg leading-relaxed text-[#5A5F7D]">
              Custom billing systems, ERP, CMS, LMS and CRM, built around how your business actually works. Plus our
              own platforms for pharma field teams, WhatsApp-first businesses and recruitment agencies.
            </p>
            <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="tech-btn !px-6 !py-3.5">
                Start a project <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#work" className="tech-btn-ghost !px-6 !py-3.5">
                See our products
              </a>
            </div>
            <ul className="rise rise-4 mt-10 flex flex-wrap gap-2 font-mono text-xs text-[#5A5F7D]">
              {techSolutions.map((p) => (
                <li key={p.id} className="inline-flex items-center gap-2 rounded-lg border border-[#E3E6F0] bg-white px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1FB5BE]" /> {p.title.replace("Custom billing systems", "Billing")}
                </li>
              ))}
            </ul>
          </div>
          <HeroCircuit />
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-site">
          <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="tech-eyebrow">What we build</p>
              <h2 className="mt-4 max-w-2xl font-tech text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                Business systems, built to fit
              </h2>
            </div>
            <p className="max-w-sm text-[#5A5F7D]">
              Off-the-shelf software makes you change how you work. We build systems around your process, on a stack you
              can own and maintain.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-6">
            {techSolutions.map((s, i) => {
              const Art = SOLUTION_ART[s.id];
              return (
                <article key={s.id} className={`reveal tech-card group flex flex-col overflow-hidden transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(42,36,99,0.4)] ${SOLUTION_SPAN[i]}`}>
                  <div className="relative flex min-h-[15rem] items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF9FA] to-[#F0EFFB] p-6">
                    <div className="tech-dots pointer-events-none absolute inset-0 opacity-60" />
                    <div className="relative w-full">
                      <Art />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-tech text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-[#5A5F7D]">{s.body}</p>
                    <ul className="mt-4 grid gap-2 text-sm">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1FB5BE]" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-semibold text-[#5A5F7D]">We also build</span>
            {techServices.map((t) => (
              <span key={t} className="rounded-lg border border-[#E3E6F0] bg-white px-3.5 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="work" className="border-y border-[#E3E6F0] bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-site">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="tech-eyebrow">Our own products</p>
            <h2 className="mt-4 font-tech text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              Built for real problems, running today
            </h2>
          </div>

          <div className="mt-16 space-y-8 md:space-y-10">
            {techProducts.map((p, i) => {
              const Art = PRODUCT_ART[p.name];
              const flip = i % 2 === 1;
              return (
                <article key={p.name} className="reveal grid items-center gap-8 overflow-hidden rounded-3xl border border-[#E3E6F0] bg-[#F7F8FC] p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
                  <div className={flip ? "lg:order-2" : ""}>
                    <p className="font-mono text-xs text-[#8A8FA8]">
                      0{i + 1} · {p.kind}
                    </p>
                    <h3 className="mt-3 font-tech text-3xl font-semibold md:text-4xl">{p.name}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-[#5A5F7D]">{p.problem}</p>
                    <ul className="mt-6 grid gap-3 text-[15px]">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#1FB5BE]/15">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1FB5BE]" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    {p.note && (
                      <p className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#16A36A]/10 px-3 py-1.5 text-xs font-semibold text-[#0F7A4F]">
                        <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#16A36A]" /> {p.note}
                      </p>
                    )}
                  </div>
                  <div
                    className={`relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-[1.5rem] p-5 sm:p-8 ${flip ? "lg:order-1" : ""}`}
                    style={{ background: PRODUCT_TINTS[i] }}
                  >
                    <div className="tech-dots pointer-events-none absolute inset-0 opacity-60" />
                    <div className="relative w-full">
                      <Art />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="reveal mx-auto max-w-site">
          <p className="tech-eyebrow">How we build</p>
          <div className="relative mt-12">
            {/* the trace that connects the three principles */}
            <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="absolute left-0 right-0 top-[11px] hidden h-5 w-full md:block" aria-hidden="true">
              <path d="M16 10H984" pathLength={1} className="draw" stroke="url(#ap-grad)" strokeWidth="3" vectorEffect="non-scaling-stroke" fill="none" />
              <defs>
                <linearGradient id="ap-grad" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#2BC4C9" />
                  <stop offset="1" stopColor="#3B3A9E" />
                </linearGradient>
              </defs>
            </svg>
            <div className="grid gap-10 md:grid-cols-3">
              {PRINCIPLES.map((p, i) => (
                <div key={p.title} className="pop relative" style={{ animationDelay: `${0.3 + i * 0.4}s` }}>
                  <span className="relative grid h-11 w-11 place-items-center rounded-full border-[3px] border-white bg-gradient-to-br from-[#2BC4C9] to-[#3B3A9E] font-mono text-sm font-semibold text-white shadow-md">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-tech text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#5A5F7D]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
          <ul className="mt-14 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li key={s} className="rounded-lg border border-[#E3E6F0] bg-white px-3.5 py-2 font-mono text-xs text-[#0E1033]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="reveal relative mx-auto max-w-site overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#E3F6F7] via-[#F1F1FB] to-[#E7E6F8] px-6 py-14 sm:px-10 md:px-14 md:py-16">
          <div className="tech-dots pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(90deg,black,transparent)]" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-tech text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                Running your business on spreadsheets and WhatsApp groups?
              </h2>
              <p className="mt-5 max-w-md text-lg text-[#5A5F7D]">That&apos;s exactly the gap we close. Tell us what you need.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://wa.me/917083820068" target="_blank" rel="noopener noreferrer" className="tech-btn !px-6 !py-3.5">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp +91 70838 20068
                </a>
                <a href="mailto:info@milarch.in?subject=Milarch%20Tech%20project" className="tech-btn-ghost !px-6 !py-3.5">
                  info@milarch.in
                </a>
              </div>
            </div>
            <ContactForm variant="tech" />
          </div>
        </div>
      </section>
    </>
  );
}
