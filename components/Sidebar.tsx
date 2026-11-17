"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Clock, Copy, Download, ExternalLink, FileText, Mail, MapPin, Moon, Sun } from "lucide-react";
import { profile } from "@/data/portfolio";
import { asset } from "@/lib/asset";

function Stamp() {
  const text = "FULL STACK · BACKEND · FRONTEND · MUMBAI · SINCE 2022 · ";
  return (
    <div className="relative h-[148px] w-[148px]">
      <svg viewBox="0 0 164 164" className="relative h-full w-full" role="img" aria-label="Ismail Shaikh monogram">
        <defs>
          <path id="stamp-circle" d="M82,82 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" />
        </defs>
        <circle cx="82" cy="82" r="80" fill="var(--grad-a)" />
        <g className="spin-slow">
          <text fill="#fff" fontSize="10.5" fontWeight="600" letterSpacing="2.2" opacity="0.92">
            <textPath href="#stamp-circle">{text}</textPath>
          </text>
        </g>
        <circle cx="82" cy="82" r="46" fill="var(--card-solid)" />
        <text
          x="82"
          y="96"
          textAnchor="middle"
          fontSize="40"
          fontWeight="800"
          fill="var(--grad-a)"
          style={{ fontFamily: "var(--font-display)" }}
        >
          IS
        </text>
      </svg>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  children,
  action,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-t border-line py-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
        <Icon size={16} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</div>
        <div className="break-words text-[14.5px]">{children}</div>
      </div>
      {action}
    </div>
  );
}

export function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: profile.timeZone }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const dark = mounted && resolvedTheme === "dark";

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  const pill =
    "inline-flex items-center gap-1.5 rounded-full border border-line bg-tile px-3.5 py-1.5 text-[13px] font-medium transition hover:-translate-y-0.5 hover:border-accent/50";

  return (
    <aside className="border-b border-line px-7 pb-8 pt-6 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between pb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Portfolio · 2026</span>
        <button
          type="button"
          onClick={() => setTheme(dark ? "light" : "dark")}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-tile transition hover:border-accent/50"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="mt-3">
        <Stamp />
      </div>

      <h1 className="mt-5 font-display text-[34px] font-extrabold leading-tight tracking-tight">{profile.name}</h1>
      <p className="text-grad mt-1 font-display text-[17px] font-bold">{profile.title}</p>
      <p className="mt-3 text-[14.5px] leading-6 text-muted">{profile.pitch}</p>

      <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-tile px-3 py-1.5 text-[13px] font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        {profile.availability}
      </span>

      <div className="mt-5">
        <Row
          icon={Mail}
          label="Email"
          action={
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-tile transition hover:border-accent/50"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          }
        >
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            {profile.email}
          </a>
        </Row>
        <Row icon={MapPin} label="Based in">
          {profile.location}, India
        </Row>
        <Row icon={Clock} label="Local time">
          {time ? `${time} IST` : "—"}
        </Row>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className={pill}>
          GitHub <ExternalLink size={12} aria-hidden />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
          LinkedIn <ExternalLink size={12} aria-hidden />
        </a>
      </div>

      <div className="mt-5 grid gap-2.5">
        <a
          href={asset(profile.resumeFile)}
          download="Ismail_Shaikh_Resume.pdf"
          className="grad-fill flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-semibold shadow-lg shadow-teal-700/25 transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <Download size={16} aria-hidden /> Download Resume
        </a>
        <a
          href={asset(profile.resumeFile)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-tile px-4 py-3 text-[15px] font-semibold transition hover:-translate-y-0.5 hover:border-accent/50"
        >
          <FileText size={16} aria-hidden /> View PDF
        </a>
      </div>
    </aside>
  );
}
