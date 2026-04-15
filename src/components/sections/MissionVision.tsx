"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLHeadingElement>(null);

  const words = "Committed to support healthy pregnancy \u2014 Organized interventions. Decisive outcomes.".split(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current || !sectionRef.current) return;

    const wordEls = textRef.current.querySelectorAll(".word");

    // Only animate the word opacity — Vision/Mission are always visible
    gsap.fromTo(
      wordEls,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
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

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] relative z-20"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[var(--surface)]">

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent" />

        {/* VISION — always visible, no animation */}
        <div className="absolute top-[13%] left-0 right-0 text-center px-6">
          <span className="text-xs tracking-[0.4em] text-teal font-bold uppercase mb-3 block">
            Vision
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking digital innovation.
          </p>
        </div>

        {/* Central word-reveal heading — GSAP scrubs each word opacity */}
        <h2
          ref={textRef}
          className="relative z-10 font-display font-bold text-center max-w-4xl px-8 text-foreground"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.35 }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span className="word" style={{ opacity: 0.12 }}>{word}</span>
              {" "}
            </span>
          ))}
        </h2>

        {/* MISSION — always visible, no animation */}
        <div className="absolute bottom-[13%] left-0 right-0 text-center px-6">
          <span className="text-xs tracking-[0.4em] text-electric font-bold uppercase mb-3 block">
            Mission
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Empowering women&apos;s health through precise pharmacology, while engineering reliable, high-performance web ecosystems.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      </div>
    </section>
  );
}
