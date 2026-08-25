const PALETTE = ["#E30613", "#A63336", "#201E1E", "#5A5353"];

function hashName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return h;
}

function initialsOf(name: string) {
  const parts = name
    .replace(/^(Dr\.|Dra\.|Q\.F\.B\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

interface AvatarInitialsProps {
  name: string;
  className?: string;
}

/** Avatar determinista por nombre (sin fotos externas). */
export default function AvatarInitials({ name, className = "h-10 w-10" }: AvatarInitialsProps) {
  const color = PALETTE[hashName(name) % PALETTE.length];
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full text-xs font-bold text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {initialsOf(name)}
    </span>
  );
}
