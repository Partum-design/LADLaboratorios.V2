"use client";

import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useLayoutEffect, useRef } from "react";

const stats = [
  { value: "40+", label: "Años de experiencia" },
  { value: "500+", label: "Estudios disponibles" },
  { value: "ISO", label: "Sistema de calidad" },
  { value: "Digital", label: "Resultados disponibles" },
];

export default function StatsBand() {
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          counterRefs.current.forEach((span) => {
            const target = span.dataset.target || "0";
            const suffix = target.replace(/[0-9]/g, "");
            const num = Number.parseInt(target, 10);
            if (Number.isNaN(num)) {
              span.textContent = target;
              return;
            }
            gsap.fromTo(
              span,
              { textContent: "0" },
              {
                textContent: num,
                duration: 1.8,
                snap: { textContent: 1 },
                onUpdate: () => {
                  span.textContent = `${Math.round(Number(span.textContent))}${suffix}`;
                },
              }
            );
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={statsRef} className="border-y border-lad-black/5 bg-white">
      <div className="container-lad grid grid-cols-2 divide-lad-black/5 md:grid-cols-4 md:divide-x">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col gap-1 px-2 py-10 text-center md:py-14">
            <span
              ref={(el) => {
                if (el) counterRefs.current[index] = el;
              }}
              data-target={stat.value}
              className="block font-display text-5xl font-semibold tracking-tight text-lad-black md:text-6xl"
            >
              {stat.value}
            </span>
            <span className="mx-auto mt-2 h-px w-8 bg-lad-red" aria-hidden />
            <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-lad-black/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
