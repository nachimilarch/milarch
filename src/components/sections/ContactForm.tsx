"use client";

import { useState } from "react";

const LIGHT = {
  field:
    "w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3.5 text-foreground placeholder:text-[var(--muted-foreground)] focus:border-purple focus:outline-none focus:ring-4 focus:ring-[#5B55A5]/10",
  form: "card grid gap-5 p-6 shadow-md md:p-8",
  label: "grid gap-2 text-sm font-medium text-foreground",
  button: "btn-primary w-full disabled:opacity-60",
};

const TECH = {
  field:
    "w-full rounded-xl border border-[#E3E6F0] bg-[#F7F8FC] px-4 py-3.5 text-[#0E1033] placeholder:text-[#8A8FA8] focus:border-[#1FB5BE] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1FB5BE]/15",
  form: "grid gap-5 rounded-3xl border border-[#E3E6F0] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(42,36,99,0.25)] md:p-8",
  label: "grid gap-2 text-sm font-medium text-[#0E1033]",
  button: "tech-btn w-full !py-3.5 disabled:opacity-60",
};

export default function ContactForm({ variant = "pharma" }: { variant?: "pharma" | "tech" }) {
  const ui = variant === "tech" ? TECH : LIGHT;
  const FIELD = ui.field;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={ui.form}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={ui.label}>
          Name
          <input type="text" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={FIELD} placeholder="Your name" />
        </label>
        <label className={ui.label}>
          Email
          <input type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={FIELD} placeholder="you@example.com" />
        </label>
      </div>
      <label className={ui.label}>
        Message
        <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${FIELD} resize-none`} placeholder="How can we help?" />
      </label>
      <button type="submit" disabled={status === "sending"} className={ui.button}>
        {status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✓" : "Send message"}
      </button>
      {status === "error" && (
        <p className="-mt-2 text-sm text-[#B4123F]">Something went wrong. Please WhatsApp us instead.</p>
      )}
    </form>
  );
}
