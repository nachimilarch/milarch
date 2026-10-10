/** VaartaBot wordmark: a chat bubble with a typing indicator, then the name. */
export default function VaartaBotLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="vb-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#25D366" />
            <stop offset="1" stopColor="#0E6B4A" />
          </linearGradient>
        </defs>
        <path d="M20 3C10.6 3 3 9.9 3 18.4c0 4.4 2 8.4 5.3 11.2L7 37l7.6-3.6c1.7.5 3.5.7 5.4.7 9.4 0 17-6.9 17-15.4S29.4 3 20 3Z" fill="url(#vb-grad)" />
        <circle cx="12.5" cy="18.5" r="2.4" fill="#fff" />
        <circle cx="20" cy="18.5" r="2.4" fill="#fff" fillOpacity=".85" />
        <circle cx="27.5" cy="18.5" r="2.4" fill="#fff" fillOpacity=".7" />
      </svg>
      <span className="font-tech text-3xl font-semibold tracking-tight md:text-4xl">
        <span className="text-[#0E6B4A]">Vaarta</span>
        <span className="text-[#1FAF5A]">Bot</span>
      </span>
    </span>
  );
}
