"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-32 px-8 flex justify-center items-center">
      <div className="max-w-4xl w-full text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Story
        </motion.h1>
        <motion.p 
          className="text-xl text-softwhite/80 leading-relaxed mb-8 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Founded in 2021 by Nachiketh Desai in Hyderabad, India, Milarch began as a vision to bridge the gap between healthcare precision and digital velocity. We recognized early on that the meticulous standards required to formulate women&apos;s healthcare solutions (Milarch Pharma) are grounded in the same principles of exactitude needed to build high-performance digital architecture (Milarch Tech).
        </motion.p>
        <motion.p 
          className="text-xl text-softwhite/80 leading-relaxed text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Today, we operate as a dual-force organization. On one front, we empower women through critical interventions in gynecology and general wellness. On the other, we empower businesses through elite web development, database architecture, and digital strategy.
        </motion.p>
      </div>
    </div>
  );
}
