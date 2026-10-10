"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Minus, Plus, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/lib/cart-context";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-foreground">
        <h1 className="text-4xl text-foreground">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 flex justify-center items-start z-20">
      <div className="max-w-5xl w-full">

        <Link href="/#pharma" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors mb-12 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Pharma
        </Link>

        <div className="flex flex-col md:flex-row gap-16 items-start">

          {/* Floating 3D-ish Product Box */}
          <motion.div
            className="flex-1 w-full max-w-sm mx-auto relative aspect-[3/4] bg-[var(--surface-2)] border border-[var(--border)] rounded-3xl p-8 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50, rotateY: 30 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Glowing Aura behind box */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20"
              style={{ backgroundColor: product.accentColor }}
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/5 to-transparent rounded-3xl" />

            {product.image ? (
              <Image
                src={product.image}
                alt={product.brandName}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain p-10 z-10"
                priority
              />
            ) : (
              <>
                <product.Icon className="w-24 h-24 mb-8 z-10" style={{ color: product.accentColor }} />
                <h2 className="text-4xl font-display font-bold text-center z-10" style={{ color: product.accentColor }}>
                  {product.brandName}
                </h2>
                <div
                  className="w-16 h-1 mt-6 rounded-full opacity-50 z-10"
                  style={{ backgroundColor: product.accentColor }}
                />
              </>
            )}
          </motion.div>

          {/* Details Panel */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
                {product.brandName}
              </h1>
              <p
                className="text-xl font-medium tracking-wide uppercase font-mono mb-8"
                style={{ color: product.accentColor }}
              >
                {product.tagline}
              </p>

              <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl mb-8">
                <p className="text-lg text-[var(--muted)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: `${product.accentColor}18`, color: product.accentColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="glass rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-display font-bold text-foreground">₹{product.price}</span>
                  <div className="flex items-center gap-3 glass-subtle rounded-full px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-semibold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {product.requiresPrescription && (
                  <div className="flex items-start gap-2 text-xs text-[var(--muted)] bg-[var(--surface-2)] rounded-lg p-3 mb-4">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: product.accentColor }} />
                    <span>
                      Prescription required. You&apos;ll be asked to upload a valid prescription at checkout for our
                      pharmacist to verify before your order ships.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    addItem(product.slug, qty);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 1800);
                  }}
                  className="hover-lift w-full text-white font-semibold rounded-xl py-3.5 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: product.accentColor }}
                >
                  {added ? "Added to Cart ✓" : product.requiresPrescription ? "Add to Cart — Prescription Required" : "Add to Cart"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addItem(product.slug, qty);
                    router.push("/cart");
                  }}
                  className="w-full mt-2 font-semibold rounded-xl py-3 border transition-colors hover:bg-[var(--surface-2)]"
                  style={{ borderColor: product.accentColor, color: product.accentColor }}
                >
                  Buy Now
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-foreground font-semibold text-xl mb-4">Key Benefits</h3>
                {[
                  product.clinicalIndication,
                  product.benefit,
                  "Highest standards of GMP manufacturing.",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: product.accentColor }} />
                    <p className="text-[var(--muted)]">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
