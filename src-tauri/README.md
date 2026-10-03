# Hepta — Tauri

Ce dossier contient le shell natif **Tauri 2** pour Hepta Desktop et Android.

## Architecture

Hepta est un logiciel autonome. Le frontend Tauri est une **SPA locale** compilée depuis `index.tauri.html` et embarquée dans le binaire Tauri.

Le logiciel ne dépend d'aucun domaine web pour afficher la montre, le calendrier, le convertisseur, le Codex ou l'origine. Les réglages de l'origine sont persistés localement par Zustand.

Le serveur TanStack Start/Nitro existant reste la cible de la version web et n'est pas utilisé comme backend requis par les builds natifs.

## Build

Windows :

`npx --yes @tauri-apps/cli@2.12.1 build --ci`

Android :

`npx --yes @tauri-apps/cli@2.12.1 android init --ci`
`npx --yes @tauri-apps/cli@2.12.1 android build --ci --apk`

L'APK de release produit par Tauri est unsigned par défaut ; la CI le réaligne et le signe avec une clé Android de test générée dans le runner afin de fournir un APK directement installable pour les essais. Pour une distribution commerciale/Google Play, une vraie clé de release doit être configurée via les secrets CI, sans jamais être commitée.