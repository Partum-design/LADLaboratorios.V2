"use client";

import dynamic from "next/dynamic";

/** El bundle de three.js solo se carga cuando esta sección entra al árbol. */
const TomografoSection = dynamic(() => import("@/components/three/TomografoSection"), {
  ssr: false,
  loading: () => (
    <section id="tomografo" className="flex min-h-[60vh] items-center justify-center bg-lad-gray-light">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-lad-red border-t-transparent" />
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-lad-black/40">
          Cargando experiencia 3D
        </span>
      </div>
    </section>
  ),
});

export default function TomografoShowcase() {
  return <TomografoSection />;
}
