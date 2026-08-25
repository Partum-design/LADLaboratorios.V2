"use client";

import AmbientGlow from "@/components/ui/AmbientGlow";
import VideoAuto from "@/components/ui/VideoAuto";
import { gsap } from "@/components/motion/gsap";
import { LAD_METEPEC_MAPS_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconSearch, IconShieldCheck } from "@/components/ui/LadIcons";
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
      className="relative overflow-hidden bg-lad-white pb-24 pt-28 sm:pb-28 sm:pt-32 lg:pb-32"
    >
      <div className="container-lad relative z-10">
        {/* Panel del hero: video en pantalla completa dentro de una tarjeta oscura */}
        <div className="relative isolate min-h-[560px] overflow-hidden rounded-[1.75rem] bg-lad-black shadow-glass sm:min-h-[640px] sm:rounded-[2.5rem] lg:min-h-[720px] lg:rounded-[3rem]">
          <div className="hero-media absolute inset-0">
            <VideoAuto
              src="/vids/inicio/hero1.mp4"
              poster="/img/lad-hero-laboratorio.png"
              className="h-full w-full scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lad-black via-lad-black/85 to-lad-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-lad-black/70 via-transparent to-lad-black/30" />
          </div>

          <AmbientGlow variant="dark" />

          {/* Contenido */}
          <div className="hero-copy relative z-10 p-7 sm:p-10 lg:p-14">
            {/* Fila superior: badge de sucursal + etiqueta */}
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-between gap-3"
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

              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-lad-red-light" />
                Precisión diagnóstica
              </span>
            </motion.div>

            {/* Encabezado, texto y acciones */}
            <div className="mt-16 max-w-2xl sm:mt-20 lg:mt-24">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="heading-xl text-white"
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

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
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
                <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-white">
                  Agendar por WhatsApp
                </a>
              </motion.div>
            </div>
          </div>

          {/* Tarjetas flotantes de confianza, sobre el video */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card !border-white/15 !bg-white/10 absolute right-10 top-32 z-10 hidden items-center gap-3 rounded-2xl px-5 py-4 text-white backdrop-blur-xl lg:flex xl:right-14 xl:top-36"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lad-red font-display text-sm font-bold text-white">
              24/7
            </span>
            <span className="text-xs font-semibold leading-tight">
              Rayos X y tomografía
              <span className="block text-[10px] font-medium text-white/50">los 365 días del año</span>
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="glass-card !border-white/15 !bg-white/10 absolute bottom-24 right-10 z-10 hidden items-center gap-3 rounded-2xl px-5 py-4 text-white backdrop-blur-xl lg:flex xl:bottom-28 xl:right-14"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lad-red text-white">
              <IconShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold leading-tight">
              ISO 9001:2015
              <span className="block text-[10px] font-medium text-white/50">Sistema de calidad</span>
            </span>
          </motion.div>
        </div>

        {/* Acceso directo a resultados, a caballo entre el panel oscuro y la página */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto -mt-7 w-full max-w-md px-2 sm:-mt-8 sm:max-w-lg"
        >
          <Link
            href="/acceder#consulta"
            className="group/pill glass-card flex items-center justify-between gap-4 rounded-full py-2.5 pl-6 pr-2.5 transition-all duration-500 ease-lad hover:-translate-y-1 hover:shadow-glass"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lad-red/10 text-lad-red">
                <IconSearch className="h-4 w-4" />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-sm font-bold text-lad-black">Consulta tus resultados</span>
                <span className="block text-[11px] font-medium text-lad-black/45">Con el folio de tu estudio</span>
              </span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lad-red text-white transition-all duration-500 ease-lad group-hover/pill:scale-110 group-hover/pill:bg-lad-red-dark">
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
        </motion.div>
      </div>
    </section>
  );
}
