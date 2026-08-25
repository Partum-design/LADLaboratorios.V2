"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SESSION_KEY = "lad:loaded";
const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TAGLINE = "LABORATORIO DE APOYO Y DIAGNÓSTICO";

/** Preloader blanco: logo con anillo de progreso circular; una sola vez por sesión. */
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
        window.setTimeout(() => setShow(false), 420);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-lad-white"
          exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="relative flex items-center justify-center">
            {/* Halo respirando detrás del logo */}
            <motion.span
              aria-hidden
              className="absolute h-32 w-32 rounded-full bg-lad-red/20 blur-2xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Anillo de progreso */}
            <svg width="152" height="152" viewBox="0 0 152 152" className="-rotate-90">
              <circle cx="76" cy="76" r={RADIUS} fill="none" stroke="rgba(32,30,30,0.08)" strokeWidth="2" />
              <circle
                cx="76"
                cy="76"
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
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
