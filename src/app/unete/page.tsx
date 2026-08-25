"use client";

import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import VideoAuto from "@/components/ui/VideoAuto";
import { IconBadge, IconChip } from "@/components/ui/IconBadge";
import {
  IconCheck,
  IconChevronDown,
  IconClock,
  IconGraduation,
  IconHeartPulse,
  IconPaperclip,
  IconSend,
  IconShieldCheck,
  IconSmile,
  IconTrendUp,
} from "@/components/ui/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import { buildWhatsAppLink } from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const posiciones = [
  {
    titulo: "Químico Farmacobiólogo (QFB)",
    area: "Laboratorio Clínico",
    tipo: "Tiempo completo",
    req: [
      "Cédula profesional vigente",
      "2+ años de experiencia",
      "Manejo de analizadores automatizados",
      "Disponibilidad para rotación de turnos",
    ],
  },
  {
    titulo: "Técnico de Laboratorio",
    area: "Laboratorio Clínico",
    tipo: "Tiempo completo",
    req: [
      "Carrera técnica en área de salud",
      "Experiencia en toma de muestras",
      "Trabajo en equipo",
      "Actitud de servicio al paciente",
    ],
  },
  {
    titulo: "Recepcionista / Atención al Paciente",
    area: "Área Administrativa",
    tipo: "Tiempo completo",
    req: ["Bachillerato o superior", "Excelente trato al cliente", "Manejo básico de computadora"],
  },
  {
    titulo: "Especialista en Microbiología",
    area: "Microbiología",
    tipo: "Tiempo completo",
    req: [
      "Especialidad en Microbiología Clínica",
      "Experiencia en cultivos y antibiogramas",
      "Actualización continua en la materia",
    ],
  },
];

const beneficios = [
  { icon: <IconShieldCheck />, label: "Seguro de salud" },
  { icon: <IconGraduation />, label: "Capacitación continua" },
  { icon: <IconClock />, label: "Horarios flexibles" },
  { icon: <IconTrendUp />, label: "Crecimiento profesional" },
  { icon: <IconHeartPulse />, label: "Prestaciones superiores" },
  { icon: <IconSmile />, label: "Buen ambiente laboral" },
];

