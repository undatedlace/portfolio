import { Briefcase, GraduationCap } from "lucide-react";
import { Chip, Eyebrow, H2 } from "@/components/ui";
import { education, experience, skills } from "@/data/portfolio";

function ColHead({ icon: Icon, children }: { icon: typeof Briefcase; children: React.ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 font-display text-[17px] font-bold">
      <Icon size={16} className="text-accent" aria-hidden />
      {children}
    </h3>
  );
}

export function ResumePanel() {
  return (
    <div>
      <Eyebrow num="02" label="Resume" />
      <H2>Four years of shipping backend and UI work.</H2>

      <div className="mt-8 grid gap-10 xl:grid-cols-[1.35fr_1fr]">
        {/* Experience timeline */}
        <section aria-label="Experience">
          <ColHead icon={Briefcase}>Experience</ColHead>
          <ol className="relative space-y-8 border-l border-line pl-6">
            {experience.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-accent ${i === 0 ? "bg-accent" : "bg-solid"}`}
                />
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">{job.period}</p>
                <h4 className="mt-1 font-display text-[18px] font-bold leading-snug">{job.role}</h4>
                <p className="text-[14px] text-muted">
                  {job.company} · {job.location}
                </p>

                <div className="mt-4 space-y-4">
                  {job.projects.map((p) => (
                    <div key={p.name}>
                      <h5 className="text-[14.5px] font-semibold">{p.name}</h5>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>
                      <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[14px] leading-6 text-muted marker:text-accent">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Education + skills */}
        <div className="space-y-10">
          <section aria-label="Education">
            <ColHead icon={GraduationCap}>Education</ColHead>
            <ol className="relative space-y-6 border-l border-line pl-6">
              {education.map((e) => (
                <li key={e.degree} className="relative">
                  <span aria-hidden className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-solid" />
                  {e.period && <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">{e.period}</p>}
                  <h4 className="mt-1 font-display text-[16px] font-bold leading-snug">{e.degree}</h4>
                  <p className="text-[13.5px] leading-5 text-muted">{e.school}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Skills">
            <h3 className="mb-4 font-display text-[17px] font-bold">Skills</h3>
            <div className="space-y-5">
              {skills.map((g) => (
                <div key={g.group}>
                  <h4 className="mb-2 flex items-center justify-between border-b border-line pb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {g.group}
                    {g.featured && <span className="text-accent">Core</span>}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <Chip key={s} strong={g.featured}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
