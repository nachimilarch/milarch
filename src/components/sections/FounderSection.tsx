"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Leader {
  name: string;
  title: string;
  org: string;
  photo: string | null;
  initials: string;
  quote: string;
}

const LEADERS: Leader[] = [
  {
    name: "Nachiketh Desai",
    title: "Founder & CEO",
    org: "Milarch Pharma & Tech · Hyderabad, Telangana, India",
    photo: "/founder-nachiketh.jpg",
    initials: "ND",
    quote:
      "We started Milarch with one conviction: that a pharmaceutical company in 2024 must be as strong in digital as it is in science. Our products address real gaps in women's healthcare. Our tech ensures those products reach the right hands.",
  },
  {
    name: "Milind Desai",
    title: "Managing Director",
    org: "Milarch Pharma · Hyderabad, Telangana, India",
    photo: "/founder-milind.jpg",
    initials: "MD",
    quote:
      "Nearly two decades in pharmaceutical sales leadership — including senior roles at Intas Pharmaceuticals and Eris Lifesciences — taught me that great products only matter if they reach the right doctors and patients. At Milarch Pharma, I lead our sales strategy and field network to make sure they do.",
  },
];

export default function FounderSection() {
  return (
    <section id="about" className="relative min-h-[80vh] py-24 flex items-center justify-center z-20 px-4">
      {/* Light gradient fade — top transparent → subtle surface tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface)]/60 to-[var(--navy)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-12">
        <p className="text-teal font-mono text-sm uppercase tracking-widest text-center">Leadership</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ leader }: { leader: Leader }) {
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
    <motion.div style={{ perspective: 1000 }} className="relative w-full h-full">
      {/* Ambient brand-color glow behind the card */}
      <div className="absolute -inset-8 -z-10 bg-gradient-brand opacity-20 blur-3xl rounded-full" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative glass-strong rounded-3xl p-8 md:p-10 flex flex-col items-center text-center gap-6 h-full"
      >
        {/* Avatar ring */}
        <div
          className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-teal to-electric p-[2px] flex-shrink-0"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="w-full h-full bg-[var(--surface)] rounded-full overflow-hidden relative">
            {leader.photo ? (
              <Image
                src={leader.photo}
                alt={`${leader.name}, ${leader.title} of Milarch`}
                fill
                sizes="(min-width: 768px) 11rem, 9rem"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-[var(--muted)]/40">
                {leader.initials}
              </div>
            )}
          </div>
        </div>

        <div style={{ transform: "translateZ(80px)" }}>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            {leader.name}
          </h2>
          <p className="text-lg text-[var(--muted)] font-medium mb-1">{leader.title}</p>
          <p className="text-xs text-[var(--muted)]/70 font-mono mb-5">{leader.org}</p>
          <p className="text-sm text-[var(--muted)] leading-relaxed">&quot;{leader.quote}&quot;</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
