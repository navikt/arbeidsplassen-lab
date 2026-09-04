# Arbeidsplassen Lab

Frontendlab for produksjonsnære arbeidsplassen.no-konsepter. Hold løsninger
enkle, interaktive og lette å flytte til produksjonsrepoene.

## Grenser

- Ingen backend, nettverkskall, ekte autentisering eller produksjonsdata.
  Simuler alt med lokal kode og tilstand.
- Ingen tracking, PII, hemmeligheter eller ekte kontaktinformasjon.
- Bevar appskallet i `src/app/layout.tsx`. Ikke kopier header eller footer, og
  ikke opprett et nytt `main`-element.
- Undersøk relevant kode, mockdata og skjermbilder i `docs/` før endringer.
  Bruk tilgjengelig originalrepo som UI- og flytreferanse, aldri som datakilde.

## Plassering

- Eksisterende normalflyt eller oppgitt URL: endre tilhørende feature under `src/app/`.
- Nytt, isolert alternativ: bruk `src/app/prototyper/<navn>/` og oppdater
  `src/app/prototyper/page.tsx`. Sett `createdAt` til datoen prototypekortet legges
  til (`YYYY-MM-DD`), og vis datoen på norsk uten klokkeslett.
- Ekstern brukertest: bruk `src/app/brukertest/<navn>/` bare når det er eksplisitt ønsket.
- Del kode i `src/app/_common/` bare ved reell gjenbruk.
- Ikke endre andre konsepter eller globale stiler uten behov.

## Implementering

- Gjenbruk eksisterende komponenter og installerte Aksel-pakker før du lager nytt.
  Kontroller faktisk API; ikke finn på importer eller legg til andre UI-biblioteker.
- Hold en feature samlet i `_components/`, `_mock/`, `_lib/` og eventuelt `_state/`.
  Én fokusert komponent per fil. Bruk serverkomponenter som standard.
- Bruk Aksel-tokens og CSS Modules. Lag alle viktige handlinger interaktive.
- Sørg for responsiv layout, semantisk HTML, synlig fokus og tastaturnavigasjon.

## Data

- Kort visningstekst kan ligge i komponenten. Legg feature-data i `_mock/` og
  data som deles av flere sider i `src/mock/`.
- Bruk typede mockobjekter og lokal React-state. Bruk `localStorage` bare når
  tilstand skal overleve oppfriskning; gjenbruk eksisterende lagringsmønster.
- Ringenes herre-inspirert fantasytema kan brukes i synlig mockinnhold, aldri i
  kodeidentifikatorer. Behold fagbegreper og handlingsnavn realistiske.
- Bruk `example.invalid` og åpenbart ugyldige telefonnumre.

## Ferdig

- Legg til målrettede tester og kjør relevante kvalitetssjekker fra `package.json`.
- Oppsummer endrede URL-er, lokal lagring, designavvik og filer som bør tas
  videre til produksjonsrepoet.
