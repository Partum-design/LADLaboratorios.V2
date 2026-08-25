import { IconCreditCard } from "@/components/ui/LadIcons";
import Link from "next/link";

/** Franja roja de pago en línea (compartida entre inicio y estudios). */
export default function PagoStrip() {
  return (
    <section className="bg-lad-red">
      <div className="container-lad flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4 text-white">
          <IconCreditCard className="h-6 w-6" />
          <p className="font-display text-lg font-bold sm:text-xl">
            Paga en línea y obtén un descuento especial.
          </p>
        </div>
        <Link href="/pago-en-linea" className="btn-white shrink-0">
          Quiero pagar en línea
        </Link>
      </div>
    </section>
  );
}
