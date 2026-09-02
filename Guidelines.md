# Arbeidsplassen Lab

Korte retningslinjer for Figma Make. Les relevant kode og skjermbilder i
`docs/` før du endrer noe.

## Omfang

- Endre eksisterende feature for en normalflyt eller oppgitt URL.
- Legg isolerte alternativer i `src/app/prototyper/<navn>/` og oppdater oversikten.
- Bruk `src/app/brukertest/<navn>/` bare når ekstern testing er eksplisitt ønsket.
- Bevar appskallet fra `src/app/layout.tsx`; ikke lag header, footer eller `main`.
- Bruk planmodus for endringer på tvers av flere sider. Ikke endre annet samtidig.

## Kode

- Gjenbruk Lab-komponenter og installert Aksel. Ikke legg til andre UI-biblioteker.
- Hold featuren samlet; bruk CSS Modules og unngå globale stilendringer.
- Sørg for responsivitet, semantisk HTML, synlig fokus og tastaturnavigasjon.
- Bruk lokale, typede mockdata og lokal state. Ingen nettverkskall, backend,
  ekte autentisering, tracking, PII, hemmeligheter eller produksjonsdata.
- Bruk `localStorage` bare når tilstand skal overleve oppfriskning.
- Fantasytema kan brukes i synlig mockinnhold, aldri i kodeidentifikatorer.
  Behold fagbegreper realistiske og bruk `example.invalid` for kontaktdata.

## Levering

- Kontroller hele flyten på mobil, desktop og med tastatur.
- Kjør relevante scripts i `package.json`.
- Beskriv URL-er, lokal lagring og bevisste designavvik i pull requesten.