"use client";

import Reveal from "@/components/motion/Reveal";
import VideoAuto from "@/components/ui/VideoAuto";
import { motion } from "framer-motion";

export default function HeroNosotros() {
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
            Nosotros
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="heading-xl mt-6 text-lad-black"
          >
            40+ años de <span className="italic text-lad-red">experiencia</span> al servicio de tu salud
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
