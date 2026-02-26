"use client";

import { useRef, Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, useTexture, Lightformer, Preload, useProgress } from "@react-three/drei";

// --- COMPONENTE MEJORADO: RED TÁCTICA CON PARTÍCULAS VIAJERAS ---
const TacticalDataNetwork = ({ radius = 2.02, count = 450, maxDistance = 0.5, colorNodes = "#06b6d4", colorLines = "#0284c7", speed = 0.03 }) => {
  const groupRef = useRef(null);
  const instancedSpikesRef = useRef(null);
  const instancedPulsesRef = useRef(null); // Referencia para las partículas que viajan
  
  const dummySpike = useMemo(() => new THREE.Object3D(), []);
  const dummyPulse = useMemo(() => new THREE.Object3D(), []);

  // Número de "paquetes de datos" viajando por la red simultáneamente
  const numPulses = 20; 

  const { geo, spikeMatrices, nodesPos, adjList, initialPulses } = useMemo(() => {
    const pos = [];
    const matrices = [];
    
    // 1. Crear Nodos
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const vec = new THREE.Vector3(x, y, z);
      pos.push(vec);

      dummySpike.position.copy(vec);
      dummySpike.lookAt(0, 0, 0); 
      dummySpike.scale.set(1, 1, Math.random() * 1.5 + 0.5);
      dummySpike.updateMatrix();
      matrices.push(dummySpike.matrix.clone());
    }

    // 2. Crear Conexiones y Lista de Adyacencia (grafo real)
    const indices = [];
    const adjacency = Array.from({ length: count }, () => []); // Grafo para saber quién se conecta con quién

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pos[i].distanceTo(pos[j]) < maxDistance) {
          indices.push(i, j);
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      }
    }

    // 3. Geometría de las líneas
    const posArray = new Float32Array(count * 3);
    pos.forEach((v, i) => {
      posArray[i * 3] = v.x;
      posArray[i * 3 + 1] = v.y;
      posArray[i * 3 + 2] = v.z;
    });

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    g.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    
    // 4. Inicializar las partículas viajeras (Pulses)
    const pulses = Array.from({ length: numPulses }, () => {
      // Buscar un nodo inicial que tenga al menos una conexión
      let startNode = Math.floor(Math.random() * count);
      while (adjacency[startNode].length === 0) {
        startNode = Math.floor(Math.random() * count);
      }
      
      // Elegir un vecino aleatorio como destino
      const endNode = adjacency[startNode][Math.floor(Math.random() * adjacency[startNode].length)];

      return {
        startNode,
        endNode,
        progress: Math.random(), // Empezar en un punto aleatorio del camino
        speed: 0.5 + Math.random() * 0.8 // Velocidad aleatoria
      };
    });

    return { geo: g, spikeMatrices: matrices, nodesPos: pos, adjList: adjacency, initialPulses: pulses };
  }, [radius, count, maxDistance, dummySpike]);

  // Guardamos el estado de los pulsos en una referencia mutable para animarlos
  const pulsesState = useRef(initialPulses);

  // Asignar matrices estáticas a los pilares
  useEffect(() => {
    if (instancedSpikesRef.current) {
      spikeMatrices.forEach((matrix, i) => {
        instancedSpikesRef.current.setMatrixAt(i, matrix);
      });
      instancedSpikesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [spikeMatrices]);

  // Animación frame por frame
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * speed;

    if (instancedPulsesRef.current) {
      pulsesState.current.forEach((pulse, i) => {
        pulse.progress += delta * pulse.speed;

        // Si llega al final, desaparece y reaparece en un lugar nuevo (Ya lo tenías bien)
        if (pulse.progress >= 1.0) {
          let newStart = Math.floor(Math.random() * count);
          while (adjList[newStart].length === 0) {
            newStart = Math.floor(Math.random() * count);
          }
          pulse.startNode = newStart;
          pulse.endNode = adjList[newStart][Math.floor(Math.random() * adjList[newStart].length)];
          pulse.progress = 0;
          pulse.speed = 0.3 + Math.random() * 0.7;
        }

        const startPos = nodesPos[pulse.startNode];
        const endPos = nodesPos[pulse.endNode];
        
        // Interpolación de posición
        dummyPulse.position.lerpVectors(startPos, endPos, pulse.progress);
        
        // --- NUEVO EFECTO VISUAL ---
        // Aparece rápido en el primer 10% del viaje, mantiene su tamaño, 
        // y desaparece rápido en el último 10% al llegar al nodo destino.
        let scaleMultiplier = 1;
        if (pulse.progress < 0.1) {
          scaleMultiplier = pulse.progress * 10; // Crece de 0 a 1 velozmente
        } else if (pulse.progress > 0.9) {
          scaleMultiplier = (1.0 - pulse.progress) * 10; // Se encoge de 1 a 0 velozmente al llegar
        }
        
        const scale = scaleMultiplier * 0.025;
        dummyPulse.scale.setScalar(scale);
        
        dummyPulse.updateMatrix();
        instancedPulsesRef.current.setMatrixAt(i, dummyPulse.matrix);
      });

      instancedPulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodos y líneas estáticas de fondo */}
      <points geometry={geo}>
        <pointsMaterial color={colorNodes} size={0.015} transparent opacity={0.5} depthWrite={false} />
      </points>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color={colorLines} transparent opacity={0.15} depthWrite={false} />
      </lineSegments>

      {/* Pilares fijos (los "palitos") */}
      <instancedMesh ref={instancedSpikesRef} args={[null, null, count]}>
        <boxGeometry args={[0.008, 0.008, 0.12]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.4} depthWrite={false} />
      </instancedMesh>

      {/* NUEVO: Las partículas de luz iterando por las conexiones */}
      <instancedMesh ref={instancedPulsesRef} args={[null, null, numPulses]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} depthWrite={false} />
      </instancedMesh>
    </group>
  );
};

// --- EL PLANETA BASE ---
const SculptedBlackEarth = () => {
  const groupRef = useRef(null);

  const [specularMap, normalMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
  ]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[0.2, 3.5, 0]}>
      <mesh scale={2}>
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

      <TacticalDataNetwork 
        radius={2.02} 
        count={450} 
        maxDistance={0.45} 
      />
    </group>
  );
};

// --- FALLBACK MIENTRAS CARGA ---
const Loader = () => (
  <mesh scale={2}>
    <sphereGeometry args={[1, 32, 32]} />
    <meshBasicMaterial color="#334155" wireframe />
  </mesh>
);

// --- ESCENA PRINCIPAL ---
const ThreeHeroScene = ({ className = "", onLoaded }) => {
  const { active } = useProgress();

  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => onLoaded?.(), 200);
      return () => clearTimeout(timer);
    }
  }, [active, onLoaded]);

  return (
    <div className={className} style={{ width: "100%", height: "100%", background: "transparent" }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-8, 3, -8]} intensity={4} color="#ffffff" />
        <directionalLight position={[8, -5, -8]} intensity={2} color="#e2e8f0" />
        
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.15}>
          <group position={[2.5, -0.2, 0]}>
            <Suspense fallback={<Loader />}>
              <SculptedBlackEarth />
            </Suspense>
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

export default ThreeHeroScene;