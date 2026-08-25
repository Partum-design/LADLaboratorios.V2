"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";

interface ParallaxProps {
  children: React.ReactNode;
  /** Desplazamiento vertical en % del alto propio (positivo = baja al hacer scroll). */
  yPercent?: number;
  className?: string;
}

/** Parallax sutil con scrub, desactivado en móvil y con reduced-motion. */
export default function Parallax({ children, yPercent = 14, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { yPercent: -yPercent / 2 },
          {
            yPercent: yPercent / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [yPercent]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
