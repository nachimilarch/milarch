"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Pill, Cpu } from "lucide-react";

export default function BrandSplitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      containerRef.current,
      { scale: 0.9, opacity: 0, y: 100 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 md:px-8 z-20 flex flex-col justify-center"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-4 text-foreground">
          Dual Forces{" "}
          {/* font-medium + slightly lighter shade — still 5.0:1 on white now --muted is darkened */}
          <span className="text-[var(--muted)] font-medium">One Vision</span>
        </h2>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Delivering specialized pharmaceutical interventions tailored for holistic maternal care, whilst empowering futuristic businesses through bespoke digital architectures.
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex flex-col md:flex-row max-w-7xl mx-auto w-full gap-8 h-[60vh] min-h-[400px]"
      >
        {/* Pharma Panel */}
        <Link
          href="/pharma"
          className="group flex-1 relative rounded-3xl overflow-hidden border border-teal/30 bg-[var(--card)] hover:border-teal/60 transition-all duration-500 ease-out flex flex-col items-center justify-center p-8 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(91,186,181,0.2)] shadow-sm"
        >
          <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal/15 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div
            className="z-10 flex flex-col items-center text-center"
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              variants={{
                initial: { y: 20 },
                hover: { y: -20, scale: 1.1 },
              }}
              className="w-20 h-20 rounded-2xl bg-teal/10 flex items-center justify-center border border-teal/30 text-teal mb-6 group-hover:bg-teal group-hover:text-white transition-colors duration-300"
            >
              <Pill className="w-10 h-10" />
            </motion.div>

            <div className="mb-4">
              <Image src="/logo-pharma.png" alt="Milarch Pharma" width={180} height={60} className="object-contain" />
            </div>

            <motion.div
              variants={{
                initial: { opacity: 0, height: 0, y: 10 },
                hover: { opacity: 1, height: "auto", y: 0 },
              }}
              className="overflow-hidden"
            >
              <p className="text-[var(--muted)] font-medium mb-6">
                Innovative pharmaceuticals dedicated to women&apos;s health. Organized interventions, decisive outcomes.
              </p>
              <span className="inline-flex items-center gap-2 text-teal font-semibold">
                Discover Pharma <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </motion.div>
        </Link>

        {/* Tech Panel */}
        <Link
          href="/tech"
          className="group flex-1 relative rounded-3xl overflow-hidden border border-electric/30 bg-[var(--card)] hover:border-electric/60 transition-all duration-500 ease-out flex flex-col items-center justify-center p-8 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(43,178,194,0.2)] shadow-sm"
        >
          <div className="absolute inset-0 bg-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-electric/15 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div
            className="z-10 flex flex-col items-center text-center"
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              variants={{
                initial: { y: 20 },
                hover: { y: -20, scale: 1.1 },
              }}
              className="w-20 h-20 rounded-2xl bg-electric/10 flex items-center justify-center border border-electric/30 text-electric mb-6 group-hover:bg-electric group-hover:text-white transition-colors duration-300"
            >
              <Cpu className="w-10 h-10" />
            </motion.div>

            <div className="mb-4">
              <Image src="/logo-tech.png" alt="Milarch Tech" width={180} height={60} className="object-contain" />
            </div>

            <motion.div
              variants={{
                initial: { opacity: 0, height: 0, y: 10 },
                hover: { opacity: 1, height: "auto", y: 0 },
              }}
              className="overflow-hidden"
            >
              <p className="text-[var(--muted)] font-medium mb-6">
                Web design, development & digital strategy redefining the future of digital presence.
              </p>
              <span className="inline-flex items-center gap-2 text-electric font-semibold">
                Discover Tech <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
