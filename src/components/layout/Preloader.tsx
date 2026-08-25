"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SESSION_KEY = "lad:loaded";

/** Preloader blanco: logo + contador; una sola vez por sesión. */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let done = false;
    try {
      done = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sin sessionStorage: mostramos el preloader igual
    }
    if (done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      return;
    }

    setShow(true);
    const start = performance.now();
    const DURATION = 1600;
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
        window.setTimeout(() => setShow(false), 250);
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
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logo/logo-lad.png"
              alt="LAD"
              width={120}
              height={120}
              priority
              className="h-24 w-24 rounded-[22%] object-contain shadow-glass sm:h-28 sm:w-28"
            />
          </motion.div>

          <div className="mt-10 h-px w-40 overflow-hidden bg-lad-black/10">
            <motion.div
              className="h-full bg-lad-red"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="mt-4 font-display text-sm font-semibold tabular-nums tracking-[0.3em] text-lad-black/50">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
