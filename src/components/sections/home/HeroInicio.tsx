"use client";

import AmbientGlow from "@/components/ui/AmbientGlow";
import VideoAuto from "@/components/ui/VideoAuto";
import { EASE, gsap } from "@/components/motion/gsap";
import Reveal from "@/components/motion/Reveal";
import { LAD_METEPEC_MAPS_LINK } from "@/lib/contact";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const heroTitles = ["precisos", "confiables", "certificados", "inmediatos", "claros"];

const heroStats = [
  { value: "24/7", label: "Rayos X y tomografía" },
  { value: "ISO", label: "Sistema de calidad 9001:2015" },
];

function HeroStatCard({ stat }: { stat: (typeof heroStats)[number] }) {
  return (
    <>
      <span className="block font-display text-2xl font-bold text-lad-black">{stat.value}</span>
      <span className="mt-1 block text-[10px] font-bold uppercase leading-tight tracking-wide text-lad-gray-mid">
        {stat.label}
      </span>
    </>
  );
}

export default function HeroInicio() {
  const heroRef = useRef<HTMLElement>(null);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === heroTitles.length - 1 ? 0 : prev + 1));
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-media", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-copy", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="relative bg-lad-white pb-20 sm:pb-24 lg:pb-28">
      {/* Panel a pantalla completa: video de fondo, sin márgenes, solo esquinas inferiores redondeadas */}
      <div className="relative min-h-[600px] overflow-hidden rounded-b-[2rem] bg-lad-black sm:min-h-[680px] sm:rounded-b-[3rem] lg:min-h-[760px] lg:rounded-b-[4rem] xl:min-h-[840px]">
        <div className="hero-media absolute inset-0">
          <VideoAuto
            src="/vids/inicio/hero1.mp4"
            poster="/img/lad-hero-laboratorio.png"
            className="h-full w-full scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-lad-black/85 via-lad-black/25 to-lad-black/75" />
        </div>

        <AmbientGlow variant="dark" />

        {/* Encabezado (izquierda) + descripción (derecha), como en la referencia */}
        <div className="hero-copy relative z-10 flex flex-col gap-10 px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-14 lg:pt-40">
          <div className="max-w-xl">
            <motion.a
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              href={LAD_METEPEC_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow text-lad-red-light transition hover:text-white"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lad-red-light opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lad-red-light" />
              </span>
              Nueva sucursal · LAD Metepec
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="heading-xl mt-6 text-white"
            >
              Resultados
              <span
                className="relative block h-[1.06em] overflow-visible text-lad-red-light"
                style={{ clipPath: "inset(0 -500px)" }}
              >
                &nbsp;
                {heroTitles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-0 top-0 whitespace-nowrap italic"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </div>

          <Reveal delay={0.25} className="max-w-xs lg:pt-4">
            <p className="text-sm leading-relaxed text-white/80 lg:text-right">
              Análisis clínicos, paquetes preventivos y el seguimiento de tus resultados. Procesos
              certificados y gente que sí se toma el tiempo de explicarte.
            </p>
          </Reveal>
        </div>

        {/* Tarjetas de confianza: grid visible en móvil, flotantes ancladas a la derecha en desktop */}
        <div className="relative z-10 grid grid-cols-2 gap-3 px-5 pb-8 sm:px-8 lg:hidden">
          {heroStats.map((stat) => (
            <div key={stat.value} className="glass-card rounded-2xl px-5 py-4">
              <HeroStatCard stat={stat} />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 right-6 z-10 hidden flex-col justify-center gap-4 lg:right-10 lg:flex xl:right-40">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.value}
              animate={{ y: [0, index % 2 ? 8 : -8, 0] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              className="glass-card w-44 rounded-2xl px-5 py-4"
            >
              <HeroStatCard stat={stat} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA principal, a caballo entre el panel y la página */}
      <Reveal delay={0.5} className="relative z-20 -mt-7 flex justify-center px-4 sm:-mt-8">
        <Link
          href="/estudios#catalogo"
          className="group/pill inline-flex items-center gap-4 rounded-full bg-lad-black py-1.5 pl-7 pr-1.5 text-white shadow-glass transition-all duration-500 ease-lad hover:-translate-y-1 hover:shadow-red"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em]">Ver estudios</span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lad-red text-white transition-transform duration-500 ease-lad group-hover/pill:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
