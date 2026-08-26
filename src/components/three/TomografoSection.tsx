"use client";

import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import Reveal from "@/components/motion/Reveal";
import Image from "next/image";
import Link from "next/link";
import { Component, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { invalidate } from "@react-three/fiber";
import TomografoCanvas, { type TomografoAnnotation } from "./TomografoCanvas";

// Posiciones dentro de una zona segura (cerca del centro de encuadre) para
// que las tarjetas, que se extienden hacia la derecha del punto, nunca
// salgan del viewport sin importar el tamaño de pantalla.
const ANNOTATIONS: TomografoAnnotation[] = [
  {
    position: [0.15, 1.85, 0.1],
    threshold: 0.14,
    title: "Rayos X y tomografía 24/7",
    sub: "los 365 días del año",
  },
  {
    position: [0.35, 1.15, 0.55],
    threshold: 0.45,
    title: "30 estudios de tomografía",
    sub: "disponibles en nuestro catálogo",
  },
  {
    position: [-0.15, 0.55, 0.9],
    threshold: 0.72,
    title: "TAC de cráneo, tórax y abdomen",
    sub: "simple y contrastada",
  },
];

/** Barrera de error: si el GLB o WebGL fallan, cae al póster estático. */
class CanvasBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function PosterFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        src="/img/tomografo-poster.webp"
        alt="Tomógrafo de LAD"
        width={1045}
        height={888}
        className="max-h-[60vh] w-auto object-contain drop-shadow-2xl"
      />
    </div>
  );
}

function StaticShowcase() {
  return (
    <section id="tomografo" className="section-padding overflow-hidden bg-lad-gray-light">
      <div className="container-lad">
        <Reveal>
          <p className="eyebrow">Imagenología</p>
          <h2 className="heading-lg mt-5">
            Tomografía <span className="italic text-lad-red">las 24 horas</span>, los 365 días
          </h2>
          <p className="body-lg mt-6 max-w-2xl">
            Servicio especial de Rayos X y tomografía las 24 horas, los 365 días del año.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10">
            <Image
              src="/img/tomografo-poster.webp"
              alt="Tomógrafo de LAD"
              width={1045}
              height={888}
              className="mx-auto w-full max-w-xl object-contain drop-shadow-2xl"
            />
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ANNOTATIONS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <div className="rail-red bg-white p-5 shadow-glass-sm">
                <p className="text-sm font-bold text-lad-black">{a.title}</p>
                <p className="mt-1 text-xs text-lad-gray-mid">{a.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link href="/estudios?cat=Tomograf%C3%ADa#catalogo" className="btn-primary mt-10 inline-flex">
            Ver estudios de tomografía
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function TomografoSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [interactive, setInteractive] = useState<boolean | null>(null);
  const [glbFailed, setGlbFailed] = useState(false);

  useEffect(() => {
    const wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    let hasWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      hasWebGL = false;
    }
    setInteractive(wantsMotion && isDesktop && hasWebGL);
  }, []);

  // Aviso temprano si el GLB no está disponible para caer al modelo procedural.
  useEffect(() => {
    if (!interactive) return;
    fetch("/models/tomografo.glb", { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setGlbFailed(true);
      })
      .catch(() => setGlbFailed(true));
  }, [interactive]);

  useLayoutEffect(() => {
    if (!interactive) return;
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          invalidate();
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [interactive]);

  if (interactive === null) {
    // Antes de decidir (SSR/primer render) reservamos el espacio de la versión estática.
    return <StaticShowcase />;
  }

  if (!interactive) {
    return <StaticShowcase />;
  }

  return (
    <section id="tomografo" className="relative bg-lad-gray-light">
      <div ref={wrapRef} className="relative h-[350vh]">
        <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
          {/* Fondo */}
          <div
            className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #E30613 0%, transparent 68%)" }}
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lad-red/15"
            aria-hidden
          />
          <div
            className="absolute left-1/2 top-1/2 h-[86vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lad-black/5"
            aria-hidden
          />

          {/* Canvas 3D */}
          <CanvasBoundary fallback={<PosterFallback />}>
            <TomografoCanvas
              progressRef={progressRef}
              annotations={ANNOTATIONS}
              procedural={glbFailed}
            />
          </CanvasBoundary>

          {/* Encabezado superpuesto */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-24 lg:pt-28">
            <div className="container-lad">
              <p className="eyebrow">Imagenología</p>
              <h2 className="heading-lg mt-4 max-w-2xl">
                Tomografía <span className="italic text-lad-red">las 24 horas</span>,
                <br className="hidden lg:block" /> los 365 días
              </h2>
            </div>
          </div>

          {/* CTA inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-10">
            <div className="container-lad flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <p className="max-w-sm text-sm leading-relaxed text-lad-black/60">
                Servicio especial de Rayos X y tomografía las 24 horas, los 365 días del año.
              </p>
              <Link
                href="/estudios?cat=Tomograf%C3%ADa#catalogo"
                className="btn-primary pointer-events-auto"
              >
                Ver estudios de tomografía
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
