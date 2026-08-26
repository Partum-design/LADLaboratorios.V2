import type { Metadata } from "next";
import Link from "next/link";

import ConsultaEstudio from "@/components/eden/ConsultaEstudio";
import { EdenMark } from "@/components/ui/EdenBrand";
import { IconBadge, IconChip } from "@/components/ui/IconBadge";
import { IconEye, IconLock, IconLogin, IconScan, IconShieldCheck, IconUsers } from "@/components/ui/LadIcons";
import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import AmbientGlow from "@/components/ui/AmbientGlow";
import { isBirthDateRequired } from "@/lib/eden/config";
import { edenPortals } from "@/lib/eden-portals";
import { ICON_COLORS } from "@/lib/icon-palette";

export const metadata: Metadata = {
  title: "Consulta tus estudios | LAD Laboratorio de Apoyo y Diagnóstico",
  description:
    "Consulta el avance de tu estudio y descarga tu reporte de resultados con el folio que te dimos en LAD Laboratorio de Apoyo y Diagnóstico.",
};

// La consulta lee el expediente en vivo desde Eden, así que la página no se
// puede prerenderizar en el build.
export const dynamic = "force-dynamic";

const PORTAL_ICONS = {
  pacs: IconScan,
  management: IconUsers,
  intelligence: IconEye,
  admin: IconLock,
} as const;

export default function AccederPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-lad-white pb-16 pt-32 sm:pt-36">
        <AmbientGlow />
        <div className="container-lad relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow">Consulta de resultados</p>
            <EdenMark size="h-4 w-4" textClassName="text-sm text-lad-gray-mid" />
          </div>
          <TextReveal as="h1" className="heading-xl mb-4 mt-6 text-lad-black">
            Tus estudios, <span className="italic text-lad-red">al momento</span>
          </TextReveal>
          <p className="body-lg max-w-2xl">
            Escribe el folio de tu estudio y consulta en qué etapa va, en qué sucursal se realizó y
            descarga tu reporte firmado en cuanto esté listo. La información viene directo de nuestro
            expediente clínico, sin necesidad de crear una cuenta.
          </p>

          <div className="glass-card mt-8 flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:gap-4">
            <IconChip color={ICON_COLORS.red} size="h-6 w-6">
              <IconShieldCheck />
            </IconChip>
            <p className="text-sm text-lad-gray-mid">
              Tu información es confidencial. LAD nunca te pedirá contraseñas ni datos bancarios por
              teléfono, WhatsApp o correo. Si tienes dudas sobre tu reporte,{" "}
              <Link
                href="/contacto"
                className="font-bold text-lad-black underline decoration-lad-red underline-offset-4 hover:text-lad-red"
              >
                comunícate con nosotros
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Buscador */}
      <section id="consulta" className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <p className="eyebrow">Buscar mi estudio</p>
              <h2 className="heading-lg mt-5">
                Consulta con tu <span className="italic text-lad-red">folio</span>
              </h2>
              <p className="body-lg mt-4">
                El folio es el identificador que aparece en tu comprobante de estudio. Escríbelo tal
                cual, incluyendo guiones.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ConsultaEstudio requiereFechaNacimiento={isBirthDateRequired()} />
          </Reveal>
        </div>
      </section>

      {/* Accesos del personal */}
      <section id="personal" className="section-padding scroll-mt-24 bg-white">
        <div className="container-lad">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">Sólo personal LAD</p>
              <h2 className="heading-md mt-5">Acceso al ecosistema eden</h2>
              <p className="mt-3 text-lad-gray-mid">
                Estas plataformas son de uso interno. Si eres paciente, tu consulta se hace arriba con
                tu folio.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {edenPortals.map((portal, index) => {
              const Icon = PORTAL_ICONS[portal.slug as keyof typeof PORTAL_ICONS];
              return (
                <Reveal key={portal.slug} delay={index * 0.08} className="h-full">
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover flex h-full flex-col justify-between rounded-2xl bg-lad-black p-6 text-white"
                  >
                    <div>
                      <IconBadge color={ICON_COLORS.red}>
                        <Icon />
                      </IconBadge>
                      <h3 className="mb-1 mt-5 heading-sm lowercase">
                        eden <span className="font-light">{portal.suffix}</span>
                      </h3>
                      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-lad-red-light">
                        {portal.resumen}
                      </p>
                    </div>
                    <span className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <IconChip color="currentColor" size="h-4 w-4">
                        <IconLogin />
                      </IconChip>
                      Iniciar sesión
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-lad-gray-mid">
              Si olvidaste tu contraseña o aún no tienes acceso, contacta a tu administrador del sistema.
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
