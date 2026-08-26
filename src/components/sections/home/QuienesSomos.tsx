"use client";

import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import VideoAuto from "@/components/ui/VideoAuto";
import Link from "next/link";

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="section-padding bg-white">
      <div className="container-lad grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Texto sticky en desktop */}
        <div className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-32">
            <Reveal direction="left">
              <p className="eyebrow">Quiénes somos</p>
              <h2 className="heading-lg mt-5">
                Resultados que llegan claros, <span className="italic text-lad-red">sin vueltas</span>
              </h2>
              <p className="body-lg mt-6 max-w-lg">
                Pacientes, médicos y empresas vuelven con nosotros por lo mismo: entregamos claro,
                tratamos bien y nuestra calidad se puede medir.
              </p>
              <Link href="/nosotros" className="btn-outline mt-9 inline-flex items-center gap-2">
                Conoce LAD
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Video con parallax y badge */}
        <div className="order-1 lg:order-2">
          <Reveal direction="right">
            <Parallax yPercent={10}>
              <div className="video-frame group relative aspect-[4/3] w-full lg:aspect-[8/9]">
                <VideoAuto
                  src="/vids/inicio/quienes-somos-recortado.mp4"
                  poster="/img/lad-hero-laboratorio.png"
                  className="h-full w-full object-cover transition-transform duration-700 ease-lad group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lad-black/40 to-transparent" />
                <div className="absolute bottom-6 right-6 rounded-2xl bg-lad-red px-7 py-5 text-center text-white shadow-red">
                  <p className="font-display text-3xl font-bold">40+</p>
                  <p className="text-xs">años de experiencia</p>
                </div>
                <span className="absolute -left-0 bottom-10 top-10 w-1 bg-lad-red" aria-hidden />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
