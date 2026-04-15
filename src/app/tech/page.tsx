"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TechServices from "@/components/sections/TechServices";

export default function TechPage() {
  return (
    <div className="relative min-h-screen pt-32 flex flex-col items-center">
      <div className="text-center px-4 max-w-3xl mb-16">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image src="/logo-tech.png" alt="Milarch Tech" width={300} height={100} className="object-contain" priority />
        </motion.div>
        <motion.p
          className="text-xl text-[var(--muted)] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Driving operational excellence through high-performance digital solutions. We specialize in robust, scalable web architectures and digital strategy designed to future-proof your presence.
        </motion.p>
      </div>

      <TechServices />
    </div>
  );
}
