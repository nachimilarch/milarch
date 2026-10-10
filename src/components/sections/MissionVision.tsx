"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLHeadingElement>(null);

  const words = "Committed to support healthy pregnancy — Organized interventions. Decisive outcomes.".split(" ");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current || !sectionRef.current) return;

    const wordEls = textRef.current.querySelectorAll(".word");

    gsap.fromTo(
      wordEls,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center 30%",
          scrub: 1,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 z-20"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/50 to-transparent" />

      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Central word-reveal heading */}
        <div className="glass-strong rounded-3xl p-8 relative z-10">
          <h2
            ref={textRef}
            className="font-display font-bold text-center text-[var(--primary)]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.35 }}
          >
            {words.map((word, i) => (
              <span key={i}>
                <span className="word" style={{ opacity: 0.12 }}>{word}</span>
                {" "}
              </span>
            ))}
          </h2>
        </div>

        {/* Vision + Mission side-by-side — no absolute positioning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hover-lift glass-teal rounded-2xl p-6 text-center">
            <span className="text-xs tracking-[0.4em] text-teal font-bold uppercase mb-3 block">
              Vision
            </span>
            <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
              To emerge as a pioneering force in unifying sophisticated medical treatments with groundbreaking digital innovation.
            </p>
          </div>

          <div className="hover-lift glass-electric rounded-2xl p-6 text-center">
            <span className="text-xs tracking-[0.4em] text-electric font-bold uppercase mb-3 block">
              Mission
            </span>
            <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">
              Empowering women&apos;s health through precise pharmacology, while engineering reliable, high-performance digital ecosystems for the healthcare industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
