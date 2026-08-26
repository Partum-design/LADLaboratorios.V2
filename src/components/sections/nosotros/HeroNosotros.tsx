"use client";

import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import AmbientGlow from "@/components/ui/AmbientGlow";
import VideoAuto from "@/components/ui/VideoAuto";
import { EASE } from "@/components/motion/gsap";
import { motion } from "framer-motion";

export default function HeroNosotros() {
  return (
    <section className="relative overflow-hidden bg-lad-white pb-16 pt-32 sm:pt-36 lg:pb-20">
      <AmbientGlow />
      <div className="container-lad relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow"
          >
            Nosotros
          </motion.p>
          <TextReveal as="h1" className="heading-xl mt-6 text-lad-black" delay={0.05}>
            40+ años de <span className="italic text-lad-red">experiencia</span> al servicio de tu salud
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="body-lg mt-6 max-w-2xl"
          >
            Somos un laboratorio que cuida el proceso completo: toma de muestra, análisis, entrega y
            explicación cuando el paciente la necesita.
          </motion.p>
        </div>

        <div className="lg:col-span-5">
          <Reveal direction="right">
            <div className="video-frame relative aspect-[16/11] w-full">
              <VideoAuto src="/vids/nosotros/hero.mp4" poster="/img/lad-hero-laboratorio.png" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-lad-black/30 to-transparent" />
              <span className="absolute -left-0 bottom-8 top-8 w-1 bg-lad-red" aria-hidden />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
