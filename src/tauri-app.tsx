import { useState } from "react";
import { Codex } from "@/components/codex/codex";
import { MonthGrid } from "@/components/calendar/month-grid";
import { Converter } from "@/components/convert/converter";
import { OriginPanel } from "@/components/origin/origin-panel";
import { WatchFace } from "@/components/watch/watch-face";
import { HeptaMark } from "@/components/glyphs/month-glyph";
import { cn } from "@/lib/utils";

type Section = "watch" | "calendar" | "convert" | "codex" | "origin";

const NAV: Array<{ id: Section; label: string; short: string }> = [
  { id: "watch", label: "Montre", short: "Montre" },
  { id: "calendar", label: "Calendrier", short: "Cal." },
  { id: "convert", label: "Convertir", short: "Conv." },
  { id: "codex", label: "Codex", short: "Codex" },
  { id: "origin", label: "Origine", short: "Origine" },
];

function SectionView({ section }: { section: Section }) {
  switch (section) {
    case "watch":
      return <WatchFace />;
    case "calendar":
      return <MonthGrid />;
    case "convert":
      return <Converter />;
    case "codex":
      return <Codex />;
    case "origin":
      return <OriginPanel />;
  }
}

export function TauriApp() {
  const [section, setSection] = useState<Section>("watch");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            aria-label="Revenir à la montre"
            className="flex items-center gap-2 text-fg"
            onClick={() => setSection("watch")}
          >
            <HeptaMark className="size-7" />
            <span className="font-display text-xl tracking-[0.18em] uppercase">Hepta</span>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={section === item.id ? "page" : undefined}
                onClick={() => setSection(item.id)}
                className={cn(
                  "rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150",
                  section === item.id ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10 md:pb-16">
        <SectionView section={section} />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
        aria-label="Sections"
      >
        <ul className="grid grid-cols-5">
          {NAV.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-current={section === item.id ? "page" : undefined}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex h-14 w-full items-center justify-center px-0.5 text-[11px] uppercase tracking-[0.06em]",
                  section === item.id ? "text-fg" : "text-muted",
                )}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.short}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
