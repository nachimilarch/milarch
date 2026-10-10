"use client";

import { useState } from "react";
import { products, therapyAreas, type TherapyArea } from "@/data/products";
import { ProductCard } from "./ProductCard";

/** All six brands in one grid, with a therapy-area filter. Shows everything by default. */
export default function ProductGrid() {
  const [area, setArea] = useState<TherapyArea | "all">("all");
  const shown = area === "all" ? products : products.filter((p) => p.therapyArea === area);
  const tabs = [
    { id: "all" as const, label: "All products", count: products.length },
    ...therapyAreas.map((a) => ({ id: a.id, label: a.short, count: products.filter((p) => p.therapyArea === a.id).length })),
  ];

  return (
    <>
      <div className="reveal mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by therapy area">
        {tabs.map((t) => {
          const active = area === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setArea(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-indigo bg-indigo text-white"
                  : "border-[var(--border)] bg-white text-foreground hover:border-indigo"
              }`}
            >
              {t.label}
              <span className={`rounded-full px-1.5 text-xs ${active ? "bg-white/20" : "bg-[var(--surface-2)] text-[var(--muted)]"}`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="reveal mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
