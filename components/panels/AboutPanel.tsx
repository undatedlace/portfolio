"use client";

import { useEffect, useState } from "react";
import { Monitor, Server, ShieldCheck, Sparkles } from "lucide-react";
import { Eyebrow, H3 } from "@/components/ui";
import { focus, headline, profile, stats } from "@/data/portfolio";

const icons = { server: Server, monitor: Monitor, shield: ShieldCheck, sparkles: Sparkles };
const spans = ["sm:col-span-4", "sm:col-span-2", "sm:col-span-3", "sm:col-span-3"];

/** Counts up to a value like "4+" or "173" once mounted. */
function CountUp({ value }: { value: string }) {
  const n = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  // Starts at the real value (so it's correct without JS / on failure), then replays a count-up.
  const [v, setV] = useState(n);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = 24;
    let i = 0;
    setV(0);
    const id = setInterval(() => {
      i += 1;
      const p = Math.min(i / steps, 1);
      setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [n]);

  return (
    <>
      {v}
      {suffix}
    </>
  );
}

export function AboutPanel() {
  const words = headline.split(" ");
  const lead = words.slice(0, -4).join(" ");
  const hl = words.slice(-4).join(" ");

  return (
    <div>
      <Eyebrow num="01" label="About" />
      <h2 className="mt-4 max-w-2xl font-display text-[34px] font-extrabold leading-[1.05] tracking-tight sm:text-[46px]">
        {lead} <span className="text-grad">{hl}</span>
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_230px]">
        <div className="space-y-4 text-[16.5px] leading-8">
          <p>{profile.summary}</p>
          <p className="text-[15.5px] leading-7 text-muted">
            I started on the frontend, building responsive UI and a shared component library for trading platforms in Angular and React at 63 Moons. At Finoscale I moved deeper into the backend, owning NestJS services, async workers and API security. I enjoy working across both sides of a product.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-2 self-start md:grid-cols-1">
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} className="rounded-2xl border border-line bg-tile px-4 py-3">
              <dd className="text-grad font-display text-3xl font-extrabold">
                <CountUp value={s.value} />
              </dd>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <H3>What I do</H3>
      <div className="grid gap-3.5 sm:grid-cols-6">
        {focus.map((f, i) => {
          const Icon = icons[f.icon as keyof typeof icons];
          const hero = i === 0;
          return (
            <div
              key={f.title}
              className={`group relative overflow-hidden rounded-3xl border p-5 transition duration-300 hover:-translate-y-0.5 ${spans[i]} ${
                hero ? "grad-fill border-transparent shadow-xl shadow-teal-700/20" : "border-line bg-tile hover:border-accent/40"
              }`}
            >
              <span
                className={`relative grid h-11 w-11 place-items-center rounded-2xl ${
                  hero ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                }`}
              >
                <Icon size={20} aria-hidden />
              </span>
              <h4 className="relative mt-4 font-display text-[17px] font-bold">{f.title}</h4>
              <p className={`relative mt-1.5 text-[14px] leading-6 ${hero ? "text-white/85" : "text-muted"}`}>{f.text}</p>
              <p className={`relative mt-3 text-[12px] font-semibold ${hero ? "text-white" : "text-accent"}`}>{f.tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
