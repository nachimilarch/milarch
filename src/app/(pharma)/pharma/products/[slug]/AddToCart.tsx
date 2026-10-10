"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShieldAlert } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function AddToCart({
  slug,
  price,
  accentColor,
  requiresPrescription,
}: {
  slug: string;
  price: number;
  accentColor: string;
  requiresPrescription: boolean;
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-5 shadow-md md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-medium text-foreground">₹{price.toLocaleString("en-IN")}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-1">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--surface-2)]"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--surface-2)]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {requiresPrescription && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-[#FCE7EF] p-3 text-xs leading-relaxed text-[#7A1238]">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          Prescription required. You&apos;ll be asked to upload a valid prescription at checkout for our pharmacist to
          verify before your order ships.
        </p>
      )}

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            addItem(slug, qty);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className="btn text-white hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          {added ? "Added to cart ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={() => {
            addItem(slug, qty);
            router.push("/cart");
          }}
          className="btn border bg-white hover:bg-[var(--surface-2)]"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
