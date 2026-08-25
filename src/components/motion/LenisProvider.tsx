"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Smooth scrolling global con Lenis, cableado al ticker de GSAP para que
 * ScrollTrigger y el scroll suave compartan un solo reloj. Con
 * prefers-reduced-motion el proveedor no monta Lenis y el scroll queda nativo.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anclas internas (#agenda, #catalogo, ...) con scroll suave y offset del navbar.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const [path, hash] = href.split("#");
      if (!hash) return;
      if (path && path !== window.location.pathname) return;
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      window.history.pushState(null, "", `#${hash}`);
      lenis.scrollTo(el, { offset: -96 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de ruta: subir al inicio de inmediato, o al ancla si la URL trae hash.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash.slice(1);

    const goToHash = () => {
      const el = hash ? document.getElementById(hash) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -96 });
        else el.scrollIntoView();
      }
    };

    if (hash) {
      // Espera a que la transición de entrada monte el contenido.
      const t = window.setTimeout(goToHash, 620);
      return () => window.clearTimeout(t);
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // Recalcular triggers cuando cargan las fuentes.
  useEffect(() => {
    document.fonts?.ready?.then(() => ScrollTrigger.refresh()).catch(() => {});
  }, []);

  return <>{children}</>;
}
