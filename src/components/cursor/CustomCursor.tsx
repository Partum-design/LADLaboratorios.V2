"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/components/motion/usePrefersReducedMotion";
import useFinePointer from "@/components/motion/useFinePointer";

type CursorVariant = "default" | "interactive" | "card" | "text" | "canvas";

const EXPLICIT_VARIANTS = new Set<CursorVariant>(["default", "interactive", "card", "text", "canvas"]);

const TARGET_SELECTOR =
  "[data-cursor], canvas, .card-hover, a, button, [role='button'], input, select, textarea, summary, label, p, h1, h2, h3, h4";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, select, textarea, summary, label";
const TEXT_SELECTOR = "p, h1, h2, h3, h4";

/** Resuelve el estado del cursor a partir del elemento bajo el puntero, en orden de prioridad. */
function resolveVariant(el: Element | null): CursorVariant {
  const match = el?.closest(TARGET_SELECTOR);
  if (!match) return "default";

  const explicit = match.getAttribute("data-cursor");
  if (explicit && EXPLICIT_VARIANTS.has(explicit as CursorVariant)) return explicit as CursorVariant;

  if (match.tagName === "CANVAS") return "canvas";
  if (match.classList.contains("card-hover")) return "card";
  if (match.matches(INTERACTIVE_SELECTOR)) return "interactive";
  if (match.matches(TEXT_SELECTOR)) return "text";
  return "default";
}

const RING_VARIANTS: Record<CursorVariant, { scale: number; borderColor: string; backgroundColor: string }> = {
  default: { scale: 1, borderColor: "rgba(32,30,30,0.35)", backgroundColor: "rgba(32,30,30,0)" },
  interactive: { scale: 1.6, borderColor: "rgba(227,6,19,0.9)", backgroundColor: "rgba(227,6,19,0.08)" },
  card: { scale: 2.4, borderColor: "rgba(227,6,19,0.5)", backgroundColor: "rgba(227,6,19,0.05)" },
  text: { scale: 0.5, borderColor: "rgba(32,30,30,0.28)", backgroundColor: "rgba(32,30,30,0)" },
  canvas: { scale: 2, borderColor: "rgba(245,106,110,0.85)", backgroundColor: "rgba(227,6,19,0.06)" },
};

const DOT_VARIANTS: Record<CursorVariant, { scale: number; opacity: number }> = {
  default: { scale: 1, opacity: 1 },
  interactive: { scale: 0, opacity: 0 },
  card: { scale: 0, opacity: 0 },
  text: { scale: 1, opacity: 1 },
  canvas: { scale: 0.6, opacity: 0.8 },
};

/**
 * Cursor de marca: punto que sigue el puntero casi sin retraso y un anillo
 * con leve inercia (spring) que cambia de tamaño/color según lo que hay debajo.
 * Solo se activa con puntero fino (mouse/trackpad) y sin preferencia de
 * movimiento reducido; si JS no corre, el cursor nativo sigue intacto porque
 * nunca se aplica `cursor: none` salvo cuando esta clase se agrega.
 */
export default function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reducedMotion;

  const [variant, setVariant] = useState<CursorVariant>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVariant(resolveVariant(document.elementFromPoint(event.clientX, event.clientY)));
    };
    const onLeaveWindow = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = RING_VARIANTS[variant];
  const dot = DOT_VARIANTS[variant];

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      <motion.div
        className="absolute left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: ring.scale, borderColor: ring.borderColor, backgroundColor: ring.backgroundColor }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-lad-red"
        style={{ x, y }}
        animate={{ scale: dot.scale, opacity: dot.opacity }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      />
    </div>
  );
}
