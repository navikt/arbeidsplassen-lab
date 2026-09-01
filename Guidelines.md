# Arbeidsplassen Lab

Disse retningslinjene gjelder Figma Make. De er korte med vilje: undersøk
eksisterende kode før du fyller inn detaljer selv.

## Før du gjør en endring

- Forstå målet, hvilken flyt som berøres og hvilke sider som skal henge sammen.
- Les relevant kode og skjermbilder i `docs/` før du foreslår en løsning.
- Bruk planmodus før endringer som går over flere sider eller endrer en hel flyt.
- Behold oppgaven avgrenset. Ikke rydd eller redesign andre deler samtidig.

## Plassering og appskall

- Endre eksisterende feature under `src/app/` når oppgaven gjelder en normalflyt
  eller en konkret eksisterende URL.
- Legg nye, alternative konsepter i `src/app/prototyper/<navn>/`.
- Legg nye konsepter til i oversikten i `src/app/prototyper/page.tsx`.
- Bruk `src/app/brukertest/<navn>/` bare når ekstern brukertesting er uttrykkelig ønsket.
- Bevar header, footer, navigasjon, prototypebanner og hoppelenke fra
  `src/app/layout.tsx`.
- Ikke lag et nytt `main`-element.
- Legg bare sideinnholdet mellom eksisterende header og footer.

## Komponenter og design

- Gjenbruk komponenter i prosjektet før du lager nye.
- Bruk Aksel-komponenter og -tokens fra de installerte `@navikt`-pakkene.
- Undersøk eksisterende bruk og faktisk komponent-API. Ikke finn på importer eller props.
- Ikke installer et annet komponentbibliotek.
- Bruk responsiv layout, semantisk HTML, synlig fokus og tastaturnavigasjon.
- Hold lokale stiler i CSS Modules. Ikke endre globale stiler uten at oppgaven krever det.

## Kode og data

- Hold en feature samlet i `_components/`, `_mock/`, `_lib/` og eventuelt `_state/`.
- Bruk én fokusert komponent per fil og domenebeskrivende navn i koden.
- Bruk lokale, typede mockdata og lokal React-state. Ikke gjør nettverkskall.
- Bruk `localStorage` bare når tilstand skal overleve en oppfriskning.
- Ikke legg til backend, ekte autentisering, tracking, PII, hemmeligheter eller produksjonsdata.
- Ringenes herre-inspirerte fantasynavn og tekst kan brukes i synlig mockinnhold.
  Ikke bruk fantasytemaet i navn på filer, komponenter, funksjoner, variabler eller typer.
- Behold fagbegreper, feltetiketter og handlingsnavn realistiske hvis teksten
  ikke er en del av konseptet som testes.
- Bruk `example.invalid` og åpenbart ugyldige telefonnumre for kontaktdata.

## Før du leverer

- Kontroller den berørte flyten i mobil- og desktopbredde og med tastatur.
- Kjør `pnpm lint`, `pnpm exec stylelint 'src/**/*.css'`, `pnpm compileTS`,
  `pnpm test` og `pnpm build`.
- Beskriv endrede URL-er, gjenbrukte og nye komponenter, lokale
  lagringsvalg og bevisste designavvik i pull requesten.