import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 glass text-muted py-12 px-8 mt-auto">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="text-2xl font-display font-bold text-foreground tracking-tighter">
            MILARCH
          </Link>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            Where Health Meets Innovation. Bridging pharmaceutical excellence for women&apos;s wellbeing with cutting-edge digital solutions.
          </p>
        </div>

        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Brands</h4>
            <Link href="/#pharma" className="text-[var(--muted)] hover:text-teal transition-colors">Milarch Pharma</Link>
            <Link href="/#tech" className="text-[var(--muted)] hover:text-electric transition-colors">Milarch Tech</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Company</h4>
            <Link href="/#about" className="text-[var(--muted)] hover:text-pink transition-colors">Our Story</Link>
            <Link href="/#contact" className="text-[var(--muted)] hover:text-foreground transition-colors">Contact Us</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <Link href="/privacy" className="text-[var(--muted)] hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[var(--muted)] hover:text-foreground transition-colors">Terms & Conditions</Link>
            <Link href="/refund-policy" className="text-[var(--muted)] hover:text-foreground transition-colors">Refund Policy</Link>
            <Link href="/shipping-policy" className="text-[var(--muted)] hover:text-foreground transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--border)] flex flex-col items-center gap-4 text-center text-xs text-[var(--muted)]">
        <p>
          <strong>Disclaimer:</strong> This is general information only and not a substitute for professional medical advice. Please consult your doctor or pharmacist before starting any medication or supplement.
        </p>
        <p>&copy; {new Date().getFullYear()} Milarch. All rights reserved. Hyderabad, India.</p>
      </div>
    </footer>
  );
}
