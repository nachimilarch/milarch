"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useCart } from "@/lib/cart-context";
import { scrollToSectionIfPresent } from "@/lib/scrollTo";

const NAV_LINKS = [
  { href: "/#pharma", id: "pharma", label: "Pharma", hoverClass: "hover:text-teal" },
  { href: "/#tech", id: "tech", label: "Tech", hoverClass: "hover:text-electric" },
  { href: "/#about", id: "about", label: "About", hoverClass: "hover:text-pink" },
  { href: "/#contact", id: "contact", label: "Contact", hoverClass: "hover:text-foreground" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const { itemCount } = useCart();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close the mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Highlight the nav item for whichever section is currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  function handleNavClick(e: React.MouseEvent, id: string) {
    if (scrollToSectionIfPresent(id)) {
      e.preventDefault();
    }
    // Otherwise let the Link navigate to "/#id" — SmoothScroll's mount effect scrolls on arrival.
  }

  const CartLink = (
    <Link href="/cart" className="relative hover:text-teal transition-colors" aria-label="Cart">
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-teal text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden && !mobileOpen ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full px-6 md:px-8 py-5 md:py-6 flex justify-between items-center z-50 glass-nav text-foreground"
    >
      <Link href="/" className="text-2xl font-display font-bold tracking-widest text-foreground">
        MILARCH
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1 text-sm font-medium tracking-wide">
        {NAV_LINKS.map((link) => {
          const active = activeSection === link.id;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`relative px-4 py-2 rounded-full transition-colors ${active ? "text-foreground" : `text-[var(--muted)] ${link.hoverClass}`}`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 bg-[var(--surface-2)] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          );
        })}
        <div className="flex items-center gap-5 pl-4 ml-2 border-l border-[var(--border)]">
          {CartLink}
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile controls */}
      <div className="flex items-center gap-4 md:hidden">
        {CartLink}
        <ThemeToggle />
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="p-1 -mr-1 text-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full glass-nav border-t border-[var(--border)] flex flex-col p-4 gap-1 md:hidden"
          >
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active ? "bg-[var(--surface-2)] text-foreground" : "text-[var(--muted)] hover:bg-[var(--surface-2)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
