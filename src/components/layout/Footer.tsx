import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/70">
      {/* Brand line, as used on Milarch detailing aids */}
      <div className="border-b border-white/10">
        <div className="container-site flex flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-display text-lg text-white">In support of healthy pregnancy</p>
          <p className="text-white/70">Organised interventions. Decisive outcomes.</p>
        </div>
      </div>

      <div className="container-site grid gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div className="flex max-w-xs flex-col gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Milarch, home">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
              <Image src="/brand/milarch-mark.png" alt="" width={24} height={36} className="h-9 w-auto" />
            </span>
            <span className="text-[15px] font-semibold tracking-[0.42em] text-white">MILARCH</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Specialised formulations for women&apos;s health, made for the doctors who care for them. Hyderabad,
            Telangana, India. Est. 2021.
          </p>
        </div>

        <FooterCol title="Products">
          {products.map((p) => (
            <Link key={p.slug} href={`/pharma/products/${p.slug}`} className="hover:text-white">
              {p.brandName.replace("™", "")}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <Link href="/#about" className="hover:text-white">About Milarch</Link>
          <Link href="/#doctors" className="hover:text-white">For doctors</Link>
          <Link href="/#tech" className="hover:text-white">Milarch Tech</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
          <a href="mailto:info@milarch.in" className="hover:text-white">info@milarch.in</a>
        </FooterCol>

        <FooterCol title="Legal">
          <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
          <Link href="/terms" className="hover:text-white">Terms and conditions</Link>
          <Link href="/refund-policy" className="hover:text-white">Refund policy</Link>
          <Link href="/shipping-policy" className="hover:text-white">Shipping policy</Link>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 px-4 py-6 text-xs leading-relaxed text-white/55 sm:px-6 lg:px-8">
          <p>
            <strong className="text-white/75">Disclaimer:</strong> This is general information only and not a
            substitute for professional medical advice. Please consult your doctor or pharmacist before starting any
            medication or supplement. Prescription products are dispensed only against a valid prescription.
          </p>
          <p>&copy; {new Date().getFullYear()} Milarch. All rights reserved. Hyderabad, India.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">{title}</h2>
      {children}
    </div>
  );
}
