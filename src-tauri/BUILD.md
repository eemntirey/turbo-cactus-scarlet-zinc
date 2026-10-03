# Distribution Hepta

La branche `tauri-packaging` produit des applications autonomes.

## Windows

Artefact CI :
`hepta-windows`

Sortie :
`src-tauri/target/release/bundle/nsis/*.exe`

## Android

Artefact CI :
`hepta-android-apk`

Sortie finale :
`Hepta-Android.apk`

## Principe

Le frontend destiné aux applications natives est compilé par `tauri.vite.config.ts` vers `dist-tauri/`, puis embarqué par Tauri.

Aucune URL web publique n'est nécessaire pour afficher ou utiliser l'application native.
