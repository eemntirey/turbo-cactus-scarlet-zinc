import { i as __toESM } from "../_runtime.mjs";
import { q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as SECONDS_PER_HOUR, d as monthById, l as SYNC_SCALE, n as DEFAULT_EPOCH_DATE, r as DEFAULT_EPOCH_TIME, s as SECONDS_PER_CALENDAR_DAY, u as dayById } from "./names-Bq1Tm0yc.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-now-IMcwIMZU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Floor division that keeps the remainder in [0, divisor). */
function divmod(n, d) {
	const q = Math.floor(n / d);
	return {
		q,
		r: n - q * d
	};
}
function parseLocalDateTime(date, time) {
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
function parseClockSeconds(time) {
	const parts = time.split(":").map(Number);
	const hh = parts[0] ?? 0;
	const mm = parts[1] ?? 0;
	const ss = parts[2] ?? 0;
	return hh * SECONDS_PER_HOUR + mm * 60 + ss;
}
function calendarScale(mode) {
	return mode === "sync" ? SYNC_SCALE : 1;
}
function earthToCalendarSeconds(date, config) {
	const elapsedEarth = (date.getTime() - config.epochMs) / 1e3;
	return config.epochClockSeconds + elapsedEarth * calendarScale(config.mode);
}
function calendarSecondsToHepta(totalSec) {
	const { q: dayIndex, r: secInDay } = divmod(totalSec, SECONDS_PER_CALENDAR_DAY);
	const { q: yearIndex, r: dayInYear0 } = divmod(dayIndex, 343);
	const { q: monthIndex, r: dayInMonth0 } = divmod(dayInYear0, 49);
	const { q: weekIndex, r: dayOfWeek0 } = divmod(dayInMonth0, 7);
	const { q: hour, r: secInHour } = divmod(secInDay, SECONDS_PER_HOUR);
	const { q: minute, r: secFloat } = divmod(secInHour, 60);
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
		subsecond
	};
}
function heptaToCalendarSeconds(parts) {
	const dayIndex = (parts.year - 1) * 343 + (parts.month - 1) * 49 + (parts.dayOfMonth - 1);
	const secInDay = parts.hour * SECONDS_PER_HOUR + parts.minute * 60 + (parts.second ?? 0) + (parts.subsecond ?? 0);
	return dayIndex * SECONDS_PER_CALENDAR_DAY + secInDay;
}
function earthToHepta(date, config) {
	return calendarSecondsToHepta(earthToCalendarSeconds(date, config));
}
function heptaToEarth(parts, config) {
	const elapsedEarth = (heptaToCalendarSeconds(parts) - config.epochClockSeconds) / calendarScale(config.mode);
	return new Date(config.epochMs + elapsedEarth * 1e3);
}
function clampHeptaParts(parts) {
	const month = Math.min(7, Math.max(1, Math.round(parts.month)));
	const dayOfMonth = Math.min(49, Math.max(1, Math.round(parts.dayOfMonth)));
	const hour = Math.min(24, Math.max(0, Math.round(parts.hour)));
	const minute = Math.min(59, Math.max(0, Math.round(parts.minute)));
	const second = Math.min(59, Math.max(0, Math.round(parts.second ?? 0)));
	return {
		...parts,
		month,
		dayOfMonth,
		hour,
		minute,
		second
	};
}
function pad(n, w = 2) {
	return (n < 0 ? "−" : "") + String(Math.abs(n)).padStart(w, "0");
}
function formatTime(h) {
	return `${pad(h.hour)}:${pad(h.minute)}:${pad(h.second)}`;
}
/** Aro 01 Avara, An 01 */
function formatHuman(h) {
	const day = dayById(h.dayOfWeek).name;
	const month = monthById(h.month).name;
	return `${day} ${pad(h.dayOfMonth)} ${month}, An ${pad(h.year)}`;
}
/** A01-J01-Y01 — month letter + month index, day, year */
function formatTechnical(h) {
	return `${monthById(h.month).code}${pad(h.month)}-J${pad(h.dayOfMonth)}-Y${pad(h.year)}`;
}
function formatGregorian(date) {
	return new Intl.DateTimeFormat("fr-FR", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(date);
}
function formatGregorianTime(date) {
	return new Intl.DateTimeFormat("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	}).format(date);
}
function formatGregorianFull(date) {
	return `${formatGregorian(date)} · ${formatGregorianTime(date)}`;
}
function isoDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function isoTime(date) {
	return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}
var useHeptaStore = create()(persist((set, get) => ({
	mode: "real",
	epochDate: DEFAULT_EPOCH_DATE,
	epochTime: DEFAULT_EPOCH_TIME,
	hydrated: false,
	setMode: (mode) => set({ mode }),
	setEpoch: (epochDate, epochTime) => set({
		epochDate,
		epochTime
	}),
	resetEpoch: () => set({
		epochDate: DEFAULT_EPOCH_DATE,
		epochTime: DEFAULT_EPOCH_TIME
	}),
	anchorNow: () => {
		const now = /* @__PURE__ */ new Date();
		const y = now.getFullYear();
		const m = String(now.getMonth() + 1).padStart(2, "0");
		const d = String(now.getDate()).padStart(2, "0");
		const hh = String(now.getHours()).padStart(2, "0");
		const mm = String(now.getMinutes()).padStart(2, "0");
		const ss = String(now.getSeconds()).padStart(2, "0");
		set({
			epochDate: `${y}-${m}-${d}`,
			epochTime: `${hh}:${mm}:${ss}`
		});
	},
	setHydrated: () => set({ hydrated: true }),
	config: () => {
		const { mode, epochDate, epochTime } = get();
		return {
			mode,
			epochMs: parseLocalDateTime(epochDate, epochTime),
			epochClockSeconds: parseClockSeconds(epochTime)
		};
	}
}), {
	name: "hepta-settings",
	partialize: (s) => ({
		mode: s.mode,
		epochDate: s.epochDate,
		epochTime: s.epochTime
	}),
	onRehydrateStorage: () => (state) => {
		state?.setHydrated();
	}
}));
function useHeptaConfig() {
	const mode = useHeptaStore((s) => s.mode);
	const epochDate = useHeptaStore((s) => s.epochDate);
	const epochTime = useHeptaStore((s) => s.epochTime);
	return {
		mode,
		epochMs: parseLocalDateTime(epochDate, epochTime),
		epochClockSeconds: parseClockSeconds(epochTime)
	};
}
function useNow(intervalMs = 200) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);
	return now;
}
function usePrefersReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setReduced(mq.matches);
		onChange();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	return reduced;
}
//#endregion
export { formatTechnical as a, isoDate as c, useHeptaStore as d, useNow as f, formatHuman as i, isoTime as l, earthToHepta as n, formatTime as o, usePrefersReducedMotion as p, formatGregorianFull as r, heptaToEarth as s, clampHeptaParts as t, useHeptaConfig as u };
