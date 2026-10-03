#!/usr/bin/env node
/**
 * QA visuelle locale (machine de dev, hors sandbox) :
 * desktop + mobile sur l'accueil, plus la page Convertir.
 * Sortie : screenshots/*.png + verdict JSON sur stdout.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.QA_BASE_URL || "http://127.0.0.1:8090";
mkdirSync("screenshots", { recursive: true });

// Utilise le Chrome installé sur la machine : évite le téléchargement Playwright.
const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

async function audit(page, label, path, viewport) {
  await page.setViewportSize(viewport);
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  const visible = await page.evaluate(() => {
    const text = document.body.innerText || "";
    return {
      chars: text.replace(/\s+/g, " ").trim().length,
      hasTime: /\d{2}:\d{2}:\d{2}/.test(text),
      has25: text.includes("25"),
    };
  });

  if (visible.chars < 80) problems.push(`${label}: page quasi vide (${visible.chars} caractères)`);
  if (path === "/" && !visible.hasTime) problems.push(`${label}: aucune heure HH:MM:SS visible`);
  for (const err of consoleErrors) problems.push(`${label}: console — ${err}`);

  await page.screenshot({ path: `screenshots/${label}.png`, fullPage: false });
  return { label, path, ...visible };
}

const page = await browser.newPage();

const desktop = await audit(page, "desktop-accueil", "/", { width: 1440, height: 900 });
const mobile = await audit(page, "mobile-accueil", "/", { width: 390, height: 844 });
const convertir = await audit(page, "desktop-convertir", "/convertir", { width: 1440, height: 900 });

await browser.close();

const verdict = { ok: problems.length === 0, pages: [desktop, mobile, convertir], problems };
console.log(JSON.stringify(verdict, null, 2));
if (!verdict.ok) process.exitCode = 1;
