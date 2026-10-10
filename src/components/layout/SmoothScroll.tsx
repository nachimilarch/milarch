"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // gsap.ticker time is in SECONDS — lenis.raf() needs MILLISECONDS
    function onRaf(time: number) {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    }

    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    // If we arrived with a #hash (e.g. navigated from another page), scroll to it once laid out.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) lenis.scrollTo(target, { offset: -80 });
      });
    }

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
