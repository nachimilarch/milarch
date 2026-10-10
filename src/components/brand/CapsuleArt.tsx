/**
 * Abstract brand graphic built from the shapes in the Milarch logo:
 * two tall capsules, a mother-and-child pair of pills with striped "heads".
 * Pure SVG, no photography.
 */
export default function CapsuleArt({ className, muted = false }: { className?: string; muted?: boolean }) {
  const o = muted ? 0.12 : 1;
  return (
    <svg viewBox="0 0 400 520" className={className} aria-hidden="true" fill="none">
      <g opacity={o}>
        <rect x="52" y="150" width="78" height="340" rx="39" fill="#5EC4BA" transform="rotate(12 91 320)" />
        <rect x="248" y="250" width="70" height="250" rx="35" fill="#5EC4BA" transform="rotate(-12 283 375)" />
        <rect x="112" y="110" width="128" height="400" rx="64" fill="#5B55A5" transform="rotate(-14 176 310)" />
        <g className={muted ? undefined : "capsule-b"}><g transform="rotate(8 262 330)">
          <path d="M210 250a52 52 0 0 1 104 0v80H210z" fill="#E5195F" />
          <path d="M210 330h104v80a52 52 0 0 1-104 0z" fill="#FFC20E" />
        </g></g>
        <g className={muted ? undefined : "capsule-a"}>
          <circle cx="150" cy="74" r="58" fill="#E5195F" />
          <path d="M94 84 206 62" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        </g>
        <g className={muted ? undefined : "capsule-c"}>
          <circle cx="276" cy="176" r="42" fill="#FFC20E" />
          <path d="M236 182 316 166" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
