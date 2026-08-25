"use client";

import PageTransition from "@/components/motion/PageTransition";
import CatalogoClient from "@/components/sections/estudios/CatalogoClient";
import HeroEstudios from "@/components/sections/estudios/HeroEstudios";
import PagoStrip from "@/components/ui/PagoStrip";
import { Suspense } from "react";

function CatalogoSkeleton() {
  return (
    <section id="catalogo" className="section-padding bg-lad-gray-light">
      <div className="container-lad">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse bg-white shadow-glass-sm" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EstudiosPage() {
  return (
    <PageTransition>
      <HeroEstudios />
      <PagoStrip />
      <Suspense fallback={<CatalogoSkeleton />}>
        <CatalogoClient />
      </Suspense>
    </PageTransition>
  );
}
