"use client";

import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import BtnIcon from "@/components/ui/BtnIcon";
import { LAD_PHONE_DISPLAY, LAD_TEL_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import Link from "next/link";

/** Gran CTA pre-footer: agenda directa por WhatsApp o catálogo. */
export default function CtaBanner() {
  return (
    <section className="bg-white px-0 pb-6 lg:px-6">
      <div className="relative mx-auto max-w-[88rem] overflow-hidden bg-lad-black text-white lg:rounded-3xl">
        {/* Halo rojo de fondo */}
        <div
          className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #E30613 0%, transparent 62%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-24 h-[420px] w-[420px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #E30613 0%, transparent 62%)" }}
          aria-hidden
        />

        <div className="container-lad relative z-10 py-20 text-center lg:py-28">
          <Reveal>
            <p className="eyebrow justify-center">Contáctanos</p>
          </Reveal>
          <TextReveal
            as="h2"
            className="heading-lg mx-auto mt-6 max-w-3xl text-white"
            delay={0.1}
          >
            Agenda tu <span className="italic text-lad-red-light">cita</span>
          </TextReveal>
          <Reveal delay={0.25}>
            <p className="body-lg mx-auto mt-6 max-w-xl text-white/60">
              Escríbenos por WhatsApp o déjanos tus datos. Te orientamos con horarios y preparación
              antes de tu visita.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={LAD_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group/btn"
              >
                Agendar por WhatsApp
                <BtnIcon />
              </a>
              <Link href="/estudios#catalogo" className="btn-outline-white">
                Ver estudios
              </Link>
            </div>
            <a
              href={LAD_TEL_LINK}
              className="mt-8 inline-block font-display text-2xl font-semibold tracking-wide text-white/80 transition hover:text-lad-red-light"
            >
              {LAD_PHONE_DISPLAY}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
