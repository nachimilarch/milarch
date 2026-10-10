import { Bot, Check, CheckCheck, MapPin } from "lucide-react";

/*
 * Illustrated screens for each Milarch Tech product. They are drawings of the
 * kind of thing each product does, not screenshots, and they animate when
 * their .reveal block scrolls into view.
 */

const d = (s: number) => ({ animationDelay: `${s}s` });

function Device({ children, title, tone = "light" }: { children: React.ReactNode; title: React.ReactNode; tone?: "light" | "chat" }) {
  return (
    <div className="relative w-[15.5rem] shrink-0 rounded-[2.2rem] border-[7px] border-[#0E1033] bg-white shadow-[0_30px_60px_-25px_rgba(14,16,51,0.5)]">
      <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0E1033]" />
      <div
        className={`flex items-center gap-2 rounded-t-[1.7rem] px-4 pb-3 pt-8 text-xs font-semibold ${
          tone === "chat" ? "bg-[#0F6E68] text-white" : "border-b border-[#EEF0F6] text-[#0E1033]"
        }`}
      >
        {title}
      </div>
      <div className="h-[22rem] overflow-hidden rounded-b-[1.7rem]">{children}</div>
    </div>
  );
}

/* Cipher: a rep's route for the day, with visits and reports landing */
export function CipherArt() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Device title="Today's route">
        <svg viewBox="0 0 220 170" className="w-full bg-[#F4F6FB]" aria-hidden="true">
          <g stroke="#E1E5EF" strokeWidth="10" strokeLinecap="round" fill="none">
            <path d="M-10 40h240M-10 120h240M50-10v190M150-10v190M90 40l60 80" />
          </g>
          <path d="M30 140 50 120h100V40l40-20" pathLength={1} className="draw" fill="none" stroke="#1FB5BE" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1" />
          {[
            [50, 120, "1", 0.6],
            [150, 120, "2", 1],
            [150, 40, "3", 1.4],
            [190, 20, "4", 1.8],
          ].map(([x, y, n, t]) => (
            <g key={n as string} className="pop" style={d(t as number)}>
              <circle cx={x as number} cy={y as number} r="9" fill="#3B3A9E" stroke="#fff" strokeWidth="2" />
              <text x={x as number} y={(y as number) + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
                {n}
              </text>
            </g>
          ))}
        </svg>
        <ul className="space-y-2 p-3 text-[11px]">
          {[
            ["Clinic visit", "Call report logged", 1.2],
            ["Chemist audit", "RCPA submitted", 1.7],
            ["Travel", "Expense claim sent", 2.2],
          ].map(([a, b, t]) => (
            <li key={a as string} className="pop flex items-center gap-2 rounded-xl bg-[#F4F6FB] p-2" style={d(t as number)}>
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#16A36A]/10 text-[#16A36A]">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>
                <span className="block font-semibold text-[#0E1033]">{a}</span>
                <span className="block text-[#8A8FA8]">{b}</span>
              </span>
            </li>
          ))}
        </ul>
      </Device>
      <div className="hidden flex-col gap-3 sm:flex">
        <div className="pop tech-card w-44 p-4" style={d(0.4)}>
          <MapPin className="h-4 w-4 text-[#1FB5BE]" />
          <p className="mt-2 text-xs text-[#8A8FA8]">Attendance</p>
          <p className="text-sm font-semibold">Marked with GPS</p>
        </div>
        <div className="pop tech-card w-44 p-4" style={d(2.6)}>
          <p className="text-xs text-[#8A8FA8]">Manager view</p>
          <div className="mt-2 flex h-14 items-end gap-1.5">
            {[40, 65, 50, 85, 70, 95].map((h, i) => (
              <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-[#3B3A9E] to-[#2BC4C9]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* VaartaBot: a WhatsApp conversation handled by a flow, next to the flow itself */
export function VaartaArt() {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="hidden flex-col items-center sm:flex">
        {[
          ["Greeting", 0.2],
          ["Menu", 0.5],
          ["Book a slot", 0.8],
          ["Lead saved to CRM", 1.1],
        ].map(([label, t], i) => (
          <div key={label as string} className="flex flex-col items-center">
            {i > 0 && <span className="pop h-6 w-0.5 bg-[#C9CEE0]" style={d(t as number)} />}
            <span className="pop rounded-xl border border-[#E3E6F0] bg-white px-3 py-2 font-mono text-[11px] text-[#0E1033] shadow-sm" style={d(t as number)}>
              {label as string}
            </span>
          </div>
        ))}
      </div>
      <Device title={<span className="flex items-center gap-2"><Bot className="h-4 w-4" /> Clinic assistant</span> } tone="chat">
        <div className="flex h-full flex-col gap-2 bg-[#EFEAE2] p-3 text-[11.5px] leading-snug">
          <Bubble me t={0.4}>Hi, what are your clinic timings?</Bubble>
          <Bubble t={1.2}>We&apos;re open 9 am to 7 pm, Monday to Saturday. Would you like to book a slot?</Bubble>
          <div className="pop flex gap-1.5" style={d(1.8)}>
            <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-[#0F6E68] shadow-sm">Book a slot</span>
            <span className="rounded-full bg-white px-3 py-1.5 font-semibold text-[#0F6E68] shadow-sm">Talk to us</span>
          </div>
          <Bubble me t={2.4}>Book a slot</Bubble>
          <div className="pop w-fit rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm" style={d(3)}>
            <span className="typing text-[#8A8FA8]">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </span>
          </div>
        </div>
      </Device>
    </div>
  );
}

function Bubble({ children, me = false, t }: { children: React.ReactNode; me?: boolean; t: number }) {
  return (
    <p
      className={`pop max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${me ? "self-end rounded-tr-sm bg-[#D9FDD3]" : "rounded-tl-sm bg-white"}`}
      style={d(t)}
    >
      {children}
      {me && <CheckCheck className="ml-1 inline h-3 w-3 text-[#34B7F1]" />}
    </p>
  );
}

/* LadderStep: a hiring board where a candidate moves to Offer */
export function LadderArt() {
  const col = "rounded-2xl bg-[#F4F6FB] p-2.5";
  const card = "rounded-xl border border-[#E3E6F0] bg-white p-2.5 shadow-sm";
  return (
    <div className="tech-card mx-auto w-full max-w-md p-4 shadow-[0_30px_60px_-30px_rgba(42,36,99,0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#EEF0F6] pb-3">
        <p className="text-xs font-semibold">Requirement: Medical representative</p>
        <span className="rounded-md bg-[#1FB5BE]/10 px-2 py-0.5 font-mono text-[10px] text-[#178C94]">Hyderabad</span>
      </div>
      <div className="relative mt-3 grid grid-cols-3 gap-3 text-[11px]">
        {["Applied", "Interview", "Offer"].map((h) => (
          <p key={h} className="px-1 font-mono text-[10px] uppercase tracking-wider text-[#8A8FA8]">
            {h}
          </p>
        ))}
        <div className={`${col} space-y-2`}>
          {[["AK", 0.2], ["RS", 0.4], ["PM", 0.6]].map(([n, t]) => (
            <Person key={n as string} initials={n as string} className={`pop ${card}`} t={t as number} />
          ))}
        </div>
        <div className={`${col} space-y-2`}>
          <div className="move-card relative z-10">
            <Person initials="SV" className={`pop ${card} ring-2 ring-[#1FB5BE]/40`} t={0.8} />
          </div>
          <Person initials="NR" className={`pop ${card}`} t={1} />
        </div>
        <div className={`${col} space-y-2`}>
          <Person initials="DK" className={`pop ${card}`} t={1.2} />
        </div>
      </div>
      <div className="pop mt-3 flex items-center gap-2 rounded-xl bg-[#16A36A]/10 px-3 py-2 text-[11px] font-semibold text-[#0F7A4F]" style={d(1.6)}>
        <Check className="h-3.5 w-3.5" /> Offer letter sent, placement fee invoiced
      </div>
    </div>
  );
}

function Person({ initials, className, t }: { initials: string; className: string; t: number }) {
  return (
    <div className={className} style={d(t)}>
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2BC4C9] to-[#3B3A9E] text-[9px] font-bold text-white">
          {initials}
        </span>
        <span className="h-1.5 flex-1 rounded-full bg-[#E3E6F0]" />
      </div>
      <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-[#EEF0F6]" />
    </div>
  );
}
