import { i as __toESM } from "../_runtime.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BM7yIyG-.mjs";
import { o as MONTHS, u as dayById } from "./names-Bq1Tm0yc.mjs";
import { a as formatTechnical, c as isoDate, f as useNow, i as formatHuman, l as isoTime, n as earthToHepta, o as formatTime, r as formatGregorianFull, s as heptaToEarth, t as clampHeptaParts, u as useHeptaConfig } from "./use-now-IMcwIMZU.mjs";
import { n as Label, r as Select, t as Input } from "./field-BPksScAj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/convertir-dUUlLy-h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fromDate(d) {
	return {
		date: isoDate(d),
		time: isoTime(d)
	};
}
function parseDateTime(date, time) {
	if (!date) return null;
	const t = time.length === 5 ? `${time}:00` : time;
	const ms = (/* @__PURE__ */ new Date(`${date}T${t}`)).getTime();
	if (Number.isNaN(ms)) return null;
	return new Date(ms);
}
function Converter() {
	const config = useHeptaConfig();
	const now = useNow(1e3);
	const live = now == null ? null : new Date(now);
	const [gDate, setGDate] = (0, import_react.useState)("");
	const [gTime, setGTime] = (0, import_react.useState)("12:10:00");
	const [hYear, setHYear] = (0, import_react.useState)(1);
	const [hMonth, setHMonth] = (0, import_react.useState)(1);
	const [hDay, setHDay] = (0, import_react.useState)(1);
	const [hHour, setHHour] = (0, import_react.useState)(12);
	const [hMinute, setHMinute] = (0, import_react.useState)(10);
	const [hSecond, setHSecond] = (0, import_react.useState)(0);
	const [seeded, setSeeded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	}, [
		live,
		seeded,
		config
	]);
	const applyGregorian = (date, time) => {
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
	const applyHepta = (parts) => {
		const clamped = clampHeptaParts(parts);
		const g = fromDate(heptaToEarth(clamped, config));
		setGDate(g.date);
		setGTime(g.time);
	};
	const heptaParts = {
		year: hYear,
		month: hMonth,
		dayOfMonth: hDay,
		hour: hHour,
		minute: hMinute,
		second: hSecond
	};
	const heptaDate = (0, import_react.useMemo)(() => earthToHepta(heptaToEarth(clampHeptaParts(heptaParts), config), config), [
		hYear,
		hMonth,
		hDay,
		hHour,
		hMinute,
		hSecond,
		config.mode,
		config.epochMs,
		config.epochClockSeconds
	]);
	const gregorian = parseDateTime(gDate, gTime);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.28em] text-muted",
			children: "Pont des calendriers"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
			children: "Convertir"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Dans les deux sens, à la seconde près. L'origine et le mode d'heure se règlent dans Origine."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => {
					if (!live) return;
					const g = fromDate(live);
					setGDate(g.date);
					setGTime(g.time);
					applyGregorian(g.date, g.time);
				},
				children: "Cet instant"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => {
					setGDate("2005-10-03");
					setGTime("12:10:00");
					applyGregorian("2005-10-03", "12:10:00");
				},
				children: "Origine proposée"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Grégorien"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "g-date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "g-date",
								type: "date",
								value: gDate,
								onChange: (e) => {
									setGDate(e.target.value);
									applyGregorian(e.target.value, gTime);
								}
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "g-time",
								children: "Heure"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "g-time",
								type: "time",
								step: 1,
								value: gTime,
								onChange: (e) => {
									setGTime(e.target.value);
									applyGregorian(gDate, e.target.value);
								}
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: gregorian ? formatGregorianFull(gregorian) : "Date incomplète"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Hepta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "h-year",
									children: "Année"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "h-year",
									type: "number",
									value: hYear,
									onChange: (e) => {
										const year = Number(e.target.value);
										setHYear(year);
										applyHepta({
											...heptaParts,
											year
										});
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "h-month",
									children: "Mois"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									id: "h-month",
									value: hMonth,
									onChange: (e) => {
										const month = Number(e.target.value);
										setHMonth(month);
										applyHepta({
											...heptaParts,
											month
										});
									},
									children: MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: m.id,
										children: [
											m.id,
											". ",
											m.name
										]
									}, m.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "h-day",
									children: "Jour (1–49)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "h-day",
									type: "number",
									min: 1,
									max: 49,
									value: hDay,
									onChange: (e) => {
										const dayOfMonth = Number(e.target.value);
										setHDay(dayOfMonth);
										applyHepta({
											...heptaParts,
											dayOfMonth
										});
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "h-hour",
									children: "Heure (0–24)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "h-hour",
									type: "number",
									min: 0,
									max: 24,
									value: hHour,
									onChange: (e) => {
										const hour = Number(e.target.value);
										setHHour(hour);
										applyHepta({
											...heptaParts,
											hour
										});
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "h-min",
										children: "Min"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "h-min",
										type: "number",
										min: 0,
										max: 59,
										value: hMinute,
										onChange: (e) => {
											const minute = Number(e.target.value);
											setHMinute(minute);
											applyHepta({
												...heptaParts,
												minute
											});
										}
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "h-sec",
										children: "Sec"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "h-sec",
										type: "number",
										min: 0,
										max: 59,
										value: hSecond,
										onChange: (e) => {
											const second = Number(e.target.value);
											setHSecond(second);
											applyHepta({
												...heptaParts,
												second
											});
										}
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-sm",
						children: [
							dayById(heptaDate.dayOfWeek).name,
							" · ",
							formatHuman(heptaDate)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs tabular text-muted",
						children: [
							formatTechnical(heptaDate),
							" · ",
							formatTime(heptaDate),
							" · semaine ",
							heptaDate.week,
							"/7"
						]
					})
				]
			})]
		})
	] });
}
function ConvertirPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Converter, {});
}
//#endregion
export { ConvertirPage as component };
