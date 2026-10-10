"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, ShieldAlert } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { lines, subtotal, setQty, removeItem, hasPrescriptionItems } = useCart();

  if (lines.length === 0) {
    return (
      <div className="relative min-h-screen pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center z-20">
        <ShoppingBag className="w-16 h-16 text-[var(--muted)]/40 mb-6" />
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">Your cart is empty</h1>
        <p className="text-[var(--muted)] mb-8 max-w-sm">
          Browse our formulations and add a product to get started.
        </p>
        <Link
          href="/#pharma"
          className="hover-lift px-8 py-3.5 bg-teal text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Explore Pharma
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 z-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-10">Your Cart</h1>

        {hasPrescriptionItems && (
          <div className="flex items-start gap-3 glass-teal rounded-xl p-4 mb-8 text-sm">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-teal mt-0.5" />
            <span className="text-foreground">
              Your cart contains prescription items. You&apos;ll upload a prescription at checkout — our pharmacist
              verifies it before the order ships.
            </span>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-10">
          {lines.map((line) => (
            <motion.div
              key={line.slug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                ["--card-accent" as string]: line.accentColor,
                backgroundImage: `linear-gradient(160deg, ${line.accentColor}16 0%, transparent 65%)`,
              } as CSSProperties}
              className="accent-card glass rounded-2xl p-5 flex items-center gap-5"
            >
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: `${line.accentColor}22` }}
              >
                <line.Icon className="w-5 h-5" style={{ color: line.accentColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/pharma/products/${line.slug}`} className="font-display font-bold text-foreground hover:underline">
                  {line.brandName}
                </Link>
                <p className="text-xs text-[var(--muted)] uppercase tracking-wide">{line.category}</p>
                {line.requiresPrescription && (
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-teal mt-1">
                    Prescription Required
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 glass-subtle rounded-full px-2 py-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setQty(line.slug, line.qty - 1)}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-2)] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(line.slug, line.qty + 1)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[var(--surface-2)] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="w-20 text-right font-semibold text-foreground flex-shrink-0">
                ₹{line.price * line.qty}
              </span>

              <button
                type="button"
                onClick={() => removeItem(line.slug)}
                aria-label={`Remove ${line.brandName}`}
                className="text-[var(--muted)] hover:text-[var(--highlight-pink)] transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-lg">
            <span className="text-[var(--muted)]">Subtotal</span>
            <span className="font-display font-bold text-2xl text-foreground">₹{subtotal}</span>
          </div>
          <p className="text-xs text-[var(--muted)]">Shipping and any applicable taxes are calculated at checkout.</p>
          <Link
            href="/checkout"
            className="hover-lift w-full text-center bg-gradient-brand text-white font-bold rounded-xl py-4 hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
