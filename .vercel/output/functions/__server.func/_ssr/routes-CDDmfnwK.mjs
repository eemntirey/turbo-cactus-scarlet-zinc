import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { q as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MonthGlyph } from "./router-d-brxh7b.mjs";
import { d as monthById, u as dayById } from "./names-Bq1Tm0yc.mjs";
import { a as formatTechnical, f as useNow, i as formatHuman, n as earthToHepta, o as formatTime, p as usePrefersReducedMotion, u as useHeptaConfig } from "./use-now-IMcwIMZU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CDDmfnwK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function r(n) {
	return Math.round(n * 100) / 100;
}
var CX = 200;
var CY = 200;
function hourAngle(h) {
	return (h.hour + h.minute / 60 + (h.second + h.subsecond) / 3600) / 25 * 360;
}
function minuteAngle(h) {
	return (h.minute + (h.second + h.subsecond) / 60) / 60 * 360;
}
function secondAngle(h, sweep) {
	return (sweep ? h.second + h.subsecond : h.second) / 60 * 360;
}
function AnalogDial({ config, className }) {
	const hourRef = (0, import_react.useRef)(null);
	const minuteRef = (0, import_react.useRef)(null);
	const secondRef = (0, import_react.useRef)(null);
	const labelRef = (0, import_react.useRef)(null);
	const reduced = usePrefersReducedMotion();
	const { mode, epochMs, epochClockSeconds } = config;
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const apply = (el, deg) => {
			if (el) el.setAttribute("transform", `rotate(${deg} ${CX} ${CY})`);
		};
		const loop = () => {
			const h = earthToHepta(/* @__PURE__ */ new Date(), {
				mode,
				epochMs,
				epochClockSeconds
			});
			apply(hourRef.current, hourAngle(h));
			apply(minuteRef.current, minuteAngle(h));
			apply(secondRef.current, secondAngle(h, !reduced));
			const svg = labelRef.current;
			if (svg) {
				const t = `${String(h.hour).padStart(2, "0")}:${String(h.minute).padStart(2, "0")}:${String(h.second).padStart(2, "0")}`;
				svg.setAttribute("aria-label", `Montre 25 heures, ${t}`);
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [
		mode,
		epochMs,
		epochClockSeconds,
		reduced
	]);
	const hourMarks = Array.from({ length: 25 }, (_, i) => i);
	const minuteMarks = Array.from({ length: 60 }, (_, i) => i);
	const labeled = /* @__PURE__ */ new Set([
		0,
		5,
		10,
		15,
		20,
		24
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: labelRef,
		viewBox: "0 0 400 400",
		className: cn("w-full h-auto select-none", className),
		role: "img",
		"aria-label": "Montre 25 heures",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: "188",
				fill: "var(--color-surface)",
				stroke: "var(--color-border-strong)",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: "176",
				fill: "none",
				stroke: "var(--color-border)",
				strokeWidth: "1"
			}),
			minuteMarks.map((i) => {
				const rad = (i / 60 * 360 - 90) * Math.PI / 180;
				const inner = i % 5 === 0 ? 158 : 164;
				const outer = 170;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: r(CX + Math.cos(rad) * inner),
					y1: r(CY + Math.sin(rad) * inner),
					x2: r(CX + Math.cos(rad) * outer),
					y2: r(CY + Math.sin(rad) * outer),
					stroke: "var(--color-faint)",
					strokeWidth: i % 5 === 0 ? 1.4 : .7
				}, `m-${i}`);
			}),
			hourMarks.map((i) => {
				const rad = (i / 25 * 360 - 90) * Math.PI / 180;
				const isMajor = labeled.has(i);
				const inner = isMajor ? 128 : 138;
				const outer = 152;
				const lx = r(CX + Math.cos(rad) * 114);
				const ly = r(CY + Math.sin(rad) * 114);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: r(CX + Math.cos(rad) * inner),
					y1: r(CY + Math.sin(rad) * inner),
					x2: r(CX + Math.cos(rad) * outer),
					y2: r(CY + Math.sin(rad) * outer),
					stroke: "var(--color-fg)",
					strokeWidth: isMajor ? 2 : 1,
					strokeLinecap: "round",
					opacity: isMajor ? 1 : .45
				}), isMajor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: lx,
					y: ly,
					textAnchor: "middle",
					dominantBaseline: "middle",
					fill: "var(--color-fg)",
					fontFamily: "var(--font-display)",
					fontSize: i === 24 ? 13 : 18,
					fontWeight: 500,
					children: String(i).padStart(2, "0")
				})] }, `h-${i}`);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: CX,
				y: 248,
				textAnchor: "middle",
				fill: "var(--color-muted)",
				fontFamily: "var(--font-sans)",
				fontSize: "9",
				letterSpacing: "0.28em",
				children: "HEPTA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: CX,
				y: 262,
				textAnchor: "middle",
				fill: "var(--color-faint)",
				fontFamily: "var(--font-sans)",
				fontSize: "8",
				letterSpacing: "0.22em",
				children: "25 H"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				ref: hourRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: CX,
					y1: 214,
					x2: CX,
					y2: 122,
					stroke: "var(--color-fg)",
					strokeWidth: "4.5",
					strokeLinecap: "round"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				ref: minuteRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: CX,
					y1: 218,
					x2: CX,
					y2: 82,
					stroke: "var(--color-accent)",
					strokeWidth: "2.4",
					strokeLinecap: "round"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				ref: secondRef,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: CX,
					y1: 228,
					x2: CX,
					y2: 68,
					stroke: "var(--color-muted)",
					strokeWidth: "1",
					strokeLinecap: "round"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: "5",
				fill: "var(--color-fg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: CX,
				cy: CY,
				r: "2.2",
				fill: "var(--color-bg)"
			})
		]
	});
}
function WatchFace() {
	const config = useHeptaConfig();
	const now = useNow(250);
	const instant = now == null ? null : earthToHepta(new Date(now), config);
	const month = instant ? monthById(instant.month) : null;
	const day = instant ? dayById(instant.dayOfWeek) : null;
	const progress = instant ? instant.dayOfYear / 343 : 0;
	const modeLabel = config.mode === "real" ? "Heures vraies" : "Jour solaire";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalogDial, { config })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center text-center lg:items-start lg:text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.28em] text-muted",
					children: modeLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-display text-6xl leading-none tracking-tight tabular sm:text-7xl",
					children: instant ? formatTime(instant) : "––:––:––"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center gap-3",
					children: [instant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGlyph, {
						month: instant.month,
						className: "size-8"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl uppercase tracking-[0.18em] sm:text-5xl",
						children: month?.name ?? "—"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-fg",
					children: instant && day ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						day.name,
						" · ",
						String(instant.dayOfMonth).padStart(2, "0"),
						" ",
						month?.name
					] }) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl tracking-wide text-muted",
					children: instant ? `An ${String(instant.year).padStart(2, "0")}` : "An —"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid w-full max-w-sm grid-cols-2 gap-x-6 gap-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Semaine"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular",
							children: instant ? `${instant.week} / 7` : "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Jour de semaine"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular",
							children: instant ? `${instant.dayOfWeek} / 7` : "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Jour du mois"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular",
							children: instant ? `${instant.dayOfMonth} / 49` : "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Jour de l'année"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular",
							children: instant ? `${instant.dayOfYear} / 343` : "—"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-px w-full max-w-sm bg-border",
					role: "presentation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-px bg-fg",
						style: { width: `${Math.min(100, progress * 100)}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs uppercase tracking-[0.16em] text-faint",
					children: instant ? formatHuman(instant) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs tracking-[0.12em] text-faint tabular",
					children: instant ? formatTechnical(instant) : "—"
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchFace, {});
}
//#endregion
export { Home as component };
