import Link from "next/link";
import { Baby, Flower2, Microscope, ShieldCheck, Sprout } from "lucide-react";
import { products, therapyAreas, type TherapyArea } from "@/data/products";
import { CompactProductCard, FeaturedProductCard } from "./ProductCard";

const AREA_ICONS: Record<TherapyArea, typeof Baby> = {
  pregnancy: Baby,
  vaginal: ShieldCheck,
  flora: Sprout,
  pcos: Flower2,
  cervical: Microscope,
};

export default function Products() {
  const featured = products.filter((p) => p.featured);
  const others = products.filter((p) => !p.featured);

  return (
    <section id="products" className="section bg-white">
      <div className="container-site">
        <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Our products</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-foreground text-balance md:text-5xl">
              Six brands for the moments that matter in women&apos;s health
            </h2>
          </div>
          <p className="max-w-sm text-[var(--muted)]">
            Each formulation answers a specific clinical need, from conception through pregnancy and beyond.
          </p>
        </div>

        {/* Therapy areas */}
        <ul className="reveal mt-10 flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap" aria-label="Therapy areas">
          {therapyAreas.map((area) => {
            const Icon = AREA_ICONS[area.id];
            const brands = products.filter((p) => p.therapyArea === area.id);
            return (
              <li key={area.id} className="shrink-0">
                <Link
                  href={`/pharma/products/${brands[0].slug}`}
                  className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-background py-2 pl-2 pr-5 text-sm transition-colors hover:border-indigo"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-purple shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-semibold leading-tight text-foreground">{area.short}</span>
                    <span className="block text-xs text-[var(--muted)]">
                      {brands.map((b) => b.brandName.replace("™", "")).join(", ")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <FeaturedProductCard key={p.slug} product={p} />
          ))}
        </div>

        <h3 className="reveal mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Also from Milarch Pharma
        </h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <CompactProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