export default function UnetePage() {
  const [activePos, setActivePos] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    posicion: "",
    experiencia: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEnviando(true);
    const message = [
      "Hola, quiero postularme a LAD.",
      formData.nombre && `Nombre: ${formData.nombre}`,
      formData.telefono && `Telefono: ${formData.telefono}`,
      formData.email && `Correo: ${formData.email}`,
      formData.posicion && `Posicion: ${formData.posicion}`,
      formData.experiencia && `Experiencia: ${formData.experiencia}`,
      formData.mensaje && `Mensaje: ${formData.mensaje}`,
      cvFile && `CV: ${cvFile.name}. Lo adjunto en este chat.`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    await new Promise((resolve) => setTimeout(resolve, 400));
    setEnviando(false);
    setEnviado(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const inputCls =
    "border border-lad-black/10 bg-white p-3 text-sm transition focus:border-lad-red focus:outline-none";

  return (
    <PageTransition>
      {/* Hero */}
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
              Oportunidades
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="heading-xl mt-6 text-lad-black"
            >
              Vacantes en <span className="italic text-lad-red">LAD</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="body-lg mt-6 max-w-xl"
            >
              Buscamos personas cuidadosas, puntuales y con buen trato al paciente. Si quieres crecer
              en diagnóstico clínico, revisa las vacantes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#vacantes" className="btn-primary mt-9 inline-flex items-center gap-2">
                <IconChip color="#ffffff" size="h-5 w-5">
                  <IconChevronDown />
                </IconChip>
                Ver vacantes disponibles
              </a>
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <div className="video-frame relative aspect-[16/11] w-full">
                <VideoAuto src="/vids/unete/hero.mp4" poster="/img/lad-area-hematologia.png" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-lad-black/30 to-transparent" />
                <span className="absolute -left-0 bottom-8 top-8 w-1 bg-lad-red" aria-hidden />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="eyebrow justify-center">Por qué nosotros</p>
              <h2 className="heading-lg mt-5">
                Trabaja donde <span className="italic text-lad-red">importas</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {beneficios.map((b, index) => (
              <Reveal key={b.label} delay={index * 0.08} className="h-full">
                <div className="card-hover h-full border border-lad-black/5 bg-white p-8 text-center shadow-glass-sm hover:border-lad-red">
                  <IconBadge color={iconColorAt(index)} className="mx-auto mb-4 h-12 w-12">
                    {b.icon}
                  </IconBadge>
                  <p className="font-display text-sm font-bold text-lad-black">{b.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vacantes + Formulario */}
      <section id="vacantes" className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Accordion de vacantes */}
          <div>
            <Reveal direction="left">
              <p className="eyebrow">Vacantes</p>
              <h2 className="heading-lg mb-8 mt-5">Puestos disponibles</h2>
            </Reveal>
            <div className="space-y-4">
              {posiciones.map((posicion, index) => (
                <Reveal key={posicion.titulo} delay={index * 0.06}>
                  <div className="bg-white shadow-glass-sm">
                    <button
                      type="button"
                      onClick={() => setActivePos(activePos === index ? null : index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <span>
                        <span className="block font-display text-lg font-bold text-lad-black">
                          {posicion.titulo}
                        </span>
                        <span className="text-sm text-lad-gray-mid">
                          {posicion.area} · {posicion.tipo}
                        </span>
                      </span>
                      <span
                        className={`text-lad-red transition-transform ${activePos === index ? "rotate-180" : ""}`}
                      >
                        <IconChip color={iconColorAt(index)} size="h-5 w-5">
                          <IconChevronDown />
                        </IconChip>
                      </span>
                    </button>
                    <AnimatePresence>
                      {activePos === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2 border-t border-lad-black/5 p-5 pt-4">
                            {posicion.req.map((r) => (
                              <li key={r} className="flex items-center gap-2 text-sm text-lad-gray-mid">
                                <IconChip color={iconColorAt(2)} size="h-4 w-4">
                                  <IconCheck />
                                </IconChip>{" "}
                                {r}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div>
            <Reveal direction="right">
              <form onSubmit={handleSubmit} className="bg-white p-6 shadow-glass md:p-8">
                {enviado ? (
                  <div className="py-16 text-center">
                    <h2 className="heading-md mb-4">WhatsApp abierto</h2>
                    <p className="text-lad-gray-mid">
                      Tu mensaje quedó listo. Si agregaste CV, adjúntalo en el chat antes de enviarlo.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5">
                    <h2 className="heading-md">Postúlate</h2>
                    <input
                      className={inputCls}
                      name="nombre"
                      placeholder="Nombre completo"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className={inputCls}
                      name="email"
                      type="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className={inputCls}
                      name="telefono"
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                    <select
                      className={inputCls}
                      name="posicion"
                      value={formData.posicion}
                      onChange={handleChange}
                    >
                      <option value="">Posición de interés</option>
                      {posiciones.map((p) => (
                        <option key={p.titulo}>{p.titulo}</option>
                      ))}
                    </select>
                    <input
                      className={inputCls}
                      name="experiencia"
                      placeholder="Años de experiencia"
                      value={formData.experiencia}
                      onChange={handleChange}
                    />
                    <label className="flex cursor-pointer items-center gap-3 border border-lad-black/10 bg-white p-3 text-sm text-lad-gray-mid transition-colors hover:border-lad-red">
                      <IconChip color={iconColorAt(4)} size="h-4 w-4">
                        <IconPaperclip />
                      </IconChip>
                      {cvFile ? cvFile.name : "Adjuntar CV (.pdf, .doc, .docx)"}
                      <input
                        className="hidden"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    <textarea
                      className={`${inputCls} min-h-32`}
                      name="mensaje"
                      placeholder="Mensaje o comentarios adicionales"
                      value={formData.mensaje}
                      onChange={handleChange}
                    />
                    <button className="btn-primary flex items-center justify-center gap-2" disabled={enviando}>
                      {enviando ? (
                        "Abriendo WhatsApp..."
                      ) : (
                        <>
                          <IconChip color="#ffffff" size="h-4 w-4">
                            <IconSend />
                          </IconChip>
                          Enviar por WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
