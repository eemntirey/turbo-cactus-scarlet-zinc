import { useMemo, useState } from "react";
import { MonthGlyph } from "@/components/glyphs/month-glyph";
import { Button } from "@/components/ui/button";
import { DAYS_PER_MONTH, DAYS_PER_YEAR } from "@/lib/hepta/constants";
import { earthToHepta, heptaToEarth, type HeptaInstant } from "@/lib/hepta/engine";
import { formatGregorianFull, formatTechnical, formatTime } from "@/lib/hepta/format";
import { DAYS, MONTHS, dayById, monthById } from "@/lib/hepta/names";
import { useHeptaConfig } from "@/lib/hepta/store";
import { useNow } from "@/lib/hepta/use-now";
import { cn } from "@/lib/utils";

function shiftMonth(year: number, month: number, delta: number) {
  const idx = (year - 1) * 7 + (month - 1) + delta;
  const y = Math.floor(idx / 7) + 1;
  const m = ((idx % 7) + 7) % 7;
  return { year: y, month: m + 1 };
}

export function MonthGrid() {
  const config = useHeptaConfig();
  const now = useNow(1000);
  const today = now == null ? null : earthToHepta(new Date(now), config);

  const [cursor, setCursor] = useState<{ year: number; month: number } | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const viewYear = cursor?.year ?? today?.year ?? 1;
  const viewMonth = cursor?.month ?? today?.month ?? 1;
  const month = monthById(viewMonth);

  const cells = useMemo(() => {
    return Array.from({ length: DAYS_PER_MONTH }, (_, i) => {
      const dayOfMonth = i + 1;
      const sample = heptaToEarth(
        { year: viewYear, month: viewMonth, dayOfMonth, hour: 12, minute: 0, second: 0 },
        config,
      );
      const h = earthToHepta(sample, config);
      return { dayOfMonth, gregorian: sample, hepta: h };
    });
  }, [viewYear, viewMonth, config.mode, config.epochMs, config.epochClockSeconds]);

  const isCurrentMonth = today != null && today.year === viewYear && today.month === viewMonth;
  const activeDay = selectedDay ?? (isCurrentMonth ? today?.dayOfMonth : null);
  const selected = cells.find((c) => c.dayOfMonth === activeDay) ?? null;

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{`An ${String(viewYear).padStart(2, "0")}`}</p>
          <div className="mt-2 flex items-center gap-3">
            <MonthGlyph month={viewMonth} className="size-8" />
            <h1 className="font-display text-4xl uppercase tracking-widest sm:text-5xl">{month.name}</h1>
          </div>
          <p className="mt-2 text-sm text-muted">{month.epithet} · 7 semaines · 49 jours</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Mois précédent"
            onClick={() => setCursor(shiftMonth(viewYear, viewMonth, -1))}
          >
            Préc.
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Mois suivant"
            onClick={() => setCursor(shiftMonth(viewYear, viewMonth, 1))}
          >
            Suiv.
          </Button>
        </div>
      </div>

      {today && !isCurrentMonth && (
        <Button
          variant="quiet"
          size="sm"
          className="mt-3 px-0"
          onClick={() => {
            setCursor({ year: today.year, month: today.month });
            setSelectedDay(today.dayOfMonth);
          }}
        >
          Revenir à aujourd'hui
        </Button>
      )}

      {selected && (
        <aside className="mt-6 rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5">
          <p className="text-xs uppercase tracking-widest text-muted">Jour choisi</p>
          <p className="mt-1 font-display text-2xl sm:text-3xl">
            {dayById(selected.hepta.dayOfWeek).name} {String(selected.dayOfMonth).padStart(2, "0")}{" "}
            {month.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            Semaine {selected.hepta.week} / 7 · {formatTechnical(selected.hepta)}
          </p>
          <p className="mt-3 text-sm">
            {formatGregorianFull(selected.gregorian)}
            {isCurrentMonth && today && selected.dayOfMonth === today.dayOfMonth
              ? ` · ${formatTime(today as HeptaInstant)}`
              : " · 12:00 calendaire"}
          </p>
        </aside>
      )}

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-80">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <div key={d.id} className="py-1 text-center text-xs uppercase tracking-widest text-muted">
                {d.name}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell) => {
              const isToday =
                today != null &&
                today.year === viewYear &&
                today.month === viewMonth &&
                today.dayOfMonth === cell.dayOfMonth;
              const isSelected = selected?.dayOfMonth === cell.dayOfMonth;
              return (
                <button
                  key={cell.dayOfMonth}
                  type="button"
                  onClick={() => setSelectedDay(cell.dayOfMonth)}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-[var(--radius-sm)] text-sm tabular transition-[background-color,color,border-color] duration-150",
                    "border border-transparent hover:border-border-strong",
                    isToday && "bg-accent text-accent-fg",
                    !isToday && isSelected && "border-border-strong bg-raised",
                    !isToday && !isSelected && "text-fg",
                  )}
                  aria-current={isToday ? "date" : undefined}
                  aria-pressed={isSelected}
                >
                  {cell.dayOfMonth}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-7 gap-2">
        {MONTHS.map((m) => {
          const active = m.id === viewMonth;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setCursor({ year: viewYear, month: m.id })}
              className={cn(
                "flex min-h-11 flex-col items-center gap-1 rounded-[var(--radius-md)] py-3 text-xs uppercase tracking-widest transition-colors duration-150",
                active ? "bg-raised text-fg" : "text-muted hover:text-fg",
              )}
            >
              <MonthGlyph month={m.id} className="size-5" />
              <span className="hidden sm:inline">{m.name}</span>
              <span className="sm:hidden">{m.code}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-faint">
        {DAYS_PER_YEAR} jours par an, sans bissextile. Chaque mois est une grille 7 × 7.
      </p>
    </section>
  );
}
