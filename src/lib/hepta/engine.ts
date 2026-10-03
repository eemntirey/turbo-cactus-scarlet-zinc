import {
  DAYS_PER_MONTH,
  DAYS_PER_WEEK,
  DAYS_PER_YEAR,
  DEFAULT_EPOCH_DATE,
  DEFAULT_EPOCH_TIME,
  type HourMode,
  SECONDS_PER_CALENDAR_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
  SYNC_SCALE,
} from "./constants.ts";
import { dayById, monthById } from "./names.ts";

export type HeptaInstant = {
  /** 1-indexed. May be 0 or negative before the epoch. */
  year: number;
  /** 1–7 */
  month: number;
  /** 1–7, week inside the month */
  week: number;
  /** 1–49 */
  dayOfMonth: number;
  /** 1–7 (Aro…Zéna) */
  dayOfWeek: number;
  /** 1–343 */
  dayOfYear: number;
  /** Absolute day index, 0 = Aro 1 Avara An 1 */
  dayIndex: number;
  /** 0–24 */
  hour: number;
  /** 0–59 */
  minute: number;
  /** 0–59 */
  second: number;
  /** 0–1 fractional second, for sweeping hands */
  subsecond: number;
};

export type HeptaConfig = {
  epochMs: number;
  mode: HourMode;
  /** Calendar seconds into day 1 at the epoch (usually the epoch clock). */
  epochClockSeconds: number;
};

export type HeptaParts = {
  year: number;
  month: number;
  dayOfMonth: number;
  hour: number;
  minute: number;
  second?: number;
  subsecond?: number;
};

/** Floor division that keeps the remainder in [0, divisor). */
export function divmod(n: number, d: number): { q: number; r: number } {
  const q = Math.floor(n / d);
  const r = n - q * d;
  return { q, r };
}

export function parseLocalDateTime(date: string, time: string): number {
  const dateParts = date.split("-").map(Number);
  const timeParts = time.split(":").map(Number);
  const y = dateParts[0] ?? 2005;
  const m = dateParts[1] ?? 10;
  const d = dateParts[2] ?? 3;
  const hh = timeParts[0] ?? 0;
  const mm = timeParts[1] ?? 0;
  const ss = timeParts[2] ?? 0;
  return new Date(y, m - 1, d, hh, mm, ss).getTime();
}

export function parseClockSeconds(time: string): number {
  const parts = time.split(":").map(Number);
  const hh = parts[0] ?? 0;
  const mm = parts[1] ?? 0;
  const ss = parts[2] ?? 0;
  return hh * SECONDS_PER_HOUR + mm * SECONDS_PER_MINUTE + ss;
}

export function defaultConfig(): HeptaConfig {
  return {
    epochMs: parseLocalDateTime(DEFAULT_EPOCH_DATE, DEFAULT_EPOCH_TIME),
    mode: "real",
    epochClockSeconds: parseClockSeconds(DEFAULT_EPOCH_TIME),
  };
}

export function calendarScale(mode: HourMode): number {
  return mode === "sync" ? SYNC_SCALE : 1;
}

export function earthToCalendarSeconds(date: Date, config: HeptaConfig): number {
  const elapsedEarth = (date.getTime() - config.epochMs) / 1000;
  return config.epochClockSeconds + elapsedEarth * calendarScale(config.mode);
}

export function calendarSecondsToHepta(totalSec: number): HeptaInstant {
  const { q: dayIndex, r: secInDay } = divmod(totalSec, SECONDS_PER_CALENDAR_DAY);
  const { q: yearIndex, r: dayInYear0 } = divmod(dayIndex, DAYS_PER_YEAR);
  const { q: monthIndex, r: dayInMonth0 } = divmod(dayInYear0, DAYS_PER_MONTH);
  const { q: weekIndex, r: dayOfWeek0 } = divmod(dayInMonth0, DAYS_PER_WEEK);

  const { q: hour, r: secInHour } = divmod(secInDay, SECONDS_PER_HOUR);
  const { q: minute, r: secFloat } = divmod(secInHour, SECONDS_PER_MINUTE);
  const second = Math.floor(secFloat);
  const subsecond = secFloat - second;

  return {
    year: yearIndex + 1,
    month: monthIndex + 1,
    week: weekIndex + 1,
    dayOfMonth: dayInMonth0 + 1,
    dayOfWeek: dayOfWeek0 + 1,
    dayOfYear: dayInYear0 + 1,
    dayIndex,
    hour,
    minute,
    second,
    subsecond,
  };
}

export function heptaToCalendarSeconds(parts: HeptaParts): number {
  const yearIndex = parts.year - 1;
  const dayIndex =
    yearIndex * DAYS_PER_YEAR + (parts.month - 1) * DAYS_PER_MONTH + (parts.dayOfMonth - 1);
  const secInDay =
    parts.hour * SECONDS_PER_HOUR +
    parts.minute * SECONDS_PER_MINUTE +
    (parts.second ?? 0) +
    (parts.subsecond ?? 0);
  return dayIndex * SECONDS_PER_CALENDAR_DAY + secInDay;
}

export function earthToHepta(date: Date, config: HeptaConfig): HeptaInstant {
  return calendarSecondsToHepta(earthToCalendarSeconds(date, config));
}

export function heptaToEarth(parts: HeptaParts, config: HeptaConfig): Date {
  const calendarSec = heptaToCalendarSeconds(parts);
  const elapsedEarth = (calendarSec - config.epochClockSeconds) / calendarScale(config.mode);
  return new Date(config.epochMs + elapsedEarth * 1000);
}

export function withNames(h: HeptaInstant) {
  return {
    ...h,
    monthName: monthById(h.month).name,
    monthCode: monthById(h.month).code,
    dayName: dayById(h.dayOfWeek).name,
  };
}

function safeInteger(value: number, fallback: number): number {
  return Number.isFinite(value) ? Math.round(value) : fallback;
}

export function isValidHeptaParts(parts: HeptaParts): boolean {
  return (
    Number.isFinite(parts.year) &&
    Number.isInteger(parts.year) &&
    parts.month >= 1 &&
    parts.month <= 7 &&
    Number.isInteger(parts.month) &&
    parts.dayOfMonth >= 1 &&
    parts.dayOfMonth <= 49 &&
    Number.isInteger(parts.dayOfMonth) &&
    parts.hour >= 0 &&
    parts.hour <= 24 &&
    Number.isInteger(parts.hour) &&
    parts.minute >= 0 &&
    parts.minute <= 59 &&
    Number.isInteger(parts.minute) &&
    parts.second !== undefined &&
    parts.second >= 0 &&
    parts.second <= 59 &&
    Number.isInteger(parts.second) &&
    (parts.subsecond === undefined || (parts.subsecond >= 0 && parts.subsecond < 1))
  );
}

export function clampHeptaParts(parts: HeptaParts): HeptaParts {
  const month = Math.min(7, Math.max(1, safeInteger(parts.month, 1)));
  const dayOfMonth = Math.min(49, Math.max(1, safeInteger(parts.dayOfMonth, 1)));
  const hour = Math.min(24, Math.max(0, safeInteger(parts.hour, 0)));
  const minute = Math.min(59, Math.max(0, safeInteger(parts.minute, 0)));
  const second = Math.min(59, Math.max(0, safeInteger(parts.second ?? 0, 0)));
  return { ...parts, month, dayOfMonth, hour, minute, second };
}
