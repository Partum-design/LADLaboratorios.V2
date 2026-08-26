"use client";

import { IconMapPin, IconSearch } from "@/components/ui/LadIcons";
import { EASE } from "@/components/motion/gsap";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/estudios", label: "Estudios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/unete", label: "Vacantes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const glass = `border border-white/60 bg-white/75 backdrop-blur-xl transition-shadow duration-500 ${
    scrolled ? "shadow-glass" : "shadow-glass-sm"
  }`;

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className={`group flex shrink-0 items-center gap-3 rounded-full py-2 pl-2 pr-6 ${glass}`}
        >
          <Image
            src="/logo/logo-lad.png"
            alt="LAD Logo"
            width={112}
            height={112}
            priority
            className="h-12 w-12 rounded-[22%] object-contain transition duration-500 ease-lad group-hover:rotate-[-6deg] group-hover:scale-95 sm:h-14 sm:w-14"
          />
          <span className="hidden text-center leading-none min-[440px]:block">
            <span className="block text-[13px] font-bold uppercase tracking-[0.12em] text-lad-black">
              Laboratorio de
            </span>
            <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-lad-gray-mid">
              Apoyo y Diagnóstico
            </span>
          </span>
        </Link>

        {/* Links centrales (desktop) */}
        <ul className={`hidden items-center gap-1 rounded-full p-1.5 lg:flex ${glass}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative z-10 block rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive ? "text-white" : "text-lad-black/65 hover:text-lad-black"
                  }`}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-lad-red shadow-red"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Acciones (desktop) */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            href="/contacto#sucursales"
            className={`flex items-center gap-1.5 rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-lad-gray-mid transition hover:text-lad-red ${glass}`}
          >
            <IconMapPin className="h-3.5 w-3.5" />
            Sucursales
          </Link>
          <Link
            href="/acceder#consulta"
            className="btn-primary !px-5 !py-3 text-[11px]"
          >
            <IconSearch className="h-4 w-4" />
            Mis resultados
          </Link>
        </div>

        {/* Accesos rápidos (móvil): un toque, sin pasar por el menú */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href="/contacto#sucursales"
            aria-label="Sucursales"
            className={`flex h-12 w-12 items-center justify-center rounded-full text-lad-black ${glass}`}
          >
            <IconMapPin className="h-4 w-4" />
          </Link>
          <Link href="/acceder#consulta" aria-label="Mis resultados" className="btn-primary h-12 w-12 !p-0">
            <IconSearch className="h-4 w-4" />
          </Link>
        </div>

        {/* Hamburguesa (móvil) */}
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((value) => !value)}
          className={`flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full text-lad-black lg:hidden ${glass}`}
        >
          <span className={`h-0.5 w-5 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-glass backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-4 text-sm font-bold uppercase tracking-wider transition ${
                    pathname === link.href ? "bg-lad-red/5 text-lad-red" : "text-lad-black hover:bg-lad-black/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto#sucursales"
                className="flex items-center gap-2 px-4 py-4 text-xs font-semibold uppercase tracking-wide text-lad-black/60"
              >
                <IconMapPin className="h-3.5 w-3.5" />
                Sucursales
              </Link>
              <Link href="/acceder#consulta" className="btn-primary mt-2 w-full">
                <IconSearch className="h-4 w-4" />
                Consultar mis resultados
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
