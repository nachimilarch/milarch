import ProductGrid from "./ProductGrid";

export default function Products() {
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
        <ProductGrid />
      </div>
    </section>
  );
}
