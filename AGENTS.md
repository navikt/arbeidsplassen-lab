# Arbeidsplassen Lab

Arbeidsplassen Lab er en frontend for rask konseptutvikling. Den etterligner
sentrale sider og flyter på arbeidsplassen.no, men bruker bare lokal kode og
fiktive data. Målet er å prøve ideer raskt og gjøre god frontendkode enkel å
flytte videre til de virkelige repoene.

## Absolutte grenser

- GitHub-repoet er fasiten for hva laben inneholder.
- Ikke koble til backend, produksjons-API-er, autentisering eller produksjonsdata.
- Ikke send eller spor data. Ikke legg inn PII, hemmeligheter eller ekte kontaktinformasjon.
- Simuler innlogging, API-svar og lagring lokalt når en flyt trenger det.
- Bevar appskallet i `src/app/layout.tsx`: header, footer, banner, hoppelenke og
  det eneste `main`-elementet opprettes der.

## Før du endrer kode

1. Les oppgaven og finn ut hvilken side eller flyt konseptet bygger på.
2. Undersøk relevant rute, delte komponenter, mockdata og skjermbilder i `docs/`.
3. Søk etter eksisterende komponenter i laben og Aksel før du lager noe nytt.
4. Hvis originalrepoet er tilgjengelig, bruk det som referanse for layout,
   begreper og rekkefølge. Ikke kopier integrasjoner, autentisering eller ekte data.
5. Avklar gjennom koden om oppgaven skal endre en normal flyt eller være et
   isolert alternativ.

## Velg riktig plassering

| Oppgave                                               | Plassering                                                             |
|-------------------------------------------------------|------------------------------------------------------------------------|
| Endre en eksisterende normalflyt eller en oppgitt URL | Endre den eksisterende feature-mappen under `src/app/`                 |
| Utforske et nytt eller alternativt konsept isolert    | `src/app/prototyper/<prototype-navn>/`                                 |
| Lage en test som skal kunne åpnes på ekstern ingress  | `src/app/brukertest/<test-navn>/`, bare når dette er eksplisitt ønsket |
| Dele kode mellom flere flyter                         | `src/app/_common/`, bare når gjenbruket er reelt                       |

Ikke flytt normale flyter inn under `/prototyper` bare fordi de bruker mockdata.
Ikke endre andre konsepter eller globale stiler uten at oppgaven krever det.
Legg nye isolerte konsepter til i `src/app/prototyper/page.tsx`.

## Feature-struktur

Hold en flyt samlet slik at den kan flyttes til et produksjonsrepo:

```text
src/app/<flyt-eller-prototype>/
├── page.tsx
├── _components/
│   ├── Hovedflyt.tsx
│   └── Delkomponent.tsx
├── _mock/
│   └── data.ts
├── _lib/
│   └── types.ts
└── _state/
    └── FlytProvider.tsx
```

- Bruk bare mappene flyten trenger.
- La `page.tsx` inneholde metadata og enkel komposisjon.
- Bruk serverkomponenter som standard. Legg `"use client"` nærmest mulig interaksjonen.
- Ha én fokusert komponent per fil, og gi filen samme navn som komponenten.
- Eksporter typer som trengs ved senere overføring.
- Gi komponenter data og handlinger via props fremfor skjulte koblinger til mockmiljøet.

## Komponenter og visuell utforming

- Bruk eksisterende Lab-komponenter først.
- Bruk Aksel fra `@navikt/ds-react`, `@navikt/aksel-icons` og
  `@navikt/arbeidsplassen-react` før du lager egne UI-primitiver.
- Kontroller installert API og eksisterende bruk før du skriver importer. Ikke
  finn på komponentnavn eller props.
- Bruk Aksel-tokens og layoutprimitiver fremfor tilfeldige farger og avstander.
- Samlokaliser nødvendig CSS i en `*.module.css`-fil. Unngå globale stilendringer.
- Behold produksjonslik layout og begrepsbruk, men hold implementasjonen enkel.
- Dokumenter bevisste avvik når selve avviket er hypotesen som skal testes.

## Mockdata og lokal tilstand

- Kort, fast visningstekst kan ligge direkte i komponenten.
- Legg poster, lister og flytdata i feature-mappens `_mock/`.
- Bruk `src/mock/` bare når de samme dataene deles av flere sider eller flyter.
- Bruk typede objekter. Ikke gjør nettverkskall, heller ikke til et lokalt API.
- Bruk lokal React-state for en økt. Bruk `localStorage` bare når valget skal
  overleve en oppfriskning, og valider og versjoner data som leses tilbake.
- Fiktive navn og innhold kan ha et Ringenes herre-inspirert fantasytema.
  Dette gjelder bare synlig mockdata og hardkodet innhold, ikke navn på
  komponenter, funksjoner, typer, variabler eller mapper.
- Behold etablerte fagbegreper, feltetiketter og handlingsnavn realistiske med
  mindre teksten er en del av hypotesen som skal testes.
- Bruk tydelig ugyldige kontaktverdier som `example.invalid` og `00000000`.

## Interaksjon og kvalitet

- Alle viktige handlinger skal fungere i prototypen, ikke bare se riktige ut.
- Bruk semantisk HTML, synlig fokus, tilgjengelige navn og full tastaturnavigasjon.
- Kontroller minst mobil og desktop. Unngå horisontal scrolling og avkuttet tekst.
- Legg til målrettede tester for kjernelogikk, filtrering, validering og lagring.
- Bevar eksisterende URL-er og data-ID-er når en endring ellers ville ødelagt
  bokmerker eller lokalt lagret tilstand.

Kjør før levering:

```bash
pnpm lint
pnpm exec stylelint 'src/**/*.css'
pnpm compileTS
pnpm test
pnpm build
```

## Levering

Oppsummer:

- URL-en eller URL-ene som ble opprettet eller endret
- eksisterende komponenter som ble gjenbrukt
- nye komponenter og mockfiler
- hva som lagres lokalt
- bevisste avvik fra Aksel eller dagens flyt
- filene som er relevante når konseptet skal flyttes til produksjonsrepoet
