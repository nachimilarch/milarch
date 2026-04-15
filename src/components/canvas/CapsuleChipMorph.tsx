"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function BlisterPack() {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, hovered ? Math.PI * 0.1 : Math.sin(state.clock.elapsedTime * 0.3) * 0.3 + 0.2, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, hovered ? 0.4 : Math.cos(state.clock.elapsedTime * 0.4) * 0.2 + 0.3, 0.05);
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group} scale={1.2} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* Blister strip base (plastic) */}
        <RoundedBox args={[3.2, 5.5, 0.1]} radius={0.15} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color="#E2E8F0" metalness={0.8} roughness={0.2} transparent opacity={0.6} />
        </RoundedBox>

        <RoundedBox args={[3.2, 5.5, 0.02]} radius={0.15} smoothness={4} position={[0, 0, 0.15]}>
          <meshStandardMaterial 
             color="#A0AAB5" 
             metalness={0.9} 
             roughness={0.1} 
             transparent 
             opacity={hovered ? 0 : 1}
          />
        </RoundedBox>

        {/* Grid of tablets/capsules + digitization */}
        {[-1.5, 0, 1.5].map((y, row) => 
          [-0.8, 0.8].map((x, col) => {
             const isCapsule = (row + col) % 2 === 0;
             return (
               <group key={`${row}-${col}`} position={[x, y, 0.1]}>
                 {/* The actual Pill component */}
                 <group scale={hovered ? 1 : 0.8}>
                   {isCapsule ? (
                     <mesh rotation={[0, 0, Math.PI / 4]}>
                       <capsuleGeometry args={[0.3, 0.6, 32, 32]} />
                       <meshStandardMaterial 
                          color="#E81B62" 
                          emissive="#E81B62" 
                          emissiveIntensity={hovered ? 0.8 : 0} 
                          metalness={0.3} 
                          roughness={0.2} 
                       />
                     </mesh>
                   ) : (
                     <mesh rotation={[Math.PI / 2, 0, 0]}>
                       <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                       <meshStandardMaterial 
                          color="#5BBAB5" 
                          emissive="#5BBAB5" 
                          emissiveIntensity={hovered ? 0.8 : 0} 
                          metalness={0.1} 
                          roughness={0.3} 
                       />
                     </mesh>
                   )}
                   {/* Digitization Sparkles appearing when hovered */}
                   {hovered && (
                     <Sparkles count={20} scale={1} size={1.5} speed={0.4} color={isCapsule ? "#7B2FFF" : "#2BB2C2"} />
                   )}
                 </group>

                 {/* Plastic blister dome */}
                 <mesh position={[0, 0, 0.1]}>
                    <sphereGeometry args={[isCapsule ? 0.6 : 0.45, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} />
                    <meshPhysicalMaterial 
                      color="#ffffff" 
                      metalness={0.1} 
                      roughness={0} 
                      transmission={0.9} 
                      thickness={0.5} 
                    />
                 </mesh>
               </group>
             )
          })
        )}
      </Float>
    </group>
  );
}

export default function CapsuleChipMorph() {
  return (
    <div className="w-full h-full relative z-10 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#F8FAFC" />
        <directionalLight position={[-5, -10, -5]} intensity={1} color="#2BB2C2" />
        <spotLight position={[0, 0, 10]} intensity={2} angle={0.5} penumbra={1} color="#5E51A2" />
        <BlisterPack />
      </Canvas>
    </div>
  );
}
