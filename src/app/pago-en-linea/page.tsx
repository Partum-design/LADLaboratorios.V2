import type { Metadata } from "next";
import { Suspense } from "react";

import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import PagoEnLineaForm from "@/components/pago/PagoEnLineaForm";
import { IconChip } from "@/components/ui/IconBadge";
import { IconCreditCard, IconLock, IconShieldCheck } from "@/components/ui/LadIcons";
import { ICON_COLORS } from "@/lib/icon-palette";

export const metadata: Metadata = {
  title: "Pago en línea | LAD Laboratorio de Apoyo y Diagnóstico",
  description: "Paga tus estudios de laboratorio en línea con tarjeta, directo y seguro, sin salir del sitio.",
};

export const dynamic = "force-dynamic";

const garantias = [
  { icon: <IconLock />, texto: "Conexión cifrada con Mercado Pago" },
  { icon: <IconShieldCheck />, texto: "LAD nunca ve ni guarda tu tarjeta" },
  { icon: <IconCreditCard />, texto: "Aceptamos las principales tarjetas" },
];

export default function PagoEnLineaPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-lad-white pb-16 pt-32 sm:pt-36">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="container-lad relative z-10">
          <p className="eyebrow">Pago en línea</p>
          <TextReveal as="h1" className="heading-xl mb-4 mt-6 text-lad-black">
            Paga tu estudio <span className="italic text-lad-red">directo aquí</span>
          </TextReveal>
          <p className="body-lg max-w-2xl">
            Captura tus datos bancarios y paga con tarjeta, igual que cualquier compra en línea. Sin
            WhatsApp, sin esperar a que alguien te conteste.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
            {garantias.map((garantia) => (
              <div key={garantia.texto} className="chip !py-2.5 normal-case !tracking-normal">
                <IconChip color={ICON_COLORS.red} size="h-5 w-5">
                  {garantia.icon}
                </IconChip>
                <span className="text-xs font-semibold text-lad-gray-mid">{garantia.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pagar" className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad max-w-2xl">
          <Reveal>
            <Suspense fallback={null}>
              <PagoEnLineaForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
