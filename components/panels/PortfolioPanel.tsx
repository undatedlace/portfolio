"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { Chip, Eyebrow, H2 } from "@/components/ui";
import { projects, type Project } from "@/data/portfolio";

const FILTERS = ["All", "Full-stack", "Backend", "Frontend", "AI"] as const;
type Filter = (typeof FILTERS)[number];

// Thumbnail tints (no screenshots for private work, so each project gets a monogram tile)
const TINTS = ["#0f766e", "#334155", "#b45309", "#1d4ed8", "#be123c"];

const initials = (name: string) =>
  name
    .split(/[\s—-]+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

function Thumb({ p, i, large = false }: { p: Project; i: number; large?: boolean }) {
  const c = TINTS[i % TINTS.length];
  return (
    <div
      aria-hidden
      className={`relative grid place-items-center overflow-hidden rounded-2xl ${large ? "h-40" : "aspect-[16/7] sm:aspect-[16/10]"}`}
      style={{ background: c }}
    >
      <span className="font-display text-5xl font-extrabold tracking-tight text-white/90">{p.mark ?? initials(p.name)}</span>
      <span className="absolute bottom-2 left-3 right-3 truncate text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/75">
        {p.stack.slice(0, 3).join(" · ")}
      </span>
    </div>
  );
}

export function PortfolioPanel() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const has = (p: Project, f: Filter) => f === "All" || (p.tags as string[]).includes(f);
  const shown = projects.map((p, i) => ({ p, i })).filter(({ p }) => has(p, filter));
  const open = openIdx !== null ? projects[openIdx] : null;

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  return (
    <div>
      <Eyebrow num="03" label="Portfolio" />
      <H2>Selected work, filed by type.</H2>
      <p className="mt-3 max-w-xl text-[14.5px] leading-6 text-muted">
        Employer code is private, so those cards are write-ups of what I built and the stack behind it. Personal projects link to GitHub.
      </p>

      <div role="group" aria-label="Filter projects" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = projects.filter((p) => has(p, f)).length;
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                on ? "border-transparent bg-ink text-solid" : "border-line bg-tile hover:border-accent/50"
              }`}
            >
              {f}{" "}
              <span className={`ml-1 rounded-full px-1.5 text-[11px] ${on ? "grad-fill" : "bg-line text-muted"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map(({ p, i }) => (
          <li key={p.name}>
            <button type="button" onClick={() => setOpenIdx(i)} className="group block w-full text-left">
              <div className="transition-transform group-hover:-translate-y-0.5">
                <Thumb p={p} i={i} />
              </div>
              <h3 className="mt-3 font-display text-[16px] font-bold leading-snug">{p.name}</h3>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-accent">{p.tags.join(" · ")}</p>
              <p className="mt-1.5 line-clamp-3 text-[13.5px] leading-5 text-muted">{p.blurb}</p>
            </button>
          </li>
        ))}
      </ul>

      {open && openIdx !== null && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpenIdx(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-line bg-solid p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">{open.tags.join(" · ")}</p>
              <button
                type="button"
                onClick={() => setOpenIdx(null)}
                aria-label="Close"
                autoFocus
                className="grid h-8 w-8 place-items-center rounded-full border border-line hover:border-accent"
              >
                <X size={15} />
              </button>
            </div>
            <div className="mt-3">
              <Thumb p={open} i={openIdx} large />
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight">{open.name}</h3>
            <p className="mt-2 text-[15px] leading-6 text-muted">{open.blurb}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14.5px] leading-6 marker:text-accent">
              {open.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {open.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            {open.link && (
              <a
                href={open.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent"
              >
                {open.link.label} <ExternalLink size={13} aria-hidden />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
