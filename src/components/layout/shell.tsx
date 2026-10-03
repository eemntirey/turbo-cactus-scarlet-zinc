import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { HeptaMark } from "@/components/glyphs/month-glyph";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Montre" },
  { to: "/calendrier", label: "Calendrier" },
  { to: "/convertir", label: "Convertir" },
  { to: "/codex", label: "Codex" },
  { to: "/origine", label: "Origine" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-fg no-underline">
            <HeptaMark className="size-7" />
            <span className="font-display text-xl tracking-[0.18em] uppercase">Hepta</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-muted no-underline transition-colors duration-150 hover:text-fg"
                activeProps={{ className: "text-fg" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10 md:pb-16">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden pb-[env(safe-area-inset-bottom)]"
        aria-label="Sections"
      >
        <ul className="grid grid-cols-5">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex h-14 items-center justify-center text-xs uppercase tracking-widest text-muted no-underline",
                )}
                activeProps={{ className: "text-fg" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
