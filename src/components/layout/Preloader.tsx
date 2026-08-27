"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SESSION_KEY = "lad:loaded";
const RADIUS = 68;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const REVEAL_DELAY = 1150;

const TAGLINE = "LABORATORIO DE APOYO Y DIAGNÓSTICO";

/** Preloader blanco: logo con anillo de instrumento y barrido de escaneo; cortina central al terminar. Una sola vez por sesión. */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const done = progress >= 100;

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sin sessionStorage: mostramos el preloader igual
    }
    if (alreadyShown) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      return;
    }

    setShow(true);
    const start = performance.now();
    const DURATION = 1800;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easing suave hacia 100
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        window.setTimeout(() => setShow(false), REVEAL_DELAY);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Marcas tipo instrumento de precisión alrededor del anillo (cada 6°, 60 marcas).
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  const CENTER = 88;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] overflow-hidden"
          exit={{ transition: { duration: 0.01 } }}
        >
          {/* Cortina blanca en dos mitades: se abren desde el centro al terminar */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 origin-top bg-lad-white"
            animate={done ? { scaleY: 0, transition: { duration: 0.7, delay: 0.35, ease: [0.76, 0, 0.24, 1] } } : {}}
          >
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(32,30,30,0.9) 1px, transparent 1.4px)",
                backgroundSize: "26px 26px",
              }}
            />
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-lad-white"
            animate={done ? { scaleY: 0, transition: { duration: 0.7, delay: 0.35, ease: [0.76, 0, 0.24, 1] } } : {}}
          >
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(32,30,30,0.9) 1px, transparent 1.4px)",
                backgroundSize: "26px 26px",
                backgroundPosition: "0 -50vh",
              }}
            />
          </motion.div>

          {/* Filo rojo en la línea de apertura, breve destello al separarse */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-lad-red"
            initial={{ opacity: 0 }}
            animate={done ? { opacity: [0, 1, 0], transition: { duration: 0.5, delay: 0.3 } } : {}}
          />

          {/* Contenido: logo, anillo instrumento, progreso, tagline */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center"
            animate={done ? { opacity: 0, scale: 0.94, transition: { duration: 0.4, ease: "easeIn" } } : {}}
          >
            <div className="relative flex items-center justify-center">
              {/* Halo respirando detrás del logo */}
              <motion.span
                aria-hidden
                className="absolute h-36 w-36 rounded-full bg-lad-red/20 blur-2xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Anillo instrumento: marcas de precisión + progreso */}
              <svg width="176" height="176" viewBox="0 0 176 176" className="-rotate-90">
                <g stroke="rgba(32,30,30,0.16)">
                  {ticks.map((i) => {
                    const major = i % 5 === 0;
                    const angle = (i / ticks.length) * Math.PI * 2;
                    const rOuter = 87;
                    const rInner = major ? 78 : 82.5;
                    const x1 = CENTER + rOuter * Math.cos(angle);
                    const y1 = CENTER + rOuter * Math.sin(angle);
                    const x2 = CENTER + rInner * Math.cos(angle);
                    const y2 = CENTER + rInner * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={major ? 1.4 : 0.7} />;
                  })}
                </g>
                <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(32,30,30,0.08)" strokeWidth="2" />
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke="#E30613"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>

              {/* Barrido de escaneo cruzando el logo */}
              <div className="pointer-events-none absolute h-20 w-20 overflow-hidden rounded-[22%] sm:h-24 sm:w-24">
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 h-8"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(227,6,19,0.55) 45%, rgba(255,255,255,0.9) 50%, rgba(227,6,19,0.55) 55%, transparent 100%)",
                  }}
                  animate={{ top: ["-20%", "110%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <motion.div
                className="absolute"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: done ? 1.08 : 1 }}
                transition={
                  done
                    ? { type: "spring", stiffness: 320, damping: 14 }
                    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <Image
                  src="/logo/logo-lad.png"
                  alt="LAD"
                  width={120}
                  height={120}
                  priority
                  className="h-20 w-20 rounded-[22%] object-contain shadow-glass sm:h-24 sm:w-24"
                />
              </motion.div>
            </div>

            <p className="mt-8 font-display text-4xl font-semibold tabular-nums text-lad-black sm:text-5xl">
              {progress}
              <span className="text-lad-red">%</span>
            </p>

            <div className="mt-5 flex gap-[0.15em] overflow-hidden">
              {TAGLINE.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="text-[9px] font-bold tracking-[0.25em] text-lad-black/40 sm:text-[10px]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.018, ease: [0.22, 1, 0.36, 1] }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
