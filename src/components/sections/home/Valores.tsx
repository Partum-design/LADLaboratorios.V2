"use client";

import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { IconCheck, IconFocus, IconShieldCheck, IconUsers } from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";

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
  {
    icon: <IconCheck />,
    title: "Calidad ISO",
    desc: "Operamos bajo un sistema de gestión ISO 9001:2015.",
  },
];

export default function Valores() {
  return (
    <section id="valores" className="section-padding bg-white">
      <div className="container-lad">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Por qué elegirnos</p>
        </Reveal>
        <TextReveal className="heading-lg mt-5 text-center" delay={0.1}>
          Nuestros <span className="italic text-lad-red">valores</span>
        </TextReveal>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {valores.map((valor, index) => (
            <Reveal key={valor.title} delay={index * 0.1} className="h-full">
              <div className="group h-full rounded-r-3xl border-l-4 border-lad-red bg-lad-gray-light p-7 transition-all duration-500 ease-lad hover:-translate-y-1.5 hover:bg-white hover:shadow-glass">
                <IconBadge color={iconColorAt(index)} className="mb-5 h-10 w-10">
                  {valor.icon}
                </IconBadge>
                <h3 className="mb-2 heading-sm text-lad-black">{valor.title}</h3>
                <p className="text-sm leading-relaxed text-lad-gray-mid">{valor.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
