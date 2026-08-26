// Paleta de iconos: variación tonal dentro de la familia de marca de LAD
// (rojo/negro/gris) — no es un arcoíris decorativo, es disciplina de marca.
// success es la única excepción: reservado exclusivamente para estados de
// éxito/confirmación, nunca para el ciclo decorativo.
export const ICON_COLORS = {
  red: "#E30613",
  redDark: "#A63336",
  redLight: "#F56A6E",
  black: "#201E1E",
  graphite: "#5A5353",
  success: "#1E8A5A",
} as const;

export type IconColorName = keyof typeof ICON_COLORS;

// Ciclo decorativo para grids de tarjetas (Valores, Servicios, Areas, etc.).
// success queda fuera a propósito: es semántico, no decorativo.
export const ICON_COLOR_CYCLE: IconColorName[] = ["red", "redDark", "black", "graphite", "redLight"];

export function iconColorAt(index: number): string {
  return ICON_COLORS[ICON_COLOR_CYCLE[index % ICON_COLOR_CYCLE.length]];
}
