"use client";

import AmbientGlow from "@/components/ui/AmbientGlow";
import VideoAuto from "@/components/ui/VideoAuto";
import TextReveal from "@/components/motion/TextReveal";
import { gsap } from "@/components/motion/gsap";
import { LAD_METEPEC_MAPS_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconCertificate, IconMapPin } from "@/components/ui/LadIcons";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";

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

  // Tilt 3D sutil del marco de video al mover el mouse (desktop, sensación premium).
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 22 });

  function handleTiltMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(py * -5);
    tiltY.set(px * 5);
  }
  function handleTiltLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

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
          {/* Anuncio de sucursal: primera pieza de información, con foco propio */}
          <motion.a
            href={LAD_METEPEC_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex max-w-md items-center gap-4 overflow-hidden rounded-2xl border border-lad-black/10 bg-white py-3 pl-3 pr-4 shadow-glass-sm transition-all duration-500 ease-lad hover:-translate-y-0.5 hover:border-lad-red/25 hover:shadow-glass"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/80 to-transparent"
              initial={{ x: "-40%" }}
              animate={{ x: "480%" }}
              transition={{ duration: 1.3, delay: 1, ease: "easeInOut" }}
            />
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lad-red text-white shadow-red">
              <IconMapPin className="h-5 w-5" />
            </span>
            <span className="relative min-w-0">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-lad-red">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lad-red opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lad-red" />
                </span>
                Nueva sucursal
              </span>
              <span className="mt-0.5 block truncate font-display text-[15px] font-semibold leading-tight text-lad-black">
                LAD<span className="align-super text-[8px]">®</span> Metepec ya está abierta
              </span>
            </span>
            <span className="relative ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lad-gray-light text-lad-black transition-all duration-500 ease-lad group-hover:bg-lad-red group-hover:text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mt-7"
          >
            Precisión diagnóstica
          </motion.p>

          <h1 className="heading-xl mt-5 text-lad-black lg:text-[5.75rem] xl:text-[6.25rem]">
            <TextReveal as="span" className="block" delay={0.28}>
              Resultados
            </TextReveal>
            <span
              className="relative mt-1 block h-[1.06em] overflow-visible text-lad-red"
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
                  {titleNumber === index && (
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-lad-red/35"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg mt-7 max-w-xl"
          >
            Análisis clínicos, paquetes preventivos y el seguimiento de tus resultados. Procesos
            certificados y gente que sí se toma el tiempo de explicarte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
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
            {/* Halo suave detrás del marco, como luz de estudio */}
            <div className="absolute -inset-8 -z-[1] rounded-[3rem] bg-lad-red/[0.08] blur-3xl" aria-hidden />

            <motion.div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
              className="relative aspect-[4/5] w-full rounded-[2rem] bg-white p-2 shadow-glass ring-1 ring-lad-black/[0.04]"
            >
              <div className="video-frame relative h-full w-full overflow-hidden rounded-[1.5rem]">
                <VideoAuto
                  src="/vids/inicio/hero1.mp4"
                  poster="/img/lad-hero-laboratorio.png"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lad-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>

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

            {/* Sello de certificación ISO: anillo giratorio + núcleo fijo */}
            <motion.a
              href="#valores"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -right-5 bottom-8 hidden h-24 w-24 items-center justify-center sm:flex sm:h-28 sm:w-28"
              aria-label="Certificación ISO 9001:2015 — ver más en Valores"
            >
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full drop-shadow-[0_10px_24px_rgba(227,6,19,0.18)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <path id="iso-seal-ring" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" fill="none" />
                </defs>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E30613" strokeWidth="0.6" strokeDasharray="1.4 3.4" opacity="0.45" />
                <text fontSize="5.6" fontWeight="700" letterSpacing="1.6" fill="#E30613">
                  <textPath href="#iso-seal-ring" xlinkHref="#iso-seal-ring" startOffset="0%">
                    ISO 9001:2015 • SISTEMA DE GESTIÓN DE CALIDAD •{" "}
                  </textPath>
                </text>
              </motion.svg>
              <div className="relative flex h-[66%] w-[66%] flex-col items-center justify-center rounded-full bg-white text-center shadow-glass ring-1 ring-lad-black/5">
                <IconCertificate className="h-6 w-6 text-lad-red" />
                <span className="mt-0.5 font-display text-[13px] font-bold leading-none text-lad-black">ISO 9001</span>
                <span className="text-[8px] font-semibold uppercase tracking-wide text-lad-black/45">2015</span>
              </div>
            </motion.a>
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
