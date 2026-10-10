"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, Html, Environment, Lightformer } from "@react-three/drei";
import { useSpring, animated, easings } from "@react-spring/three";
import * as THREE from "three";

// ─── Product label text per pocket index ──────────────────────────────────────
const LABELS = [
  "Fenticonazole · 200mg",
  "PCOS Support",
  "IUGR Care",
  "Multivitamin · Prenatal",
  "Probiotic · Synbiotic",
  "HPV · Cervical Care",
  "Iron · Folic · D3",
  "AI · WhatsApp Bot",
];

// ─── 2 col × 4 row pocket layout ──────────────────────────────────────────────
const POCKETS: {
  x: number; y: number; isCapsule: boolean; color: string; tilt: number;
  isTechNode?: boolean;
}[] = [
  { x: -0.75, y:  1.8, isCapsule: true,  color: "#FF6B9D", tilt: Math.PI / 5  },
  { x:  0.75, y:  1.8, isCapsule: false, color: "#A78BFA", tilt: 0            },
  { x: -0.75, y:  0.6, isCapsule: false, color: "#34D399", tilt: 0            },
  { x:  0.75, y:  0.6, isCapsule: true,  color: "#FBBF24", tilt: -Math.PI / 6 },
  { x: -0.75, y: -0.6, isCapsule: true,  color: "#60A5FA", tilt: Math.PI / 4  },
  { x:  0.75, y: -0.6, isCapsule: false, color: "#F87171", tilt: 0            },
  { x: -0.75, y: -1.8, isCapsule: false, color: "#A3E635", tilt: 0            },
  // pocket 7 — Milarch Tech node (WhatsApp green rounded cube)
  { x:  0.75, y: -1.8, isCapsule: true,  color: "#25D366", tilt: 0, isTechNode: true },
];

