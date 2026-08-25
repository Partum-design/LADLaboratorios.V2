"use client";

import AmbientGlow from "@/components/ui/AmbientGlow";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-lad-white">
      <AmbientGlow />
      <div className="container-lad relative z-10 py-32 text-center">
        <p className="font-display text-[26vw] font-semibold leading-none text-lad-black/[0.05] sm:text-[16rem]">
          404
        </p>
        <div className="-mt-10 sm:-mt-20">
          <h1 className="heading-lg text-lad-black">Pagina no encontrada</h1>
          <p className="body-lg mx-auto mt-4 max-w-md">
            La pagina que buscas no existe o fue movida.
          </p>
          <Link href="/" className="btn-primary mt-9 inline-flex">
            Regresar al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
