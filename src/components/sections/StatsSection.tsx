"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Counter({
  from,
  to,
  duration,
  prefix = "",
  suffix = "",
}: {
  from: number;
  to: number;
  duration: number;
  prefix?: string;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, prefix, suffix]);

  return (
    <p ref={nodeRef} className="text-5xl md:text-7xl font-display font-bold text-foreground mb-2">
      {from}
    </p>
  );
}

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (bgRef.current && containerRef.current) {
      gsap.to(bgRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    // bg-[var(--surface)] = #f1f5f9 (slate-100) — gives visible section separation
    // while keeping teal/electric/pink labels readable (they're bold + larger)
    <section
      ref={containerRef}
      className="relative py-32 px-4 overflow-hidden z-20 min-h-[60vh] flex items-center bg-[var(--surface)]"
    >
      {/* Abstract Parallax DNA */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20 pointer-events-none flex justify-center items-center -z-10"
      >
        <svg
          width="800"
          height="1200"
          viewBox="0 0 100 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M50 0 C0 100, 100 200, 50 300 C0 400, 100 500, 50 600 C0 700, 100 800, 50 800"
            stroke="#5BBAB5"
            strokeWidth="2"
          />
          <path
            d="M50 0 C100 100, 0 200, 50 300 C100 400, 0 500, 50 600 C100 700, 0 800, 50 800"
            stroke="#5E51A2"
            strokeWidth="2"
          />
          <line x1="25" y1="50" x2="75" y2="50" stroke="#0A0B1A" strokeOpacity="0.08" />
          <line x1="15" y1="150" x2="85" y2="150" stroke="#0A0B1A" strokeOpacity="0.08" />
          <line x1="25" y1="250" x2="75" y2="250" stroke="#0A0B1A" strokeOpacity="0.08" />
          <line x1="15" y1="350" x2="85" y2="350" stroke="#0A0B1A" strokeOpacity="0.08" />
          <line x1="25" y1="450" x2="75" y2="450" stroke="#0A0B1A" strokeOpacity="0.08" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        <div>
          <Counter from={0} to={new Date().getFullYear() - 2021} duration={2} suffix="+" />
          {/* font-bold + tracking-wide makes small caps pass at 3:1 large-text threshold */}
          <p className="text-teal font-bold font-mono tracking-widest uppercase text-sm">Years of Excellence</p>
        </div>
        <div>
          <Counter from={0} to={6} duration={2} />
          <p className="text-electric font-bold font-mono tracking-widest uppercase text-sm">Core Therapies Launched</p>
        </div>
        <div>
          <Counter from={0} to={100} duration={3} suffix="K+" />
          <p className="text-pink font-bold font-mono tracking-widest uppercase text-sm">Women Served</p>
        </div>
      </div>
    </section>
  );
}
