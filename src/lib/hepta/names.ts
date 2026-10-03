export type MonthDef = {
  id: number;
  name: string;
  code: string;
  epithet: string;
  note: string;
};

export type DayDef = {
  id: number;
  name: string;
  epithet: string;
};

export const MONTHS: MonthDef[] = [
  {
    id: 1,
    name: "Avara",
    code: "A",
    epithet: "L'origine",
    note: "Le premier souffle. C'est là que le compte commence, au seuil de l'année.",
  },
  {
    id: 2,
    name: "Néora",
    code: "N",
    epithet: "La relance",
    note: "Le second cercle. Ce qui a été ouvert se met en mouvement.",
  },
  {
    id: 3,
    name: "Solya",
    code: "S",
    epithet: "La lumière",
    note: "Le plein du cycle, quand la mesure est la plus claire.",
  },
  {
    id: 4,
    name: "Élyra",
    code: "E",
    epithet: "L'élévation",
    note: "Le milieu de l'année. Quatre mois passés, trois encore à venir.",
  },
  {
    id: 5,
    name: "Veyra",
    code: "V",
    epithet: "Le voile",
    note: "Le passage. L'année se tourne vers sa clôture.",
  },
  {
    id: 6,
    name: "Oraya",
    code: "O",
    epithet: "L'orée",
    note: "Le seuil du terme. L'avant-dernier cercle.",
  },
  {
    id: 7,
    name: "Zénya",
    code: "Z",
    epithet: "Le sceau",
    note: "La clôture. Quarante-neuf jours pour achever l'année, puis tout recommence.",
  },
];

export const DAYS: DayDef[] = [
  { id: 1, name: "Aro", epithet: "Premier" },
  { id: 2, name: "Néo", epithet: "Second" },
  { id: 3, name: "Sola", epithet: "Clair" },
  { id: 4, name: "Élya", epithet: "Haut" },
  { id: 5, name: "Veya", epithet: "Voilé" },
  { id: 6, name: "Orin", epithet: "Seuil" },
  { id: 7, name: "Zéna", epithet: "Sceau" },
];

export function monthById(id: number): MonthDef {
  return MONTHS[((id - 1) % 7 + 7) % 7]!;
}

export function dayById(id: number): DayDef {
  return DAYS[((id - 1) % 7 + 7) % 7]!;
}
