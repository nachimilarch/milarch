"use client";

import { motion } from "framer-motion";

const services = [
  { title: "Web Design", desc: "Premium aesthetic digital experiences." },
  { title: "Web Dev", desc: "High-performance full-stack applications." },
  { title: "Database", desc: "Scalable architecture and data integrity." },
  { title: "Strategy", desc: "Data-driven digital positioning." },
  { title: "Pharma Tech", desc: "Specialized healthcare platforms." },
];

export default function TechServices() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden z-20 flex flex-col md:flex-row items-center justify-center bg-[#050A1A]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
      
      <div className="flex-1 max-w-xl md:pr-12 md:ml-12 text-center md:text-left mb-16 md:mb-0 z-10">
        <span className="text-electric font-mono tracking-widest text-sm uppercase mb-4 block">Tech Division</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tighter mb-6">
          Engineering the <br/>Digital Frontier
        </h2>
        <p className="text-softwhite/70 mb-8 max-w-md mx-auto md:mx-0">
          From cutting-edge corporate portals to complex pharma-tech integrations, Milarch Tech delivers architecture that scales.
        </p>
        <button className="px-8 py-4 bg-electric text-white font-semibold rounded-full hover:bg-electric/80 hover:shadow-[0_0_20px_rgba(123,47,255,0.6)] transition-all">
          View All Services
        </button>
      </div>

      <div className="flex-1 w-full relative min-h-[400px] md:min-h-[600px] flex items-center justify-center">
        {/* Hexagonal nodes simulating network */}
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
          {/* Connector lines (abstracted with SVG) */}
          <svg className="absolute inset-0 w-full h-full text-electric/20" viewBox="0 0 100 100">
            <motion.path 
              d="M 50 50 L 20 20 M 50 50 L 80 20 M 50 50 L 80 80 M 50 50 L 20 80 M 50 50 L 50 90" 
              stroke="currentColor" 
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {services.map((service, i) => {
            const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 group"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.5, type: "spring" }}
              >
                {/* Hexagon shape using clip-path */}
                <div className="w-24 h-24 bg-navy border border-electric/40 flex items-center justify-center relative cursor-pointer group-hover:bg-electric/20 transition-colors [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                  <span className="text-white font-bold text-center text-xs px-2">{service.title}</span>
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg w-48 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-center z-20">
                  <p className="text-sm text-white">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
          
          {/* Central node */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-electric shadow-[0_0_40px_rgba(123,47,255,0.5)] flex items-center justify-center [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] z-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
             <span className="text-white font-display font-bold text-lg text-center leading-tight">Milarch<br/>Tech</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
