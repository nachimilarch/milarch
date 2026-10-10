import { Award, BookOpen, Boxes, Check, FileText, Image as ImageIcon, Package, PlayCircle, ShoppingCart, Truck, Users, Wallet } from "lucide-react";

/*
 * Small illustrated screens for the custom systems Milarch Tech builds.
 * Drawings of what each system does, not screenshots. They animate when
 * their .reveal card scrolls into view.
 */

const d = (s: number) => ({ animationDelay: `${s}s` });
const panel = "rounded-2xl border border-[#E3E6F0] bg-white shadow-[0_20px_40px_-24px_rgba(42,36,99,0.35)]";

/* Billing: an invoice that totals up and gets marked paid */
export function BillingArt() {
  const lines = [
    ["Consultation package", "12,000"],
    ["Monthly support", "4,500"],
    ["Hosting", "1,800"],
  ];
  return (
    <div className={`${panel} relative mx-auto w-full max-w-xs p-4 text-[11px]`}>
      <div className="flex items-center justify-between">
        <p className="font-tech text-sm font-semibold">Invoice</p>
        <span className="font-mono text-[10px] text-[#8A8FA8]">INV-0142</span>
      </div>
      <div className="mt-3 space-y-1.5 border-t border-[#EEF0F6] pt-3">
        {lines.map(([a, b], i) => (
          <div key={a} className="pop flex justify-between" style={d(0.2 + i * 0.25)}>
            <span className="text-[#5A5F7D]">{a}</span>
            <span className="font-mono">₹{b}</span>
          </div>
        ))}
        <div className="pop flex justify-between text-[#8A8FA8]" style={d(1)}>
          <span>Tax</span>
          <span className="font-mono">₹3,294</span>
        </div>
      </div>
      <div className="pop mt-3 flex justify-between border-t border-[#EEF0F6] pt-3 text-sm font-semibold" style={d(1.3)}>
        <span>Total</span>
        <span className="font-mono">₹21,594</span>
      </div>
      <span className="absolute left-[42%] top-[46%] -rotate-12">
        <span
          className="pop block rounded-md border-2 border-[#16A36A] bg-white/85 px-2.5 py-0.5 font-mono text-sm font-bold uppercase tracking-widest text-[#16A36A]"
          style={d(1.8)}
        >
          Paid
        </span>
      </span>
    </div>
  );
}

