"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Share2, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
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
    <section id="contact" className="relative py-24 px-4 pb-32 z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

        {/* Left — heading + contact info card */}
        <div className="text-center lg:text-left z-10">
          <span className="text-[var(--muted)] font-mono tracking-widest text-sm uppercase mb-4 block">Connect</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tighter mb-6">
            Get in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-electric to-pink">
              Touch.
            </span>
          </h2>

          <p className="text-[var(--muted)] max-w-sm mb-8 leading-relaxed mx-auto lg:mx-0">
            For product enquiries, prescription support, partnerships, or tech project discussions.
          </p>

          <div className="glass-strong rounded-2xl p-8 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-4 text-[var(--muted)]">
              <MapPin className="text-teal w-5 h-5 flex-shrink-0" />
              <span>Hyderabad, Telangana, India</span>
            </div>
            <div className="flex items-center gap-4 text-[var(--muted)]">
              <Mail className="text-electric w-5 h-5 flex-shrink-0" />
              <a href="mailto:info@milarch.in" className="hover:text-foreground transition-colors">
                info@milarch.in
              </a>
            </div>
            <div className="pt-1">
              <a
                href="https://wa.me/917083820068"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1fba59] transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.527 5.855L0 24l6.335-1.652A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.402l-.371-.22-3.763.98.997-3.659-.241-.376A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Right — contact form */}
        <div className="w-full relative z-10">
          <form className="glass-strong rounded-3xl p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
            <motion.div whileFocus={{ y: -5 }} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--muted)] ml-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full glass-subtle rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-teal transition-all"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div whileFocus={{ y: -5 }} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--muted)] ml-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full glass-subtle rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-electric transition-all"
                placeholder="you@example.com"
              />
            </motion.div>

            <motion.div whileFocus={{ y: -5 }} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--muted)] ml-2">Message</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full glass-subtle rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-gold transition-all resize-none"
                placeholder="How can we help you?"
              />
            </motion.div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="hover-lift w-full bg-gradient-brand text-white font-bold rounded-xl py-4 hover:opacity-90 transition-opacity mt-2 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✓" : "Send Message"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-500 -mt-2">
                Something went wrong — please WhatsApp us instead.
              </p>
            )}
          </form>

          {/* Floating socials */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none hidden lg:block">
            <motion.a
              href="#"
              className="absolute -top-10 -right-10 w-12 h-12 glass rounded-full flex items-center justify-center text-foreground border border-[var(--border)] shadow-sm pointer-events-auto hover:bg-teal hover:text-white hover:border-teal transition-colors"
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Globe className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              className="absolute -bottom-10 -left-10 w-12 h-12 glass rounded-full flex items-center justify-center text-foreground border border-[var(--border)] shadow-sm pointer-events-auto hover:bg-electric hover:text-white hover:border-electric transition-colors"
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

      </div>
    </section>
  );
}
