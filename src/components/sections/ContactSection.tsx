"use client";

import { motion } from "framer-motion";
import { Globe, Share2, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative min-h-[90vh] py-24 px-4 overflow-hidden z-20 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto gap-16">

      <div className="flex-1 text-center md:text-left z-10">
        <span className="text-[var(--muted)] font-mono tracking-widest text-sm uppercase mb-4 block">Connect</span>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground tracking-tighter mb-6">
          Let&apos;s Build <br />Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-electric to-pink">
            Meaningful.
          </span>
        </h2>

        <div className="flex flex-col gap-4 mt-12">
          <div className="flex items-center gap-4 text-[var(--muted)] justify-center md:justify-start">
            <MapPin className="text-teal w-5 h-5" />
            <span>Hyderabad, Telangana, India</span>
          </div>
          <div className="flex items-center gap-4 text-[var(--muted)] justify-center md:justify-start">
            <Mail className="text-electric w-5 h-5" />
            <a href="mailto:contact@milarch.in" className="hover:text-foreground transition-colors">
              contact@milarch.in
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-md relative z-10">
        <form
          className="bg-[var(--card)] border border-[var(--card-border)] rounded-3xl p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          onSubmit={(e) => { e.preventDefault(); console.log("Form submitted"); }}
        >
          <motion.div whileFocus={{ y: -5 }} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--muted)] ml-2">Name</label>
            <input
              type="text"
              className="w-full bg-[var(--muted-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-teal transition-all"
              placeholder="Elon Musk"
            />
          </motion.div>

          <motion.div whileFocus={{ y: -5 }} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--muted)] ml-2">Email</label>
            <input
              type="email"
              className="w-full bg-[var(--muted-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-electric transition-all"
              placeholder="elon@spacex.com"
            />
          </motion.div>

          <motion.div whileFocus={{ y: -5 }} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--muted)] ml-2">Message</label>
            <textarea
              rows={4}
              className="w-full bg-[var(--muted-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-foreground placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-gold transition-all resize-none"
              placeholder="How can we help you?"
            />
          </motion.div>

          <button className="w-full bg-foreground text-background font-bold rounded-xl py-4 hover:bg-teal hover:text-white transition-colors mt-2">
            Send Message
          </button>
        </form>

        {/* Floating socials */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none hidden md:block">
          <motion.a
            href="#"
            className="absolute -top-10 -right-10 w-12 h-12 bg-[var(--card)] rounded-full flex items-center justify-center text-foreground border border-[var(--border)] shadow-sm pointer-events-auto hover:bg-teal hover:text-white hover:border-teal transition-colors"
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Globe className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#"
            className="absolute -bottom-10 -left-10 w-12 h-12 bg-[var(--card)] rounded-full flex items-center justify-center text-foreground border border-[var(--border)] shadow-sm pointer-events-auto hover:bg-electric hover:text-white hover:border-electric transition-colors"
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
