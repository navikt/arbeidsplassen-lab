# Arbeidsplassen Lab

Gjør ideer for [arbeidsplassen.no](https://arbeidsplassen.no) om til interaktive,
produksjonsnære frontendprototyper.

> **Prototype:** Applikasjonen har ingen backend, ekte autentisering eller
> produksjonsdata. Alt skjer lokalt i nettleseren.

## Innhold

- [Kom i gang](#kom-i-gang)
- [Velg arbeidsflyt](#velg-arbeidsflyt)
- [Sider og flyter](#sider-og-flyter)
- [Prosjektstruktur](#prosjektstruktur)
- [Mockdata og interaksjon](#mockdata-og-interaksjon)
- [Fra idé til produksjonskode](#fra-idé-til-produksjonskode)
- [Kvalitetssjekker](#kvalitetssjekker)
- [Teknologi](#teknologi)
- [Forvaltning](#forvaltning)
- [Deploy og brukertesting](#deploy-og-brukertesting)

## Kom i gang

**Forutsetninger:** Git, Node-versjonen i `.nvmrc` og Corepack.

```bash
git clone https://github.com/navikt/arbeidsplassen-lab.git
cd arbeidsplassen-lab
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Åpne [http://localhost:3006](http://localhost:3006).

Hvis installasjonen gir `401` fra `npm.pkg.github.com`, må lokal tilgang til
GitHub Packages for `@navikt` være satt opp. Ikke legg token eller `.npmrc` i
repoet.

## Velg arbeidsflyt

| Jeg skal | Start her |
|----------|------------|
| Utforske eller justere UI i Figma Make | [Figma Make med kodebasen](docs/figma-make.md) og `Guidelines.md` |
| Lage kode med GitHub Copilot eller en annen agent | `AGENTS.md` |
| Lage eller justere en prototype manuelt | Denne README-en og relevant feature under `src/app/` |
| Sammenligne med dagens løsning | Skjermbildene i `docs/` og relevant produksjonsrepo |

Bruk eksisterende rute når oppgaven gjelder en normal flyt eller en konkret
URL. Legg et nytt, isolert alternativ under
`src/app/prototyper/<prototype-navn>/`. Bruk `src/app/brukertest/` bare når
konseptet uttrykkelig skal eksponeres for ekstern brukertesting.

## Sider og flyter

| Rute | Innhold |
|------|---------|
| `/` | Forside for jobbsøkere og inngang til Lab-konsepter |
| `/bedrift` | Inngangsside for bedrifter |
| `/ung` | Jobber og råd for unge jobbsøkere |
| `/stillinger` | Interaktivt stillingssøk med filtre og lokale annonser |
| `/stillinger/favoritter` | Favoritter lagret lokalt i nettleseren |
| `/stillinger/lagrede-sok` | Navngitte søk lagret lokalt i nettleseren |
| `/stillinger/stilling/[id]` | Stillingsannonse og ulike søknadsformer |
| `/artikler/[slug]` | Lokale artikler |
| `/stillingsregistrering` | Simulert innlogging og Min bedriftsside |
| `/stillingsregistrering/stillingsannonser` | Arbeidsgivers lokale annonseoversikt |
| `/stillingsregistrering/rediger/[id]/steg/[steg]` | Produksjonslik stillingsregistrering i fem steg |
| `/prototyper` | Isolerte konsepter og alternative flyter |
| `/brukertest/*` | Sider som kan åpnes på den eksterne testinngangen |

## Prosjektstruktur

| Sti | Ansvar |
|-----|--------|
| `src/app/layout.tsx` | Felles appskall med header, footer, banner og `main` |
| `src/app/_common/` | Komponenter som faktisk deles av flere flyter |
| `src/app/<flyt>/` | Produksjonsnære normale sider og flyter |
| `src/app/prototyper/` | Nye eller alternative konsepter |
| `src/app/brukertest/` | Avgrensede sider for ekstern brukertesting |
| `src/mock/` | Mockdata som deles på tvers av flere sider |
| `docs/` | Skjermbilder og arbeidsflyter som brukes som referanse |
| `.figma/make/` | Oppsett som installerer og starter appen i Figma Make |

En feature samler normalt egne komponenter, typer, mockdata, tilstand og stiler i
private mapper som `_components/`, `_lib/`, `_mock/` og `_state/`. Se
`AGENTS.md` for de detaljerte kodereglene og
`/prototyper/eksempel` for et minimumseksempel.

## Mockdata og interaksjon

- Kort visningstekst kan hardkodes i komponenten.
- Poster og lister legges i feature-mappens `_mock/`; delte data legges i `src/mock/`.
- Bruk lokal React-state. Bruk `localStorage` når valg skal overleve oppfriskning.
- Simuler API-svar, innlogging og innsending. Ikke gjør nettverkskall.
- Bruk aldri ekte personer, bedrifter, kontaktinformasjon eller produksjonsdata.
- Ringenes herre-inspirerte fantasynavn og tekst kan brukes i synlig mockinnhold.
  Koden skal fortsatt ha nøytrale, domenebeskrivende navn.
- Behold fagbegreper, feltetiketter og handlingsnavn realistiske når teksten
  ikke er en del av konseptet som testes.
- Bruk `example.invalid` og tydelig ugyldige telefonnumre i kontaktdata.

## Fra idé til produksjonskode

1. Beskriv hypotesen og hvilken eksisterende flyt konseptet bygger på.
2. Avgrens rutene og tilstandene som må være interaktive.
3. Gjenbruk appskallet, Lab-komponenter og Aksel før du lager nytt.
4. Hold data og handlinger eksplisitte slik at komponentene kan flyttes.
5. Kontroller mobil, desktop og tastaturnavigasjon.
6. Opprett en pull request med endrede URL-er, designavvik og filene som skal
   tas videre.

Prototypen er et beslutningsgrunnlag, ikke produksjonskode i seg selv. Ved
overføring må teamet koble på produksjonsdata, autentisering, logging,
feilhåndtering og sikkerhet i det virkelige repoet.

## Kvalitetssjekker

```bash
pnpm lint
pnpm exec stylelint 'src/**/*.css'
pnpm compileTS
pnpm test
pnpm build
```

CI kjører lint, typesjekk og tester på branches og pull requests.

## Teknologi

- Next.js 16 med App Router og React 19
- TypeScript og pnpm
- Aksel og Arbeidsplassen-komponentene fra `@navikt`
- Biome, Stylelint og Vitest

## Forvaltning

Team arbeidsplassen forvalter repoet. Bruk en pull request for endringer som
skal deles, og la en frontendutvikler gjennomgå kode som er laget i Figma Make
eller av en kodeagent.

## Deploy og brukertesting

Merge til `main` deployer automatisk til:

- `https://arbeidsplassen-lab.intern.dev.nav.no`
- `https://arbeidsplassen-lab.ansatt.dev.nav.no`

For en tidsavgrenset ekstern brukertest:

1. Legg testen under `src/app/brukertest/<test-navn>/`.
2. Kjør **Deploy with external ingress** i GitHub Actions med
   `enable_external: true`.
3. Del en URL under `https://arbeidsplassen-lab.ekstern.dev.nav.no/brukertest/`.
4. Kjør workflowen på nytt med `enable_external: false` etter testen.

Middleware blokkerer alle andre ruter på den eksterne ingressen.
