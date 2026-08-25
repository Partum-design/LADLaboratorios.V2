"use client";

import Reveal from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import {
  IconCulture,
  IconShieldCheck,
  IconTestTubes,
  IconXRay,
} from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import Image from "next/image";

const areas = [
  {
    nombre: "Hematología",
    desc: "Biometría hemática, coagulación y morfología celular con equipos automatizados y revisión del equipo clínico.",
    img: "/img/lad-area-hematologia.png",
    icono: <IconTestTubes />,
    badge: "Área principal",
  },
  {
    nombre: "Rayos X / Radiología",
    desc: "Radiología digital con procesamiento de imagen y entrega práctica para pacientes y médicos.",
    img: "/img/lad-area-radiologia.png",
    icono: <IconXRay />,
    badge: "",
  },
  {
    nombre: "Química Clínica",
    desc: "Química sanguínea, perfiles metabólicos, hepáticos, renales y lipídicos con procesos controlados.",
    img: "/img/lad-area-quimica.png",
    icono: <IconTestTubes />,
    badge: "",
  },
  {
    nombre: "Microbiología",
    desc: "Cultivos, antibiogramas e identificación bacteriana con tiempos claros de seguimiento.",
    img: "/img/lad-area-microbiologia.png",
    icono: <IconCulture />,
    badge: "",
  },
  {
    nombre: "Inmunología y Hormonas",
    desc: "Pruebas hormonales, infecciosas y autoinmunes para apoyar decisiones médicas específicas.",
    img: "/img/lad-area-inmunologia.png",
    icono: <IconShieldCheck />,
    badge: "",
  },
];

/** Cards apiladas: cada área se queda pegada y la siguiente la cubre al hacer scroll. */
export default function Areas() {
  return (
    <section className="section-padding bg-white">
      <div className="container-lad">
        <Reveal>
          <div className="mb-16 text-center">
            <p className="eyebrow justify-center">Infraestructura</p>
            <h2 className="heading-lg mt-5">
              Nuestras áreas y <span className="italic text-lad-red">equipamiento</span>
            </h2>
            <p className="body-lg mx-auto mt-5 max-w-2xl">
              Cada área tiene controles propios, personal capacitado y una ruta clara para entregar
              resultados útiles.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8 md:space-y-0">
          {areas.map((area, index) => (
            <div
              key={area.nombre}
              className="md:sticky md:pb-10"
              style={{ top: `${104 + index * 14}px`, zIndex: index + 1 }}
            >
              <article className="group grid grid-cols-1 overflow-hidden rounded-3xl bg-lad-gray-light shadow-glass md:min-h-[420px] md:grid-cols-2">
                <div className={`relative h-64 overflow-hidden md:h-auto ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <Image
                    src={area.img}
                    alt={area.nombre}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-lad group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lad-black/40 to-transparent" />
                  {area.badge && (
                    <span className="absolute left-5 top-5 bg-lad-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {area.badge}
                    </span>
                  )}
                </div>

                <div className="relative flex flex-col justify-center p-8 md:p-14">
                  <span className="pointer-events-none absolute right-8 top-6 font-display text-8xl font-semibold leading-none text-lad-black/[0.05]">
                    0{index + 1}
                  </span>
                  <IconBadge color={iconColorAt(index)} className="h-12 w-12">
                    {area.icono}
                  </IconBadge>
                  <h3 className="mt-6 font-display text-3xl font-bold text-lad-black">{area.nombre}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-lad-gray-mid">{area.desc}</p>
                  <span className="mt-8 block h-1 w-10 bg-lad-red transition-all duration-500 ease-lad group-hover:w-16" />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
