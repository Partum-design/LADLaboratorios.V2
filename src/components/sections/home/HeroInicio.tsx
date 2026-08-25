"use client";

import AmbientGlow from "@/components/ui/AmbientGlow";
import VideoAuto from "@/components/ui/VideoAuto";
import { gsap } from "@/components/motion/gsap";
import { LAD_METEPEC_MAPS_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const heroTitles = ["precisos", "confiables", "certificados", "inmediatos", "claros"];

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
    <section
      id="inicio"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-lad-white pb-20 pt-28 sm:pt-32 lg:pb-24"
    >
      <AmbientGlow />

      <div className="container-lad relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Columna editorial */}
        <div className="hero-copy lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href={LAD_METEPEC_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-lad-red py-2 pl-4 pr-5 text-white shadow-red transition hover:bg-lad-red-dark"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/85">Nueva sucursal</span>
              <span className="h-3.5 w-px bg-white/30" />
              <span className="whitespace-nowrap font-display text-base font-bold leading-none">
                LAD<span className="align-super text-[8px]">®</span> Metepec
              </span>
            </a>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-lad-red" />
              Precisión diagnóstica
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl mt-8 text-lad-black"
          >
            Resultados
            <span
              className="relative block h-[1.06em] overflow-visible text-lad-red"
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

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg mt-7 max-w-xl"
          >
            Análisis clínicos, paquetes preventivos y el seguimiento de tus resultados. Procesos
            certificados y gente que sí se toma el tiempo de explicarte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/estudios#catalogo" className="btn-primary">
              Ver estudios
            </Link>
            <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Agendar por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Columna de medios con chips flotantes */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hero-media relative"
          >
            <div className="video-frame relative aspect-[4/5] w-full">
              <VideoAuto
                src="/vids/inicio/hero1.mp4"
                poster="/img/lad-hero-laboratorio.png"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lad-black/25 via-transparent to-transparent" />
            </div>

            {/* Riel rojo de firma */}
            <span className="absolute -left-3 bottom-8 top-8 w-1 bg-lad-red" aria-hidden />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card absolute -left-8 top-8 hidden items-center gap-3 rounded-2xl px-5 py-4 sm:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lad-red/10 font-display text-sm font-bold text-lad-red">
                24/7
              </span>
              <span className="text-xs font-semibold leading-tight text-lad-black">
                Rayos X y tomografía
                <span className="block text-[10px] font-medium text-lad-black/50">los 365 días del año</span>
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="glass-card absolute -right-4 bottom-10 hidden items-center gap-3 rounded-2xl px-5 py-4 sm:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lad-red text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </span>
              <span className="text-xs font-semibold leading-tight text-lad-black">
                ISO 9001:2015
                <span className="block text-[10px] font-medium text-lad-black/50">Sistema de calidad</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-lad-black/30"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
