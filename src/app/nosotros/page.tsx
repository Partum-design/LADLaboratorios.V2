"use client";

import CtaBanner from "@/components/layout/CtaBanner";
import PageTransition from "@/components/motion/PageTransition";
import Areas from "@/components/sections/nosotros/Areas";
import HeroNosotros from "@/components/sections/nosotros/HeroNosotros";
import HistoriaTimeline from "@/components/sections/nosotros/HistoriaTimeline";
import MisionVision from "@/components/sections/nosotros/MisionVision";
import { IconBadge } from "@/components/ui/IconBadge";
import { IconAward, IconCertificate, IconLock, IconShieldCheck } from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";

const valores = [
  { icon: <IconCertificate />, label: "Calidad certificada" },
  { icon: <IconLock />, label: "Confidencialidad" },
  { icon: <IconShieldCheck />, label: "Tecnología avanzada" },
  { icon: <IconAward />, label: "Equipo experto" },
];

export default function NosotrosPage() {
  return (
    <PageTransition>
      <HeroNosotros />
      <MisionVision />
      <HistoriaTimeline />
      <Areas />

      {/* Valores al fondo */}
      <section className="bg-white pb-24">
        <div className="container-lad grid grid-cols-2 gap-4 md:grid-cols-4">
          {valores.map((v, index) => (
            <div
              key={v.label}
              className="flex items-center gap-3 rounded-2xl bg-lad-gray-light p-5 transition-colors duration-500 hover:bg-white hover:shadow-glass-sm"
            >
              <IconBadge color={iconColorAt(index + 2)} className="h-9 w-9">
                {v.icon}
              </IconBadge>
              <p className="text-sm font-bold text-lad-black">{v.label}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </PageTransition>
  );
}
