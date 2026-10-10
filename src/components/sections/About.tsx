import Image from "next/image";

const STATS = [
  { value: "6", label: "Brands in women's health" },
  { value: "5", label: "Therapy areas" },
  { value: "4", label: "Cities with field coverage" },
  { value: "500+", label: "Healthcare professionals reached" },
];

const LEADERS = [
  {
    name: "Nachiketh Desai",
    title: "Founder and Chief Executive Officer",
    image: "/founder-nachiketh.jpg",
    quote:
      "We started Milarch with one conviction: that a pharmaceutical company in 2024 must be as strong in digital as it is in science. Our products address real gaps in women's healthcare. Our tech ensures those products reach the right hands.",
  },
  {
    name: "Milind Desai",
    title: "Managing Director",
    image: "/founder-milind.jpg",
    quote:
      "Nearly two decades in pharmaceutical sales leadership, including senior roles at Intas Pharmaceuticals and Eris Lifesciences, taught me that great products only matter if they reach the right doctors and patients. At Milarch Pharma, I lead our sales strategy and field network to make sure they do.",
  },
];

export default function About() {
  return (
    <section id="about" className="section bg-cream">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow">About Milarch</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground text-balance md:text-5xl">
              A women&apos;s health company, built in Hyderabad
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Our mission</h3>
                <p className="mt-2 leading-relaxed text-[var(--muted)]">
                  Empowering women&apos;s health through precise pharmacology, while engineering reliable,
                  high-performance digital ecosystems for the healthcare industry.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Our vision</h3>
                <p className="mt-2 leading-relaxed text-[var(--muted)]">
                  To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking
                  digital innovation.
                </p>
              </div>
            </div>
          </div>

          <dl className="reveal grid grid-cols-2 gap-px self-start overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)]">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white p-6 md:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-medium text-foreground md:text-5xl">{s.value}</dd>
                <dd className="mt-2 text-sm text-[var(--muted)]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <h3 className="reveal mt-20 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Leadership</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {LEADERS.map((l) => (
            <figure key={l.name} className="reveal card flex flex-col gap-6 p-6 sm:flex-row sm:items-start md:p-8">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--surface-2)]">
                <Image src={l.image} alt={l.name} fill sizes="96px" className="object-cover object-top" />
              </div>
              <div>
                <blockquote className="font-display text-lg leading-relaxed text-foreground">&ldquo;{l.quote}&rdquo;</blockquote>
                <figcaption className="mt-5">
                  <span className="block font-semibold text-foreground">{l.name}</span>
                  <span className="text-sm text-[var(--muted)]">{l.title}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
