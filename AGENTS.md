# Arbeidsplassen Lab

Arbeidsplassen Lab er en selvstendig prototypeapplikasjon som etterligner
sentrale deler av arbeidsplassen.no. Den brukes til konseptutvikling,
demonstrasjoner og brukertesting.

## Prinsipper

- GitHub-repositoryet er fasiten.
- Applikasjonen skal ikke kobles til backend, autentisering eller produksjonsdata.
- Bruk lokale, typede mockdata når en prototype trenger data.
- Bevar eksisterende header, footer, navigasjon og overordnet layout.
- Nye prototyper skal normalt bare endre innholdet mellom header og footer.
- Ikke kopier header eller footer inn i den enkelte prototypen.
- Ikke legg til et nytt `main`-element dersom applikasjonsskallet allerede rendrer `main`.
- Bruk eksisterende komponenter i Arbeidsplassen Lab før du lager nye.
- Bruk Aksel-komponenter fra `@navikt/ds-react` og `@navikt/arbeidsplassen-react`.
- Lag en egen komponent når Aksel ikke dekker konseptet eller når avviket er en
  bevisst del av det som skal testes.
- Ikke endre delte komponenter for å tilpasse én prototype uten at det er eksplisitt ønsket.
- Prototyper skal være responsive og kunne brukes med tastatur.
- Ikke legg inn tracking eller send innhold noe sted.
- Alle data er hardkodet i `src/mock/`. Ingen nettverkskall.
- Ingen autentisering, ingen PII, ingen hemmeligheter.

## Nye prototyper

Plasser nye konsepter under `src/app/prototyper/<prototype-navn>`.

### Mappestruktur (feature by package)

Hver prototype skal være en selvstendig pakke som kan løftes ut til et
produksjonsrepo med minimalt arbeid. Strukturen:

```text
src/app/prototyper/<prototype-navn>/
├── page.tsx                    # Next.js route (metadata + rendrer hovedkomponent)
├── _components/                # Alle UI-komponenter for prototypen
│   ├── <Hovedflyt>.tsx         # Orkestrator / hovedkomponent ("use client")
│   ├── <Delkomponent>.tsx      # Selvstendige komponenter med tydelig ansvar
│   └── <Delkomponent>.module.css  # CSS Modules ved behov (samlokalisert)
├── _mock/                      # Mockdata spesifikt for denne prototypen
│   └── data.ts                 # Typede mockobjekter
└── _lib/                       # Hjelpefunksjoner og typer (valgfritt)
    └── types.ts
```

Konvensjoner:
- Eksporter typer fra komponentfilene eller `_lib/types.ts` — dette gjør det
  enkelt å gjenbruke typene i produksjonskode.
- Én komponent per fil. Gi filen samme navn som komponenten.
- Hold komponenter små og fokuserte — ett ansvar per komponent.
- Bruk `_mock/` for prototype-spesifikk data. Bruk `src/mock/` bare for data
  som deles på tvers av flere sider.
- Prefiks private mapper med `_` slik at Next.js ikke eksponerer dem som ruter.

### Før implementering

1. Undersøk eksisterende layout, komponenter og mockdata.
2. Avklar hvilken eksisterende side eller brukerflyt prototypen bygger på.
3. Gjenbruk applikasjonsskallet og relevante komponenter.
4. Implementer prototypen på en egen route uten å ødelegge eksisterende konsepter.
5. Kontroller responsivitet, tastaturnavigasjon og prosjektets kvalitetssjekker.

### Etter implementering

Agenten skal oppsummere:

- URL til prototypen.
- Hvilke eksisterende komponenter som ble gjenbrukt.
- Hvilke nye komponenter som ble laget.
- Eventuelle bevisste avvik fra Aksel eller eksisterende design.
- Hvilke filer som er relevante for overføring til produksjon.
