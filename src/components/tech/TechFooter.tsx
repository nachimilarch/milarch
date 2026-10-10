import Image from "next/image";
import Link from "next/link";

export default function TechFooter() {
  return (
    <footer className="mt-auto border-t border-[#E3E6F0] bg-white text-sm text-[#5A5F7D]">
      <div className="mx-auto flex max-w-site flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <Image src="/brand/milarch-tech.png" alt="" width={44} height={43} className="h-11 w-auto" />
          <div>
            <p className="font-tech font-semibold tracking-[0.32em] text-[#2A2463]">
              MILARCH <span className="font-normal tracking-normal text-[#178C94]">tech</span>
            </p>
            <p className="mt-1">Software for healthcare and modern businesses. Hyderabad, India.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-[#0E1033]">Milarch Pharma</Link>
          <a href="mailto:info@milarch.in" className="hover:text-[#0E1033]">info@milarch.in</a>
          <Link href="/privacy" className="hover:text-[#0E1033]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#0E1033]">Terms</Link>
        </div>
      </div>
      <p className="border-t border-[#EEF0F6] px-4 py-5 text-center text-xs text-[#8A8FA8]">
        &copy; {new Date().getFullYear()} Milarch. All rights reserved.
      </p>
    </footer>
  );
}
