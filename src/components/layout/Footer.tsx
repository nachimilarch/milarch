import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-navy text-softwhite/60 py-12 px-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <Link href="/" className="text-2xl font-display font-bold text-white tracking-tighter">
            MILARCH
          </Link>
          <p className="text-sm leading-relaxed">
            Where Health Meets Innovation. Bridging pharmaceutical excellence for women&apos;s wellbeing with cutting-edge digital solutions.
          </p>
        </div>
        
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Brands</h4>
            <Link href="/pharma" className="hover:text-teal transition-colors">Milarch Pharma</Link>
            <Link href="/tech" className="hover:text-electric transition-colors">Milarch Tech</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Company</h4>
            <Link href="/about" className="hover:text-pink transition-colors">Our Story</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-center text-xs text-softwhite/40">
        <p>
          <strong>Disclaimer:</strong> This is general information only and not a substitute for professional medical advice. Please consult your doctor or pharmacist before starting any medication or supplement.
        </p>
        <p>&copy; {new Date().getFullYear()} Milarch. All rights reserved. Hyderabad, India.</p>
      </div>
    </footer>
  );
}
