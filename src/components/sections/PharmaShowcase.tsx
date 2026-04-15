"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pill } from "lucide-react";

const products = [
  { name: "MYCOCIDE Vg™", color: "from-[#00F5D4] to-[#00B4D8]", shadow: "shadow-[0_0_30px_rgba(0,245,212,0.4)]", text: "text-[#00F5D4]" },
  { name: "FETOGRO™", color: "from-[#C9A96E] to-[#B0893C]", shadow: "shadow-[0_0_30px_rgba(201,169,110,0.4)]", text: "text-[#C9A96E]" },
  { name: "PCOMet M™", color: "from-[#7B2FFF] to-[#5A18C8]", shadow: "shadow-[0_0_30px_rgba(123,47,255,0.4)]", text: "text-[#7B2FFF]" },
  { name: "BZeeVIT™", color: "from-[#F0F4FF] to-[#A0AABC]", shadow: "shadow-[0_0_30px_rgba(240,244,255,0.4)]", text: "text-[#F0F4FF]" },
  { name: "SYMGUT™", color: "from-[#FF9E00] to-[#E85D04]", shadow: "shadow-[0_0_30px_rgba(255,158,0,0.4)]", text: "text-[#FF9E00]" },
  { name: "CERVIVE™", color: "from-[#FF758F] to-[#C9184A]", shadow: "shadow-[0_0_30px_rgba(255,117,143,0.4)]", text: "text-[#FF758F]" },
];

export default function PharmaShowcase() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden z-20 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent" />
      
      <div className="text-center mb-24 max-w-2xl relative z-10">
        <span className="text-teal font-mono tracking-widest text-sm uppercase mb-4 block">Product Lines</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter mb-6">
          Precision Pharma<br/>For Women&apos;s Health
        </h2>
        <p className="text-softwhite/70">
          Explore our six core therapies engineered to navigate complex physiological milestones with unerring accuracy.
        </p>
      </div>

      <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center">
        {/* Orbital central node */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-teal/20 bg-teal/5 backdrop-blur-md flex items-center justify-center z-10 hidden md:flex">
          <Pill className="text-teal/40 w-12 h-12" />
        </div>
        
        {/* Orbit Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] md:w-[60%] md:h-[120%] rounded-[100%] border border-teal/10 rotate-45 hidden md:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] md:w-[80%] md:h-[100%] rounded-[100%] border border-white/5 -rotate-45 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-16 md:gap-y-24 relative z-20 w-full px-4">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`md:nth-[3n+2]:mt-12 md:nth-[3n+3]:mt-24`} // Stagger layout
            >
              <Link href={`/pharma/products/${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                <motion.div 
                  className={`bg-navy/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl group cursor-pointer hover:border-white/30 transition-colors relative flex flex-col items-center text-center`}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-b ${product.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl ${product.shadow}`} />
                  
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 relative z-10 group-hover:bg-white/10 transition-colors">
                    <Pill className={`w-8 h-8 ${product.text}`} />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-2 relative z-10">{product.name}</h3>
                  <p className="text-softwhite/50 text-sm font-medium uppercase tracking-widest relative z-10">Details &gt;</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
