import { MonthGlyph } from "@/components/glyphs/month-glyph";
import {
  DAYS_PER_MONTH,
  DAYS_PER_WEEK,
  DAYS_PER_YEAR,
  HOURS_PER_DAY,
  HOURS_PER_MONTH,
  HOURS_PER_WEEK,
  HOURS_PER_YEAR,
  MONTHS_PER_YEAR,
  WEEKS_PER_MONTH,
} from "@/lib/hepta/constants";
import { DAYS, MONTHS } from "@/lib/hepta/names";

const RULES = [
  { label: "1 jour", value: `${HOURS_PER_DAY} heures` },
  { label: "1 semaine", value: `${DAYS_PER_WEEK} jours · ${HOURS_PER_WEEK} h` },
  { label: "1 mois", value: `${WEEKS_PER_MONTH} semaines · ${DAYS_PER_MONTH} jours · ${HOURS_PER_MONTH.toLocaleString("fr-FR")} h` },
  { label: "1 an", value: `${MONTHS_PER_YEAR} mois · ${DAYS_PER_YEAR} jours · ${HOURS_PER_YEAR.toLocaleString("fr-FR")} h` },
];

export function Codex() {
  return (
    <section>
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Règles du temps</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Codex</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Un calendrier parfaitement régulier. Pas d'année bissextile, pas de mois de 28 ou 31 jours.
        Sept partout, et une vingt-cinquième heure.
      </p>

      <dl className="mt-8 divide-y divide-border rounded-[var(--radius-xl)] border border-border bg-surface">
        {RULES.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="tabular text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 font-display text-3xl">Les sept mois</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {MONTHS.map((m) => (
          <li
            key={m.id}
            className="rounded-[var(--radius-lg)] border border-border bg-surface p-5"
          >
            <div className="flex items-center gap-3">
              <MonthGlyph month={m.id} className="size-7" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  {String(m.id).padStart(2, "0")} · {m.code}
                </p>
                <h3 className="font-display text-2xl">{m.name}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted">{m.epithet}</p>
            <p className="mt-1 text-sm">{m.note}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 font-display text-3xl">Les sept jours</h2>
      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-7">
        {DAYS.map((d) => (
          <li
            key={d.id}
            className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-4 text-center"
          >
            <p className="text-[11px] tabular text-muted">{d.id}</p>
            <p className="mt-1 font-display text-xl">{d.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-faint">{d.epithet}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-2xl">Écriture d'une date</h2>
          <p className="mt-3 text-sm text-muted">Humaine</p>
          <p className="font-display text-xl">Aro 01 Avara, An 01</p>
          <p className="mt-4 text-sm text-muted">Technique</p>
          <p className="tabular">A01-J01-Y01</p>
          <p className="mt-3 text-sm text-muted">
            Première lettre du mois, numéro du mois, jour du mois, année depuis l'origine.
          </p>
        </article>
        <article className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-2xl">Ce qui n'existe pas</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Année bissextile</li>
            <li>29 février</li>
            <li>Mois de longueurs variables</li>
            <li>Correction tous les quatre ans</li>
          </ul>
          <p className="mt-4 text-sm">
            Chaque année a exactement 343 jours. Le calendrier ne cherche pas à coller à l'année solaire —
            sauf si vous choisissez le mode jour solaire, qui ne redistribue que les heures.
          </p>
        </article>
      </div>
    </section>
  );
}
