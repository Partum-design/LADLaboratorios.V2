"use client";

import { gsap } from "@/components/motion/gsap";
import { useLayoutEffect, useRef } from "react";

const WIDTH = 1000;
const HEIGHT = 200;
const BASELINE = HEIGHT / 2;

/**
 * Traza de ECG determinista: arranca en señal irregular (izquierda) y se
 * resuelve en un latido limpio y repetido (derecha) — de la incertidumbre
 * a la certeza, el mismo relato del diagnóstico clínico.
 */
function buildEcgPath(): string {
  const points: [number, number][] = [[0, BASELINE]];

  const noisyEnd = WIDTH * 0.3;
  for (let x = 16; x <= noisyEnd; x += 14) {
    const y = BASELINE + Math.sin(x * 0.35) * 6 + Math.sin(x * 0.9) * 3;
    points.push([x, y]);
  }

  let cursor = noisyEnd;
  points.push([cursor + 24, BASELINE]);
  cursor += 24;

  const cycle: [number, number][] = [
    [10, 0],
    [16, -8],
    [22, 0],
    [30, 0],
    [34, 5],
    [38, -62],
    [42, 12],
    [46, 0],
    [62, 0],
    [76, -15],
    [86, -15],
    [96, 0],
    [154, 0],
  ];

  while (cursor < WIDTH) {
    for (const [dx, dy] of cycle) {
      const x = cursor + dx;
      if (x > WIDTH) break;
      points.push([x, BASELINE + dy]);
    }
    cursor += 154;
  }
  points.push([WIDTH, BASELINE]);

  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

const ECG_PATH = buildEcgPath();

export default function EcgSignature({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([path, glow], { strokeDasharray: length, strokeDashoffset: length });
        if (glow) gsap.set(glow, { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.75 });
        tl.to(path, { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut" });
        if (glow) {
          tl.to(glow, { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut" }, "<")
            .to(glow, { opacity: 1, duration: 0.5 }, "<")
            .to(glow, { opacity: 0.35, duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true });
        }
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
        if (glow) gsap.set(glow, { opacity: 0 });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={glowRef}
        d={ECG_PATH}
        fill="none"
        stroke="#E30613"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="blur-md"
        opacity={0}
      />
      <path
        ref={pathRef}
        d={ECG_PATH}
        fill="none"
        stroke="#E30613"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
