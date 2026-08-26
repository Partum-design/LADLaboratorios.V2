"use client";

import { motion, useInView } from "framer-motion";
import { Children, Fragment, useRef, type ElementType, type ReactNode } from "react";
import { EASE } from "@/components/motion/gsap";

/** Divide los hijos en unidades: cada palabra de texto y cada nodo (span rojo, br...) completo. */
function toUnits(children: ReactNode): ReactNode[] {
  const units: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => units.push(word));
    } else if (child != null && child !== false) {
      units.push(child);
    }
  });
  return units;
}

interface TextRevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  once?: boolean;
}

/** Encabezado con reveal por palabra: cada unidad sube desde su máscara. */
export default function TextReveal({
  as: Tag = "h2",
  className = "",
  children,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-70px" });
  const units = toUnits(children);

  return (
    <Tag ref={ref} className={className}>
      {units.map((unit, i) => (
        <Fragment key={i}>
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{
              // line-height propio (independiente del leading apretado del heading)
              // para que acentos, ascendentes/descendentes e itálicas no se recorten;
              // los márgenes negativos absorben el espacio extra sin abrir el interlineado.
              lineHeight: 1.4,
              paddingLeft: "0.02em",
              paddingRight: "0.16em",
              marginTop: "-0.2em",
              marginBottom: "-0.2em",
              marginLeft: "-0.02em",
              marginRight: "-0.1em",
            }}
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "115%" }}
              animate={inView ? { y: 0 } : undefined}
              transition={{ duration: 0.85, delay: delay + i * 0.055, ease: EASE }}
            >
              {unit}
            </motion.span>
          </span>
          {i < units.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
