"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLHeadingElement>(null);

  const text = "Committed to support healthy pregnancy \u2014 Organized interventions. Decisive outcomes.".split(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current || !sectionRef.current) return;

    const words = textRef.current.querySelectorAll(".word");

    // Pure scrub — NO pin here; CSS `sticky` handles the viewport lock.
    // GSAP only drives word opacity relative to the section's 200vh scroll budget.
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      }
    );
  }, { scope: sectionRef });

  // Framer Motion: Vision/Mission panels slide in independently
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const visionY   = useTransform(scrollYProgress, [0, 0.35],  [-60, 0]);
  const visionOp  = useTransform(scrollYProgress, [0, 0.3],   [0, 1]);
  const missionY  = useTransform(scrollYProgress, [0.65, 1],  [60, 0]);
  const missionOp = useTransform(scrollYProgress, [0.65, 0.9],[0, 1]);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] relative z-20"
    >
      {/*
        Pure CSS sticky — no GSAP pin at all.
        CSS sticky is immune to Lenis scroll proxy issues.
        The 200vh on the parent gives the full scroll budget.
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[var(--surface)]">

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent" />

        {/* VISION — slides in from top */}
        <motion.div
          style={{ y: visionY, opacity: visionOp }}
          className="absolute top-[13%] left-0 right-0 text-center px-6"
        >
          <span className="text-xs tracking-[0.4em] text-teal font-bold uppercase mb-3 block">
            Vision
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking digital innovation.
          </p>
        </motion.div>

        {/* Central word-reveal — GSAP scrubs each word's opacity */}
        <h2
          ref={textRef}
          className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center max-w-4xl px-8 leading-snug text-foreground"
        >
          {text.map((word, i) => (
            <span
              key={i}
              className="word inline-block"
              style={{ marginRight: "0.28em" }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* MISSION — slides in from bottom */}
        <motion.div
          style={{ y: missionY, opacity: missionOp }}
          className="absolute bottom-[13%] left-0 right-0 text-center px-6"
        >
          <span className="text-xs tracking-[0.4em] text-electric font-bold uppercase mb-3 block">
            Mission
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Empowering women&apos;s health through precise pharmacology, while engineering reliable, high-performance web ecosystems.
          </p>
        </motion.div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      </div>
    </section>
  );
}
