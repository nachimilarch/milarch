import Link from "next/link";

export default function TechFooter() {
  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-[#07060F] text-sm text-[#A19FC2]">
      <div className="mx-auto flex max-w-site flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-tech font-semibold tracking-[0.32em] text-white">
            MILARCH <span className="font-normal tracking-normal text-[#2BD3D8]">tech</span>
          </p>
          <p className="mt-2">Software for healthcare and modern businesses. Hyderabad, India.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-white">Milarch Pharma</Link>
          <a href="mailto:info@milarch.in" className="hover:text-white">info@milarch.in</a>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>
      <p className="border-t border-white/[0.06] px-4 py-5 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} Milarch. All rights reserved.
      </p>
    </footer>
  );
}
