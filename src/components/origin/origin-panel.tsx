import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { DEFAULT_EPOCH_DATE, DEFAULT_EPOCH_TIME } from "@/lib/hepta/constants";
import { earthToHepta } from "@/lib/hepta/engine";
import { formatGregorianFull, formatHuman, formatTechnical, formatTime } from "@/lib/hepta/format";
import { useHeptaConfig, useHeptaStore } from "@/lib/hepta/store";
import { useNow } from "@/lib/hepta/use-now";
import { cn } from "@/lib/utils";

export function OriginPanel() {
  const mode = useHeptaStore((s) => s.mode);
  const epochDate = useHeptaStore((s) => s.epochDate);
  const epochTime = useHeptaStore((s) => s.epochTime);
  const setMode = useHeptaStore((s) => s.setMode);
  const setEpoch = useHeptaStore((s) => s.setEpoch);
  const resetEpoch = useHeptaStore((s) => s.resetEpoch);
  const anchorNow = useHeptaStore((s) => s.anchorNow);
  const config = useHeptaConfig();
  const now = useNow(1000);
  const instant = now == null ? null : earthToHepta(new Date(now), config);
  const epochAsDate = new Date(config.epochMs);

  return (
    <section>
      <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Point zéro</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Origine</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Toute date Hepta se compte depuis un instant unique. Au moment choisi, le calendrier lit
        Aro 01 Avara, An 01, à l'heure indiquée.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <ModeCard
          active={mode === "real"}
          title="Heures vraies"
          kicker="Option A"
          body="Une heure dure soixante minutes réelles. Un jour Hepta fait 25 heures, donc 90 000 secondes. Le jour calendaire est plus long qu'un jour terrestre, et dérive par rapport au soleil."
          onClick={() => setMode("real")}
        />
        <ModeCard
          active={mode === "sync"}
          title="Jour solaire"
          kicker="Option B"
          body="On garde le jour physique de 24 heures, redistribué en 25 heures Hepta. Chaque heure calendaire dure 57 min 36 s. Un jour Hepta reste calé sur un jour terrestre."
          onClick={() => setMode("sync")}
        />
      </div>

      <article className="mt-8 rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-2xl">Instant d'origine</h2>
        <p className="mt-2 text-sm text-muted">
          Proposition : 3 octobre 2005, 12 h 10 — Aro, Avara, An 1, 12:10:00.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="epoch-date">Date grégorienne</Label>
            <Input
              id="epoch-date"
              type="date"
              value={epochDate}
              onChange={(e) => setEpoch(e.target.value, epochTime)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="epoch-time">Heure</Label>
            <Input
              id="epoch-time"
              type="time"
              step={1}
              value={epochTime}
              onChange={(e) => setEpoch(epochDate, e.target.value)}
            />
          </div>
        </div>
        <p className="mt-4 text-sm">{formatGregorianFull(epochAsDate)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={resetEpoch}>
            Revenir au 3 oct. 2005, 12:10
          </Button>
          <Button variant="ghost" size="sm" onClick={anchorNow}>
            Ancrer à cet instant
          </Button>
        </div>
        <p className="mt-3 text-[11px] text-faint">
          Origine enregistrée sur cet appareil ({DEFAULT_EPOCH_DATE} {DEFAULT_EPOCH_TIME} par
          défaut).
        </p>
      </article>

      <article className="mt-6 rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-2xl">Lecture actuelle</h2>
        {instant ? (
          <>
            <p className="mt-3 font-display text-3xl">{formatTime(instant)}</p>
            <p className="mt-1">{formatHuman(instant)}</p>
            <p className="mt-1 text-sm tabular text-muted">{formatTechnical(instant)}</p>
            <p className="mt-4 text-sm text-muted">
              Mode {mode === "real" ? "heures vraies" : "jour solaire"}. L'année 1 commence à
              l'origine, pas au 1er janvier.
            </p>
          </>
        ) : (
          <p className="mt-3 text-muted">Synchronisation…</p>
        )}
      </article>
    </section>
  );
}

function ModeCard({
  active,
  title,
  kicker,
  body,
  onClick,
}: {
  active: boolean;
  title: string;
  kicker: string;
  body: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-[var(--radius-xl)] border p-5 text-left transition-[border-color,background-color] duration-150 sm:p-6",
        active ? "border-border-strong bg-raised" : "border-border bg-surface hover:border-border-strong",
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{kicker}</p>
      <h2 className="mt-1 font-display text-2xl">{title}</h2>
      <p className="mt-3 text-sm text-muted">{body}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.16em]">{active ? "Actif" : "Choisir"}</p>
    </button>
  );
}
