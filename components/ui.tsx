import type { ReactNode } from "react";

export function Eyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-tile px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full grad-fill" />
      <span className="text-accent">{num}</span> {label}
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-[42px]">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 mt-10 font-display text-lg font-bold">{children}</h3>;
}

export function Chip({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-1 text-[12.5px] leading-4 ${
        strong ? "border-accent/40 bg-accent/10" : "border-line bg-tile"
      }`}
    >
      {children}
    </span>
  );
}

export function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-line bg-tile p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 ${className}`}
    >
      {children}
    </div>
  );
}
