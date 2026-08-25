const ITEMS = [
  "Análisis clínicos",
  "Rayos X y Radiología",
  "Tomografía 24/7",
  "Ultrasonido",
  "Mastografía",
  "Perfiles y Paquetes",
  "Resultados digitales",
  "ISO 9001:2015",
];

/** Marquesina editorial con los servicios reales del laboratorio. */
export default function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 font-display text-2xl font-semibold tracking-tight sm:text-3xl ${
              dark ? (i % 2 ? "text-white/25" : "text-white") : i % 2 ? "text-lad-black/20" : "text-lad-black"
            }`}
          >
            {item}
          </span>
          <span className="h-2 w-2 rotate-45 bg-lad-red" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden border-y py-5 ${
        dark ? "border-white/10 bg-lad-black" : "border-lad-black/5 bg-lad-white"
      }`}
    >
      <div className="marquee-track flex w-max" style={{ ["--marquee-x-duration" as string]: "42s" }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
