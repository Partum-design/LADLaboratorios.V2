"use client";

import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { IconPackage, IconPhone, IconTestTubes } from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import Image from "next/image";
import Link from "next/link";

const servicios = [
  {
    icon: <IconTestTubes />,
    title: "Análisis clínicos",
    desc: "Desde un estudio de rutina hasta pruebas especializadas, siempre bajo procesos certificados.",
    href: "/estudios#catalogo",
    cta: "Ver catálogo",
  },
  {
    icon: <IconPackage />,
    title: "Paquetes preventivos",
    desc: "Perfiles ya armados para chequeos generales, empresas y el seguimiento de tu familia.",
    href: "/estudios?cat=Perfiles%20y%20Paquetes#catalogo",
    cta: "Ver paquetes",
  },
  {
    icon: <IconPhone />,
    title: "Atención directa",
    desc: "Agenda, pregunta lo que necesites y sigue tus resultados, directo por WhatsApp.",
    href: "/contacto#agenda",
    cta: "Agendar cita",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="section-padding relative overflow-hidden bg-lad-gray-light">
      {/* Imagen ambiental: técnica, muy tenue, se funde con el fondo */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-[440px] w-[440px] opacity-[0.08] grayscale sm:h-[560px] sm:w-[560px]"
        style={{
          maskImage: "radial-gradient(circle at 72% 28%, black 0%, transparent 68%)",
          WebkitMaskImage: "radial-gradient(circle at 72% 28%, black 0%, transparent 68%)",
        }}
        aria-hidden
      >
        <Image src="/img/lad-area-quimica.png" alt="" fill sizes="560px" className="object-cover" />
      </div>

      <div className="container-lad relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Intro fija: acompaña la lista mientras se hace scroll */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow">Nuestros servicios</p>
              </Reveal>
              <TextReveal className="heading-lg mt-5" delay={0.1}>
                Lo que hacemos <span className="italic text-lad-red">por ti</span>
              </TextReveal>
              <Reveal delay={0.2}>
                <p className="body-lg mt-6 max-w-sm">
                  Desde el primer análisis hasta el seguimiento de toda tu familia: así acompañamos
                  cada etapa, sin dejarte con dudas.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Lista de servicios */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {servicios.map((servicio, index) => (
              <Reveal key={servicio.title} delay={index * 0.12}>
                <Link
                  href={servicio.href}
                  className="card-hover group flex flex-col gap-6 rounded-3xl bg-white p-8 ring-1 ring-lad-black/[0.04] sm:flex-row sm:items-center sm:p-9"
                >
                  <div className="flex items-center gap-5 sm:w-60 sm:shrink-0">
                    <IconBadge color={iconColorAt(index)} className="h-14 w-14 shrink-0">
                      {servicio.icon}
                    </IconBadge>
                    <span className="font-display text-5xl font-semibold text-lad-black/[0.08] transition-colors duration-500 ease-lad group-hover:text-lad-red/20">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-md text-lad-black">{servicio.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-lad-gray-mid">{servicio.desc}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-lad-red">
                    {servicio.cta}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3.5 w-3.5 transition-transform duration-500 ease-lad group-hover:translate-x-1.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
