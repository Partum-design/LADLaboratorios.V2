/**
 * Fondo ambiental para secciones claras: halos de luz suaves en vez de
 * cuadrículas o puntos. Puramente decorativo, sin patrón geométrico.
 */
export default function AmbientGlow({ variant = "hero" }: { variant?: "hero" | "dark" }) {
  if (variant === "dark") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #E30613 0%, transparent 62%)" }}
        />
        <div
          className="absolute -bottom-48 -left-24 h-[420px] w-[420px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #E30613 0%, transparent 62%)" }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -right-24 -top-32 h-[440px] w-[440px] rounded-full opacity-[0.08] sm:h-[560px] sm:w-[560px]"
        style={{ background: "radial-gradient(circle, #E30613 0%, transparent 68%)" }}
      />
      <div
        className="absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full opacity-[0.05] sm:h-[460px] sm:w-[460px]"
        style={{ background: "radial-gradient(circle, #A63336 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full opacity-[0.035]"
        style={{ background: "radial-gradient(circle, #201E1E 0%, transparent 72%)" }}
      />
    </div>
  );
}
