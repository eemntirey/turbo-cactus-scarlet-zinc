import { t as cn } from "./utils-C_uf36nf.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-BM7yIyG-.mjs";
import { n as DEFAULT_EPOCH_DATE, r as DEFAULT_EPOCH_TIME } from "./names-Bq1Tm0yc.mjs";
import { a as formatTechnical, d as useHeptaStore, f as useNow, i as formatHuman, n as earthToHepta, o as formatTime, r as formatGregorianFull, u as useHeptaConfig } from "./use-now-IMcwIMZU.mjs";
import { n as Label, t as Input } from "./field-BPksScAj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/origine-CP42WCU8.js
var import_jsx_runtime = require_jsx_runtime();
function OriginPanel() {
	const mode = useHeptaStore((s) => s.mode);
	const epochDate = useHeptaStore((s) => s.epochDate);
	const epochTime = useHeptaStore((s) => s.epochTime);
	const setMode = useHeptaStore((s) => s.setMode);
	const setEpoch = useHeptaStore((s) => s.setEpoch);
	const resetEpoch = useHeptaStore((s) => s.resetEpoch);
	const anchorNow = useHeptaStore((s) => s.anchorNow);
	const config = useHeptaConfig();
	const now = useNow(1e3);
	const instant = now == null ? null : earthToHepta(new Date(now), config);
	const epochAsDate = new Date(config.epochMs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.28em] text-muted",
			children: "Point zéro"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
			children: "Origine"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Toute date Hepta se compte depuis un instant unique. Au moment choisi, le calendrier lit Aro 01 Avara, An 01, à l'heure indiquée."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
				active: mode === "real",
				title: "Heures vraies",
				kicker: "Option A",
				body: "Une heure dure soixante minutes réelles. Un jour Hepta fait 25 heures, donc 90 000 secondes. Le jour calendaire est plus long qu'un jour terrestre, et dérive par rapport au soleil.",
				onClick: () => setMode("real")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
				active: mode === "sync",
				title: "Jour solaire",
				kicker: "Option B",
				body: "On garde le jour physique de 24 heures, redistribué en 25 heures Hepta. Chaque heure calendaire dure 57 min 36 s. Un jour Hepta reste calé sur un jour terrestre.",
				onClick: () => setMode("sync")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mt-8 rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Instant d'origine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Proposition : 3 octobre 2005, 12 h 10 — Aro, Avara, An 1, 12:10:00."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "epoch-date",
							children: "Date grégorienne"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "epoch-date",
							type: "date",
							value: epochDate,
							onChange: (e) => setEpoch(e.target.value, epochTime)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "epoch-time",
							children: "Heure"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "epoch-time",
							type: "time",
							step: 1,
							value: epochTime,
							onChange: (e) => setEpoch(epochDate, e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm",
					children: formatGregorianFull(epochAsDate)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: resetEpoch,
						children: "Revenir au 3 oct. 2005, 12:10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: anchorNow,
						children: "Ancrer à cet instant"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-[11px] text-faint",
					children: [
						"Origine enregistrée sur cet appareil (",
						DEFAULT_EPOCH_DATE,
						" ",
						DEFAULT_EPOCH_TIME,
						" par défaut)."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mt-6 rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Lecture actuelle"
			}), instant ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-3xl",
					children: formatTime(instant)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: formatHuman(instant)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm tabular text-muted",
					children: formatTechnical(instant)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Mode ",
						mode === "real" ? "heures vraies" : "jour solaire",
						". L'année 1 commence à l'origine, pas au 1er janvier."
					]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Synchronisation…"
			})]
		})
	] });
}
function ModeCard({ active, title, kicker, body, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("rounded-[var(--radius-xl)] border p-5 text-left transition-[border-color,background-color] duration-150 sm:p-6", active ? "border-border-strong bg-raised" : "border-border bg-surface hover:border-border-strong"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.2em] text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-2xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs uppercase tracking-[0.16em]",
				children: active ? "Actif" : "Choisir"
			})
		]
	});
}
function OriginePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginPanel, {});
}
//#endregion
export { OriginePage as component };
