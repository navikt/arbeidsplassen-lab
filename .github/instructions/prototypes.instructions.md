---
applyTo: "src/app/prototyper/**/*.{ts,tsx,css}"
---

# Prototyper i Arbeidsplassen Lab

## Struktur (feature by package)

Hver prototype er en selvstendig pakke. Hold alt som hører sammen samlet:

- `page.tsx` — kun metadata og rendring av hovedkomponent.
- `_components/` — alle UI-komponenter. Én komponent per fil.
- `_mock/` — prototype-spesifikk mockdata (typede objekter).
- `_lib/` — typer og hjelpefunksjoner (valgfritt).

## Regler

- Implementer bare selve sideinnholdet.
- Ikke opprett eller importer en ny header, footer eller global navigasjon.
- Bruk det eksisterende applikasjonsskallet.
- Ikke opprett et nytt `main`-element dersom skallet allerede har ett.
- Bruk Aksel-komponenter når de dekker behovet.
- Lag custom komponenter bare når det er nødvendig for konseptet.
- Ikke gjør globale stilendringer for å løse et lokalt prototypebehov.
- Bruk lokale mockobjekter og lokal state.
- Ikke gjør nettverkskall.
- Ikke endre andre prototyper.
- Sørg for at prototypen er responsiv og tilgjengelig med tastatur.
- Legg prototypen til i prototypeoversikten (`src/app/prototyper/page.tsx`).

## Komponentdesign

- Én komponent per fil, navngi filen likt komponenten.
- Eksporter typer som andre kan trenge (f.eks. `FormData`-typer).
- Bruk props for data og callbacks — unngå tett kobling mellom komponenter.
- Tenk at komponenten skal kunne flyttes til et produksjonsrepo: hold
  avhengigheter eksplisitte og unngå implisitte koblinger til prototypekontekst.