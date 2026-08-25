"use client";

import { IconChip } from "@/components/ui/IconBadge";
import {
  IconClipboard,
  IconClock,
  IconCreditCard,
  IconFilter,
  IconSearch,
  IconTag,
  IconWhatsApp,
} from "@/components/ui/LadIcons";
import { ICON_COLORS, iconColorAt } from "@/lib/icon-palette";
import { buildWhatsAppLink } from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categoriasOrden, estudios } from "@/app/estudios/estudios-data";

const categorias = ["Todos", ...categoriasOrden];

const INDICACION_LABEL: Record<string, string> = {
  AYUNO: "Ayuno",
  NINGUNA: "Sin preparación",
  ESPECIALES: "Indicaciones especiales",
  "NO CALCIO": "Sin calcio previo",
  "VEJIGA LLENA": "Vejiga llena",
};

const PAGE_SIZE = 30;

function whatsappLinkFor(nombre: string, precio: string) {
  return buildWhatsAppLink(
    `Hola, quiero preguntar sobre el estudio "${nombre}" (${precio}). ¿Me pueden dar más información?`
  );
}

function pagoLinkFor(nombre: string, precio: string) {
  const monto = precio.replace(/[^0-9.]/g, "");
  return `/pago-en-linea?estudio=${encodeURIComponent(nombre)}&precio=${encodeURIComponent(monto)}`;
}

export default function CatalogoClient() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const initialCat = catParam && categoriasOrden.includes(catParam) ? catParam : "Todos";

  const [activeCat, setActiveCat] = useState(initialCat);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Deep-link ?cat= (p. ej. desde "Paquetes preventivos" o el chatbot).
  useEffect(() => {
    if (catParam && categoriasOrden.includes(catParam)) {
      setActiveCat(catParam);
      setVisible(PAGE_SIZE);
    }
  }, [catParam]);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return estudios.filter((e) => {
      const matchesCat = activeCat === "Todos" || e.cat === activeCat;
      const matchesQuery = q === "" || e.nombre.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCat, query]);

  const mostrados = filtrados.slice(0, visible);

  return (
    <section id="catalogo" className="section-padding scroll-mt-24 bg-lad-gray-light">
      <div className="container-lad">
        <div className="mb-8 flex items-center gap-3">
          <IconChip color={iconColorAt(5)} size="h-5 w-5">
            <IconFilter />
          </IconChip>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-lad-black/50">
            Filtrar por categoría
          </span>
        </div>
        <div className="mb-6 flex flex-wrap gap-3">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCat(cat);
                setVisible(PAGE_SIZE);
              }}
              className={`rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                activeCat === cat
                  ? "bg-lad-red text-white shadow-red"
                  : "bg-white text-lad-black shadow-glass-sm hover:-translate-y-0.5"
              } duration-300 ease-lad`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative mb-10 max-w-md">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <IconChip color={ICON_COLORS.sky} size="h-4 w-4">
              <IconSearch />
            </IconChip>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Buscar estudio por nombre..."
            className="w-full rounded-full border border-transparent bg-white py-3.5 pl-12 pr-4 text-sm shadow-glass-sm transition focus:border-lad-red focus:outline-none"
          />
        </div>

        <p className="mb-6 text-sm text-lad-gray-mid">
          {filtrados.length} estudio{filtrados.length === 1 ? "" : "s"} encontrado
          {filtrados.length === 1 ? "" : "s"}
        </p>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {mostrados.map((estudio) => (
              <motion.article
                key={estudio.nombre}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="group flex flex-col rounded-2xl border-l-4 border-transparent bg-white p-7 shadow-glass-sm transition-all duration-500 ease-lad hover:-translate-y-1 hover:border-lad-red hover:shadow-glass"
              >
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-lad-red">{estudio.cat}</p>
                <h3 className="mb-3 font-display text-xl font-bold leading-snug text-lad-black">{estudio.nombre}</h3>
                <p className="mb-5 text-sm leading-relaxed text-lad-gray-mid">{estudio.desc}</p>
                <div className="mt-auto grid grid-cols-3 gap-3 border-t border-lad-black/5 pt-4 text-xs text-lad-gray-mid">
                  <span className="flex items-center gap-1">
                    <IconChip color={ICON_COLORS.sky} size="h-4 w-4">
                      <IconClock />
                    </IconChip>{" "}
                    {estudio.tipo}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconChip color={ICON_COLORS.amber} size="h-4 w-4">
                      <IconClipboard />
                    </IconChip>{" "}
                    {INDICACION_LABEL[estudio.indicacion] ?? estudio.indicacion}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-lad-red">
                    <IconChip color={ICON_COLORS.red} size="h-4 w-4">
                      <IconTag />
                    </IconChip>{" "}
                    {estudio.precio}
                  </span>
                </div>
                <Link
                  href={pagoLinkFor(estudio.nombre, estudio.precio)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-lad-red py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-lad-red-dark"
                >
                  <IconCreditCard className="h-4 w-4" />
                  Pagar este estudio
                </Link>
                <a
                  href={whatsappLinkFor(estudio.nombre, estudio.precio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#25D366] py-3 text-xs font-bold uppercase tracking-wider text-[#128C4A] transition hover:bg-[#25D366] hover:text-white"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Preguntar por WhatsApp
                </a>
                <Link
                  href={`/contacto?estudio=${encodeURIComponent(estudio.nombre)}#agenda`}
                  className="mt-2 text-center text-[11px] font-semibold text-lad-gray-mid underline-offset-2 hover:text-lad-red hover:underline"
                >
                  o pregunta con el formulario de contacto
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible < filtrados.length && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline">
              Ver más estudios
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
