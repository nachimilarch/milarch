import Image from "next/image";
import BrandName from "@/components/brand/BrandName";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import CapsuleArt from "@/components/brand/CapsuleArt";
import { products } from "@/data/products";

export default function Hero() {
  const [fetogro, mycocide, symgut] = products.filter((p) => p.featured);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36 lg:px-8">
      {/* soft background washes in logo colours */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#ECEAF6] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#FFF1C9] opacity-70 blur-3xl" />

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow rise">Milarch Pharma · Women&apos;s health</p>
          <h1 className="rise rise-1 mt-6 font-display text-[2.75rem] font-medium leading-[1.04] tracking-tight text-foreground text-balance sm:text-6xl lg:text-[4.6rem]">
            Organised interventions.{" "}
            <span className="italic text-purple">Decisive outcomes.</span>
          </h1>
          <p className="rise rise-2 mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] text-pretty">
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

        {/* Graphic: logo-derived capsules with the three lead brands */}
        <div className="relative mx-auto aspect-[5/6] w-full max-w-[34rem] lg:max-w-none">
          <CapsuleArt className="absolute inset-y-0 left-[12%] h-full w-auto" />
          <ProductTile
            className="drift absolute right-0 top-[2%] w-[54%]"
            product={fetogro}
            label="Intrauterine Growth Restriction"
          />
          <ProductTile
            className="drift-2 absolute left-0 top-[41%] w-[47%]"
            product={mycocide}
            label="Vaginal antifungal"
          />
          <ProductTile className="drift absolute right-[1%] top-[60%] w-[47%]" product={symgut} label="Synbiotic" />
        </div>
      </div>
    </section>
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

function ProductTile({
  product,
  label,
  className,
}: {
  product: (typeof products)[number];
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={`/pharma/products/${product.slug}`}
      className={`group block rounded-3xl border border-white/60 bg-white p-3 shadow-lg transition-transform hover:-translate-y-1 ${className ?? ""}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl" style={{ background: product.accentTint }}>
        <Image src={product.image} alt={`${product.brandName} pack`} fill sizes="300px" className="object-contain p-3" />
      </div>
      <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground"><BrandName name={product.brandName} /></p>
          <p className="truncate text-xs text-[var(--muted)]">{label}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
