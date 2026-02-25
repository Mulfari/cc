"use client";

import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, useTexture, Lightformer, Preload } from "@react-three/drei";

// --- Las Monedas Optimizadas ---
const PremiumCoin = ({ radius, speed, angleOffset, yOffset, color, geometries }) => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    
    groupRef.current.position.x = Math.cos(t + angleOffset) * radius;
    groupRef.current.position.z = Math.sin(t + angleOffset) * radius;
    groupRef.current.position.y = yOffset + Math.sin(t * 2 + angleOffset) * 0.3;
    
    groupRef.current.rotation.x = t * 1.5;
    groupRef.current.rotation.y = t * 2;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometries.cylinder}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.1} />
      </mesh>
      <mesh geometry={geometries.edge} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
};

// --- El Planeta Esculpido (Con links directos para prueba) ---
const SculptedBlackEarth = () => {
  const earthRef = useRef(null);

  // Usamos los links directos de Three.js para que no tengas que descargar nada ahora mismo
  const [specularMap, normalMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg"
  ]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group rotation={[0.2, 0, 0]}>
      <mesh ref={earthRef} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          map={specularMap}
          color="#cbd5e1"
          normalMap={normalMap}
          normalScale={new THREE.Vector2(1.2, 1.2)} 
          metalness={0.8}
          roughness={0.75}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
};

// --- Fallback ---
const Loader = () => (
   <mesh scale={2}><sphereGeometry args={[1, 32, 32]} /><meshBasicMaterial color="#334155" wireframe /></mesh>
);

// --- Escena Principal ---
const RemittancePlugAndPlayHero = ({ className = "" }) => {
  // Caché de geometrías
  const coinGeometries = useMemo(() => ({
    cylinder: new THREE.CylinderGeometry(0.2, 0.2, 0.03, 32),
    edge: new THREE.TorusGeometry(0.2, 0.02, 16, 64)
  }), []);

  return (
    <div className={className} style={{ width: "100%", height: "100%", background: "transparent" }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }} style={{ background: "transparent" }}>
        
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-8, 3, -8]} intensity={4} color="#ffffff" />
        <directionalLight position={[8, -5, -8]} intensity={2} color="#e2e8f0" />

        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.15}>
          <group position={[2.5, -0.2, 0]}>
            <Suspense fallback={<Loader />}>
                <SculptedBlackEarth />
            </Suspense>

            <PremiumCoin geometries={coinGeometries} radius={2.8} speed={0.4} angleOffset={0} yOffset={0.5} color="#fbbf24" />
            <PremiumCoin geometries={coinGeometries} radius={3.4} speed={0.3} angleOffset={Math.PI * 0.9} yOffset={-0.3} color="#f8fafc" />
            <PremiumCoin geometries={coinGeometries} radius={2.5} speed={0.5} angleOffset={Math.PI * 1.6} yOffset={0.2} color="#f43f5e" />
          </group>
        </Float>

        <ContactShadows position={[2.5, -2.8, 0]} opacity={0.6} scale={12} blur={3} far={4} color="#0f172a" resolution={256} />
        
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 10, -5]} rotation-x={Math.PI / 2} scale={[20, 5, 1]} />
          <Lightformer form="rect" intensity={2} position={[-10, 0, 0]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
          <Lightformer form="rect" intensity={2} position={[10, 0, 0]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
        </Environment>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default RemittancePlugAndPlayHero;