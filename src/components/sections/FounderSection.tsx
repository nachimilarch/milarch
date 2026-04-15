"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export default function FounderSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-500, 500], [15, -15]);
  const rotateY = useTransform(x, [-500, 500], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section className="relative min-h-[80vh] py-24 flex items-center justify-center z-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050714] to-navy pointer-events-none" />
      
      <motion.div 
        style={{ perspective: 1000 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-navy/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-12"
        >
          {/* Card Inner Elements */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-teal to-electric p-[2px] flex-shrink-0" style={{ transform: "translateZ(50px)" }}>
            <div className="w-full h-full bg-navy rounded-full overflow-hidden relative">
              {/* Fallback avatar if no image */}
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-6xl font-bold text-white/20">
                ND
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left" style={{ transform: "translateZ(80px)" }}>
            <p className="text-teal font-mono text-sm uppercase tracking-widest mb-4">Leadership</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Nachiketh Desai</h2>
            <p className="text-xl text-softwhite/80 font-medium mb-6">Founder & CEO</p>
            <p className="text-softwhite/60 leading-relaxed">
              &quot;Bridging healthcare and technology for women&apos;s wellbeing. We believe that precise pharmaceutical interventions and robust digital infrastructure are two sides of the same coin: building a healthier, more connected future.&quot;
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
