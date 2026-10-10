import type { Metadata } from "next";
import Image from "next/image";
import BrandName from "@/components/brand/BrandName";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { RxBadge, CompactProductCard } from "@/components/sections/ProductCard";
import AddToCart from "./AddToCart";
import JsonLd from "@/components/JsonLd";
import { productSchema } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const name = product.brandName.replace("™", "");
  const title = `${name}: ${product.tagline}`;
  const description = `${name} (${product.composition}). ${product.clinicalIndication}. ${product.pack}.`;
  const url = `/pharma/products/${product.slug}`;
  return {
    title,
    description,
    keywords: [name, product.category, ...product.tags, "Milarch Pharma"],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: product.image, alt: `${name} pack` }] },
    twitter: { card: "summary_large_image", title, description, images: [product.image] },
  };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.featured).slice(0, 2);

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 md:pt-32 lg:px-8">
      <div className="container-site">
        <Link
          href="/#products"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          All products
        </Link>
        <JsonLd data={productSchema(product)} />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Pack shot */}
          <div
            className="rise relative aspect-square overflow-hidden rounded-[2rem] lg:sticky lg:top-28"
            style={{ background: product.accentTint }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
              style={{ background: product.accentColor }}
            />
            <Image
              src={product.image}
              alt={`${product.brandName} pack`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-10 drop-shadow-[0_30px_40px_rgba(29,26,51,0.22)] md:p-16"
            />
          </div>

          {/* Details */}
          <div className="rise rise-1">
            <p className="text-sm font-semibold" style={{ color: product.accentColor }}>
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-tight text-foreground md:text-6xl">
              <BrandName name={product.brandName} />
            </h1>
            <p className="mt-3 text-xl text-[var(--muted)]">{product.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <RxBadge product={product} />
              {product.tags.map((tag) => (
                <span key={tag} className="chip bg-[var(--surface-2)] text-[var(--muted)]">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-8 text-lg leading-relaxed text-foreground/85">{product.description}</p>

            <dl className="mt-8 divide-y divide-[var(--border)] rounded-3xl border border-[var(--border)] bg-white">
              <Row label="Composition" value={product.composition} />
              <Row label="Form and pack" value={product.pack} />
              <Row label="Indication" value={product.clinicalIndication} />
            </dl>

            <AddToCart
              slug={product.slug}
              price={product.price}
              accentColor={product.accentColor}
              requiresPrescription={product.requiresPrescription}
            />

            <h2 className="mt-10 text-sm font-semibold text-foreground">Key benefits</h2>
            <ul className="mt-4 grid gap-3">
              {[product.benefit, "Manufactured to Good Manufacturing Practice (GMP) standards"].map((b) => (
                <li key={b} className="flex items-start gap-3 text-[var(--muted)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: product.accentColor }} />
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-10 rounded-2xl bg-[var(--surface-2)] p-4 text-xs leading-relaxed text-[var(--muted)]">
              Use only as directed by your doctor. This page is general information and not a substitute for
              professional medical advice.
            </p>
          </div>
        </div>

        <h2 className="mt-24 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          More from Milarch Pharma
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {related.map((p) => (
            <CompactProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-foreground">{label}</dt>
      <dd className="text-sm leading-relaxed text-[var(--muted)]">{value}</dd>
    </div>
  );
}
