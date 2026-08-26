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
    <div ref={statsRef} className="bg-white py-4 sm:py-6">
      <div className="container-lad grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-lad-black/[0.06] bg-lad-gray-light/60 px-4 py-8 text-center transition-all duration-500 ease-lad hover:-translate-y-1 hover:border-lad-red/15 hover:bg-white hover:shadow-glass sm:rounded-3xl sm:py-10"
          >
            <span
              ref={(el) => {
                if (el) counterRefs.current[index] = el;
              }}
              data-target={stat.value}
              className="block font-display text-4xl font-semibold tracking-tight text-lad-black transition-colors duration-500 group-hover:text-lad-red sm:text-5xl md:text-6xl"
            >
              {stat.value}
            </span>
            <span className="mx-auto mt-4 block h-1 w-6 rounded-full bg-lad-red/70" aria-hidden />
            <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.18em] text-lad-gray-mid sm:text-[11px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
