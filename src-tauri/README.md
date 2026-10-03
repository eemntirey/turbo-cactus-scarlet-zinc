# Hepta — Tauri

Ce dossier contient le shell natif Tauri 2 pour Windows et Android.

L’application actuelle utilise TanStack Start + Nitro/SSR. Tauri est donc utilisé comme conteneur natif et charge l’URL HTTPS publique de l’application au moment du build. Cela évite de désactiver ou de dupliquer le backend SSR pour fabriquer une fausse version locale.

La CI demande une URL `HEPTA_APP_URL` lors du lancement manuel du workflow. Une URL HTTPS valide est obligatoire pour fabriquer un APK ou un installateur qui ouvre le bon déploiement.