/* ERP: modules wired into one core */
export function ErpArt() {
  const mods = [
    { icon: ShoppingCart, label: "Sales", x: 8, y: 10 },
    { icon: Package, label: "Inventory", x: 64, y: 4 },
    { icon: Truck, label: "Purchase", x: 72, y: 62 },
    { icon: Users, label: "People", x: 2, y: 66 },
    { icon: Wallet, label: "Accounts", x: 36, y: 82 },
  ];
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-xs">
      <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[
          "M50 37L20 13",
          "M50 37L78 9",
          "M50 37L84 52",
          "M50 37L15 52",
          "M50 37L48 66",
        ].map((p, i) => (
          <g key={p}>
            <path d={p} pathLength={1} className={`draw d${i % 4}`} stroke="#C9CEE0" strokeWidth=".6" fill="none" />
            <path d={p} pathLength={1000} className={`trace-pulse p${i % 4}`} stroke="#1FB5BE" strokeWidth="1" fill="none" />
          </g>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-gradient-to-br from-[#2BC4C9] to-[#3B3A9E] text-white shadow-lg">
        <Boxes className="h-7 w-7" />
      </div>
      {mods.map(({ icon: Icon, label, x, y }, i) => (
        <span
          key={label}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <span className="pop flex items-center gap-1.5 rounded-xl border border-[#E3E6F0] bg-white px-2.5 py-1.5 text-[11px] font-semibold shadow-sm" style={d(0.3 + i * 0.2)}>
            <Icon className="h-3.5 w-3.5 text-[#1FB5BE]" /> {label}
          </span>
        </span>
      ))}
    </div>
  );
}

/* CMS: a page being assembled from blocks, then published */
export function CmsArt() {
  return (
    <div className={`${panel} mx-auto w-full max-w-xs p-3`}>
      <div className="flex items-center justify-between border-b border-[#EEF0F6] pb-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold">
          <FileText className="h-3.5 w-3.5 text-[#1FB5BE]" /> Home page
        </span>
        <span className="pop rounded-md bg-gradient-to-r from-[#1FB5BE] to-[#3B3A9E] px-2 py-0.5 text-[10px] font-semibold text-white" style={d(1.6)}>
          Published
        </span>
      </div>
      <div className="mt-2.5 space-y-2">
        <div className="pop space-y-1.5 rounded-lg border border-dashed border-[#C9CEE0] p-2" style={d(0.2)}>
          <span className="block h-2.5 w-3/4 rounded bg-[#0E1033]/80" />
          <span className="block h-1.5 w-1/2 rounded bg-[#C9CEE0]" />
        </div>
        <div className="pop grid h-14 place-items-center rounded-lg bg-gradient-to-br from-[#E3F6F7] to-[#E7E6F8]" style={d(0.6)}>
          <ImageIcon className="h-5 w-5 text-[#3B3A9E]/60" />
        </div>
        <div className="pop space-y-1.5 rounded-lg border border-dashed border-[#C9CEE0] p-2" style={d(1)}>
          <span className="block h-1.5 w-full rounded bg-[#E3E6F0]" />
          <span className="block h-1.5 w-5/6 rounded bg-[#E3E6F0]" />
          <span className="block h-1.5 w-2/3 rounded bg-[#E3E6F0]" />
        </div>
      </div>
    </div>
  );
}

/* LMS: lessons completing and a certificate at the end */
export function LmsArt() {
  const lessons = ["Product basics", "Doctor conversations", "Reporting in the app"];
  return (
    <div className={`${panel} mx-auto w-full max-w-xs p-3 text-[11px]`}>
      <p className="flex items-center gap-1.5 font-semibold">
        <BookOpen className="h-3.5 w-3.5 text-[#1FB5BE]" /> Field team onboarding
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F1F3F9]">
        <span className="grow-x block h-full w-full rounded-full bg-gradient-to-r from-[#2BC4C9] to-[#3B3A9E]" style={d(0.3)} />
      </div>
      <ul className="mt-3 space-y-1.5">
        {lessons.map((l, i) => (
          <li key={l} className="pop flex items-center gap-2 rounded-lg bg-[#F7F8FC] p-1.5" style={d(0.4 + i * 0.3)}>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#16A36A]/10 text-[#16A36A]">
              <Check className="h-3 w-3" />
            </span>
            {l}
            <PlayCircle className="ml-auto h-3.5 w-3.5 text-[#C9CEE0]" />
          </li>
        ))}
      </ul>
      <p className="pop mt-2.5 flex items-center gap-1.5 rounded-lg bg-[#FFF6DB] px-2 py-1.5 font-semibold text-[#8A6100]" style={d(1.5)}>
        <Award className="h-3.5 w-3.5" /> Certificate issued
      </p>
    </div>
  );
}

/* CRM: a pipeline filling up, and a follow-up landing */
export function CrmArt() {
  const stages = [
    ["New", 92],
    ["Contacted", 72],
    ["Replied", 50],
    ["Proposal", 32],
    ["Won", 18],
  ] as const;
  return (
    <div className={`${panel} mx-auto w-full max-w-xs p-3`}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#8A8FA8]">Pipeline</p>
      <div className="mt-2.5 space-y-2">
        {stages.map(([s, w], i) => (
          <div key={s} className="flex items-center gap-2 text-[10.5px]">
            <span className="w-14 shrink-0 text-[#5A5F7D]">{s}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#F1F3F9]">
              <span className="grow-x block h-full rounded-full bg-gradient-to-r from-[#2BC4C9] to-[#3B3A9E]" style={{ width: `${w}%`, ...d(0.3 + i * 0.15) }} />
            </span>
          </div>
        ))}
      </div>
      <p className="pop mt-3 flex items-center gap-1.5 rounded-lg bg-[#16A36A]/10 px-2.5 py-1.5 text-[10.5px] font-semibold text-[#0F7A4F]" style={d(1.4)}>
        <Check className="h-3 w-3" /> Reply received, follow-up booked
      </p>
    </div>
  );
}
