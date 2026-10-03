import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MonthGlyph } from "./router-d-brxh7b.mjs";
import { a as HOURS_PER_YEAR, i as HOURS_PER_MONTH, o as MONTHS, t as DAYS } from "./names-Bq1Tm0yc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/codex-DzZjVoHF.js
var import_jsx_runtime = require_jsx_runtime();
var RULES = [
	{
		label: "1 jour",
		value: `25 heures`
	},
	{
		label: "1 semaine",
		value: `7 jours · 175 h`
	},
	{
		label: "1 mois",
		value: `7 semaines · 49 jours · ${HOURS_PER_MONTH.toLocaleString("fr-FR")} h`
	},
	{
		label: "1 an",
		value: `7 mois · 343 jours · ${HOURS_PER_YEAR.toLocaleString("fr-FR")} h`
	}
];
function Codex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.28em] text-muted",
			children: "Règles du temps"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
			children: "Codex"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Un calendrier parfaitement régulier. Pas d'année bissextile, pas de mois de 28 ou 31 jours. Sept partout, et une vingt-cinquième heure."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-8 divide-y divide-border rounded-[var(--radius-xl)] border border-border bg-surface",
			children: RULES.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm text-muted",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "tabular text-fg",
					children: row.value
				})]
			}, row.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-3xl",
			children: "Les sept mois"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 grid gap-3 sm:grid-cols-2",
			children: MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthGlyph, {
							month: m.id,
							className: "size-7"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] uppercase tracking-[0.18em] text-muted",
							children: [
								String(m.id).padStart(2, "0"),
								" · ",
								m.code
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl",
							children: m.name
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: m.epithet
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: m.note
					})
				]
			}, m.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-12 font-display text-3xl",
			children: "Les sept jours"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 grid grid-cols-2 gap-2 sm:grid-cols-7",
			children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-[var(--radius-md)] border border-border bg-surface px-3 py-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tabular text-muted",
						children: d.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-xl",
						children: d.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] uppercase tracking-[0.12em] text-faint",
						children: d.epithet
					})
				]
			}, d.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Écriture d'une date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Humaine"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "Aro 01 Avara, An 01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Technique"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular",
						children: "A01-J01-Y01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Première lettre du mois, numéro du mois, jour du mois, année depuis l'origine."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Ce qui n'existe pas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Année bissextile" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "29 février" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mois de longueurs variables" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Correction tous les quatre ans" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: "Chaque année a exactement 343 jours. Le calendrier ne cherche pas à coller à l'année solaire — sauf si vous choisissez le mode jour solaire, qui ne redistribue que les heures."
					})
				]
			})]
		})
	] });
}
function CodexPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Codex, {});
}
//#endregion
export { CodexPage as component };
