import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MonthGlyph } from "./router-d-brxh7b.mjs";
import { t as Button } from "./button-BM7yIyG-.mjs";
import { d as monthById, o as MONTHS, t as DAYS, u as dayById } from "./names-Bq1Tm0yc.mjs";
import { a as formatTechnical, f as useNow, n as earthToHepta, o as formatTime, r as formatGregorianFull, s as heptaToEarth, u as useHeptaConfig } from "./use-now-IMcwIMZU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendrier-Dd96mMrl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function shiftMonth(year, month, delta) {
	const idx = (year - 1) * 7 + (month - 1) + delta;
	return {
		year: Math.floor(idx / 7) + 1,
		month: (idx % 7 + 7) % 7 + 1
	};
}
function MonthGrid() {
	const config = useHeptaConfig();
	const now = useNow(1e3);
	const today = now == null ? null : earthToHepta(new Date(now), config);
	const [cursor, setCursor] = (0, import_react.useState)(null);
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(null);
	const viewYear = cursor?.year ?? today?.year ?? 1;
	const viewMonth = cursor?.month ?? today?.month ?? 1;
	const month = monthById(viewMonth);
	const cells = (0, import_react.useMemo)(() => {
		return Array.from({ length: 49 }, (_, i) => {
			const dayOfMonth = i + 1;
			const sample = heptaToEarth({
				year: viewYear,
				month: viewMonth,
				dayOfMonth,
				hour: 12,
				minute: 0,
				second: 0
			}, config);
			return {
				dayOfMonth,
				gregorian: sample,
				hepta: earthToHepta(sample, config)
			};
		});
	}, [
		viewYear,
		viewMonth,
		config.mode,
		config.epochMs,
		config.epochClockSeconds
	]);
	const isCurrentMonth = today != null && today.year === viewYear && today.month === viewMonth;
	const activeDay = selectedDay ?? (isCurrentMonth ? today?.dayOfMonth : null);
	const selected = cells.find((c) => c.dayOfMonth === activeDay) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: `An ${String(viewYear).padStart(2, "0")}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGlyph, {
						month: viewMonth,
						className: "size-8"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl uppercase tracking-widest sm:text-5xl",
						children: month.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [month.epithet, " · 7 semaines · 49 jours"]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					"aria-label": "Mois précédent",
					onClick: () => setCursor(shiftMonth(viewYear, viewMonth, -1)),
					children: "Préc."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					"aria-label": "Mois suivant",
					onClick: () => setCursor(shiftMonth(viewYear, viewMonth, 1)),
					children: "Suiv."
				})]
			})]
		}),
		today && !isCurrentMonth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "quiet",
			size: "sm",
			className: "mt-3 px-0",
			onClick: () => {
				setCursor({
					year: today.year,
					month: today.month
				});
				setSelectedDay(today.dayOfMonth);
			},
			children: "Revenir à aujourd'hui"
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "mt-6 rounded-[var(--radius-xl)] border border-border bg-surface p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: "Jour choisi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-2xl sm:text-3xl",
					children: [
						dayById(selected.hepta.dayOfWeek).name,
						" ",
						String(selected.dayOfMonth).padStart(2, "0"),
						" ",
						month.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Semaine ",
						selected.hepta.week,
						" / 7 · ",
						formatTechnical(selected.hepta)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [formatGregorianFull(selected.gregorian), isCurrentMonth && today && selected.dayOfMonth === today.dayOfMonth ? ` · ${formatTime(today)}` : " · 12:00 calendaire"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 grid grid-cols-7 gap-1",
					children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-1 text-center text-xs uppercase tracking-widest text-muted",
						children: d.name
					}, d.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1",
					children: cells.map((cell) => {
						const isToday = today != null && today.year === viewYear && today.month === viewMonth && today.dayOfMonth === cell.dayOfMonth;
						const isSelected = selected?.dayOfMonth === cell.dayOfMonth;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSelectedDay(cell.dayOfMonth),
							className: cn("flex h-11 items-center justify-center rounded-[var(--radius-sm)] text-sm tabular transition-[background-color,color,border-color] duration-150", "border border-transparent hover:border-border-strong", isToday && "bg-accent text-accent-fg", !isToday && isSelected && "border-border-strong bg-raised", !isToday && !isSelected && "text-fg"),
							"aria-current": isToday ? "date" : void 0,
							"aria-pressed": isSelected,
							children: cell.dayOfMonth
						}, cell.dayOfMonth);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid grid-cols-7 gap-2",
			children: MONTHS.map((m) => {
				const active = m.id === viewMonth;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCursor({
						year: viewYear,
						month: m.id
					}),
					className: cn("flex min-h-11 flex-col items-center gap-1 rounded-[var(--radius-md)] py-3 text-xs uppercase tracking-widest transition-colors duration-150", active ? "bg-raised text-fg" : "text-muted hover:text-fg"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGlyph, {
							month: m.id,
							className: "size-5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: m.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: m.code
						})
					]
				}, m.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-xs text-faint",
			children: [343, " jours par an, sans bissextile. Chaque mois est une grille 7 × 7."]
		})
	] });
}
function CalendrierPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGrid, {});
}
//#endregion
export { CalendrierPage as component };
