"use client";

import VideoAuto from "@/components/ui/VideoAuto";
import TextReveal from "@/components/motion/TextReveal";
import EcgSignature from "@/components/ui/EcgSignature";
import VitalsTicker from "@/components/ui/VitalsTicker";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";

const heroTitles = ["precisos", "confiables", "certificados", "inmediatos", "claros"];

const vitals = [
  { value: "Metepec", label: "Sucursal nueva, abierta", live: true },
  { value: "40+", label: "Años de experiencia" },
  { value: "500+", label: "Estudios disponibles" },
  { value: "ISO 9001", label: "Sistema de calidad" },
];

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

  // Halo blanco que sigue el cursor: capa técnica y elegante sobre el video.
  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  const spotlightBg = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.14), transparent 72%)`;

  function handleHeroMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }
  function handleHeroMouseLeave() {
    spotX.set(-400);
    spotY.set(-400);
  }

  return (
    <section
      id="inicio"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative flex min-h-screen flex-col overflow-hidden bg-lad-black"
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
        {/* Velo para legibilidad: negro con acento rojo, más denso a la izquierda para el texto asimétrico */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-lad-red/15 via-transparent to-transparent" />
        {/* Halo que sigue el cursor */}
        <motion.div className="absolute inset-0 z-[1]" style={{ background: spotlightBg }} />
      </div>

      {/* Contenido: bloque asimétrico, alineado a la izquierda */}
      <div className="container-lad relative z-10 flex flex-1 flex-col justify-center px-4 pb-8 pt-32 sm:pt-36">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-white/80 before:bg-lad-red"
          >
            Precisión diagnóstica
          </motion.p>

          <h1 className="heading-xl mt-5 text-left text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.4)] lg:text-[6rem] xl:text-[7rem]">
            <TextReveal as="span" className="block" delay={0.3}>
              Resultados
            </TextReveal>
            <span className="relative mt-1 block h-[1.06em] overflow-visible" style={{ clipPath: "inset(0 -500px)" }}>
              &nbsp;
              {heroTitles.map((title, index) => (
                <span key={index} className="absolute left-0 top-0">
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
            className="body-lg mt-7 max-w-xl text-left text-white/70"
          >
            Análisis clínicos, paquetes preventivos y el seguimiento de tus resultados. Procesos
            certificados y gente que sí se toma el tiempo de explicarte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
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

      {/* Firma: traza de ECG que pasa de señal irregular a latido estable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 hidden sm:block"
      >
        <EcgSignature className="h-16 w-full lg:h-20" />
      </motion.div>

      {/* Monitor de signos vitales: sucursal, experiencia, catálogo, certificación */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <VitalsTicker items={vitals} />
      </motion.div>
    </section>
  );
}
