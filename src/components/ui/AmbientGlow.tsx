import ParticleField from "@/components/ui/ParticleField";

/**
 * Fondo ambiental: en fondos oscuros, halos de luz en deriva lenta más
 * retícula de puntos y barrido tipo escaneo. En fondos claros, una red de
 * nodos que se conectan entre sí y con el cursor — así ninguna cabecera
 * blanca queda completamente vacía.
 */
export default function AmbientGlow({ variant = "hero" }: { variant?: "hero" | "dark" }) {
  if (variant === "dark") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Retícula de diagnóstico en deriva lenta */}
        <div
          className="absolute inset-0 animate-grid-pan opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1.4px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Aurora en rojo, en tres tonos y derivas independientes */}
        <div className="absolute -right-40 -top-52 h-[560px] w-[560px] sm:h-[720px] sm:w-[720px]">
          <div
            className="h-full w-full animate-aurora-a rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #E30613 0%, transparent 65%)" }}
          />
        </div>
        <div className="absolute -bottom-56 -left-32 h-[500px] w-[500px] sm:h-[640px] sm:w-[640px]">
          <div
            className="h-full w-full animate-aurora-b rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #A63336 0%, transparent 68%)" }}
          />
        </div>
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-full w-full animate-aurora-c rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #F56A6E 0%, transparent 70%)" }}
          />
        </div>

        {/* Barrido tipo escaneo diagnóstico */}
        <div
          className="absolute inset-x-0 top-0 h-32 animate-scan-sweep"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(227,6,19,0.16) 45%, rgba(227,6,19,0.28) 50%, rgba(227,6,19,0.16) 55%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <ParticleField />
    </div>
  );
}
