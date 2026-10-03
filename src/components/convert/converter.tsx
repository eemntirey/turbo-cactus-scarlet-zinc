import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/field";
import {
  clampHeptaParts,
  earthToHepta,
  heptaToEarth,
  type HeptaParts,
} from "@/lib/hepta/engine";
import {
  formatGregorianFull,
  formatHuman,
  formatTechnical,
  formatTime,
  isoDate,
  isoTime,
} from "@/lib/hepta/format";
import { MONTHS, dayById } from "@/lib/hepta/names";
import { useHeptaConfig } from "@/lib/hepta/store";
import { useNow } from "@/lib/hepta/use-now";

function fromDate(d: Date): { date: string; time: string } {
  return { date: isoDate(d), time: isoTime(d) };
}

function parseDateTime(date: string, time: string): Date | null {
  if (!date) return null;
  const t = time.length === 5 ? `${time}:00` : time;
  const ms = new Date(`${date}T${t}`).getTime();
  if (Number.isNaN(ms)) return null;
  return new Date(ms);
}

export function Converter() {
  const config = useHeptaConfig();
  const now = useNow(1000);
  const live = now == null ? null : new Date(now);

  const [gDate, setGDate] = useState("");
  const [gTime, setGTime] = useState("12:10:00");
  const [hYear, setHYear] = useState(1);
  const [hMonth, setHMonth] = useState(1);
  const [hDay, setHDay] = useState(1);
  const [hHour, setHHour] = useState(12);
  const [hMinute, setHMinute] = useState(10);
  const [hSecond, setHSecond] = useState(0);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (!live || seeded) return;
    const h = earthToHepta(live, config);
    const g = fromDate(live);
    setGDate(g.date);
    setGTime(g.time);
    setHYear(h.year);
    setHMonth(h.month);
    setHDay(h.dayOfMonth);
    setHHour(h.hour);
    setHMinute(h.minute);
    setHSecond(h.second);
    setSeeded(true);
  }, [live, seeded, config]);

  const applyGregorian = (date: string, time: string) => {
    const d = parseDateTime(date, time);
    if (!d) return;
    const h = earthToHepta(d, config);
    setHYear(h.year);
    setHMonth(h.month);
    setHDay(h.dayOfMonth);
    setHHour(h.hour);
    setHMinute(h.minute);
    setHSecond(h.second);
  };

  const applyHepta = (parts: HeptaParts) => {
    const clamped = clampHeptaParts(parts);
    const d = heptaToEarth(clamped, config);
    const g = fromDate(d);
    setGDate(g.date);
    setGTime(g.time);
  };

  const heptaParts: HeptaParts = {
    year: hYear,
    month: hMonth,
    dayOfMonth: hDay,
    hour: hHour,
    minute: hMinute,
    second: hSecond,
  };
  const heptaDate = useMemo(
    () => earthToHepta(heptaToEarth(clampHeptaParts(heptaParts), config), config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hYear, hMonth, hDay, hHour, hMinute, hSecond, config.mode, config.epochMs, config.epochClockSeconds],
  );

  const gregorian = parseDateTime(gDate, gTime);

  return (
    <section>
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Pont des calendriers</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Convertir</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Dans les deux sens, à la seconde près. L'origine et le mode d'heure se règlent dans Origine.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!live) return;
            const g = fromDate(live);
            setGDate(g.date);
            setGTime(g.time);
            applyGregorian(g.date, g.time);
          }}
        >
          Cet instant
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setGDate("2005-10-03");
            setGTime("12:10:00");
            applyGregorian("2005-10-03", "12:10:00");
          }}
        >
          Origine proposée
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-2xl">Grégorien</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="g-date">Date</Label>
              <Input
                id="g-date"
                type="date"
                value={gDate}
                onChange={(e) => {
                  setGDate(e.target.value);
                  applyGregorian(e.target.value, gTime);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-time">Heure</Label>
              <Input
                id="g-time"
                type="time"
                step={1}
                value={gTime}
                onChange={(e) => {
                  setGTime(e.target.value);
                  applyGregorian(gDate, e.target.value);
                }}
              />
            </div>
          </div>
          <p className="mt-5 text-sm text-muted">
            {gregorian ? formatGregorianFull(gregorian) : "Date incomplète"}
          </p>
        </article>

        <article className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-display text-2xl">Hepta</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="h-year">Année</Label>
              <Input
                id="h-year"
                type="number"
                value={hYear}
                onChange={(e) => {
                  const year = Number(e.target.value);
                  setHYear(year);
                  applyHepta({ ...heptaParts, year });
                }}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="h-month">Mois</Label>
              <Select
                id="h-month"
                value={hMonth}
                onChange={(e) => {
                  const month = Number(e.target.value);
                  setHMonth(month);
                  applyHepta({ ...heptaParts, month });
                }}
              >
                {MONTHS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.id}. {m.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="h-day">Jour (1–49)</Label>
              <Input
                id="h-day"
                type="number"
                min={1}
                max={49}
                value={hDay}
                onChange={(e) => {
                  const dayOfMonth = Number(e.target.value);
                  setHDay(dayOfMonth);
                  applyHepta({ ...heptaParts, dayOfMonth });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="h-hour">Heure (0–24)</Label>
              <Input
                id="h-hour"
                type="number"
                min={0}
                max={24}
                value={hHour}
                onChange={(e) => {
                  const hour = Number(e.target.value);
                  setHHour(hour);
                  applyHepta({ ...heptaParts, hour });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="h-min">Min</Label>
                <Input
                  id="h-min"
                  type="number"
                  min={0}
                  max={59}
                  value={hMinute}
                  onChange={(e) => {
                    const minute = Number(e.target.value);
                    setHMinute(minute);
                    applyHepta({ ...heptaParts, minute });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="h-sec">Sec</Label>
                <Input
                  id="h-sec"
                  type="number"
                  min={0}
                  max={59}
                  value={hSecond}
                  onChange={(e) => {
                    const second = Number(e.target.value);
                    setHSecond(second);
                    applyHepta({ ...heptaParts, second });
                  }}
                />
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm">
            {dayById(heptaDate.dayOfWeek).name} · {formatHuman(heptaDate)}
          </p>
          <p className="mt-1 text-xs tabular text-muted">
            {formatTechnical(heptaDate)} · {formatTime(heptaDate)} · semaine {heptaDate.week}/7
          </p>
        </article>
      </div>
    </section>
  );
}
