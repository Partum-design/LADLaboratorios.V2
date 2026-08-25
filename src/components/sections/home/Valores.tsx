"use client";

import Reveal from "@/components/motion/Reveal";
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
        <Reveal>
          <div className="mb-14 text-center">
            <p className="eyebrow justify-center">Por qué elegirnos</p>
            <h2 className="heading-lg mt-5">
              Nuestros <span className="italic text-lad-red">valores</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {valores.map((valor, index) => (
            <Reveal key={valor.title} delay={index * 0.1} className="h-full">
              <div className="group h-full border-l-4 border-lad-red bg-lad-gray-light p-7 transition-all duration-500 ease-lad hover:-translate-y-1.5 hover:bg-white hover:shadow-glass">
                <IconBadge color={iconColorAt(index)} className="mb-5 h-10 w-10">
                  {valor.icon}
                </IconBadge>
                <h3 className="mb-2 font-display text-xl font-bold text-lad-black">{valor.title}</h3>
                <p className="text-sm leading-relaxed text-lad-gray-mid">{valor.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
