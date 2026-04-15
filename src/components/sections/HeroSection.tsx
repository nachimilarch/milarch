"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";

const CapsuleChipMorph = dynamic(() => import("@/components/canvas/CapsuleChipMorph"), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (containerRef.current) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 150,
        opacity: 0,
      });
    }
  }, []);

  const tagline = "Where Health Meets Innovation".split("");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center pt-24 pb-12 px-8 overflow-hidden z-20"
    >
      {/* Floating Particles — teal + purple, reduced opacity for light bg */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              backgroundColor: i % 2 === 0 ? "#5BBAB5" : "#5E51A2",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.05,
            }}
            animate={{
              y: [0, -100 - Math.random() * 100],
              x: Math.random() * 50 - 25,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl z-10">
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-foreground"
        >
          {tagline.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg md:text-2xl text-[var(--muted)] tracking-wide max-w-lg leading-relaxed"
        >
          Unifying{" "}
          <strong className="text-teal font-semibold">Precision Therapeutics</strong> and{" "}
          <strong className="text-electric font-semibold">Next-Gen Digital Solutions</strong>.
          <br />
          <span className="text-sm opacity-50 mt-4 block font-mono">Located in Hyderabad, India</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Link
            href="/pharma"
            className="group relative px-8 py-4 bg-transparent border border-teal text-teal rounded-full overflow-hidden hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10 font-semibold tracking-wide">Explore Pharma</span>
            <div className="absolute inset-0 bg-teal transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
          </Link>
          <Link
            href="/tech"
            className="group relative px-8 py-4 bg-transparent border border-electric text-electric rounded-full overflow-hidden hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10 font-semibold tracking-wide">Explore Tech</span>
            <div className="absolute inset-0 bg-electric transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
          </Link>
        </motion.div>
      </div>

      <div className="flex-1 w-full h-[50vh] md:h-[80vh] relative mt-12 md:mt-0 z-10 flex items-center justify-center">
        <CapsuleChipMorph />
      </div>
    </section>
  );
}
