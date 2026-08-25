"use client";
import React from "react";
import AmbientGlow from "@/components/ui/AmbientGlow";
import AvatarInitials from "@/components/ui/AvatarInitials";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";

type Testimonial = {
  text: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <div
        className="testimonial-scroll group flex flex-col gap-5 pb-5"
        style={{ animationDuration: `${props.duration || 10}s` }}
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, role }, i) => (
              <div
                key={i}
                className="relative w-full max-w-xs overflow-hidden rounded-3xl border-l-4 border-lad-red bg-white p-6 shadow-glass-sm transition-shadow duration-500 [animation-play-state:running] group-hover:[animation-play-state:paused] hover:!shadow-glass"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-5 select-none font-display text-8xl font-semibold leading-none text-lad-red/[0.07]"
                >
                  &rdquo;
                </span>
                <p className="relative text-sm leading-relaxed text-lad-black/80">{text}</p>
                <div className="relative mt-5 flex items-center gap-3 border-t border-lad-black/5 pt-4">
                  <AvatarInitials name={name} className="h-10 w-10 shrink-0 ring-2 ring-white ring-offset-2 ring-offset-lad-red/10" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-5 tracking-tight text-lad-black">{name}</span>
                    <span className="text-xs leading-5 tracking-tight text-lad-red">{role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    text: "Mis resultados del perfil preventivo llegaron el mismo día, claros y bien organizados. Ya no tengo que esperar días para saber si algo está fuera de rango.",
    name: "María González",
    role: "Paciente",
  },
  {
    text: "Llevo años mandando a mis pacientes con LAD. Jamás he tenido un problema con la calidad ni con los tiempos de entrega.",
    name: "Dr. Ramón Herrera",
    role: "Médico General",
  },
  {
    text: "Contratamos el perfil corporativo para todo el equipo. Rápido, precio justo y los resultados llegaron digitales al momento. Sin papeleo.",
    name: "Carlos Reyes",
    role: "Director de Recursos Humanos",
  },
  {
    text: "Necesitaba un estudio urgente y me atendieron el mismo día. Sin burocracia, sin esperas largas. Eso vale mucho cuando uno está preocupado.",
    name: "Ana Lucía Martínez",
    role: "Paciente",
  },
  {
    text: "Los chicos de LAD siempre me explican qué significa cada resultado. Para alguien que no es médico, eso hace toda la diferencia.",
    name: "Roberto Sánchez",
    role: "Paciente",
  },
  {
    text: "Pedí mis estudios prenatales y la atención fue muy profesional y delicada. Me sentí en buenas manos desde que entré.",
    name: "Daniela Morales",
    role: "Paciente",
  },
  {
    text: "Mando a mis pacientes diabéticos mensualmente. LAD siempre entrega a tiempo con resultados confiables. Es parte de mi protocolo de seguimiento.",
    name: "Dra. Patricia López",
    role: "Endocrinóloga",
  },
  {
    text: "La plataforma digital para ver resultados es excelente. No tengo que ir al laboratorio a recoger nada, todo llega directo a mi teléfono.",
    name: "Fernando Jiménez",
    role: "Paciente",
  },
  {
    text: "El servicio a empresas es muy completo. Checamos a todo el personal cada semestre y LAD lo maneja sin complicaciones.",
    name: "Sofía Vargas",
    role: "Gerente de RRHH",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="relative section-padding overflow-hidden bg-lad-gray-light">
      <AmbientGlow />
      <div className="container-lad relative z-10">
        <Reveal className="mb-12 flex flex-col items-center text-center">
          <p className="eyebrow justify-center">Testimonios</p>
        </Reveal>
        <TextReveal as="h2" className="heading-lg mx-auto max-w-2xl text-center" delay={0.1}>
          Lo que dicen <span className="italic text-lad-red">nuestros pacientes</span>
        </TextReveal>
        <Reveal delay={0.25} className="text-center">
          <p className="body-lg mx-auto mt-4 max-w-xl">
            Pacientes, médicos y empresas que confían en LAD cada día.
          </p>
        </Reveal>

        <div
          className="mt-14 flex max-h-[700px] justify-center gap-5 overflow-hidden"
          style={{ maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)" }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={16} />
        </div>
      </div>
    </section>
  );
}
