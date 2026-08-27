"use client";

import VideoAuto from "@/components/ui/VideoAuto";
import TextReveal from "@/components/motion/TextReveal";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { LAD_METEPEC_MAPS_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconCertificate, IconMapPin } from "@/components/ui/LadIcons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const heroTitles = ["precisos", "confiables", "certificados", "inmediatos", "claros"];

export default function HeroInicio() {
  const heroRef = useRef<HTMLElement>(null);
  const videoScaleRef = useRef<HTMLDivElement>(null);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === heroTitles.length - 1 ? 0 : prev + 1));
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  // Zoom cinematográfico del video de fondo al hacer scroll (tipo parallax).
  useLayoutEffect(() => {
    const section = heroRef.current;
    const videoEl = videoScaleRef.current;
    if (!section || !videoEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          videoEl,
          { scale: 1.04 },
          {
            scale: 1.28,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-lad-black"
    >
      {/* Video de fondo a pantalla completa, con zoom progresivo al hacer scroll */}
      <div className="absolute inset-0" aria-hidden>
        <div ref={videoScaleRef} className="h-full w-full will-change-transform">
          <VideoAuto
            src="/vids/inicio/hero1.mp4"
            poster="/img/lad-hero-laboratorio.png"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Velo para legibilidad: negro con acento rojo, sin naranjas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-lad-red/15 via-transparent to-transparent" />
      </div>

      {/* Contenido centrado */}
      <div className="container-lad relative z-10 flex flex-col items-center px-4 pb-10 pt-24 text-center sm:pt-28">
        {/* Sucursal e ISO: mismo peso visual, lado a lado */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={LAD_METEPEC_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-white/25 bg-white/10 py-2.5 pl-3 pr-4 text-left backdrop-blur-md transition-all duration-500 ease-lad hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/15"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lad-red text-white">
              <IconMapPin className="h-3.5 w-3.5" />
            </span>
            <span className="leading-tight">
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-white/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lad-red opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lad-red" />
                </span>
                Nueva sucursal
              </span>
              <span className="block text-[13px] font-semibold text-white">
                LAD<span className="align-super text-[7px]">®</span> Metepec ya está abierta
              </span>
            </span>
          </a>

          <a
            href="#valores"
            className="group flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-2.5 pl-3 pr-4 text-left backdrop-blur-md transition-all duration-500 ease-lad hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/15"
          >
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
              <motion.svg
                viewBox="0 0 24 24"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="12" cy="12" r="10.5" fill="none" stroke="#E30613" strokeWidth="1.4" strokeDasharray="2.2 3.4" />
              </motion.svg>
              <IconCertificate className="relative h-3.5 w-3.5 text-lad-red" />
            </span>
            <span className="leading-tight">
              <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-white/70">Certificados</span>
              <span className="block text-[13px] font-semibold text-white">ISO 9001:2015</span>
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mt-9 justify-center text-white/80 before:bg-lad-red"
        >
          Precisión diagnóstica
        </motion.p>

        <h1 className="heading-xl mt-5 text-center text-white">
          <TextReveal as="span" className="block" delay={0.3}>
            Resultados
          </TextReveal>
          <span className="relative mt-1 block h-[1.06em] overflow-visible" style={{ clipPath: "inset(0 -500px)" }}>
            &nbsp;
            {heroTitles.map((title, index) => (
              <span key={index} className="absolute left-1/2 top-0 -translate-x-1/2">
                <motion.span
                  className="block whitespace-nowrap italic text-lad-red"
                  initial={{ opacity: 0, y: -100 }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}
                  {titleNumber === index && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-lad-red/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="body-lg mx-auto mt-7 max-w-xl text-white/70"
        >
          Análisis clínicos, paquetes preventivos y el seguimiento de tus resultados. Procesos
          certificados y gente que sí se toma el tiempo de explicarte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/estudios#catalogo" className="btn-primary">
            Ver estudios
          </Link>
          <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline-white">
            Agendar por WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-white/50"
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
