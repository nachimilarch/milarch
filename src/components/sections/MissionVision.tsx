"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLHeadingElement>(null);
  const visionRef  = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const words = "Committed to support healthy pregnancy \u2014 Organized interventions. Decisive outcomes.".split(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current || !sectionRef.current) return;

    const wordEls = textRef.current.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Words reveal
    tl.fromTo(
      wordEls,
      { opacity: 0.1 },
      { opacity: 1, stagger: 0.1, ease: "none" },
      0
    );

    // Vision panel: fade+slide in during first 30% of scroll
    if (visionRef.current) {
      tl.fromTo(
        visionRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0  // start at beginning of timeline
      );
    }

    // Mission panel: fade+slide in during last 30% of scroll
    if (missionRef.current) {
      tl.fromTo(
        missionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.7  // start at 70% through timeline
      );
    }

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] relative z-20"
    >
      {/* Pure CSS sticky — GSAP only drives content animations, not the pin */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[var(--surface)]">

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent" />

        {/* VISION */}
        <div
          ref={visionRef}
          className="absolute top-[13%] left-0 right-0 text-center px-6"
          style={{ opacity: 0 }}
        >
          <span className="text-xs tracking-[0.4em] text-teal font-bold uppercase mb-3 block">
            Vision
          </span>
          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking digital innovation.
          </p>
        </div>

        {/* Central word-reveal heading */}
        <h2
          ref={textRef}
          className="relative z-10 font-display font-bold text-center max-w-4xl px-8 text-foreground"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.35 }}
        >
          {words.map((word, i) => (
            // Render word + a real space text node so browser never collapses spacing
            <span key={i}>
              <span className="word" style={{ opacity: 0.1 }}>{word}</span>
              {" "}
            </span>
          ))}
        </h2>

        {/* MISSION */}
        <div
          ref={missionRef}
          className="absolute bottom-[13%] left-0 right-0 text-center px-6"
          style={{ opacity: 0 }}
        >
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
