import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DAYS_PER_YEAR,
  HOURS_PER_DAY,
  SECONDS_PER_CALENDAR_DAY,
  SECONDS_PER_EARTH_DAY,
  SYNC_SCALE,
} from "./constants.ts";
import {
  calendarSecondsToHepta,
  type HeptaConfig,
  earthToHepta,
  heptaToCalendarSeconds,
  heptaToEarth,
  clampHeptaParts,
  isValidHeptaParts,
  parseClockSeconds,
  parseLocalDateTime,
} from "./engine.ts";
import { dayById, monthById } from "./names.ts";
import { formatHuman, formatTechnical, formatTime } from "./format.ts";

const epochMs = new Date(2005, 9, 3, 12, 10, 0).getTime();
const epochClock = parseClockSeconds("12:10:00");

const real: HeptaConfig = { epochMs, mode: "real", epochClockSeconds: epochClock };
const sync: HeptaConfig = { epochMs, mode: "sync", epochClockSeconds: epochClock };

describe("epoch", () => {
  it("maps 3 oct 2005 12:10 to Aro 01 Avara An 01 12:10:00", () => {
    const h = earthToHepta(new Date(2005, 9, 3, 12, 10, 0), real);
    assert.equal(h.year, 1);
    assert.equal(h.month, 1);
    assert.equal(h.dayOfMonth, 1);
    assert.equal(h.dayOfWeek, 1);
    assert.equal(h.week, 1);
    assert.equal(h.hour, 12);
    assert.equal(h.minute, 10);
    assert.equal(h.second, 0);
    assert.equal(dayById(h.dayOfWeek).name, "Aro");
    assert.equal(monthById(h.month).name, "Avara");
    assert.equal(formatHuman(h), "Aro 01 Avara, An 01");
    assert.equal(formatTechnical(h), "A01-J01-Y01");
    assert.equal(formatTime(h), "12:10:00");
  });

  it("is identical at epoch in both modes", () => {
    const a = earthToHepta(new Date(epochMs), real);
    const b = earthToHepta(new Date(epochMs), sync);
    assert.equal(a.hour, b.hour);
    assert.equal(a.dayOfMonth, b.dayOfMonth);
    assert.equal(a.year, b.year);
  });
});

describe("hour rollover", () => {
  it("24:59:59 of day 1 then 00:00:00 of day 2", () => {
    const last = calendarSecondsToHepta(SECONDS_PER_CALENDAR_DAY - 1);
    assert.equal(last.hour, 24);
    assert.equal(last.minute, 59);
    assert.equal(last.second, 59);
    assert.equal(last.dayOfMonth, 1);
    assert.equal(last.year, 1);

    const next = calendarSecondsToHepta(SECONDS_PER_CALENDAR_DAY);
    assert.equal(next.hour, 0);
    assert.equal(next.minute, 0);
    assert.equal(next.second, 0);
    assert.equal(next.dayOfMonth, 2);
    assert.equal(next.dayOfWeek, 2);
    assert.equal(dayById(next.dayOfWeek).name, "Néo");
  });

  it("real mode: 12h49m59s after epoch is 24:59:59 day 1", () => {
    const ms = epochMs + (12 * 3600 + 49 * 60 + 59) * 1000;
    const h = earthToHepta(new Date(ms), real);
    assert.equal(h.hour, 24);
    assert.equal(h.minute, 59);
    assert.equal(h.second, 59);
    assert.equal(h.dayOfMonth, 1);
  });
});

describe("calendar edges", () => {
  it("day 7 → day 8 starts week 2 as Aro", () => {
    const d7 = calendarSecondsToHepta(6 * SECONDS_PER_CALENDAR_DAY);
    assert.equal(d7.dayOfMonth, 7);
    assert.equal(d7.week, 1);
    assert.equal(dayById(d7.dayOfWeek).name, "Zéna");

    const d8 = calendarSecondsToHepta(7 * SECONDS_PER_CALENDAR_DAY);
    assert.equal(d8.dayOfMonth, 8);
    assert.equal(d8.week, 2);
    assert.equal(dayById(d8.dayOfWeek).name, "Aro");
  });

  it("day 49 → new month", () => {
    const last = calendarSecondsToHepta(48 * SECONDS_PER_CALENDAR_DAY);
    assert.equal(last.dayOfMonth, 49);
    assert.equal(last.month, 1);
    assert.equal(monthById(last.month).name, "Avara");
    assert.equal(dayById(last.dayOfWeek).name, "Zéna");

    const next = calendarSecondsToHepta(49 * SECONDS_PER_CALENDAR_DAY);
    assert.equal(next.dayOfMonth, 1);
    assert.equal(next.month, 2);
    assert.equal(monthById(next.month).name, "Néora");
    assert.equal(dayById(next.dayOfWeek).name, "Aro");
  });

  it("day 343 → new year", () => {
    const last = calendarSecondsToHepta((DAYS_PER_YEAR - 1) * SECONDS_PER_CALENDAR_DAY);
    assert.equal(last.dayOfYear, 343);
    assert.equal(last.month, 7);
    assert.equal(monthById(last.month).name, "Zénya");
    assert.equal(dayById(last.dayOfWeek).name, "Zéna");
    assert.equal(last.year, 1);

    const next = calendarSecondsToHepta(DAYS_PER_YEAR * SECONDS_PER_CALENDAR_DAY);
    assert.equal(next.year, 2);
    assert.equal(next.month, 1);
    assert.equal(next.dayOfMonth, 1);
    assert.equal(monthById(next.month).name, "Avara");
    assert.equal(dayById(next.dayOfWeek).name, "Aro");
  });
});

