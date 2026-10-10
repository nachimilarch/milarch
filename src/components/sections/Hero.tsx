import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import AnimatedMark from "@/components/brand/AnimatedMark";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:min-h-[100svh] lg:px-8 lg:pb-16">
      {/* soft background washes in logo colours */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[44rem] w-[44rem] rounded-full bg-[#ECEAF6] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-56 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#FFF1C9] opacity-70 blur-3xl" />

      <div className="container-site relative grid items-center gap-10 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow rise">Milarch Pharma · Women&apos;s health</p>
          <h1 className="rise rise-1 mt-6 font-display text-[2.9rem] font-medium leading-[1.02] tracking-tight text-foreground text-balance sm:text-6xl lg:text-[5rem]">
            Organised interventions.{" "}
            <span className="italic text-purple">Decisive outcomes.</span>
          </h1>
          <p className="rise rise-2 mt-7 max-w-xl text-lg leading-relaxed text-[var(--muted)] text-pretty">
            Specialised formulations for every stage of a woman&apos;s health: pregnancy and fetal growth, vaginal
            infections, gut and vaginal flora, Polycystic Ovary Syndrome and cervical health.
          </p>
          <div className="rise rise-3 mt-9 flex flex-wrap gap-3">
            <Link href="/#products" className="btn-primary">
              Explore products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#doctors" className="btn-ghost">
              <Stethoscope className="h-4 w-4" /> For healthcare professionals
            </Link>
          </div>
          <dl className="rise rise-4 mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-[var(--border)] pt-6">
            <Stat value="6" label="Brands" />
            <Stat value="5" label="Therapy areas" />
            <Stat value="2021" label="Est. in Hyderabad" />
          </dl>
        </div>

        <MarkStage />
      </div>
    </section>
  );
}

/** The logo assembling itself on a soft stage, with three labels that explain what it depicts. */
function MarkStage() {
  return (
    <figure className="mark-stage relative mx-auto w-full max-w-[26rem] sm:max-w-[32rem] lg:max-w-[38rem]">
      <div className="relative aspect-square">
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_45%,#FFFFFF_0%,#F3F0FA_55%,#ECE7F6_100%)] shadow-[inset_0_0_0_1px_rgba(91,85,165,0.08)]" />

        {/* orbit rings with tablets travelling on them */}
        <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <g className="orbit">
            <circle cx="200" cy="200" r="188" fill="none" stroke="#5B55A5" strokeOpacity=".18" strokeDasharray="2 7" />
            <circle cx="200" cy="12" r="6" fill="#E5195F" />
            <circle cx="388" cy="200" r="4.5" fill="#5EC4BA" />
            <circle cx="67" cy="333" r="5" fill="#FFC20E" />
          </g>
          <g className="orbit-rev">
            <circle cx="200" cy="200" r="160" fill="none" stroke="#5B55A5" strokeOpacity=".1" />
            <rect x="30" y="190" width="22" height="10" rx="5" fill="#5B55A5" fillOpacity=".5" transform="rotate(-30 41 195)" />
            <rect x="330" y="260" width="18" height="8" rx="4" fill="#E5195F" fillOpacity=".5" transform="rotate(40 339 264)" />
          </g>
        </svg>

        <AnimatedMark className="absolute left-1/2 top-[13%] h-[76%] w-auto -translate-x-1/2" />

        <Chip delay="1.4s" className="left-[2%] top-[14%]" colour="#E5195F" label="Mother" />
        <Chip delay="2.6s" className="right-[0%] top-[30%]" colour="#FFC20E" label="Child" />
        <Chip delay=".7s" className="bottom-[9%] left-[0%]" colour="#5EC4BA" label="Capsules form the M" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-[var(--muted)]">
        Our mark: a mother and child, formed into an M from capsules and tablets.
      </figcaption>
    </figure>
  );
}

function Chip({ label, colour, delay, className }: { label: string; colour: string; delay: string; className?: string }) {
  return (
    <span
      className={`mark-chip absolute inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-md backdrop-blur ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: colour }} />
      {label}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-medium text-foreground">{value}</dd>
      <dd className="mt-1 text-xs font-medium text-[var(--muted)]">{label}</dd>
    </div>
  );
}
