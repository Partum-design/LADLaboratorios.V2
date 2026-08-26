"use client";

import { gsap } from "@/components/motion/gsap";
import Reveal from "@/components/motion/Reveal";
import { useLayoutEffect, useRef } from "react";

const hitos = [
  {
    año: "1985",
    titulo: "Fundación",
    desc: "Abrimos con una idea simple: entregar diagnósticos confiables y tratables en consulta.",
  },
  {
    año: "2017",
    titulo: "Nueva tecnología",
    desc: "Sumamos equipos para pruebas de mayor complejidad y mejor seguimiento interno.",
  },
  {
    año: "2021",
    titulo: "Resultados digitales",
    desc: "Facilitamos la entrega de resultados en línea para pacientes y médicos.",
  },
  {
    año: "2026",
    titulo: "ISO 9001:2015",
    desc: "Actualizamos procesos para mantener la certificación vigente con ayuda de Indusecc.",
  },
];

/** Trayectoria: scroll horizontal pinneado en desktop, lista vertical en móvil. */
export default function HistoriaTimeline() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="overflow-hidden bg-lad-black text-white md:h-screen">
      <div className="flex h-full flex-col justify-center py-20 md:py-0">
        <div className="container-lad">
          <Reveal>
            <p className="eyebrow">Historia</p>
            <h2 className="heading-lg mt-5 text-white">Nuestra trayectoria</h2>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          className="mt-12 grid grid-cols-1 gap-6 px-5 sm:px-8 md:mt-16 md:flex md:w-max md:flex-nowrap md:items-stretch md:gap-8 md:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] md:pr-24"
        >
          {hitos.map((hito, index) => (
            <article
              key={hito.año}
              className="group relative flex flex-col justify-end border border-white/10 bg-white/[0.04] p-8 transition-colors duration-500 hover:border-lad-red md:w-[26rem] md:shrink-0 md:p-10"
            >
              <span className="pointer-events-none absolute right-6 top-6 font-display text-7xl font-semibold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-lad-red/20 md:text-8xl">
                0{index + 1}
              </span>
              <span className="block h-1 w-10 bg-lad-red transition-all duration-500 ease-lad group-hover:w-16" />
              <p className="mt-8 font-display text-5xl font-semibold text-lad-red md:text-6xl">{hito.año}</p>
              <h3 className="mt-3 heading-sm">{hito.titulo}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">{hito.desc}</p>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
