"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScroll, motion, useTransform } from "framer-motion";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const text = "Committed to support healthy pregnancy — Organized interventions. Decisive outcomes.".split(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (textRef.current && sectionRef.current) {
      const words = textRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        // Start at 0.3 opacity so words are always legible on white bg (0.1 was near-invisible)
        { opacity: 0.3, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: ".sticky-content",
            pinSpacing: false,
          },
        }
      );
    }
  }, { scope: sectionRef });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const visionY = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const missionY = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="h-[200vh] relative z-20">
      <div className="sticky-content sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--surface)]">
        {/* No dark overlay — light surface bg provides the section separation */}

        <motion.div style={{ y: visionY, opacity }} className="absolute top-[20%] text-center px-4">
          <span className="text-sm tracking-[0.3em] text-teal font-semibold uppercase mb-2 block">Vision</span>
          <p className="text-[var(--muted)] max-w-lg mx-auto text-sm md:text-base">
            To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking digital innovation.
          </p>
        </motion.div>

        <h2
          ref={textRef}
          className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-center max-w-5xl px-8 leading-tight text-foreground z-10"
        >
          {text.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.2em]">
              {word}
            </span>
          ))}
        </h2>

        <motion.div style={{ y: missionY, opacity }} className="absolute bottom-[20%] text-center px-4">
          <span className="text-sm tracking-[0.3em] text-electric font-semibold uppercase mb-2 block">Mission</span>
          <p className="text-[var(--muted)] max-w-lg mx-auto text-sm md:text-base">
            Empowering women&apos;s health through precise pharmacology, while engineering reliable, high-performance web ecosystems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
