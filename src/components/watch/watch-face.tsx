import { AnalogDial } from "@/components/watch/analog-dial";
import { MonthGlyph } from "@/components/glyphs/month-glyph";
import { earthToHepta } from "@/lib/hepta/engine";
import { formatHuman, formatTechnical, formatTime } from "@/lib/hepta/format";
import { dayById, monthById } from "@/lib/hepta/names";
import { useHeptaConfig } from "@/lib/hepta/store";
import { useNow } from "@/lib/hepta/use-now";
import { DAYS_PER_YEAR } from "@/lib/hepta/constants";

export function WatchFace() {
  const config = useHeptaConfig();
  const now = useNow(250);
  const instant = now == null ? null : earthToHepta(new Date(now), config);
  const month = instant ? monthById(instant.month) : null;
  const day = instant ? dayById(instant.dayOfWeek) : null;
  const progress = instant ? instant.dayOfYear / DAYS_PER_YEAR : 0;
  const modeLabel = config.mode === "real" ? "Heures vraies" : "Jour solaire";

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div className="mx-auto w-full max-w-md">
        <AnalogDial config={config} />
      </div>

      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted">{modeLabel}</p>

        <p className="mt-5 font-display text-6xl leading-none tracking-tight tabular sm:text-7xl">
          {instant ? formatTime(instant) : "––:––:––"}
        </p>

        <div className="mt-8 flex items-center gap-3">
          {instant && <MonthGlyph month={instant.month} className="size-8" />}
          <h1 className="font-display text-4xl uppercase tracking-[0.18em] sm:text-5xl">
            {month?.name ?? "—"}
          </h1>
        </div>

        <p className="mt-3 text-lg text-fg">
          {instant && day ? (
            <>
              {day.name} · {String(instant.dayOfMonth).padStart(2, "0")} {month?.name}
            </>
          ) : (
            "—"
          )}
        </p>
        <p className="mt-1 font-display text-2xl tracking-wide text-muted">
          {instant ? `An ${String(instant.year).padStart(2, "0")}` : "An —"}
        </p>

        <dl className="mt-8 grid w-full max-w-sm grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-muted">Semaine</dt>
            <dd className="tabular">{instant ? `${instant.week} / 7` : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Jour de semaine</dt>
            <dd className="tabular">{instant ? `${instant.dayOfWeek} / 7` : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Jour du mois</dt>
            <dd className="tabular">{instant ? `${instant.dayOfMonth} / 49` : "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Jour de l'année</dt>
            <dd className="tabular">{instant ? `${instant.dayOfYear} / 343` : "—"}</dd>
          </div>
        </dl>

        <div className="mt-6 h-px w-full max-w-sm bg-border" role="presentation">
          <div className="h-px bg-fg" style={{ width: `${Math.min(100, progress * 100)}%` }} />
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-faint">
          {instant ? formatHuman(instant) : "—"}
        </p>
        <p className="mt-1 text-xs tracking-[0.12em] text-faint tabular">
          {instant ? formatTechnical(instant) : "—"}
        </p>
      </div>
    </section>
  );
}
