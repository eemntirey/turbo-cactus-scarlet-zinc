export const HOURS_PER_DAY = 25;
export const MINUTES_PER_HOUR = 60;
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 3600;
export const SECONDS_PER_CALENDAR_DAY = HOURS_PER_DAY * SECONDS_PER_HOUR; // 90_000
export const SECONDS_PER_EARTH_DAY = 24 * SECONDS_PER_HOUR; // 86_400

export const DAYS_PER_WEEK = 7;
export const WEEKS_PER_MONTH = 7;
export const MONTHS_PER_YEAR = 7;
export const DAYS_PER_MONTH = DAYS_PER_WEEK * WEEKS_PER_MONTH; // 49
export const DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR; // 343

export const HOURS_PER_WEEK = DAYS_PER_WEEK * HOURS_PER_DAY; // 175
export const HOURS_PER_MONTH = DAYS_PER_MONTH * HOURS_PER_DAY; // 1_225
export const HOURS_PER_YEAR = DAYS_PER_YEAR * HOURS_PER_DAY; // 8_575

/** Earth seconds per calendar hour in sync mode: 24h / 25 = 57 min 36 s. */
export const SYNC_EARTH_SECONDS_PER_CALENDAR_HOUR =
  SECONDS_PER_EARTH_DAY / HOURS_PER_DAY; // 3_456

export const SYNC_SCALE = SECONDS_PER_CALENDAR_DAY / SECONDS_PER_EARTH_DAY; // 25/24

export const DEFAULT_EPOCH_DATE = "2005-10-03";
export const DEFAULT_EPOCH_TIME = "12:10:00";

export type HourMode = "real" | "sync";
