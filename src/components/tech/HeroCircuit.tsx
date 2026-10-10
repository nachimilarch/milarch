import { Briefcase, CheckCircle2, MapPin, MessageCircle, Receipt } from "lucide-react";

/*
 * The Milarch Tech mark drawn large as live circuitry: the traces draw in,
 * signals run along them, and product events pop up around it.
 * The mark uses the logo's own geometry (traced from logo-tech.png, 935 × 657),
 * placed inside a 720 × 720 viewBox; the cards sit in the empty bands above
 * and below it, positioned in %.
 */
const MARK = "translate(70 175) scale(.62)";
const M_TRACES = [
  // left arch, ending on the middle node
  "M45 600V255l90-100h105l92 107v338",
  // second arch, the U on the right, then up the diagonal and along the top bus
  "M332 262l88-107h110l90 107v293l50 62h70l45-57V265L605 40H42",
];
const NODES: [number, number, string][] = [
  [45, 600, "#2E2A6E"],
  [332, 600, "#2E2A6E"],
  [42, 40, "#2DB8C0"],
];
const LINKS = ["M96 200V110", "M349 200v-50h251v-40", "M98 547v93", "M276 547v53h324v40"];

export default function HeroCircuit() {
  return (
    <div className="reveal relative mx-auto aspect-square w-full max-w-[40rem]">
      <svg viewBox="0 0 720 720" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mt-grad" x1="0" y1="20" x2="0" y2="640" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2DB8C0" />
            <stop offset=".45" stopColor="#3389A8" />
            <stop offset="1" stopColor="#2E2A6E" />
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

        {/* the mark */}
        <g transform={MARK}>
          {M_TRACES.map((d, i) => (
            <path key={d} d={d} pathLength={1} className={`draw ${i ? "d1" : ""}`} fill="none" stroke="url(#mt-grad)" strokeWidth="40" strokeLinejoin="miter" />
          ))}
          {M_TRACES.map((d, i) => (
            <path key={`p${d}`} d={d} pathLength={1000} className={`trace-pulse p${i + 1}`} fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="10" strokeLinecap="round" />
          ))}
          <path d="M722 20h208l-85 155z" fill="#2DB8C0" className="pop" style={{ animationDelay: "1.6s" }} />
          {NODES.map(([x, y, c]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="36" fill={c} className="node-ping" />
              <circle cx={x} cy={y} r="36" fill={c} />
            </g>
          ))}
        </g>
      </svg>

      <EventCard className="left-[2%] top-[4%] origin-top-left max-sm:scale-[.74]" delay="1.5s" float="" icon={<MapPin className="h-4 w-4" />} product="Cipher" event="Call report submitted" />
      <EventCard className="right-[2%] top-[4%] origin-top-right max-sm:scale-[.74]" delay="1.8s" float="f2" icon={<MessageCircle className="h-4 w-4" />} product="VaartaBot" event="New WhatsApp lead" />
      <EventCard className="bottom-[2%] left-[2%] origin-bottom-left max-sm:scale-[.74]" delay="2.1s" float="f3" icon={<Briefcase className="h-4 w-4" />} product="LadderStep" event="Interview scheduled" />
      <EventCard className="bottom-[2%] right-[2%] origin-bottom-right max-sm:scale-[.74]" delay="2.4s" float="f4" icon={<Receipt className="h-4 w-4" />} product="Custom billing" event="Invoice paid" />
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
