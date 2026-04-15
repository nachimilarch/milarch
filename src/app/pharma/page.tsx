"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PharmaShowcase from "@/components/sections/PharmaShowcase";

export default function PharmaPage() {
  return (
    <div className="relative min-h-screen pt-32 flex flex-col items-center">
      <div className="text-center px-4 max-w-3xl mb-16">
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image src="/logo-pharma.png" alt="Milarch Pharma" width={300} height={100} className="object-contain" priority />
        </motion.div>
        <motion.p 
          className="text-xl text-softwhite/80 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Pioneering formulations for women&apos;s wellbeing. From combating infectious diseases to supporting healthy pregnancies and comprehensive multivitamin interventions.
        </motion.p>
      </div>

      <PharmaShowcase />
    </div>
  );
}
