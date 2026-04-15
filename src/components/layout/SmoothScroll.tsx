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

    // ─── Critical: tell GSAP ScrollTrigger to read scroll position from Lenis ───
    // Without this, GSAP pins/scrubs fire at wrong scroll offsets because
    // Lenis intercepts native scroll events and GSAP reads stale window.scrollY.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Sync Lenis scroll events → ScrollTrigger position updates
    lenis.on("scroll", () => ScrollTrigger.update());

    // Drive Lenis via GSAP ticker for frame-perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after proxy is set
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as never);
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}
