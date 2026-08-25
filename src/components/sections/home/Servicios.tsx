"use client";

import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { IconPackage, IconPhone, IconTestTubes } from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
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
    <section id="servicios" className="section-padding bg-lad-gray-light">
      <div className="container-lad">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">Nuestros servicios</p>
          </Reveal>
          <TextReveal className="heading-lg mt-5" delay={0.1}>
            Lo que hacemos <span className="italic text-lad-red">por ti</span>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {servicios.map((servicio, index) => (
            <Reveal key={servicio.title} delay={index * 0.12} className="h-full">
              <Link
                href={servicio.href}
                className="card-hover group flex h-full flex-col rounded-3xl bg-white p-9 ring-1 ring-lad-black/[0.04]"
              >
                <div className="flex items-start justify-between">
                  <IconBadge color={iconColorAt(index)} className="h-14 w-14">
                    {servicio.icon}
                  </IconBadge>
                  <span className="font-display text-5xl font-semibold text-lad-black/[0.08] transition-colors duration-500 ease-lad group-hover:text-lad-red/20">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="heading-md mt-8 text-lad-black">{servicio.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-lad-gray-mid">{servicio.desc}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-lad-red">
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
    </section>
  );
}
