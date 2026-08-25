"use client";

import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import VideoAuto from "@/components/ui/VideoAuto";
import { IconWhatsApp } from "@/components/ui/LadIcons";
import { buildWhatsAppLink } from "@/lib/contact";
import { motion } from "framer-motion";

export default function HeroEstudios() {
  return (
    <section className="relative overflow-hidden bg-lad-white pb-16 pt-32 sm:pt-36 lg:pb-20">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="container-lad relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Catálogo
          </motion.p>
          <TextReveal as="h1" className="heading-xl mt-6 text-lad-black" delay={0.05}>
            Nuestros <span className="italic text-lad-red">Estudios</span>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg mt-6 max-w-2xl"
          >
            Consulta nuestro catálogo de más de 500 estudios con precios e indicaciones de
            preparación. ¿No encuentras el tuyo o tienes dudas? Pregúntanos directo por WhatsApp.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={buildWhatsAppLink("Hola, tengo una duda sobre un estudio de laboratorio. ¿Me pueden ayudar?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-9 inline-flex"
            >
              <IconWhatsApp className="h-5 w-5" />
              Preguntar por WhatsApp
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <Reveal direction="right">
            <div className="video-frame relative aspect-[16/11] w-full">
              <VideoAuto src="/vids/estudios/hero.mp4" poster="/img/lad-area-quimica.png" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-lad-black/30 to-transparent" />
              <span className="absolute -left-0 bottom-8 top-8 w-1 rounded-full bg-lad-red" aria-hidden />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
