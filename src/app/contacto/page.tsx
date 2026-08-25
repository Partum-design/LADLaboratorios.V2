"use client";

import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import AmbientGlow from "@/components/ui/AmbientGlow";
import VideoAuto from "@/components/ui/VideoAuto";
import { IconBadge, IconChip } from "@/components/ui/IconBadge";
import {
  IconCheckCircle,
  IconClipboard,
  IconClock,
  IconMapPin,
  IconPhone,
  IconSend,
} from "@/components/ui/LadIcons";
import { ICON_COLORS, iconColorAt } from "@/lib/icon-palette";
import {
  buildWhatsAppLink,
  LAD_ADDRESS_DISPLAY,
  LAD_MAPS_LINK,
  LAD_PHONE_DISPLAY,
  LAD_SUCURSALES,
  LAD_TEL_LINK,
  LAD_WHATSAPP_LINK,
} from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/components/motion/gsap";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const horarios = [
  { dia: "Lunes a viernes", hora: "7:00 am a 8:00 pm" },
  { dia: "Sábado", hora: "7:30 am a 8:00 pm" },
  { dia: "Domingo", hora: "7:30 am a 4:00 pm" },
];

export default function ContactoPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-lad-white pb-16 pt-32 sm:pt-36 lg:pb-20">
        <AmbientGlow />
        <div className="container-lad relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              Contáctanos
            </motion.p>
            <TextReveal as="h1" className="heading-xl mt-6 text-lad-black" delay={0.05}>
              Agenda tu <span className="italic text-lad-red">cita</span>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="body-lg mt-6 max-w-xl"
            >
              Escríbenos por WhatsApp o déjanos tus datos. Te orientamos con horarios y preparación
              antes de tu visita.
            </motion.p>
          </div>
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <div className="video-frame relative aspect-[16/11] w-full">
                <VideoAuto src="/vids/contacto/hero.mp4" poster="/img/lad-area-radiologia.png" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-lad-black/30 to-transparent" />
                <span className="absolute -left-0 bottom-8 top-8 w-1 bg-lad-red" aria-hidden />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ContactoBody />
      </Suspense>
    </PageTransition>
  );
}

