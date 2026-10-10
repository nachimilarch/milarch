import { Mail, MapPin } from "lucide-react";
import CapsuleArt from "@/components/brand/CapsuleArt";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const CITIES = ["Hyderabad", "Vijayawada", "Guntur", "Kalaburagi"];
const SPECIALTIES = ["Gynaecologists and obstetricians", "In-vitro fertilisation (IVF) specialists", "General practitioners"];

const VISIT_MESSAGE = encodeURIComponent(
  "Hello Milarch, I am a doctor and would like a medical representative visit / product information."
);

export default function Doctors() {
  return (
    <section id="doctors" className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="container-site reveal relative overflow-hidden rounded-[2.5rem] bg-indigo px-6 py-14 text-white sm:px-10 md:px-14 md:py-20">
        <CapsuleArt muted className="pointer-events-none absolute -bottom-24 -left-24 h-[90%] w-auto opacity-60" />

        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow !text-white/70">For healthcare professionals</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-balance md:text-5xl">
              Detailing that respects a doctor&apos;s time
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Our field team works with doctors across Telangana, Andhra Pradesh and Karnataka. Ask for a visit or for
              product literature below.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/917083820068?text=${VISIT_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-indigo hover:bg-[#F3F0F8]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#1FA855]" /> Request a visit
              </a>
              <a
                href="mailto:info@milarch.in?subject=Product%20information%20request"
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> Request product information
              </a>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <div className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">We work with</h3>
              <ul className="mt-4 grid gap-3">
                {SPECIALTIES.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-white">
                    <span className="h-2 w-5 rounded-full bg-gradient-to-r from-[#E5195F] from-50% to-[#FFC20E] to-50%" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Field coverage</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {CITIES.map((c) => (
                  <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-[#5EC4BA]" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <p className="px-1 text-xs leading-relaxed text-white/55">
              Detailed prescribing information is for the use of registered medical practitioners only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
