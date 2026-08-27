/**
 * Fondo ambiental con movimiento: halos de luz que derivan lentamente en vez
 * de quedarse estáticos. La variante "dark" suma una retícula de puntos (guiño
 * a las placas de diagnóstico) y un barrido tipo escaneo.
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

        {/* Aurora: rojo, plasma y ámbar en deriva independiente */}
        <div className="absolute -right-40 -top-52 h-[560px] w-[560px] sm:h-[720px] sm:w-[720px]">
          <div
            className="h-full w-full animate-aurora-a rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #E30613 0%, transparent 65%)" }}
          />
        </div>
        <div className="absolute -bottom-56 -left-32 h-[500px] w-[500px] sm:h-[640px] sm:w-[640px]">
          <div
            className="h-full w-full animate-aurora-b rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #FF2E63 0%, transparent 68%)" }}
          />
        </div>
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-full w-full animate-aurora-c rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #FF7A29 0%, transparent 70%)" }}
          />
        </div>

        {/* Barrido tipo escaneo diagnóstico */}
        <div
          className="absolute inset-x-0 top-0 h-32 animate-scan-sweep"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(227,6,19,0.16) 45%, rgba(255,46,99,0.26) 50%, rgba(227,6,19,0.16) 55%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-24 -top-32 h-[440px] w-[440px] sm:h-[560px] sm:w-[560px]">
        <div
          className="h-full w-full animate-aurora-a rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #E30613 0%, transparent 68%)" }}
        />
      </div>
      <div className="absolute -bottom-40 -left-20 h-[380px] w-[380px] sm:h-[460px] sm:w-[460px]">
        <div
          className="h-full w-full animate-aurora-b rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #A63336 0%, transparent 70%)" }}
        />
      </div>
      <div className="absolute left-1/3 top-1/2 h-[320px] w-[320px] -translate-y-1/2">
        <div
          className="h-full w-full animate-aurora-c rounded-full opacity-[0.045]"
          style={{ background: "radial-gradient(circle, #FF7A29 0%, transparent 72%)" }}
        />
      </div>
    </div>
  );
}
