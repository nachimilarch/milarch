import Image from "next/image";
import BrandName from "@/components/brand/BrandName";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

export function RxBadge({ product }: { product: Product }) {
  return product.requiresPrescription ? (
    <span className="chip bg-[#FCE7EF] text-[#A3134A]">Rx · prescription only</span>
  ) : (
    <span className="chip bg-[var(--secondary-light)] text-[#1D6E66]">No prescription needed</span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/pharma/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(42,36,99,0.35)]"
      style={{ ["--card-accent" as string]: product.accentColor }}
    >
      <div className="relative aspect-[5/4] overflow-hidden" style={{ background: product.accentTint }}>
        <div
          className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full opacity-[0.12] transition-transform duration-700 group-hover:scale-110"
          style={{ background: product.accentColor }}
        />
        <span className="chip absolute left-4 top-4 z-10 bg-white/90 backdrop-blur" style={{ color: product.accentColor }}>
          {product.category}
        </span>
        <Image
          src={product.image}
          alt={`${product.brandName} pack`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain px-10 pb-6 pt-14 drop-shadow-[0_18px_24px_rgba(29,26,51,0.18)] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.75rem] font-medium leading-tight text-foreground">
          <BrandName name={product.brandName} />
        </h3>
        <p className="mt-1 text-sm font-semibold" style={{ color: product.accentColor }}>
          {product.tagline}
        </p>
        <dl className="mt-5 grid gap-3 border-t border-[var(--border)] pt-4 text-sm">
          <Fact label="Used for" value={product.clinicalIndication} />
          <Fact label="Composition" value={product.composition} />
          <Fact label="Pack" value={product.pack} />
        </dl>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <div>
            <p className="font-display text-2xl font-medium text-foreground">₹{product.price.toLocaleString("en-IN")}</p>
            <div className="mt-2">
              <RxBadge product={product} />
            </div>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-indigo text-white transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">{label}</dt>
      <dd className="leading-snug text-foreground/85">{value}</dd>
    </div>
  );
}

export function CompactProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/pharma/products/${product.slug}`}
      className="reveal card group flex items-center gap-4 p-3 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-32" style={{ background: product.accentTint }}>
        <Image src={product.image} alt={`${product.brandName} pack`} fill sizes="128px" className="object-contain p-3" />
      </div>
      <div className="min-w-0 flex-1 py-1 pr-2">
        <p className="text-xs font-semibold" style={{ color: product.accentColor }}>
          {product.category}
        </p>
        <h3 className="mt-0.5 font-display text-xl font-medium text-foreground"><BrandName name={product.brandName} /></h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-[var(--muted)]">{product.clinicalIndication}</p>
      </div>
      <ArrowUpRight className="mr-2 hidden h-5 w-5 shrink-0 text-[var(--muted)] sm:block" />
    </Link>
  );
}
