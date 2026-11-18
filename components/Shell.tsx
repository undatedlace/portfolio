"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, LayoutGrid, Send, User } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { AboutPanel } from "@/components/panels/AboutPanel";
import { ResumePanel } from "@/components/panels/ResumePanel";
import { PortfolioPanel } from "@/components/panels/PortfolioPanel";
import { ContactPanel } from "@/components/panels/ContactPanel";
import { profile, tabs, type TabId } from "@/data/portfolio";

const tabIcons = { about: User, resume: FileText, portfolio: LayoutGrid, contact: Send };
const panels: Record<TabId, () => React.ReactElement> = {
  about: () => <AboutPanel />,
  resume: () => <ResumePanel />,
  portfolio: () => <PortfolioPanel />,
  contact: () => <ContactPanel />,
};

const isTab = (v: string): v is TabId => tabs.some((t) => t.id === v);

export function Shell() {
  const [active, setActive] = useState<TabId>("about");
  const panelRef = useRef<HTMLElement>(null);

  // Deep-link support: /#resume etc.
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      if (isTab(h)) setActive(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const select = useCallback((id: TabId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    // Bring the new panel into view, not the very top of the page. On phones the profile sidebar
    // stacks above the panel, so jumping to the top made it look like nothing had changed.
    // On desktop the panel is already in view, so the page doesn't move.
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.55) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    select(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  }

  return (
    <div className="mx-auto max-w-[1160px] px-3 pb-10 pt-5 sm:px-5 sm:pt-7">
      {/* Floating pill tabs */}
      <div className="sticky top-3 z-30 mb-5 flex justify-center">
        <div
          role="tablist"
          aria-label="Sections"
          className="glass flex max-w-full gap-1 overflow-x-auto rounded-full p-1.5"
        >
          {tabs.map((t, i) => {
            const Icon = tabIcons[t.id];
            const on = active === t.id;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[14.5px] font-semibold transition-colors sm:px-5 ${
                  on ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="grad-fill absolute inset-0 rounded-full shadow-lg shadow-teal-700/25"
                  />
                )}
                <Icon size={15} aria-hidden className="relative" />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The glass card */}
      <div className="glass grid overflow-hidden rounded-[28px] lg:grid-cols-[360px_1fr]">
        <Sidebar />
        <main ref={panelRef} className="min-w-0 scroll-mt-24 px-6 py-8 sm:px-10 sm:py-10">
          <motion.div
            key={active}
            id={`panel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {panels[active]()}
          </motion.div>
        </main>
      </div>

      <footer className="mt-7 flex flex-wrap justify-between gap-2 px-2 text-[13px] text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name} · Mumbai
        </span>
        <span>Built with Next.js</span>
      </footer>
    </div>
  );
}
