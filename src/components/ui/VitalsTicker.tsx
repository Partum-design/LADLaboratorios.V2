export interface VitalItem {
  value: string;
  label: string;
  live?: boolean;
}

/** Franja tipo monitor de signos vitales: reemplaza los badges sueltos por un solo lector de datos. */
export default function VitalsTicker({ items, className = "" }: { items: VitalItem[]; className?: string }) {
  return (
    <div className={`border-t border-white/10 bg-black/35 backdrop-blur-md ${className}`}>
      <div className="container-lad grid grid-cols-2 gap-x-6 gap-y-4 py-5 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:gap-y-0">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            {item.live && (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lad-red opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lad-red" />
              </span>
            )}
            <span className="font-display text-base font-bold tabular-nums text-white sm:text-lg">{item.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
