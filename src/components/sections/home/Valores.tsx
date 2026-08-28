"use client";

import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { IconCheck, IconFocus, IconShieldCheck, IconUsers } from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import Image from "next/image";

const valores = [
  {
    icon: <IconFocus />,
    title: "Criterio clínico",
    desc: "Ningún resultado sale sin que alguien lo revise con calma primero.",
  },
  {
    icon: <IconUsers />,
    title: "Trato humano",
    desc: "Te decimos los pasos, los tiempos y qué llevar, sin tecnicismos de más.",
  },
  {
    icon: <IconShieldCheck />,
    title: "Privacidad",
    desc: "Tus datos y resultados quedan bajo acceso controlado. Punto.",
  },
];

const isoPuntos = [
  {
    title: "Mismo proceso, siempre",
    desc: "Cada estudio sigue el mismo procedimiento validado, sin importar la sucursal o quién te atienda.",
  },
  {
    title: "Revisión constante",
    desc: "El sistema exige auditorías periódicas de resultados y tiempos de entrega, no solo cumplir la norma una vez al año.",
  },
  {
    title: "Menos margen de error",
    desc: "Procesos documentados y trazables reducen la variabilidad: tu resultado pasa los mismos controles que el de cualquier paciente.",
  },
];

export default function Valores() {
  return (
    <section id="valores" className="section-padding relative overflow-hidden bg-white">
      {/* Imagen ambiental: técnica, muy tenue, se funde con el fondo */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-20 h-[420px] w-[420px] opacity-[0.07] grayscale sm:h-[520px] sm:w-[520px]"
        style={{
          maskImage: "radial-gradient(circle at 28% 72%, black 0%, transparent 68%)",
          WebkitMaskImage: "radial-gradient(circle at 28% 72%, black 0%, transparent 68%)",
        }}
        aria-hidden
      >
        <Image src="/img/lad-area-hematologia.png" alt="" fill sizes="520px" className="object-cover" />
      </div>

      <div className="container-lad relative z-10">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Por qué elegirnos</p>
        </Reveal>
        <TextReveal className="heading-lg mt-5 text-center" delay={0.1}>
          Nuestros <span className="italic text-lad-red">valores</span>
        </TextReveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {valores.map((valor, index) => (
            <Reveal key={valor.title} delay={index * 0.1} className="h-full">
              <div className="group h-full rounded-r-3xl border-l-4 border-lad-red bg-lad-gray-light p-7 transition-all duration-500 ease-lad hover:-translate-y-1.5 hover:bg-white hover:shadow-glass">
                <IconBadge color={iconColorAt(index)} className="mb-5 h-10 w-10">
                  {valor.icon}
                </IconBadge>
                <h3 className="mb-2 font-display text-xl font-bold text-lad-black">{valor.title}</h3>
                <p className="text-sm leading-relaxed text-lad-gray-mid">{valor.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Calidad ISO: tarjeta destacada aparte, con más espacio para explicar por qué importa */}
        <Reveal delay={0.3} className="mt-6">
          <div className="rounded-r-3xl border-l-4 border-lad-red bg-lad-black p-8 text-white sm:p-10">
            <div className="flex items-start gap-5">
              <IconBadge color={iconColorAt(3)} className="h-12 w-12 shrink-0">
                <IconCheck />
              </IconBadge>
              <div>
                <h3 className="font-display text-2xl font-bold">Calidad ISO 9001:2015</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                  No es un cartel en la pared: es el sistema de gestión bajo el que operamos todos los
                  días, y es lo que separa un resultado confiable de uno improvisado.
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              {isoPuntos.map((punto) => (
                <div key={punto.title}>
                  <span className="block h-1 w-8 rounded-full bg-lad-red" aria-hidden />
                  <h4 className="mt-3 font-display text-base font-bold text-white">{punto.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">{punto.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
