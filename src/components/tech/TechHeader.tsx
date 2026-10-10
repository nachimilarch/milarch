import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/tech#work", label: "Products" },
  { href: "/tech#services", label: "Services" },
  { href: "/tech#approach", label: "How we build" },
  { href: "/tech#contact", label: "Contact" },
];

export default function TechHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E3E6F0] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/tech" className="flex items-center gap-3" aria-label="Milarch Tech, home">
          <Image src="/brand/milarch-tech.png" alt="" width={44} height={43} className="h-10 w-auto" priority />
          <span className="font-tech text-[15px] font-semibold tracking-[0.32em] text-[#2A2463]">
            MILARCH <span className="font-normal tracking-normal text-[#178C94]">tech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-4 py-2 text-[#5A5F7D] transition-colors hover:bg-[#F1F3F9] hover:text-[#0E1033]">
              {l.label}
            </Link>
          ))}
          <Link href="/" className="ml-2 inline-flex items-center gap-1 rounded-lg border border-[#E3E6F0] px-4 py-2 text-[#5A5F7D] hover:border-[#5B55A5] hover:text-[#0E1033]">
            Milarch Pharma <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/tech#contact" className="tech-btn hidden sm:inline-flex">
            Start a project
          </Link>
          <details className="group relative lg:hidden">
            <summary className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-xl border border-[#E3E6F0] text-[#0E1033] [&::-webkit-details-marker]:hidden" aria-label="Menu">
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
            </summary>
            <nav className="fixed inset-x-0 top-[4.5rem] border-b border-[#E3E6F0] bg-white px-4 pb-6 pt-2 shadow-lg" aria-label="Mobile">
              {[...LINKS, { href: "/", label: "Milarch Pharma ↗" }].map((l) => (
                <Link key={l.href} href={l.href} className="block border-b border-[#E3E6F0] py-4 text-lg text-[#0E1033] last:border-0">
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
