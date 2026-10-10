"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";

const CapsuleChipMorph = dynamic(
  () => import("@/components/canvas/CapsuleChipMorph"),
  { ssr: false }
);

// ✅ Fixed: deterministic array — no Math.random() in render
const PARTICLES = [
  { w: 6, h: 4, top: 15, left: 8, op: 0.12, dy: -140, dx: 12, dur: 14 },
  { w: 3, h: 3, top: 72, left: 22, op: 0.18, dy: -180, dx: -18, dur: 18 },
  { w: 5, h: 5, top: 38, left: 55, op: 0.10, dy: -120, dx: 20, dur: 12 },
  { w: 4, h: 4, top: 85, left: 40, op: 0.22, dy: -160, dx: -10, dur: 16 },
  { w: 7, h: 3, top: 52, left: 75, op: 0.08, dy: -200, dx: 25, dur: 20 },
  { w: 3, h: 6, top: 25, left: 90, op: 0.15, dy: -130, dx: -22, dur: 15 },
  { w: 5, h: 5, top: 68, left: 12, op: 0.20, dy: -150, dx: 15, dur: 13 },
  { w: 4, h: 4, top: 10, left: 60, op: 0.12, dy: -190, dx: -8, dur: 17 },
  { w: 6, h: 3, top: 90, left: 80, op: 0.18, dy: -110, dx: 30, dur: 11 },
  { w: 3, h: 3, top: 45, left: 33, op: 0.14, dy: -170, dx: -20, dur: 19 },
  { w: 5, h: 5, top: 30, left: 48, op: 0.10, dy: -145, dx: 18, dur: 14 },
  { w: 4, h: 6, top: 78, left: 65, op: 0.22, dy: -165, dx: -15, dur: 16 },
  { w: 7, h: 4, top: 60, left: 5, op: 0.08, dy: -125, dx: 22, dur: 21 },
  { w: 3, h: 3, top: 20, left: 95, op: 0.16, dy: -185, dx: -25, dur: 18 },
  { w: 5, h: 5, top: 95, left: 28, op: 0.12, dy: -155, dx: 10, dur: 15 },
  { w: 4, h: 4, top: 5, left: 70, op: 0.20, dy: -175, dx: -12, dur: 13 },
  { w: 6, h: 3, top: 42, left: 85, op: 0.14, dy: -135, dx: 28, dur: 17 },
  { w: 3, h: 5, top: 58, left: 18, op: 0.18, dy: -195, dx: -18, dur: 20 },
  { w: 5, h: 4, top: 82, left: 50, op: 0.10, dy: -115, dx: 16, dur: 12 },
  { w: 4, h: 4, top: 35, left: 38, op: 0.22, dy: -160, dx: -20, dur: 16 },
];

// ✅ Fixed: words not characters — faster, cleaner reveal
const TAGLINE_WORDS = ["Where", "Healthcare", "Meets", "Innovation"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (containerRef.current && textRef.current) {
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center
                 justify-center pt-24 pb-12 px-8 overflow-hidden z-20"
    >
      {/* ✅ Fixed: deterministic particles, no Math.random() */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.w + "px",
              height: p.h + "px",
              backgroundColor: i % 2 === 0 ? "#5BBAB5" : "#E81B62",
              top: p.top + "%",
              left: p.left + "%",
              opacity: p.op,
            }}
            animate={{ y: [0, p.dy], x: [0, p.dx] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Left — text content */}
      <div className="flex-1 flex flex-col items-start gap-6 max-w-2xl z-10
                      glass-strong rounded-2xl p-8">

        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
          </span>
          Hyderabad, India · Est. 2021
        </motion.span>

        {/* ✅ Fixed: word-by-word animation, correct delay spacing */}
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl font-display font-bold
                     leading-[1.1] tracking-tight text-foreground"
        >
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: i * 0.12,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-[0.28em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-2xl text-[var(--muted)] tracking-wide
                     max-w-lg leading-relaxed"
        >
          <strong className="text-[#5BBAB5] font-semibold">
            Precision Therapeutics
          </strong>{" "}
          for Women&apos;s Health.{" "}
          <strong className="text-[#2BB2C2] font-semibold">
            Next-Gen Digital Solutions
          </strong>{" "}
          for Modern Businesses.
        </motion.p>

        {/* ✅ Fixed: border classes use explicit hex values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Link
            href="/#pharma"
            className="hover-lift group relative px-8 py-4 glass border border-[#5BBAB5]
                       text-[#5BBAB5] rounded-full overflow-hidden
                       hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10 font-semibold tracking-wide">
              Explore Pharma
            </span>
            <div className="absolute inset-0 bg-[#5BBAB5] transform scale-x-0
                            origin-left group-hover:scale-x-100
                            transition-transform duration-300 ease-out z-0" />
          </Link>

          <Link
            href="/#tech"
            className="hover-lift group relative px-8 py-4 glass border border-[#2BB2C2]
                       text-[#2BB2C2] rounded-full overflow-hidden
                       hover:text-white transition-colors duration-300"
          >
            <span className="relative z-10 font-semibold tracking-wide">
              Explore Tech
            </span>
            <div className="absolute inset-0 bg-[#2BB2C2] transform scale-x-0
                            origin-left group-hover:scale-x-100
                            transition-transform duration-300 ease-out z-0" />
          </Link>
        </motion.div>
      </div>

      {/* Right — 3D canvas */}
      <div className="flex-1 w-full h-[520px] md:h-[600px] relative mt-12
                      md:mt-0 z-10 flex items-center justify-center
                      overflow-hidden">
        <CapsuleChipMorph />
      </div>
    </section>
  );
}