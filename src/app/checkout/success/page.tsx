"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import type { CartLine } from "@/lib/cart-context";

interface LastOrder {
  orderId: string;
  paymentId: string;
  lines: CartLine[];
  subtotal: number;
  needsVerification: boolean;
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("milarch-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="relative min-h-screen pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center z-20">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">No recent order found</h1>
        <Link href="/#pharma" className="hover-lift px-8 py-3.5 bg-teal text-white font-semibold rounded-full hover:opacity-90 transition-opacity">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-40 pb-24 px-4 flex flex-col items-center z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full glass-strong rounded-3xl p-10 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-6" />
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Payment Received</h1>
        <p className="text-[var(--muted)] mb-6">
          Order <span className="font-mono text-foreground">{order.orderId}</span> — thank you for your order.
        </p>

        {order.needsVerification && (
          <div className="flex items-start gap-3 glass-teal rounded-xl p-4 mb-6 text-sm text-left">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-teal mt-0.5" />
            <span className="text-foreground">
              Your order includes prescription items. Our pharmacist will verify your uploaded prescription before
              dispatch and will contact you if there are any issues.
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2 text-left mb-6">
          {order.lines.map((l) => (
            <div key={l.slug} className="flex items-center gap-3 text-sm text-[var(--muted)]">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: l.accentColor }} />
              <span className="flex-1">{l.brandName} × {l.qty}</span>
              <span className="text-foreground font-medium">₹{l.price * l.qty}</span>
            </div>
          ))}
          <div className="border-t border-[var(--border)] pt-3 flex justify-between font-display font-bold text-foreground">
            <span>Total</span>
            <span>₹{order.subtotal}</span>
          </div>
        </div>

        <Link
          href="/"
          className="hover-lift inline-block px-8 py-3.5 bg-gradient-brand text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
