"use client";

import { ContactShadows, Html, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export const TOMOGRAFO_MODEL_URL = "/models/tomografo.glb";

const easeInOut = (t: number) => t * t * (3 - 2 * t);

interface StageRefProps {
  progressRef: MutableRefObject<number>;
}

/** Modelo normalizado: centrado, apoyado en y=0 y escalado a ~3 unidades. */
function TomografoModel() {
  const { scene } = useGLTF(TOMOGRAFO_MODEL_URL);

  // Centrado en el origen y escalado a ~3 unidades, con la base sobre y=0.
  const { scale, lift } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 3 / maxDim;
    scene.position.set(-center.x, -center.y, -center.z);
    return { scale: s, lift: (size.y / 2) * s };
  }, [scene]);

  return (
    <group position={[0, lift, 0]} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

/** Fallback procedural: gantry + camilla construidos con primitivas. */
export function TomografoProcedural() {
  const white = new THREE.MeshStandardMaterial({ color: "#f4f2f1", roughness: 0.32, metalness: 0.05 });
  const red = new THREE.MeshStandardMaterial({
    color: "#E30613",
    roughness: 0.4,
    emissive: "#E30613",
    emissiveIntensity: 0.25,
  });
  const dark = new THREE.MeshStandardMaterial({ color: "#201E1E", roughness: 0.6 });

  return (
    <group>
      {/* Gantry */}
      <mesh material={white} position={[0, 1.15, -0.55]}>
        <torusGeometry args={[0.95, 0.42, 32, 64]} />
      </mesh>
      <mesh material={red} position={[0, 1.15, -0.12]}>
        <torusGeometry args={[0.62, 0.02, 16, 64]} />
      </mesh>
      <mesh material={dark} position={[0, 1.15, -0.55]}>
        <cylinderGeometry args={[0.56, 0.56, 0.9, 48, 1, true]} />
      </mesh>
      {/* Base del gantry */}
      <mesh material={white} position={[0, 0.28, -0.62]}>
        <boxGeometry args={[1.7, 0.56, 0.8]} />
      </mesh>
      {/* Camilla */}
      <mesh material={white} position={[0, 0.78, 0.85]}>
        <boxGeometry args={[0.56, 0.08, 1.9]} />
      </mesh>
      <mesh material={white} position={[0, 0.35, 1.25]}>
        <boxGeometry args={[0.4, 0.8, 0.5]} />
      </mesh>
      <mesh material={white} position={[0, 0.05, 1.25]}>
        <boxGeometry args={[0.9, 0.1, 1.1]} />
      </mesh>
    </group>
  );
}

/** Cámara con un barrido suave y acotado: mantiene todo dentro de cuadro. */
function Rig({ progressRef }: StageRefProps) {
  useFrame(({ camera }) => {
    const p = easeInOut(progressRef.current);
    const azimuth = THREE.MathUtils.lerp(0.32, 0.02, p);
    const radius = THREE.MathUtils.lerp(5.8, 5.1, p);
    const height = THREE.MathUtils.lerp(1.65, 1.35, p);
    camera.position.set(Math.sin(azimuth) * radius, height, Math.cos(azimuth) * radius);
    camera.lookAt(0, 1.05, 0.1);
  });
  return null;
}

/** Grupo que gira sutilmente: modelo y anotaciones comparten la misma rotación,
 * así las anotaciones se quedan pegadas a la superficie que señalan. */
function RotatingRig({ progressRef, children }: StageRefProps & { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    const p = easeInOut(progressRef.current);
    group.current.rotation.y = THREE.MathUtils.lerp(-0.06, 0.14, p);
  });
  return <group ref={group}>{children}</group>;
}

export interface TomografoAnnotation {
  position: [number, number, number];
  threshold: number;
  title: string;
  sub: string;
}

function Annotations({
  progressRef,
  annotations,
}: StageRefProps & { annotations: TomografoAnnotation[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useFrame(() => {
    const p = progressRef.current;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const visible = p >= annotations[i].threshold;
      el.style.opacity = visible ? "1" : "0";
      el.style.transform = visible ? "translateY(0)" : "translateY(10px)";
    });
  });

  return (
    <>
      {annotations.map((a, i) => (
        <Html key={a.title} position={a.position} center zIndexRange={[30, 0]} occlude={false}>
          <div
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="pointer-events-none select-none transition-all duration-700 ease-lad"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lad-red opacity-40" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-lad-red shadow" />
              </span>
              <span className="h-px w-8 bg-lad-black/30" />
              <span className="glass-card whitespace-nowrap rounded-xl px-4 py-2.5 text-left">
                <span className="block text-xs font-bold leading-tight text-lad-black">{a.title}</span>
                <span className="block text-[10px] font-medium text-lad-gray-mid">{a.sub}</span>
              </span>
            </div>
          </div>
        </Html>
      ))}
    </>
  );
}

interface TomografoCanvasProps {
  progressRef: MutableRefObject<number>;
  annotations: TomografoAnnotation[];
  procedural?: boolean;
}

export default function TomografoCanvas({ progressRef, annotations, procedural = false }: TomografoCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop="demand"
      camera={{ fov: 32, position: [1.8, 1.65, 5.6], near: 0.1, far: 30 }}
      gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} />
      <directionalLight position={[-5, 3, -2]} intensity={0.55} color="#ffe9e9" />
      <directionalLight position={[0, 4, -6]} intensity={0.4} />

      <Suspense fallback={null}>
        <RotatingRig progressRef={progressRef}>
          {procedural ? <TomografoProcedural /> : <TomografoModel />}
          <Annotations progressRef={progressRef} annotations={annotations} />
        </RotatingRig>
        <ContactShadows position={[0, 0, 0]} opacity={0.34} scale={9} blur={2.6} far={3} resolution={512} />
      </Suspense>

      <Rig progressRef={progressRef} />
    </Canvas>
  );
}

useGLTF.preload(TOMOGRAFO_MODEL_URL);
