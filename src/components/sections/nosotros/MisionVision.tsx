"use client";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { IconChip } from "@/components/ui/IconBadge";
import { IconEye, IconFocus } from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import Image from "next/image";

export default function MisionVision() {
  return (
    <section className="section-padding bg-lad-gray-light">
      <div className="container-lad grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <div className="space-y-8 lg:sticky lg:top-32">
            <Reveal direction="left">
              <div className="border-lad">
                <div className="mb-4 flex items-center gap-3">
                  <IconChip color={iconColorAt(0)}>
                    <IconFocus />
                  </IconChip>
                  <p className="eyebrow !text-lad-red">Misión</p>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-lad-black">Qué nos mueve</h3>
                <p className="leading-relaxed text-lad-gray-mid">
                  Entregar resultados confiables y oportunos para apoyar decisiones médicas.
                </p>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.12}>
              <div className="border-lad">
                <div className="mb-4 flex items-center gap-3">
                  <IconChip color={iconColorAt(1)}>
                    <IconEye />
                  </IconChip>
                  <p className="eyebrow !text-lad-red">Visión</p>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold text-lad-black">Hacia dónde vamos</h3>
                <p className="leading-relaxed text-lad-gray-mid">
                  Crecer como laboratorio regional con procesos claros, buen trato y mejora continua certificada.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal direction="right">
          <Parallax yPercent={10}>
            <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-glass lg:h-[560px]">
              <Image
                src="/img/lad-hero-laboratorio.png"
                alt="Equipo clínico de LAD"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-10 left-0 top-10 w-1 bg-lad-red" aria-hidden />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
