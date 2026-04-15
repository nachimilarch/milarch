"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const text = "Committed to support healthy pregnancy \u2014 Organized interventions. Decisive outcomes.".split(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!textRef.current || !sectionRef.current || !stickyRef.current) return;

    const words = textRef.current.querySelectorAll(".word");

    // Pin the sticky div for the full 200vh scroll budget
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current,   // pin by ref, NOT class string
      pinSpacing: false,         // section already has the 200vh height budget
    });

    // Word reveal — GSAP owns opacity only, no y-transform (avoids Framer Motion conflict)
    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );
  }, { scope: sectionRef });

  // Framer Motion drives Vision/Mission slide-in panels ONLY — no opacity on wrapper
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const visionY    = useTransform(scrollYProgress, [0, 0.4], [-80, 0]);
  const visionOp   = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const missionY   = useTransform(scrollYProgress, [0.6, 1], [80, 0]);
  const missionOp  = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] relative z-20"
    >
      {/* Sticky panel — ref-pinned by GSAP, always full-screen, no overflow-hidden */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[var(--surface)]"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/40 to-transparent" />

        {/* VISION panel — slides in from top */}
        <motion.div
          style={{ y: visionY, opacity: visionOp }}
          className="absolute top-[14%] text-center px-4 w-full max-w-xl mx-auto"
        >
          <span className="text-xs tracking-[0.35em] text-teal font-bold uppercase mb-3 block">
            Vision
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
            To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking digital innovation.
          </p>
        </motion.div>

        {/* Central word-reveal heading — GSAP drives word opacity via scrub */}
        <h2
          ref={textRef}
          className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-display font-bold text-center max-w-4xl px-8 leading-snug text-foreground"
        >
          {text.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em] last:mr-0">
              {word}
            </span>
          ))}
        </h2>

        {/* MISSION panel — slides in from bottom */}
        <motion.div
          style={{ y: missionY, opacity: missionOp }}
          className="absolute bottom-[14%] text-center px-4 w-full max-w-xl mx-auto"
        >
          <span className="text-xs tracking-[0.35em] text-electric font-bold uppercase mb-3 block">
            Mission
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
            Empowering women&apos;s health through precise pharmacology, while engineering reliable, high-performance web ecosystems.
          </p>
        </motion.div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
      </div>
    </section>
  );
}
