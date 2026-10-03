//#region node_modules/.nitro/vite/services/ssr/assets/names-Bq1Tm0yc.js
var SECONDS_PER_HOUR = 3600;
var SECONDS_PER_CALENDAR_DAY = 25 * SECONDS_PER_HOUR;
var SECONDS_PER_EARTH_DAY = 24 * SECONDS_PER_HOUR;
var HOURS_PER_MONTH = 1225;
var HOURS_PER_YEAR = 8575;
SECONDS_PER_EARTH_DAY / 25;
var SYNC_SCALE = SECONDS_PER_CALENDAR_DAY / SECONDS_PER_EARTH_DAY;
var DEFAULT_EPOCH_DATE = "2005-10-03";
var DEFAULT_EPOCH_TIME = "12:10:00";
var MONTHS = [
	{
		id: 1,
		name: "Avara",
		code: "A",
		epithet: "L'origine",
		note: "Le premier souffle. C'est là que le compte commence, au seuil de l'année."
	},
	{
		id: 2,
		name: "Néora",
		code: "N",
		epithet: "La relance",
		note: "Le second cercle. Ce qui a été ouvert se met en mouvement."
	},
	{
		id: 3,
		name: "Solya",
		code: "S",
		epithet: "La lumière",
		note: "Le plein du cycle, quand la mesure est la plus claire."
	},
	{
		id: 4,
		name: "Élyra",
		code: "E",
		epithet: "L'élévation",
		note: "Le milieu de l'année. Quatre mois passés, trois encore à venir."
	},
	{
		id: 5,
		name: "Veyra",
		code: "V",
		epithet: "Le voile",
		note: "Le passage. L'année se tourne vers sa clôture."
	},
	{
		id: 6,
		name: "Oraya",
		code: "O",
		epithet: "L'orée",
		note: "Le seuil du terme. L'avant-dernier cercle."
	},
	{
		id: 7,
		name: "Zénya",
		code: "Z",
		epithet: "Le sceau",
		note: "La clôture. Quarante-neuf jours pour achever l'année, puis tout recommence."
	}
];
var DAYS = [
	{
		id: 1,
		name: "Aro",
		epithet: "Premier"
	},
	{
		id: 2,
		name: "Néo",
		epithet: "Second"
	},
	{
		id: 3,
		name: "Sola",
		epithet: "Clair"
	},
	{
		id: 4,
		name: "Élya",
		epithet: "Haut"
	},
	{
		id: 5,
		name: "Veya",
		epithet: "Voilé"
	},
	{
		id: 6,
		name: "Orin",
		epithet: "Seuil"
	},
	{
		id: 7,
		name: "Zéna",
		epithet: "Sceau"
	}
];
function monthById(id) {
	return MONTHS[((id - 1) % 7 + 7) % 7];
}
function dayById(id) {
	return DAYS[((id - 1) % 7 + 7) % 7];
}
//#endregion
export { HOURS_PER_YEAR as a, SECONDS_PER_HOUR as c, monthById as d, HOURS_PER_MONTH as i, SYNC_SCALE as l, DEFAULT_EPOCH_DATE as n, MONTHS as o, DEFAULT_EPOCH_TIME as r, SECONDS_PER_CALENDAR_DAY as s, DAYS as t, dayById as u };
