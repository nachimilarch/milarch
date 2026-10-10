"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function PharmaShowcase() {
  return (
    <section id="pharma" className="relative min-h-screen py-24 px-4 overflow-hidden z-20 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="text-center mb-16 max-w-2xl relative z-10">
        <span className="text-teal font-mono tracking-widest text-sm uppercase mb-4 block">Product Lines</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text-pharma tracking-tighter mb-6">
          Milarch Pharma —<br />Women&apos;s Health Specialists
        </h2>
        <p className="text-[var(--muted)] text-base leading-relaxed">
          Dedicated to improving maternal and gynaecological outcomes through scientifically formulated pharmaceutical products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4 relative z-10">
        {products.map((product, i) => (
          <motion.div
            key={product.category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            style={{
              ["--card-accent" as string]: product.accentColor,
              backgroundImage: `linear-gradient(160deg, ${product.accentColor}1c 0%, ${product.accentColor}05 45%, transparent 75%)`,
            } as CSSProperties}
            className="accent-card glass rounded-2xl overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-lg"
          >
            <Link href={`/pharma/products/${product.slug}`} className="flex flex-col flex-1">
              {/* Photo banner — falls back to a colored gradient with the category icon when no photo exists */}
              <div className="relative h-36 w-full flex-shrink-0 overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.brandName}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-4 bg-white"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(160deg, ${product.accentColor}30, ${product.accentEnd}15)` }}
                  >
                    <product.Icon className="w-12 h-12" style={{ color: product.accentColor }} />
                  </div>
                )}
              </div>

              {/* Gradient top bar */}
              <div
                className="h-[3px] w-full flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${product.accentColor}, ${product.accentEnd})` }}
              />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* Icon circle + heading */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${product.accentColor}1A` }}
                  >
                    <product.Icon className="w-5 h-5" style={{ color: product.accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-foreground leading-tight">
                      {product.category}
                    </h3>
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: product.accentColor }}
                    >
                      {product.fullName}
                    </span>
                  </div>
                </div>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `${product.accentColor}18`,
                        color: product.accentColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Indication */}
                <p className="text-sm text-foreground leading-relaxed">{product.clinicalIndication}</p>

                {/* Key benefit */}
                <div className="mt-auto pt-3 border-t border-[var(--border)]">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-1">Key Benefit</p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{product.benefit}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Target Audience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-16 max-w-2xl text-center z-10"
      >
        <p className="text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--border)] pt-8">
          <span className="font-semibold text-foreground">Target Audience:</span>{" "}
          Our formulations are prescribed by gynaecologists, obstetricians, and general practitioners across Telangana and Andhra Pradesh.
        </p>
      </motion.div>
    </section>
  );
}