describe("modes", () => {
  it("real: 25 earth hours = one calendar day at the same clock", () => {
    const later = new Date(epochMs + HOURS_PER_DAY * 3600 * 1000);
    const h = earthToHepta(later, real);
    assert.equal(h.dayOfMonth, 2);
    assert.equal(h.hour, 12);
    assert.equal(h.minute, 10);
  });

  it("sync: 24 earth hours = one calendar day at the same clock", () => {
    const later = new Date(epochMs + SECONDS_PER_EARTH_DAY * 1000);
    const h = earthToHepta(later, sync);
    assert.equal(h.dayOfMonth, 2);
    assert.equal(h.hour, 12);
    assert.equal(h.minute, 10);
    assert.equal(h.second, 0);
  });

  it("sync scale is 25/24", () => {
    assert.equal(SYNC_SCALE, 25 / 24);
  });
});

describe("roundtrip", () => {
  it("earth → hepta → earth preserves the instant (real)", () => {
    const original = new Date(2012, 5, 14, 9, 41, 7);
    const h = earthToHepta(original, real);
    const back = heptaToEarth(h, real);
    assert.ok(Math.abs(back.getTime() - original.getTime()) < 1000);
  });

  it("earth → hepta → earth preserves the instant (sync)", () => {
    const original = new Date(2012, 5, 14, 9, 41, 7);
    const h = earthToHepta(original, sync);
    const back = heptaToEarth(h, sync);
    assert.ok(Math.abs(back.getTime() - original.getTime()) < 1000);
  });

  it("parts → seconds → parts", () => {
    const parts = {
      year: 4,
      month: 4,
      dayOfMonth: 32,
      hour: 18,
      minute: 42,
      second: 16,
    };
    const sec = heptaToCalendarSeconds(parts);
    const h = calendarSecondsToHepta(sec);
    assert.equal(h.year, 4);
    assert.equal(h.month, 4);
    assert.equal(h.dayOfMonth, 32);
    assert.equal(h.hour, 18);
    assert.equal(h.minute, 42);
    assert.equal(h.second, 16);
    assert.equal(dayById(h.dayOfWeek).name, "Élya");
    assert.equal(monthById(h.month).name, "Élyra");
  });
});

describe("before epoch", () => {
  it("one calendar second before epoch is 12:09:59 day 1", () => {
    const h = earthToHepta(new Date(epochMs - 1000), real);
    assert.equal(h.year, 1);
    assert.equal(h.hour, 12);
    assert.equal(h.minute, 9);
    assert.equal(h.second, 59);
  });

  it("midnight of day 1 minus one second is last second of year 0", () => {
    const h = calendarSecondsToHepta(-1);
    assert.equal(h.year, 0);
    assert.equal(h.month, 7);
    assert.equal(h.dayOfMonth, 49);
    assert.equal(h.hour, 24);
    assert.equal(h.minute, 59);
    assert.equal(h.second, 59);
  });
});

describe("local epoch helper", () => {
  it("parses the default origin", () => {
    assert.equal(parseLocalDateTime("2005-10-03", "12:10:00"), epochMs);
    assert.equal(parseClockSeconds("12:10:00"), 12 * 3600 + 10 * 60);
  });
});


describe("input validation", () => {
  it("accepts every valid clock boundary, including 24:59:59", () => {
    assert.equal(
      isValidHeptaParts({
        year: 1,
        month: 1,
        dayOfMonth: 1,
        hour: 24,
        minute: 59,
        second: 59,
      }),
      true,
    );
  });

  it("rejects invalid calendar fields", () => {
    assert.equal(
      isValidHeptaParts({
        year: 1,
        month: 8,
        dayOfMonth: 1,
        hour: 0,
        minute: 0,
        second: 0,
      }),
      false,
    );
    assert.equal(
      isValidHeptaParts({
        year: 1,
        month: 1,
        dayOfMonth: 50,
        hour: 0,
        minute: 0,
        second: 0,
      }),
      false,
    );
  });

  it("normalizes empty/NaN numeric inputs instead of producing NaN dates", () => {
    const parts = clampHeptaParts({
      year: 1,
      month: Number.NaN,
      dayOfMonth: Number.NaN,
      hour: Number.NaN,
      minute: Number.NaN,
      second: Number.NaN,
    });
    assert.deepEqual(parts, {
      year: 1,
      month: 1,
      dayOfMonth: 1,
      hour: 0,
      minute: 0,
      second: 0,
    });
  });
});
