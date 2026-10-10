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

export function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/pharma/products/${product.slug}`}
      className="reveal card group flex flex-col overflow-hidden p-3 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]" style={{ background: product.accentTint }}>
        <span
          className="absolute left-4 top-4 z-10 chip bg-white/90 backdrop-blur"
          style={{ color: product.accentColor }}
        >
          {product.category}
        </span>
        <Image
          src={product.image}
          alt={`${product.brandName} pack`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain px-8 pb-6 pt-14 drop-shadow-[0_18px_24px_rgba(29,26,51,0.18)] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <h3 className="font-display text-[1.75rem] font-medium leading-tight text-foreground"><BrandName name={product.brandName} /></h3>
        <p className="mt-1 text-sm font-semibold" style={{ color: product.accentColor }}>
          {product.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{product.clinicalIndication}.</p>
        <p className="mt-4 rounded-2xl bg-[var(--surface-2)] px-4 py-3 text-xs leading-relaxed text-foreground/80">
          <span className="font-semibold text-foreground">Composition: </span>
          {product.composition}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <RxBadge product={product} />
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
            View <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
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
