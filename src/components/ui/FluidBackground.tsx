"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FluidBackground() {
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX / window.innerWidth - 0.5) * 100;
      const yOffset = (clientY / window.innerHeight - 0.5) * 100;

      if (blobRef1.current) {
        blobRef1.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      }
      if (blobRef2.current) {
        blobRef2.current.style.transform = `translate(${-xOffset * 1.5}px, ${-yOffset * 1.5}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Light mode: soft white-to-slate background */}
      <div className="absolute inset-0 bg-fluid-bg" />

      {/* Teal blob — mix-blend-multiply works on light backgrounds */}
      <motion.div
        ref={blobRef1}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-teal/20 rounded-full blur-[120px] mix-blend-multiply"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Electric blob */}
      <motion.div
        ref={blobRef2}
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-electric/15 rounded-full blur-[140px] mix-blend-multiply"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid overlay — dark lines visible on light bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
    </div>
  );
}