function ContactoBody() {
  const searchParams = useSearchParams();
  const estudioParam = searchParams.get("estudio")?.trim() ?? "";

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    fechaCita: "",
    horaCita: "",
    sinCita: false,
    servicio: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [formError, setFormError] = useState("");
  const [sucursalAbierta, setSucursalAbierta] = useState<string | null>(LAD_SUCURSALES[0]?.slug ?? null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll(".form-field"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.4 }
      );
    }
  }, []);

  useEffect(() => {
    if (estudioParam) {
      setFormData((prev) => ({
        ...prev,
        servicio: "Estudio específico",
        mensaje: `Quiero información sobre el estudio: ${estudioParam}. ¿Cuál es el precio y la preparación?`,
      }));
    }
  }, [estudioParam]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.sinCita && (!formData.fechaCita || !formData.horaCita)) {
      setFormError("Indica el día y la hora de tu cita, o marca “No tengo cita todavía” para solicitarla.");
      return;
    }
    setFormError("");
    setEnviando(true);
    const message = [
      "Hola, quiero agendar una cita en LAD.",
      formData.nombre && `Nombre: ${formData.nombre}`,
      formData.telefono && `Telefono: ${formData.telefono}`,
      formData.email && `Correo: ${formData.email}`,
      formData.servicio && `Servicio: ${formData.servicio}`,
      formData.fechaNacimiento && `Fecha de nacimiento: ${formData.fechaNacimiento}`,
      formData.sinCita ? "No tengo cita previa; solicito apoyo para agendarla." : `Día de la cita: ${formData.fechaCita}`,
      !formData.sinCita && `Hora de la cita: ${formData.horaCita}`,
      formData.mensaje && `Mensaje: ${formData.mensaje}`,
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
    setFormError("");
  };

  const handleNoCitaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sinCita = event.target.checked;
    setFormData((prev) => ({
      ...prev,
      sinCita,
      fechaCita: sinCita ? "" : prev.fechaCita,
      horaCita: sinCita ? "" : prev.horaCita,
    }));
    setFormError("");
  };

  const inputCls =
    "w-full rounded-xl border border-lad-black/10 bg-white p-3.5 text-sm transition focus:border-lad-red focus:outline-none";

  return (
    <>
      <section id="agenda" className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Información de contacto */}
          <div className="space-y-8 lg:col-span-2">
            <Reveal direction="left">
              <h2 className="heading-md mb-6">
                Información de <span className="italic text-lad-red">contacto</span>
              </h2>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <IconChip color={iconColorAt(0)}>
                    <IconMapPin />
                  </IconChip>
                  <div>
                    <p className="font-bold text-lad-black">Ubicación</p>
                    <p className="text-lad-gray-mid">{LAD_ADDRESS_DISPLAY}</p>
                    <a
                      href={LAD_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-lad-red transition hover:text-lad-black"
                    >
                      Ver en Google Maps →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconChip color={iconColorAt(1)}>
                    <IconPhone />
                  </IconChip>
                  <div>
                    <p className="font-bold text-lad-black">Teléfono</p>
                    <a href={LAD_TEL_LINK} className="text-lad-gray-mid transition hover:text-lad-red">
                      {LAD_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconChip color={iconColorAt(2)}>
                    <IconPhone />
                  </IconChip>
                  <div>
                    <p className="font-bold text-lad-black">WhatsApp</p>
                    <a
                      href={LAD_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lad-gray-mid transition hover:text-lad-red"
                    >
                      Resolver dudas o agendar
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-lad-black/10 pt-8">
                <div className="mb-4 flex items-center gap-2">
                  <IconChip color={iconColorAt(3)} size="h-5 w-5">
                    <IconClock />
                  </IconChip>
                  <h3 className="font-display text-lg font-bold">Horario de atención</h3>
                </div>
                {horarios.map((h) => (
                  <div key={h.dia} className="flex justify-between border-b border-lad-black/5 py-2 text-sm">
                    <span className="text-lad-gray-mid">{h.dia}</span>
                    <span className={h.hora === "Cerrado" ? "text-gray-400" : "font-semibold text-lad-red"}>
                      {h.hora}
                    </span>
                  </div>
                ))}
                <p className="mt-4 border-l-2 border-lad-red bg-lad-red/5 px-3 py-2 text-xs leading-relaxed text-lad-gray-mid">
                  Servicio especial de{" "}
                  <strong className="text-lad-black">
                    Rayos X y tomografía las 24 horas, los 365 días del año.
                  </strong>
                </p>
              </div>

              <div className="mt-8 h-64 overflow-hidden rounded-2xl shadow-glass-sm">
                <iframe
                  title="Ubicación de LAD en Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(LAD_ADDRESS_DISPLAY)}&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            <Reveal direction="right">
              <form ref={formRef} onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-glass md:p-10">
                {enviado ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <IconBadge color={ICON_COLORS.green} className="mx-auto mb-4 h-16 w-16 rounded-full">
                      <IconCheckCircle />
                    </IconBadge>
                    <h2 className="heading-md mb-4 text-lad-black">WhatsApp abierto</h2>
                    <p className="text-lad-gray-mid">
                      Tu mensaje quedó listo para enviarse. Si no se abrió la ventana, usa el botón
                      flotante de WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {estudioParam && (
                      <div className="form-field flex items-start gap-3 rounded-xl border border-lad-red/30 bg-lad-red/5 p-4 md:col-span-2">
                        <IconChip color={ICON_COLORS.red} size="h-5 w-5">
                          <IconClipboard />
                        </IconChip>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-lad-red">
                            Preguntando sobre
                          </p>
                          <p className="font-semibold text-lad-black">{estudioParam}</p>
                        </div>
                      </div>
                    )}
                    <input
                      className={`form-field ${inputCls}`}
                      name="nombre"
                      placeholder="Nombre completo"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className={`form-field ${inputCls}`}
                      name="email"
                      type="email"
                      placeholder="Correo electrónico (opcional)"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <input
                      className={`form-field ${inputCls}`}
                      name="telefono"
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-field">
                      <label
                        htmlFor="fechaNacimiento"
                        className="mb-2 block text-xs font-bold uppercase tracking-wider text-lad-gray-mid"
                      >
                        Fecha de nacimiento
                      </label>
                      <input
                        id="fechaNacimiento"
                        className={inputCls}
                        name="fechaNacimiento"
                        type="date"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <label className="form-field flex items-center gap-3 rounded-xl border border-lad-red/30 bg-lad-red/5 p-3 text-sm font-semibold text-lad-black md:col-span-2">
                      <input
                        type="checkbox"
                        name="sinCita"
                        checked={formData.sinCita}
                        onChange={handleNoCitaChange}
                        className="h-4 w-4 accent-lad-red"
                      />
                      No tengo cita todavía; quiero solicitarla.
                    </label>
                    {!formData.sinCita && (
                      <>
                        <div className="form-field">
                          <label
                            htmlFor="fechaCita"
                            className="mb-2 block text-xs font-bold uppercase tracking-wider text-lad-gray-mid"
                          >
                            Día de la cita
                          </label>
                          <input
                            id="fechaCita"
                            className={inputCls}
                            name="fechaCita"
                            type="date"
                            value={formData.fechaCita}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-field">
                          <label
                            htmlFor="horaCita"
                            className="mb-2 block text-xs font-bold uppercase tracking-wider text-lad-gray-mid"
                          >
                            Hora de la cita
                          </label>
                          <input
                            id="horaCita"
                            className={inputCls}
                            name="horaCita"
                            type="time"
                            value={formData.horaCita}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </>
                    )}
                    <select
                      className={`form-field ${inputCls} md:col-span-2`}
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                    >
                      <option value="">Servicio de interés</option>
                      <option>Análisis clínicos</option>
                      <option>Estudio específico</option>
                      <option>Convenio empresarial</option>
                    </select>
                    <textarea
                      className={`form-field ${inputCls} min-h-36 md:col-span-2`}
                      name="mensaje"
                      placeholder="Mensaje o comentarios adicionales"
                      value={formData.mensaje}
                      onChange={handleChange}
                    />
                    {formError && (
                      <p
                        role="alert"
                        className="form-field rounded-r-xl border-l-4 border-lad-red bg-lad-red/5 px-4 py-3 text-sm font-semibold text-lad-black md:col-span-2"
                      >
                        {formError}
                      </p>
                    )}
                    <button
                      className="btn-primary flex items-center justify-center gap-2 md:col-span-2"
                      disabled={enviando}
                    >
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

      <section id="sucursales" className="section-padding scroll-mt-24 bg-white">
        <div className="container-lad">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow justify-center">Dónde encontrarnos</p>
              <h2 className="heading-lg mt-5">
                Nuestras <span className="italic text-lad-red">sucursales</span>
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {LAD_SUCURSALES.map((sucursal, index) => {
              const isOpen = sucursalAbierta === sucursal.slug;
              return (
                <Reveal key={sucursal.slug} delay={index * 0.06}>
                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                      isOpen ? "border-lad-red shadow-glass" : "border-lad-black/10 hover:border-lad-red/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSucursalAbierta(isOpen ? null : sucursal.slug)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-black leading-none transition-colors ${
                          isOpen ? "bg-lad-red text-white" : "bg-lad-red/10 text-lad-red"
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                      <span className="flex-1 font-display text-[15px] font-bold leading-snug text-lad-black">
                        {sucursal.nombre}
                      </span>
                      {sucursal.esMatriz && (
                        <span className="shrink-0 rounded-full bg-lad-red px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                          Matriz
                        </span>
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 border-t border-lad-black/5 px-5 pb-5 pt-4">
                            <p className="flex items-start gap-2.5 text-sm text-lad-gray-mid">
                              <IconMapPin className="mt-0.5 h-4 w-4 flex-none text-lad-red" />
                              {sucursal.direccion}
                            </p>
                            <div className="flex items-start gap-2.5 text-sm text-lad-gray-mid">
                              <IconClock className="mt-0.5 h-4 w-4 flex-none text-lad-red" />
                              <div>
                                {sucursal.horario.map((linea) => (
                                  <p key={linea}>{linea}</p>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <a
                                href={
                                  sucursal.mapsLink ??
                                  `https://www.google.com/maps?q=${encodeURIComponent(sucursal.direccion)}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-lad-black px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-lad-red"
                              >
                                <IconMapPin className="h-4 w-4" />
                                Ver mapa
                              </a>
                              {sucursal.telefonoDisplay && sucursal.telefonoTelLink && (
                                <a
                                  href={sucursal.telefonoTelLink}
                                  className="inline-flex items-center gap-2 rounded-full bg-[#0d9488] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#0f766e]"
                                >
                                  <IconPhone className="h-4 w-4" />
                                  {sucursal.telefonoDisplay}
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
