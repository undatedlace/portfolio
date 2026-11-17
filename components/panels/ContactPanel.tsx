"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { Eyebrow, H2 } from "@/components/ui";
import { profile } from "@/data/portfolio";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const INTERESTS = ["Full-time role", "Contract work", "Backend project", "Just saying hi"];

function validate(f: FormData): Errors {
  const e: Errors = {};
  if (String(f.get("name") || "").trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(f.get("email") || ""))) e.email = "Enter a valid email address.";
  if (String(f.get("message") || "").trim().length < 20) e.message = "Please write at least 20 characters.";
  return e;
}

export function ContactPanel() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [interests, setInterests] = useState<string[]>([INTERESTS[0]]);

  const toggle = (v: string) => setInterests((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]));

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      data.append("access_key", WEB3FORMS_KEY);
      data.append("subject", `Portfolio: ${interests.join(", ") || "New message"}`);
      data.append("from_name", "Portfolio contact form");
      data.append("interested_in", interests.join(", "));
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-2xl border border-line bg-tile px-4 py-3 text-[14.5px] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15";
  const err = (id: string, msg?: string) =>
    msg ? (
      <p id={id} className="mt-1 text-[12.5px] font-medium text-accent">
        {msg}
      </p>
    ) : null;

  return (
    <div>
      <Eyebrow num="04" label="Contact" />
      <H2>Tell me about the role.</H2>

      <div className="mt-7 grid gap-8 xl:grid-cols-[250px_1fr]">
        <div>
          <p className="text-[14.5px] leading-6 text-muted">
            I&apos;m open to senior backend and full-stack roles. Send a few lines about the team and the problem, and I&apos;ll reply soon.
          </p>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-accent" aria-hidden />
              <a href={`mailto:${profile.email}`} className="break-all text-accent hover:underline">{profile.email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={14} className="text-accent" aria-hidden /> {profile.location}, India
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={14} className="text-accent" aria-hidden /> Replies within 1–2 days
            </li>
          </ul>
          <div className="mt-6 rounded-3xl border border-line bg-tile p-4">
            <h3 className="font-display text-[14px] font-bold">Helpful to include</h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-5 text-muted">
              <li>— The team, product and stack</li>
              <li>— Role level and location / remote</li>
              <li>— Timeline and how to reach you</li>
            </ul>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-[12.5px] font-semibold">Your name</label>
              <input id="name" name="name" autoComplete="name" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
              {err("err-name", errors.name)}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-[12.5px] font-semibold">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
              {err("err-email", errors.email)}
            </div>
          </div>

          <fieldset>
            <legend className="mb-1.5 text-[12.5px] font-semibold">What is this about?</legend>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((v) => {
                const on = interests.includes(v);
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(v)}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                      on ? "border-accent/60 bg-accent/15 text-ink" : "border-line bg-tile hover:border-accent/50"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="message" className="mb-1 block text-[12.5px] font-semibold">Details</label>
            <textarea id="message" name="message" rows={6} className={input} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
            {err("err-message", errors.message)}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 grad-fill rounded-2xl px-5 py-3 text-[14.5px] font-semibold shadow-lg shadow-teal-700/25 transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
            >
              <Send size={15} aria-hidden /> {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="text-[13.5px]">
              {status === "success" && "Thanks! Your message was sent."}
              {status === "error" && (
                <>
                  Couldn&apos;t send right now. Please email{" "}
                  <a className="font-semibold underline" href={`mailto:${profile.email}`}>{profile.email}</a> directly.
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
