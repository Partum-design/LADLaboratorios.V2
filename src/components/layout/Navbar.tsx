"use client";

import { IconMapPin, IconSearch } from "@/components/ui/LadIcons";
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-lad-black/5 bg-white/85 shadow-glass-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-lad flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <Image
            src="/logo/logo-lad.png"
            alt="LAD Logo"
            width={96}
            height={96}
            priority
            className="h-11 w-11 rounded-[22%] object-contain shadow-glass-sm transition duration-500 ease-lad group-hover:scale-95 sm:h-12 sm:w-12"
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-sm font-bold uppercase tracking-[0.12em] text-lad-black">
              Laboratorio de
            </span>
            <span className="mt-0.5 block text-[11px] font-medium tracking-wide text-lad-black/60">
              Apoyo y Diagnóstico
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative pb-1 text-xs font-bold uppercase tracking-[0.16em] transition ${
                    isActive ? "text-lad-red" : "text-lad-black/70 hover:text-lad-red"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-lad-red"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/contacto#sucursales"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-lad-black/50 transition hover:text-lad-red"
          >
            <IconMapPin className="h-3.5 w-3.5" />
            Sucursales
          </Link>
          <Link
            href="/acceder#consulta"
            className={`flex items-center gap-2 bg-lad-red px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-500 ease-lad hover:bg-lad-red-dark hover:shadow-red ${
              pathname === "/acceder" ? "ring-2 ring-lad-red/30 ring-offset-2 ring-offset-white" : ""
            }`}
          >
            <IconSearch className="h-4 w-4" />
            Mis resultados
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-lad-black lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-lad-black/5 bg-white lg:hidden"
          >
            <div className="container-lad flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 text-sm font-bold uppercase tracking-wider ${
                    pathname === link.href ? "text-lad-red" : "text-lad-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto#sucursales"
                className="flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-wide text-lad-black/60"
              >
                <IconMapPin className="h-3.5 w-3.5" />
                Sucursales
              </Link>
              <Link
                href="/acceder#consulta"
                className="mt-2 flex items-center justify-center gap-2.5 bg-lad-red py-4 text-sm font-bold uppercase tracking-[0.16em] text-white"
              >
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
