"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pill } from "lucide-react";

const products = [
  { name: "MYCOCIDE Vg™", color: "from-[#5BBAB5] to-[#00B4D8]", shadow: "shadow-[0_0_30px_rgba(91,186,181,0.3)]", text: "text-teal", bg: "bg-teal/10" },
  { name: "FETOGRO™", color: "from-[#FDB813] to-[#e6a500]", shadow: "shadow-[0_0_30px_rgba(253,184,19,0.3)]", text: "text-gold", bg: "bg-gold/10" },
  { name: "PCOMet M™", color: "from-[#5E51A2] to-[#322970]", shadow: "shadow-[0_0_30px_rgba(94,81,162,0.3)]", text: "text-purple", bg: "bg-purple/10" },
  { name: "BZeeVIT™", color: "from-[#2BB2C2] to-[#5E51A2]", shadow: "shadow-[0_0_30px_rgba(43,178,194,0.3)]", text: "text-electric", bg: "bg-electric/10" },
  { name: "SYMGUT™", color: "from-[#FDB813] to-[#E81B62]", shadow: "shadow-[0_0_30px_rgba(253,184,19,0.3)]", text: "text-gold", bg: "bg-gold/10" },
  { name: "CERVIVE™", color: "from-[#E81B62] to-[#5E51A2]", shadow: "shadow-[0_0_30px_rgba(232,27,98,0.3)]", text: "text-pink", bg: "bg-pink/10" },
];

export default function PharmaShowcase() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden z-20 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="text-center mb-24 max-w-2xl relative z-10">
        <span className="text-teal font-mono tracking-widest text-sm uppercase mb-4 block">Product Lines</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tighter mb-6">
          Precision Pharma<br />For Women&apos;s Health
        </h2>
        <p className="text-[var(--muted)]">
          Explore our six core therapies engineered to navigate complex physiological milestones with unerring accuracy.
        </p>
      </div>

      <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center">
        {/* Central orbit node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-teal/30 bg-teal/10 backdrop-blur-md flex items-center justify-center z-10 hidden md:flex">
          <Pill className="text-teal/60 w-12 h-12" />
        </div>

        {/* Orbit rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] md:w-[60%] md:h-[120%] rounded-[100%] border border-teal/15 rotate-45 hidden md:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] md:w-[80%] md:h-[100%] rounded-[100%] border border-foreground/5 -rotate-45 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-16 md:gap-y-24 relative z-20 w-full px-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            >
              <Link href={`/pharma/products/${product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                <motion.div
                  className="bg-[var(--card)] border border-[var(--card-border)] p-8 rounded-3xl group cursor-pointer hover:border-[var(--border)] transition-all relative flex flex-col items-center text-center shadow-sm hover:shadow-md"
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div
                    className={`absolute -inset-1 bg-gradient-to-b ${product.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-3xl`}
                  />

                  <div
                    className={`w-16 h-16 rounded-full ${product.bg} flex items-center justify-center mb-6 relative z-10 transition-colors`}
                  >
                    <Pill className={`w-8 h-8 ${product.text}`} />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-foreground mb-2 relative z-10">{product.name}</h3>
                  <p className="text-[var(--muted)] text-sm font-medium uppercase tracking-widest relative z-10">Details &gt;</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
