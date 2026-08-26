"use client";

import { LAD_TEL_LINK, LAD_WHATSAPP_LINK, LAD_WHATSAPP_MESSAGE } from "@/lib/contact";
import { IconPhoneModern, IconWhatsApp } from "@/components/ui/LadIcons";
import { EASE } from "@/components/motion/gsap";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const FIXED_PHONE = "714 142 4621";

/**
 * Único punto de contacto flotante: un círculo de WhatsApp que, al hacer
 * hover/tap, despliega dos opciones (chat y llamada) en vez de apilar
 * botones sueltos permanentemente en pantalla.
 */
export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-4 z-[100] sm:bottom-8 sm:left-6"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute bottom-full left-0 mb-3 w-64 origin-bottom-left overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-glass backdrop-blur-xl"
          >
            <div className="border-b border-lad-black/5 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lad-red">Atención LAD</p>
              <p className="mt-0.5 text-xs text-lad-gray-mid">Te orientamos en pocos minutos</p>
            </div>
            <a
              href={LAD_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-lad-gray-light"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--whatsapp-green)] text-white">
                <IconWhatsApp className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-lad-black">Escríbenos</span>
                <span className="block truncate text-[11px] text-lad-gray-mid">{LAD_WHATSAPP_MESSAGE}</span>
              </span>
            </a>
            <a
              href={LAD_TEL_LINK}
              className="flex items-center gap-3 border-t border-lad-black/5 px-4 py-3 transition hover:bg-lad-gray-light"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lad-black text-white">
                <IconPhoneModern className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-lad-black">Llamar ahora</span>
                <span className="block text-[11px] text-lad-gray-mid">{FIXED_PHONE}</span>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={LAD_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onClick={(e) => {
          if (open) return;
          e.preventDefault();
          setOpen(true);
        }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp-green)] shadow-glass transition-all duration-300 hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
      >
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0.45, 0], scale: [1, 1.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[var(--whatsapp-green)]"
        />
        <IconWhatsApp className="relative z-10 h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" />
      </a>
    </div>
  );
}
