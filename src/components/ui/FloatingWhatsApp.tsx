import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/917083820068"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1FA855] text-white shadow-lg transition-transform hover:scale-105"
      aria-label="Chat with Milarch on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
