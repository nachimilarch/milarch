"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, MeshTransmissionMaterial } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

// ─── Layout: 2 columns × 4 rows = 8 pockets ───────────────────────────────────
const POCKETS: { x: number; y: number; isCapsule: boolean; color: string; tilt: number }[] = [
  { x: -0.75, y:  1.8, isCapsule: true,  color: "#E81B62", tilt: Math.PI / 5 },
  { x:  0.75, y:  1.8, isCapsule: false, color: "#5BBAB5", tilt: 0 },
  { x: -0.75, y:  0.6, isCapsule: false, color: "#5E51A2", tilt: 0 },
  { x:  0.75, y:  0.6, isCapsule: true,  color: "#FDB813", tilt: -Math.PI / 6 },
  { x: -0.75, y: -0.6, isCapsule: true,  color: "#2BB2C2", tilt: Math.PI / 4 },
  { x:  0.75, y: -0.6, isCapsule: false, color: "#E81B62", tilt: 0 },
  { x: -0.75, y: -1.8, isCapsule: false, color: "#5BBAB5", tilt: 0 },
  { x:  0.75, y: -1.8, isCapsule: true,  color: "#5E51A2", tilt: -Math.PI / 5 },
];

// ─── Single pill / tablet that pops out of its pocket ─────────────────────────
function Pill({
  x, y, isCapsule, color, tilt, hovered, index,
}: {
  x: number; y: number; isCapsule: boolean;
  color: string; tilt: number;
  hovered: boolean; index: number;
}) {
  // Spring: z pops out, scale grows, y floats up slightly
  const { posZ, posY, scale } = useSpring({
    posZ:  hovered ? 0.7 + index * 0.04 : 0.05,
    posY:  hovered ? y + 0.18 : y,
    scale: hovered ? 1.15 : 0.82,
    config: {
      mass:      1.4,
      tension:   220,
      friction:  14,
      delay:     index * 35,   // stagger each pill slightly
    },
  });

  const emissive = new THREE.Color(color);

  return (
    <animated.group position-x={x} position-y={posY} position-z={posZ} scale={scale}>
      {isCapsule ? (
        // Capsule — two-tone: top half brand colour, bottom half white
        <group rotation={[0, 0, tilt]}>
          {/* top half */}
          <mesh position={[0, 0.22, 0]}>
            <capsuleGeometry args={[0.22, 0.28, 16, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={hovered ? 0.6 : 0}
              metalness={0.15}
              roughness={0.25}
            />
          </mesh>
          {/* bottom half */}
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.22, 0.28, 16, 32]} />
            <meshStandardMaterial
              color="#F8FAFC"
              emissive={new THREE.Color("#ffffff")}
              emissiveIntensity={hovered ? 0.2 : 0}
              metalness={0.05}
              roughness={0.3}
            />
          </mesh>
        </group>
      ) : (
        // Round tablet — flat cylinder with bevelled edge
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.14, 48]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={hovered ? 0.6 : 0}
            metalness={0.1}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* Sparkles only when hovered */}
      {hovered && (
        <Sparkles
          count={12}
          scale={1.2}
          size={1.8}
          speed={0.5}
          color={color}
        />
      )}
    </animated.group>
  );
}

// ─── Blister strip ─────────────────────────────────────────────────────────────
function BlisterStrip() {
  const groupRef  = useRef<THREE.Group>(null);
  const foilRef   = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Gentle idle float + tilt toward viewer on hover
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      hovered ? -0.25 : Math.sin(t * 0.25) * 0.18,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      hovered ? 0.18 : Math.cos(t * 0.3) * 0.08,
      0.04
    );
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.12;
  });

  // Foil cover fades out on hover
  const { foilOpacity } = useSpring({
    foilOpacity: hovered ? 0 : 1,
    config: { mass: 1, tension: 180, friction: 20 },
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* ── Strip base: silver-tinted translucent plastic ── */}
      <RoundedBox args={[2.2, 4.8, 0.12]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#CBD5E1"
          metalness={0.55}
          roughness={0.3}
          transparent
          opacity={0.75}
        />
      </RoundedBox>

      {/* ── Pocket domes (transparent blister bubbles, always visible) ── */}
      {POCKETS.map((p, i) => (
        <mesh key={`dome-${i}`} position={[p.x, p.y, 0.13]}>
          <sphereGeometry args={[
            p.isCapsule ? 0.34 : 0.32,
            32, 16, 0, Math.PI * 2, 0, Math.PI / 2
          ]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0}
            roughness={0}
            transmission={0.92}
            thickness={0.4}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}

      {/* ── Pills inside pockets ── */}
      {POCKETS.map((p, i) => (
        <Pill
          key={`pill-${i}`}
          x={p.x}
          y={p.y}
          isCapsule={p.isCapsule}
          color={p.color}
          tilt={p.tilt}
          hovered={hovered}
          index={i}
        />
      ))}

      {/* ── Foil seal (silver metallic layer) — fades away on hover ── */}
      <animated.mesh
        ref={foilRef}
        position={[0, 0, 0.07]}
        // @ts-expect-error animated mesh
        material-opacity={foilOpacity}
      >
        <planeGeometry args={[2.1, 4.7]} />
        <meshStandardMaterial
          color="#B0B8C8"
          metalness={0.95}
          roughness={0.08}
          transparent
          opacity={1}
          side={THREE.FrontSide}
        />
      </animated.mesh>

      {/* ── Embossed lines on foil (sealed look) ── */}
      {[-1.5, -0.5, 0.5, 1.5].map((yPos, i) => (
        <mesh key={`line-${i}`} position={[0, yPos * 0.82, 0.075]}>
          <planeGeometry args={[2.0, 0.025]} />
          <meshStandardMaterial
            color="#94A3B8"
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={hovered ? 0 : 0.7}
          />
        </mesh>
      ))}

      {/* ── Vertical divider line ── */}
      <mesh position={[0, 0, 0.076]}>
        <planeGeometry args={[0.025, 4.6]} />
        <meshStandardMaterial
          color="#94A3B8"
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={hovered ? 0 : 0.7}
        />
      </mesh>
    </group>
  );
}

// ─── Canvas wrapper ────────────────────────────────────────────────────────────
export default function CapsuleChipMorph() {
  return (
    <div className="w-full h-full relative z-10 pointer-events-auto cursor-pointer">
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }}>
        <ambientLight intensity={1.0} />
        <directionalLight position={[4,  8,  6]} intensity={1.8} color="#F8FAFC" />
        <directionalLight position={[-4, -6, -4]} intensity={0.6} color="#2BB2C2" />
        <spotLight
          position={[0, 4, 8]}
          intensity={2.5}
          angle={0.45}
          penumbra={0.8}
          color="#5E51A2"
          castShadow
        />
        <pointLight position={[3, -3, 5]} intensity={0.8} color="#E81B62" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <BlisterStrip />
        </Float>
      </Canvas>
    </div>
  );
}
