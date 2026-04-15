"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md border-b border-border text-foreground shadow-sm"
    >
      <Link href="/" className="text-2xl font-display font-bold tracking-widest text-foreground">
        MILARCH
      </Link>
      <nav className="flex gap-8 text-sm font-medium tracking-wide">
        <Link href="/pharma" className="hover:text-teal transition-colors">Pharma</Link>
        <Link href="/tech" className="hover:text-electric transition-colors">Tech</Link>
        <Link href="/about" className="hover:text-pink transition-colors">About</Link>
        <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
