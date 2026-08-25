"use client";

import { useEffect, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

/** Navegación lateral de secciones (estilo editorial): puntos + etiqueta activa. */
export default function SectionProgressNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Secciones"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-500 ease-lad ${
                isActive
                  ? "translate-x-0 text-lad-red opacity-100"
                  : "translate-x-2 text-lad-black/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-500 ease-lad ${
                isActive ? "h-6 w-1.5 bg-lad-red" : "h-1.5 w-1.5 bg-lad-black/25 group-hover:bg-lad-red/60"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
