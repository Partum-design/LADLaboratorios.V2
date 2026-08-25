"use client";

import Reveal from "@/components/motion/Reveal";
import Link from "next/link";

const rutasRapidas = [
  {
    title: "Quiero hacerme un estudio",
    desc: "Consulta pruebas, tiempos de entrega y tipo de muestra.",
    href: "/estudios#catalogo",
  },
  {
    title: "Busco un chequeo preventivo",
    desc: "Elige un paquete y agenda por WhatsApp.",
    href: "/estudios?cat=Perfiles%20y%20Paquetes#catalogo",
  },
  {
    title: "Necesito una cita",
    desc: "Déjanos tus datos o escríbenos directo.",
    href: "/contacto#agenda",
  },
  {
    title: "Quiero trabajar en LAD",
    desc: "Revisa vacantes y envía tu postulación.",
    href: "/unete#vacantes",
  },
];

export default function RutasRapidas() {
  return (
    <section id="rutas" className="bg-white px-0 pb-20 lg:px-6 lg:pb-28">
      <div className="mx-auto max-w-[88rem] bg-lad-black text-white lg:rounded-3xl">
        <div className="container-lad section-padding">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow">Accesos rápidos</p>
              <h2 className="heading-lg mt-5 text-white">Ve directo a lo que necesitas</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rutasRapidas.map((ruta, index) => (
              <Reveal key={ruta.title} delay={index * 0.08} className="h-full">
                <Link
                  href={ruta.href}
                  className="group flex h-full flex-col justify-between border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 ease-lad hover:-translate-y-1 hover:border-lad-red hover:bg-white/[0.06]"
                >
                  <span className="mb-8 block h-1 w-10 bg-lad-red transition-all duration-500 ease-lad group-hover:w-16" />
                  <span>
                    <span className="block font-display text-xl font-bold transition-colors duration-300 group-hover:text-lad-red-light">
                      {ruta.title}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-gray-400">{ruta.desc}</span>
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
