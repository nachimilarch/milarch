/**
 * The Milarch mark, redrawn as SVG so each piece can move on its own:
 * two teal capsules and a purple capsule form the M, the mother's head is a
 * scored pink tablet with a ponytail, and the child is a pink and yellow
 * capsule with a yellow tablet head, leaning on the mother.
 *
 * The pieces assemble when the mark scrolls into view (the reveal script
 * adds `.in`). Without JavaScript, or with reduced motion, it renders as the
 * finished logo.
 */
export default function AnimatedMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-20 -20 310 440" className={`mark-anim ${className ?? ""}`} role="img" aria-label="Milarch logo: a mother and child formed into an M from capsules and tablets">
      {/* Legs of the M */}
      <g className="m-legl">
        <rect x="22" y="130.2" width="65" height="269.6" rx="32.5" fill="#5EC4BA" transform="rotate(12.13 54.5 265)" />
      </g>
      <g className="m-legr">
        <rect x="197" y="227.2" width="49" height="174.5" rx="24.5" fill="#5EC4BA" transform="rotate(-11.49 221.5 314.5)" />
      </g>

      {/* Mother: purple capsule */}
      <g className="m-body">
        <rect x="74.8" y="85" width="104" height="316.1" rx="52" fill="#5B55A5" transform="rotate(-13.75 126.8 243)" />
      </g>

      {/* Child: a capsule that closes, then leans in */}
      <g className="m-baby">
        <g transform="rotate(10.74 174.4 277)">
          <g className="m-cap-top">
            <path d="M132.4 277V207.8a42 42 0 0 1 84 0V277Z" fill="#E5195F" />
          </g>
          <g className="m-cap-bot">
            <path d="M132.4 277h84v69.2a42 42 0 0 1-84 0Z" fill="#FFC20E" />
          </g>
          <path className="m-seam" d="M132.4 277h84" stroke="#fff" strokeWidth="2.5" />
        </g>
      </g>

      {/* Mother's head: a scored tablet that rolls in, with a ponytail */}
      <g className="m-head">
        <g className="m-head-idle">
          <g className="m-tail">
            <path d="M36 24C22 15 3 22 .5 41-1 55 9 63 14 71c3 5 4 9 3 13 7-6 14-15 19-24Z" fill="#E5195F" />
          </g>
          <circle cx="79" cy="50" r="50" fill="#E5195F" />
          <path d="M30.9 63.8 127.1 36.2" stroke="#fff" strokeWidth="5" />
        </g>
      </g>

      {/* Child's head: a small scored tablet that pops on */}
      <g className="m-bhead">
        <g className="m-bhead-idle">
          <circle cx="204.5" cy="139.5" r="37.5" fill="#FFC20E" />
          <path d="m168.7 128.35 71.6 22.3" stroke="#fff" strokeWidth="4" />
        </g>
      </g>
    </svg>
  );
}
