import { Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section bg-background">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
            Talk to us
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-[var(--muted)]">
            For product enquiries, prescription support, partnerships, or tech project discussions.
          </p>
          <ul className="mt-10 grid gap-5">
            <li className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"><MapPin className="h-5 w-5 text-purple" /></span>
              <span className="text-foreground">Hyderabad, Telangana, India</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"><Mail className="h-5 w-5 text-purple" /></span>
              <a href="mailto:info@milarch.in" className="text-foreground underline-offset-4 hover:underline">info@milarch.in</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"><WhatsAppIcon className="h-5 w-5 text-[#1FA855]" /></span>
              <a href="https://wa.me/917083820068" target="_blank" rel="noopener noreferrer" className="text-foreground underline-offset-4 hover:underline">
                +91 70838 20068
              </a>
            </li>
          </ul>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
