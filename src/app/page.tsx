"use client";

import CtaBanner from "@/components/layout/CtaBanner";
import SectionProgressNav from "@/components/layout/SectionProgressNav";
import PageTransition from "@/components/motion/PageTransition";
import HeroInicio from "@/components/sections/home/HeroInicio";
import QuienesSomos from "@/components/sections/home/QuienesSomos";
import RutasRapidas from "@/components/sections/home/RutasRapidas";
import Servicios from "@/components/sections/home/Servicios";
import StatsBand from "@/components/sections/home/StatsBand";
import TomografoShowcase from "@/components/sections/home/TomografoShowcase";
import Valores from "@/components/sections/home/Valores";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import PagoStrip from "@/components/ui/PagoStrip";
import { TestimonialsSection } from "@/components/ui/TestimonialsColumns";

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "quienes-somos", label: "Nosotros" },
  { id: "tomografo", label: "Tomografía" },
  { id: "testimonios", label: "Testimonios" },
  { id: "valores", label: "Valores" },
];

export default function HomePage() {
  return (
    <PageTransition>
      <SectionProgressNav items={NAV_ITEMS} />
      <HeroInicio />
      <MarqueeStrip />
      <StatsBand />
      <PagoStrip />
      <Servicios />
      <QuienesSomos />
      <TomografoShowcase />
      <RutasRapidas />
      <TestimonialsSection />
      <Valores />
      <CtaBanner />
    </PageTransition>
  );
}
