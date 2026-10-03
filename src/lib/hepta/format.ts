import type { HeptaInstant } from "./engine.ts";
import { dayById, monthById } from "./names.ts";

function pad(n: number, w = 2): string {
  const sign = n < 0 ? "−" : "";
  return sign + String(Math.abs(n)).padStart(w, "0");
}

export function formatTime(h: Pick<HeptaInstant, "hour" | "minute" | "second">): string {
  return `${pad(h.hour)}:${pad(h.minute)}:${pad(h.second)}`;
}

export function formatTimeShort(h: Pick<HeptaInstant, "hour" | "minute">): string {
  return `${pad(h.hour)}:${pad(h.minute)}`;
}

/** Aro 01 Avara, An 01 */
export function formatHuman(h: HeptaInstant): string {
  const day = dayById(h.dayOfWeek).name;
  const month = monthById(h.month).name;
  return `${day} ${pad(h.dayOfMonth)} ${month}, An ${pad(h.year)}`;
}

/** A01-J01-Y01 — month letter + month index, day, year */
export function formatTechnical(h: HeptaInstant): string {
  const code = monthById(h.month).code;
  return `${code}${pad(h.month)}-J${pad(h.dayOfMonth)}-Y${pad(h.year)}`;
}

export function formatYear(year: number): string {
  return `An ${pad(year)}`;
}

export function formatGregorian(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatGregorianShort(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatGregorianTime(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatGregorianFull(date: Date): string {
  return `${formatGregorian(date)} · ${formatGregorianTime(date)}`;
}

export function isoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isoTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
