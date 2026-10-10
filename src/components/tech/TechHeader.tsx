import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/tech#work", label: "Work" },
  { href: "/tech#services", label: "Services" },
  { href: "/tech#approach", label: "Approach" },
  { href: "/tech#contact", label: "Contact" },
];

export default function TechHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#0A0918]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/tech" className="flex items-center gap-3" aria-label="Milarch Tech, home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white">
            <Image src="/brand/milarch-tech.png" alt="" width={32} height={31} className="h-8 w-auto" priority />
          </span>
          <span className="font-tech text-[15px] font-semibold tracking-[0.32em] text-white">
            MILARCH <span className="font-normal tracking-normal text-[#2BD3D8]">tech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 text-[#A19FC2] transition-colors hover:bg-white/5 hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link href="/" className="ml-2 inline-flex items-center gap-1 rounded-full border border-white/15 px-4 py-2 text-white/80 hover:border-white/40 hover:text-white">
            Milarch Pharma <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/tech#contact" className="tech-btn hidden sm:inline-flex">
            Start a project
          </Link>
          <details className="group relative lg:hidden">
            <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-white/15 text-white [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
            </summary>
            <nav className="fixed inset-x-0 top-[4.5rem] border-b border-white/10 bg-[#0A0918] px-4 pb-6 pt-2" aria-label="Mobile">
              {[...LINKS, { href: "/", label: "Milarch Pharma ↗" }].map((l) => (
                <Link key={l.href} href={l.href} className="block border-b border-white/10 py-4 text-lg text-white last:border-0">
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