// ─── Step 1: AI scanner beam ───────────────────────────────────────────────────
// Sweeps y = -2.6 → +2.6 over 800ms on hover enter.
// Resets instantly (immediate) on hover leave.
function ScannerBeam({ hovered }: { hovered: boolean }) {
  const { scanY } = useSpring({
    scanY: hovered ? 2.6 : -2.6,
    immediate: !hovered,
    config: { duration: 800, easing: easings.easeInOutCubic },
  });

  return (
    <animated.group position-y={scanY} position-z={0.16}>
      {/* Primary teal beam line */}
      <RoundedBox args={[2.0, 0.12, 0.02]} radius={0.04} smoothness={4}>
        <meshStandardMaterial
          color="#5BBAB5"
          emissive="#5BBAB5"
          emissiveIntensity={hovered ? 2.5 : 0}
          transparent
          opacity={hovered ? 0.85 : 0}
        />
      </RoundedBox>

      {/* Wider soft glow halo behind the beam */}
      <RoundedBox args={[2.0, 0.45, 0.01]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color="#2BB2C2"
          emissive="#2BB2C2"
          emissiveIntensity={hovered ? 1.2 : 0}
          transparent
          opacity={hovered ? 0.18 : 0}
        />
      </RoundedBox>
    </animated.group>
  );
}

// ─── Pill / Tablet / Tech node ─────────────────────────────────────────────────
// Hidden inside strip at rest (posZ=-0.05, scale=0.75).
// Springs forward and scales up on hover with staggered delay.
// Carries a floating Html data label that fades in after pop.
function Pill({
  x, y, isCapsule, color, tilt, hovered, index, isTechNode,
}: {
  x: number; y: number; isCapsule: boolean; color: string; tilt: number;
  hovered: boolean; index: number; isTechNode?: boolean;
}) {
  // Step 3 — staggered spring: delay = 400 + index*45ms on enter, 0 on leave
  const { posZ, posY, scale } = useSpring({
    posZ:  hovered ? 0.85 + index * 0.04 : -0.05,
    posY:  hovered ? y + 0.15 : y,
    scale: hovered ? 1.25 : 0.75,
    config: {
      mass: 1.5, tension: 200, friction: 16,
      delay: hovered ? 400 + index * 45 : 0,
    },
  });

  const emissiveCol = new THREE.Color(color);

  return (
    <animated.group position-x={x} position-y={posY} position-z={posZ} scale={scale}>

      {/* ── Mesh body ── */}
      {isTechNode ? (
        // Pocket 7: Milarch Tech / WhatsApp node — green rounded cube
        <RoundedBox args={[0.35, 0.35, 0.18]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#25D366"
            emissive="#25D366"
            emissiveIntensity={hovered ? 1.0 : 0}
            metalness={0.2}
            roughness={0.3}
          />
        </RoundedBox>
      ) : isCapsule ? (
        // Two-tone capsule: brand colour top + white body
        <group rotation={[0, 0, tilt]}>
          <mesh position={[0, 0.20, 0]}>
            <capsuleGeometry args={[0.20, 0.32, 16, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={emissiveCol}
              emissiveIntensity={hovered ? 0.5 : 0}
              metalness={0.2}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0, -0.20, 0]}>
            <capsuleGeometry args={[0.20, 0.32, 16, 32]} />
            <meshStandardMaterial
              color="#F8FAFC"
              emissive={new THREE.Color("#FFFFFF")}
              emissiveIntensity={hovered ? 0.12 : 0}
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
        </group>
      ) : (
        // Round tablet — face-on flat disc with score line
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.10, 48]} />
            <meshStandardMaterial
              color={color}
              emissive={emissiveCol}
              emissiveIntensity={hovered ? 0.5 : 0}
              metalness={0.05}
              roughness={0.25}
            />
          </mesh>
          {/* Score line on tablet face */}
          <mesh position={[0, 0, 0.056]}>
            <boxGeometry args={[0.50, 0.014, 0.005]} />
            <meshStandardMaterial color="#3A5060" metalness={0.1} roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* ── Sparkles on hover ── */}
      {hovered && (
        <Sparkles
          count={isTechNode ? 14 : 10}
          scale={isTechNode ? 1.4 : 1.2}
          size={isTechNode ? 2.0 : 1.6}
          speed={isTechNode ? 0.6 : 0.4}
          color={isTechNode ? "#25D366" : color}
        />
      )}

      {/*
        ── Step 4: Floating data label ──
        Renders above the pill in screen space via Html portal.
        Fades in with CSS opacity after the pill has finished popping out.
      */}
      <Html
        position={[0, 0.55, 0.5]}
        center
        distanceFactor={6}
        occlude={false}
        zIndexRange={[0, 10]}
      >
        <div
          style={{
            background: "rgba(10, 20, 30, 0.82)",
            border: "1px solid #5BBAB5",
            borderRadius: "6px",
            padding: "4px 9px",
            color: "#E0F7F7",
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            transitionDelay: hovered ? `${400 + index * 45}ms` : "0ms",
            boxShadow: "0 0 8px rgba(91, 186, 181, 0.4)",
          }}
        >
          {LABELS[index]}
        </div>
      </Html>
    </animated.group>
  );
}

// ─── Blister strip ─────────────────────────────────────────────────────────────
function BlisterStrip() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Step 5 — pulse scan line refs (4 lines, updated imperatively in useFrame)
  const lineRef0 = useRef<THREE.Mesh>(null);
  const lineRef1 = useRef<THREE.Mesh>(null);
  const lineRef2 = useRef<THREE.Mesh>(null);
  const lineRef3 = useRef<THREE.Mesh>(null);
  const lineRefs = [lineRef0, lineRef1, lineRef2, lineRef3];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle idle sway + tilt toward viewer on hover
    // (Float handles vertical bob — no position.y mutation here)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      hovered ? -0.22 : Math.sin(t * 0.22) * 0.14,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      hovered ? 0.14 : Math.cos(t * 0.28) * 0.06,
      0.04
    );

    // Step 5 — pulse lines: each line i has a Math.PI/2 phase offset
    lineRefs.forEach((ref, i) => {
      if (ref.current) {
        const mat = ref.current.material as THREE.MeshStandardMaterial;
        mat.opacity = hovered
          ? Math.max(0, Math.sin(t * 3.0 + i * (Math.PI / 2))) * 0.7
          : 0;
      }
    });
  });

  // Step 2 — foil dissolves (delay 200ms on enter, instant restore on leave)
  const { foilOpacity, lineOpacity } = useSpring({
    foilOpacity: hovered ? 0 : 1,
    lineOpacity: hovered ? 0 : 0.82,
    config: {
      mass: 1, tension: 160, friction: 22,
      delay: hovered ? 200 : 0,
    },
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* ── Strip tray base: muted silver-blue aluminium ── */}
      <RoundedBox args={[2.2, 4.8, 0.14]} radius={0.14} smoothness={4}>
        <meshPhysicalMaterial
          color="#A8B8C8"
          metalness={0.88}
          roughness={0.12}
          reflectivity={0.9}
          envMapIntensity={1.4}
        />
      </RoundedBox>

      {/* ── Blister dome bubbles — always visible, suggest pills inside ── */}
      {POCKETS.map((p, i) => (
        <mesh key={`dome-${i}`} position={[p.x, p.y, 0.13]}>
          <sphereGeometry
            args={[p.isCapsule ? 0.35 : 0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshPhysicalMaterial
            color="#E8F0F8"
            metalness={0}
            roughness={0}
            transmission={0.88}
            thickness={0.5}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}

      {/* ── Pills — hidden behind foil at rest, spring outward on hover ── */}
      {POCKETS.map((p, i) => (
        <Pill
          key={`pill-${i}`}
          x={p.x} y={p.y}
          isCapsule={p.isCapsule}
          color={p.color} tilt={p.tilt}
          hovered={hovered} index={i}
          isTechNode={p.isTechNode}
        />
      ))}

      {/* ── Step 1: AI scanner beam ── */}
      <ScannerBeam hovered={hovered} />

      {/*
        ── Step 2: Silver aluminium foil seal ──
        z=0.14 covers all pill geometry at rest
        (capsule front face at rest = -0.05 + 0.20 × 0.75 = 0.10 < 0.14).
        Spring starts dissolving at delay=200ms on hover enter.
      */}
      <mesh position={[0, 0, 0.14]}>
        <planeGeometry args={[2.1, 4.7]} />
        <animated.meshStandardMaterial
          color="#C8D8E8"
          metalness={0.92}
          roughness={0.10}
          envMapIntensity={1.2}
          transparent
          opacity={foilOpacity}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* ── Horizontal embossed grid lines — fade with foil ── */}
      {[-1.5, -0.5, 0.5, 1.5].map((yPos, i) => (
        <mesh key={`hline-${i}`} position={[0, yPos * 0.82, 0.145]}>
          <planeGeometry args={[2.05, 0.02]} />
          <animated.meshStandardMaterial
            color="#8090A0"
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={lineOpacity}
          />
        </mesh>
      ))}

      {/* ── Vertical centre divider — fades with foil ── */}
      <mesh position={[0, 0, 0.144]}>
        <planeGeometry args={[0.02, 4.65]} />
        <animated.meshStandardMaterial
          color="#8090A0"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={lineOpacity}
        />
      </mesh>

      {/*
        ── Step 5: Pulse scan lines ──
        4 thin emissive lines at row y-positions.
        Opacity driven by sin wave in useFrame — creates sequential pulse effect.
      */}
      {([-1.8, -0.6, 0.6, 1.8] as const).map((yPos, i) => (
        <mesh
          key={`pulse-${i}`}
          ref={lineRefs[i]}
          position={[0, yPos, 0.075]}
        >
          <boxGeometry args={[1.95, 0.018, 0.005]} />
          <meshStandardMaterial
            color="#2BB2C2"
            emissive="#2BB2C2"
            transparent
            opacity={0}
          />
        </mesh>
      ))}

      {/* ── Scanner glow light — active only when hovered ── */}
      <pointLight
        position={[0, 0, 2]}
        intensity={hovered ? 1.5 : 0}
        color="#5BBAB5"
        distance={3}
      />
    </group>
  );
}

// ─── Canvas wrapper ────────────────────────────────────────────────────────────
export default function CapsuleChipMorph() {
  return (
    <div className="w-full h-full relative z-10 pointer-events-auto cursor-pointer">
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }}>
        {/*
          Procedural studio environment — built from colored Lightformer panels
          instead of a remote HDRI preset. `Environment preset="*"` fetches a
          texture over the network with no Suspense boundary here; if that
          fetch stalls or is blocked (flaky network, ad-blocker, sandboxed
          preview), the whole canvas silently renders nothing forever. This
          version is fully procedural — zero network dependency — and tints
          the metal/foil reflections with the brand palette.
        */}
        <Suspense fallback={null}>
          <Environment resolution={256}>
            {/* Overhead softbox — main silver fill, kept modest so the metal keeps contrast against the page */}
            <Lightformer form="rect" intensity={2.5} color="#FFFFFF" position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
            {/* Front softbox, facing the strip from the camera side */}
            <Lightformer form="rect" intensity={2.5} color="#F8FAFC" position={[0, 0, 9]} scale={[7, 7, 1]} />
            {/* Teal accent from the left */}
            <Lightformer form="rect" intensity={2.5} color="#5BBAB5" position={[-9, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 8, 1]} />
            {/* Pink accent from the right */}
            <Lightformer form="rect" intensity={2.5} color="#E81B62" position={[9, 0, 0]} rotation-y={-Math.PI / 2} scale={[8, 8, 1]} />
            {/* Purple fill from behind — kept faint, purely a whisper of shadow-side tinting */}
            <Lightformer form="rect" intensity={0.4} color="#4A3D8F" position={[0, 0, -9]} rotation-y={Math.PI} scale={[8, 8, 1]} />
          </Environment>
        </Suspense>

        <ambientLight intensity={0.55} />

        {/* Key — warm white from top-front */}
        <directionalLight position={[3,  6,  5]} intensity={2.4} color="#F0F4FF" />

        {/* Teal fill — reflects on foil as cool blue-green */}
        <pointLight      position={[-4, 1,  4]} intensity={2.0} color="#5BBAB5" />

        {/* Purple rim — behind, adds metallic depth */}
        <pointLight      position={[2, -3, -3]} intensity={1.3} color="#4A3D8F" />

        {/* Pink accent — bottom warm glow */}
        <pointLight      position={[0, -4,  3]} intensity={1.0} color="#E81B62" />

        <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.3}>
          <BlisterStrip />
        </Float>
      </Canvas>
    </div>
  );
}
