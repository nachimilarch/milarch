"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, UploadCloud, AlertCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, hasPrescriptionItems, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "" });
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentsUnavailable, setPaymentsUnavailable] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="relative min-h-screen pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center z-20">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Nothing to check out</h1>
        <Link href="/#pharma" className="hover-lift px-8 py-3.5 bg-teal text-white font-semibold rounded-full hover:opacity-90 transition-opacity">
          Browse Products
        </Link>
      </div>
    );
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.phone || !form.email || !form.address || !form.city || !form.pincode) {
      setError("Please fill in all required fields.");
      return;
    }
    if (hasPrescriptionItems && !prescriptionFile) {
      setError("Please upload a prescription — your cart contains prescription-required items.");
      return;
    }

    setSubmitting(true);
    try {
      const createRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: subtotal,
          customer: form,
          items: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
          prescriptionRequired: hasPrescriptionItems,
        }),
      });

      if (createRes.status === 503) {
        setPaymentsUnavailable(true);
        setSubmitting(false);
        return;
      }
      if (!createRes.ok) {
        const body = await createRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not start checkout. Please try again.");
      }

      const { orderId, amount, currency, keyId } = await createRes.json();

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Could not load payment gateway. Check your connection and try again.");

      const prescriptionBase64 = prescriptionFile ? await fileToBase64(prescriptionFile) : null;

      const rzp = new window.Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "Milarch Pharma",
        description: `Order — ${lines.length} item${lines.length > 1 ? "s" : ""}`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#4A3D8F" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                customer: form,
                lines,
                prescription:
                  prescriptionBase64 && prescriptionFile
                    ? {
                        filename: prescriptionFile.name,
                        contentType: prescriptionFile.type,
                        contentBase64: prescriptionBase64,
                      }
                    : null,
              }),
            });
            const result = await verifyRes.json();
            if (!verifyRes.ok || !result.success) {
              throw new Error(result.error || "Payment verification failed.");
            }

            sessionStorage.setItem(
              "milarch-last-order",
              JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                lines,
                subtotal,
                needsVerification: hasPrescriptionItems,
              })
            );
            clear();
            router.push("/checkout/success");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong confirming your payment.");
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (paymentsUnavailable) {
    const summary = lines.map((l) => `${l.brandName} x${l.qty}`).join(", ");
    const waMessage = encodeURIComponent(
      `Hi Milarch, I'd like to order: ${summary}. Total: ₹${subtotal}. Name: ${form.name}, Phone: ${form.phone}, Address: ${form.address}, ${form.city}`
    );
    return (
      <div className="relative min-h-screen pt-40 pb-24 px-4 flex flex-col items-center justify-center text-center z-20">
        <AlertCircle className="w-14 h-14 text-[var(--highlight-gold)] mb-6" />
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">Online payment isn&apos;t live yet</h1>
        <p className="text-[var(--muted)] max-w-md mb-8">
          We received your order details but our payment gateway isn&apos;t configured yet. Send us your order
          directly and we&apos;ll confirm it manually.
        </p>
        <a
          href={`https://wa.me/917083820068?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Send Order via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 z-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass-strong rounded-3xl p-8 flex flex-col gap-5"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Checkout</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *" value={form.name} onChange={(v) => update("name", v)} placeholder="Priya Sharma" />
            <Field label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+91 90000 00000" type="tel" />
          </div>
          <Field label="Email *" value={form.email} onChange={(v) => update("email", v)} placeholder="priya@example.com" type="email" />
          <Field label="Address *" value={form.address} onChange={(v) => update("address", v)} placeholder="House no, street, area" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="City *" value={form.city} onChange={(v) => update("city", v)} placeholder="Hyderabad" />
            <Field label="State" value={form.state} onChange={(v) => update("state", v)} placeholder="Telangana" />
            <Field label="Pincode *" value={form.pincode} onChange={(v) => update("pincode", v)} placeholder="500001" />
          </div>

          {hasPrescriptionItems && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--muted)]">Upload Prescription *</label>
              <div className="flex items-start gap-2 text-xs text-[var(--muted)] bg-[var(--surface-2)] rounded-lg p-3">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal" />
                <span>Required for prescription items in your cart. Our pharmacist verifies this before shipping.</span>
              </div>
              <label className="flex items-center justify-center gap-2 glass-subtle rounded-xl px-4 py-4 cursor-pointer hover:bg-[var(--surface-2)] transition-colors text-sm">
                <UploadCloud className="w-5 h-5 text-teal" />
                {prescriptionFile ? prescriptionFile.name : "Choose a file (image or PDF)"}
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => setPrescriptionFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-sm text-[var(--highlight-pink)] bg-[var(--highlight-pink)]/10 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="hover-lift w-full bg-gradient-brand text-white font-bold rounded-xl py-4 hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {submitting ? "Processing…" : `Pay ₹${subtotal}`}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 flex flex-col gap-4 sticky top-32"
        >
          <h2 className="font-display font-bold text-foreground text-lg">Order Summary</h2>
          {lines.map((l) => (
            <div key={l.slug} className="flex items-center gap-3 text-sm text-[var(--muted)]">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: l.accentColor }} />
              <span className="flex-1">{l.brandName} × {l.qty}</span>
              <span className="text-foreground font-medium">₹{l.price * l.qty}</span>
            </div>
          ))}
          <div className="border-t border-[var(--border)] pt-4 flex justify-between font-display font-bold text-foreground text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--muted)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full glass-subtle rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-teal transition-all"
      />
    </div>
  );
}
