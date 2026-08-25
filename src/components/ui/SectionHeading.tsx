import Reveal from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

/** Encabezado de sección: eyebrow + título display + intro opcional. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "mx-auto text-center" : "";
  return (
    <Reveal className={`max-w-3xl ${alignCls} ${className}`}>
      <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className={`heading-lg mt-5 ${dark ? "text-white" : "text-lad-black"}`}>{title}</h2>
      {intro && (
        <p className={`body-lg mt-6 ${dark ? "text-white/70" : ""}`}>{intro}</p>
      )}
    </Reveal>
  );
}
