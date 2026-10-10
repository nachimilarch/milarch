"use client";

const PILLS = [
  { x:5,  y:110, dur:22, del:0,  shape:'capsule-h', color:'#5BBAB5', w:38, h:14, rot:15,   sway:40,  op:0.15 },
  { x:12, y:120, dur:28, del:3,  shape:'round',     color:'#4A3D8F', w:20, h:20, rot:-180,  sway:-30, op:0.12 },
  { x:20, y:105, dur:19, del:7,  shape:'oval',      color:'#E81B62', w:28, h:13, rot:25,   sway:60,  op:0.18 },
  { x:30, y:115, dur:32, del:1,  shape:'capsule-h', color:'#FDB813', w:42, h:16, rot:-20,  sway:-50, op:0.14 },
  { x:38, y:108, dur:25, del:12, shape:'round',     color:'#2BB2C2', w:18, h:18, rot:360,  sway:35,  op:0.20 },
  { x:45, y:122, dur:21, del:5,  shape:'oval',      color:'#E8217A', w:26, h:12, rot:-45,  sway:-40, op:0.16 },
  { x:55, y:112, dur:30, del:9,  shape:'capsule-h', color:'#4A3D8F', w:36, h:15, rot:30,   sway:55,  op:0.13 },
  { x:63, y:118, dur:24, del:2,  shape:'round',     color:'#5BBAB5', w:22, h:22, rot:-270, sway:-25, op:0.17 },
  { x:70, y:106, dur:27, del:14, shape:'oval',      color:'#FDB813', w:30, h:14, rot:60,   sway:45,  op:0.19 },
  { x:78, y:125, dur:20, del:6,  shape:'capsule-h', color:'#E81B62', w:40, h:17, rot:-15,  sway:-60, op:0.15 },
  { x:85, y:110, dur:33, del:10, shape:'round',     color:'#2BB2C2', w:16, h:16, rot:180,  sway:30,  op:0.11 },
  { x:92, y:120, dur:23, del:4,  shape:'oval',      color:'#4A3D8F', w:24, h:11, rot:-90,  sway:-35, op:0.22 },
  { x:8,  y:130, dur:29, del:16, shape:'capsule-h', color:'#E8217A', w:34, h:14, rot:45,   sway:50,  op:0.14 },
  { x:17, y:115, dur:18, del:8,  shape:'round',     color:'#FDB813', w:20, h:20, rot:-360, sway:-45, op:0.18 },
  { x:25, y:108, dur:26, del:11, shape:'oval',      color:'#5BBAB5', w:32, h:15, rot:20,   sway:65,  op:0.13 },
  { x:35, y:122, dur:31, del:3,  shape:'capsule-h', color:'#2BB2C2', w:44, h:18, rot:-30,  sway:-55, op:0.16 },
  { x:48, y:112, dur:22, del:18, shape:'round',     color:'#E81B62', w:18, h:18, rot:270,  sway:40,  op:0.20 },
  { x:58, y:118, dur:28, del:7,  shape:'oval',      color:'#4A3D8F', w:28, h:13, rot:-60,  sway:-30, op:0.15 },
  { x:67, y:105, dur:19, del:13, shape:'capsule-h', color:'#FDB813', w:38, h:15, rot:35,   sway:50,  op:0.12 },
  { x:75, y:125, dur:34, del:2,  shape:'round',     color:'#5BBAB5', w:22, h:22, rot:-180, sway:-40, op:0.17 },
  { x:82, y:110, dur:25, del:15, shape:'oval',      color:'#E8217A', w:26, h:12, rot:50,   sway:35,  op:0.21 },
  { x:90, y:120, dur:21, del:9,  shape:'capsule-h', color:'#2BB2C2', w:40, h:16, rot:-25,  sway:-65, op:0.14 },
  { x:3,  y:115, dur:27, del:17, shape:'round',     color:'#4A3D8F', w:20, h:20, rot:360,  sway:45,  op:0.16 },
  { x:14, y:108, dur:32, del:5,  shape:'oval',      color:'#E81B62', w:30, h:14, rot:-45,  sway:-50, op:0.19 },
  { x:42, y:122, dur:20, del:11, shape:'capsule-h', color:'#5BBAB5', w:36, h:14, rot:20,   sway:60,  op:0.13 },
  { x:52, y:130, dur:24, del:4,  shape:'round',     color:'#FDB813', w:18, h:18, rot:-270, sway:-35, op:0.22 },
  { x:72, y:112, dur:30, del:14, shape:'oval',      color:'#2BB2C2', w:24, h:11, rot:75,   sway:40,  op:0.15 },
  { x:96, y:118, dur:23, del:6,  shape:'capsule-h', color:'#E8217A', w:32, h:13, rot:-35,  sway:-45, op:0.18 },
] as const;

const keyframesCSS = PILLS.map((p, i) => `
  @keyframes float-${i} {
    0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
    10%  { opacity: ${p.op}; }
    90%  { opacity: ${p.op}; }
    100% { transform: translateY(-110vh) translateX(${p.sway}px) rotate(${p.rot}deg); opacity: 0; }
  }
`).join('');

const staticCSS = `
  .floating-pill-round {
    position: relative;
  }
  .floating-pill-round::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 1.5px;
    background: rgba(255, 255, 255, 0.6);
    top: 50%;
    left: 20%;
    transform: translateY(-50%);
    border-radius: 2px;
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .floating-pill {
      animation: none !important;
      opacity: 0.08 !important;
    }
  }
`;

function getPillStyle(
  pill: (typeof PILLS)[number],
  i: number
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    left: `${pill.x}%`,
    top: `${pill.y}vh`,
    width: `${pill.w}px`,
    height: `${pill.h}px`,
    opacity: 0,
    animation: `float-${i} ${pill.dur}s linear ${pill.del}s infinite`,
    willChange: 'transform, opacity',
  };

  if (pill.shape === 'capsule-h') {
    return {
      ...base,
      borderRadius: '999px',
      background: `linear-gradient(90deg, ${pill.color} 50%, #ffffff 50%)`,
      border: `1.5px solid ${pill.color}`,
    };
  }
  if (pill.shape === 'round') {
    return {
      ...base,
      borderRadius: '50%',
      background: pill.color,
      border: `1.5px solid ${pill.color}`,
    };
  }
  // oval
  return {
    ...base,
    borderRadius: '999px',
    background: pill.color,
    border: `1.5px solid ${pill.color}`,
  };
}

export default function FloatingPillsBackground() {
  return (
    <>
      <style>{keyframesCSS + staticCSS}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {PILLS.map((pill, i) => (
          <div
            key={i}
            className={`floating-pill${pill.shape === 'round' ? ' floating-pill-round' : ''}`}
            style={getPillStyle(pill, i)}
          />
        ))}
      </div>
    </>
  );
}
