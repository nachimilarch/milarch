/**
 * Background of circuit traces in the style of the Milarch Tech mark
 * (angled lines ending in round pads), with light pulses running along them.
 */
const TRACES = [
  "M0 120 H220 L300 200 V420 L360 480 H620",
  "M0 300 H140 L200 360 V560 H420 L480 620 H760",
  "M1200 80 H940 L860 160 V300 L800 360 H600",
  "M1200 420 H1020 L960 480 V640 H780",
  "M380 0 V90 L440 150 H700 L760 210 V300",
];
const PADS: [number, number][] = [
  [620, 480], [760, 620], [600, 360], [780, 640], [760, 300], [220, 120], [940, 80],
];

export default function CircuitField({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="trace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2BD3D8" />
          <stop offset="1" stopColor="#5B4FC4" />
        </linearGradient>
      </defs>
      {TRACES.map((d) => (
        <path key={d} d={d} stroke="url(#trace)" strokeOpacity="0.22" strokeWidth="6" strokeLinejoin="round" />
      ))}
      {TRACES.map((d, i) => (
        <path
          key={`p-${d}`}
          d={d}
          pathLength={1000}
          className={`trace-pulse d${i % 4}`}
          stroke="#2BD3D8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {PADS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="11" fill="#0A0918" stroke="#2BD3D8" strokeOpacity="0.6" strokeWidth="5" />
      ))}
    </svg>
  );
}
