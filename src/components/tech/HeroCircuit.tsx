import { Briefcase, CheckCircle2, MapPin, MessageCircle, Send } from "lucide-react";

/*
 * The Milarch Tech mark drawn large as live circuitry: the M traces draw in,
 * signals run along them, and four product events pop up around it.
 * Coordinates are in a 720 × 720 viewBox; the cards sit in the empty bands
 * above and below the M, positioned in %.
 */
const M_TRACES = [
  "M220 580V320l50-50h40l50 50v260",
  "M360 410v-90l50-50h40l50 50v190l30 30 30-30V250",
  "M220 200h290l50 50",
];
const LINKS = ["M220 200v-90", "M450 200v-90", "M220 580v80", "M360 580v40h160v40"];

export default function HeroCircuit() {
  return (
    <div className="reveal relative mx-auto aspect-square w-full max-w-[40rem]">
      <svg viewBox="0 0 720 720" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mt-grad" x1="0" y1="170" x2="0" y2="590" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2BC4C9" />
            <stop offset="1" stopColor="#3B3A9E" />
          </linearGradient>
        </defs>

        {/* faint board grid */}
        <g stroke="#E3E6F0" strokeWidth="1">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${30 + i * 60}H720`} />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`v${i}`} d={`M${40 + i * 60} 0V720`} />
          ))}
        </g>

        {/* links out to the product cards */}
        {LINKS.map((d, i) => (
          <g key={d}>
            <path d={d} pathLength={1} className={`draw d${i + 1}`} fill="none" stroke="#C9CEE0" strokeWidth="2" strokeDasharray="4 6" />
            <path d={d} pathLength={1000} className={`trace-pulse p${i}`} fill="none" stroke="#1FB5BE" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}

        {/* the M */}
        {M_TRACES.map((d, i) => (
          <path key={d} d={d} pathLength={1} className={`draw ${i ? `d${i}` : ""}`} fill="none" stroke="url(#mt-grad)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {M_TRACES.map((d, i) => (
          <path key={`p${d}`} d={d} pathLength={1000} className={`trace-pulse p${i + 1}`} fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="6" strokeLinecap="round" />
        ))}
        <path d="M575 168h60l-30 42z" fill="#2BC4C9" className="pop" style={{ animationDelay: "1.6s" }} />

        {/* nodes */}
        {[
          [220, 580, "#3B3A9E"],
          [360, 580, "#3B3A9E"],
          [220, 200, "#2BC4C9"],
        ].map(([x, y, c]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="14" fill={c as string} className="node-ping" />
            <circle cx={x} cy={y} r="14" fill={c as string} />
            <circle cx={x} cy={y} r="5" fill="#fff" />
          </g>
        ))}
      </svg>

      <EventCard className="left-[2%] top-[4%] origin-top-left max-sm:scale-[.74]" delay="1.5s" float="" icon={<MapPin className="h-4 w-4" />} product="Cipher" event="Call report submitted" />
      <EventCard className="right-[2%] top-[4%] origin-top-right max-sm:scale-[.74]" delay="1.8s" float="f2" icon={<MessageCircle className="h-4 w-4" />} product="VaartaBot" event="New WhatsApp lead" />
      <EventCard className="bottom-[2%] left-[2%] origin-bottom-left max-sm:scale-[.74]" delay="2.1s" float="f3" icon={<Send className="h-4 w-4" />} product="CertifyBusiness CRM" event="Follow-up sent" />
      <EventCard className="bottom-[2%] right-[2%] origin-bottom-right max-sm:scale-[.74]" delay="2.4s" float="f4" icon={<Briefcase className="h-4 w-4" />} product="LadderStep" event="Interview scheduled" />
    </div>
  );
}

function EventCard({
  product,
  event,
  icon,
  delay,
  float,
  className,
}: {
  product: string;
  event: string;
  icon: React.ReactNode;
  delay: string;
  float: string;
  className?: string;
}) {
  return (
    <div className={`absolute flex ${className ?? ""}`}>
      <div className={`float-card ${float}`}>
        <div
          className="pop flex items-center gap-3 rounded-2xl border border-[#E3E6F0] bg-white/95 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(42,36,99,0.35)] backdrop-blur"
          style={{ animationDelay: delay }}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2BC4C9] to-[#3B3A9E] text-white">
            {icon}
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8A8FA8]">{product}</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-[#0E1033]">
              {event} <CheckCircle2 className="h-3.5 w-3.5 text-[#16A36A]" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
