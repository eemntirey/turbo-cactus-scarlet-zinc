import type { HeptaInstant } from "./engine.ts";

/**
 * Géométrie pure du cadran 25 positions, partagée par le composant SVG
 * et les tests. Convention du projet (§13) :
 *
 *   position = heure + fraction de l'heure
 *   interne 0  → position 25 (zéro visuel, en haut)
 *   interne 1  → position 01
 *   interne 24 → position 24
 *
 * Chaque position avance de 360° / 25 = 14,4°.
 */
export const CX = 200;
export const CY = 200;
export const DEGREES_PER_HOUR = 360 / 25; // 14,4°

export function hourAngle(h: HeptaInstant): number {
  const hours = h.hour + h.minute / 60 + (h.second + h.subsecond) / 3600;
  return (hours % 25) * DEGREES_PER_HOUR;
}

export function minuteAngle(h: HeptaInstant): number {
  return ((h.minute + (h.second + h.subsecond) / 60) / 60) * 360;
}

export function secondAngle(h: HeptaInstant, sweep: boolean): number {
  const s = sweep ? h.second + h.subsecond : h.second;
  return (s / 60) * 360;
}

/** Étiquette d'une position du cadran : la position zéro porte le 25. */
export function dialLabel(position: number): string {
  return position === 0 ? "25" : String(position).padStart(2, "0");
}
