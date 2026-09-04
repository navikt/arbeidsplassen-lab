# Figma Make med Arbeidsplassen Lab

Figma Make kan åpne den lokale Next.js-applikasjonen, endre den virkelige
koden og opprette en pull request. Bruk denne arbeidsflyten når resultatet skal
kunne gjennomgås og tas videre av frontendutviklere.

> **Tilgang:** «Make in your local codebase» er ifølge Figma foreløpig en
> lukket beta i Figma Beta-appen for Mac. Du må ha tilgang til funksjonen og
> GitHub-repoet.

## Før du starter

Du trenger:

- Figma Beta for Mac med tilgang til «Make in your local codebase»
- Git og tilgang til `navikt/arbeidsplassen-lab`
- Node-versjonen i `.nvmrc`, Corepack og pnpm
- lokal tilgang til `@navikt`-pakker i GitHub Packages

Klargjør en lokal kopi:

```bash
git clone https://github.com/navikt/arbeidsplassen-lab.git
cd arbeidsplassen-lab
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
```

Bruk en ren arbeidsmappe. Figma Make lagrer hver kodeendrende forespørsel som
en lokal commit, så ikke åpne en mappe med urelaterte endringer.

## Åpne prosjektet

1. Åpne Figma Beta og velg Make.
2. Velg **Open a folder** og pek på prosjektmappen. Du kan også klone repoet
   gjennom Figma Make hvis lokal pakkeautentisering allerede virker.
3. Start en ny sesjon og godkjenn kjøring av prosjektets oppsettsfiler.
4. Vent til forhåndsvisningen viser
   [http://localhost:3006](http://localhost:3006).
5. Opprett en branch i Figma Make, for eksempel `feature/nytt-filterkonsept`,
   før du ber om kodeendringer.
6. Be Make lese `Guidelines.md` og oppgi ruten du vil åpne.

Se gjennom diff og forhåndsvisning mellom større steg. Push branchen og opprett
pull request fra Figma Make når konseptet er klart for gjennomgang.

## Automatisk prosjektoppsett

Figma Make bruker fem filer i `.figma/make/`:

| Fil       | Hva den gjør                                                   |
|-----------|----------------------------------------------------------------|
| `setup`   | Kontrollerer Node 24 og velger prosjektets pnpm-versjon        |
| `install` | Installerer låste avhengigheter med pnpm                       |
| `dev`     | Starter Next.js på port 3006                                   |
| `verify`  | Venter på `/api/internal/isAlive` før forhåndsvisningen åpnes  |
| `env`     | Angir port, lokal URL, timeout og Figma Make-tilpasset Next.js-oppsett |

Filene er committed slik at hver ny sesjon og branch får samme oppsett. De
inneholder ingen tokens. Lokal pakkeautentisering må allerede være konfigurert.

Figma Make-miljøet slår av Next.js sin nye fragmentbaserte scroll-handler.
Handleren kan ellers vises som `InnerScrollHandlerNew` over hele ruteinnholdet,
slik at Make ikke klarer å velge elementene under. Endringen gjelder bare
serveren som startes av Figma Make.

## Retningslinjer i Make

`Guidelines.md` i roten er den korte kilden for prosjektregler. Be Make lese
filen ved starten av en kodebasesesjon.

Hvis du utforsker i en vanlig, frittstående Figma Make-fil uten repoet, laster
du opp `Guidelines.md` via **Code → guidelines → Upload**. Kode fra en slik
sandbox er et designutkast, ikke en ferdig pull request til dette repoet.

## Velg riktig arbeidsmåte

| Endring                                     | Bruk i Figma Make                                    |
|---------------------------------------------|------------------------------------------------------|
| Justere avstand, størrelse eller plassering | Pek på elementet eller bruk egenskapspanelet         |
| Endre én komponent eller tilstand           | Annoter elementet og beskriv ønsket effekt           |
| Lage en ny side eller variant               | Bruk chat med tydelig rute og akseptansekriterier    |
| Endre flere sider eller en hel flyt         | Bruk planmodus og godkjenn planen før implementering |

Hold én hypotese per branch. Hvis du vil prøve to tydelig forskjellige
retninger, bruk to branches eller to isolerte ruter.

## En god prompt

Ta med:

```text
Mål: Hva skal vi lære eller forbedre?
Utgangspunkt: Hvilken rute, komponent eller flyt skal brukes?
Plassering: Eksisterende normalrute eller ny rute under /prototyper?
Behold: Hvilke deler av layout, navigasjon og interaksjon skal ikke endres?
Data: Hvilke lokale tilstander og fiktive data trengs?
Referanser: Hvilke skjermbilder under docs/ skal brukes?
Ferdig når: Hvilke handlinger, bredder og tastatursteg skal fungere?
```

Eksempel:

> Les `Guidelines.md`. Lag et isolert alternativ til filterpanelet på
> `/stillinger` under `/prototyper/filterpanel-kompakt`. Behold Lab-headeren,
> resultatrekkefølgen og filterbegrepene. Bruk lokale, typede mockdata. Panelet
> skal fungere ved 375 og 1280 piksler og kunne betjenes med tastatur. Bruk
> skjermbildene i `docs/Dokumentasjon av sideflyter/Ledige stillinger flyt/`
> som referanse.

## Referanser og mockdata

- Oppgi den konkrete bildestien under `docs/` i prompten.
- Bruk produksjonsrepoet som referanse for layout og flytrekkefølge når det er
  tilgjengelig, men ikke kopier backend, autentisering eller produksjonsdata.
- Kort tekst kan ligge i komponenten; poster og lister skal være lokale,
  typede mockdata.
- Ringenes herre-inspirerte fantasynavn og tekst kan brukes i synlig
  mockinnhold. Behold nøytrale, domenebeskrivende navn i koden.
- Behold fagbegreper, feltetiketter og handlingsnavn realistiske hvis teksten
  ikke er en del av hypotesen.
- Bruk aldri ekte personer, bedrifter eller kontaktinformasjon.

## Kontroller før pull request

1. Gå gjennom hele den berørte flyten, ikke bare første side.
2. Kontroller 375, 768 og 1280 pikslers bredde.
3. Gå gjennom handlingene med tastatur og se etter synlig fokus.
4. Oppfrisk siden og kontroller eventuell `localStorage`-tilstand.
5. Kjør:

```bash
pnpm lint
pnpm exec stylelint 'src/**/*.css'
pnpm compileTS
pnpm test
pnpm build
```

Beskriv i pull requesten:

- mål eller hypotese
- endrede URL-er
- gjenbrukte og nye komponenter
- lokal state og mockdata
- bevisste avvik fra Aksel eller dagens løsning
- filer som bør tas videre til produksjonsrepoet

## Feilsøking

| Problem                     | Løsning                                                                         |
|-----------------------------|---------------------------------------------------------------------------------|
| Oppsettet stopper på Node   | Kjør `nvm install && nvm use`, og start sesjonen på nytt                        |
| `pnpm install` gir `401`    | Sett opp lokal GitHub Packages-tilgang; ikke legg token i repoet                |
| Forhåndsvisningen er tom    | Åpne `http://localhost:3006` manuelt og kontroller output fra `dev` og `verify` |
| Feil prosjekt vises         | Stopp andre servere på port 3006 og start en ny sesjon                          |
| Hele siden blir én valgflate | Hent siste versjon av repoet og start en ny sesjon, slik at oppdatert `env` leses |
| Make følger ikke reglene    | Be Make lese `Guidelines.md`, eller last filen opp i guidelines-mappen          |
| Mange uventede filer endres | Stopp, se gjennom git-diffen og gå tilbake til siste relevante Make-commit      |

Se også Figmas dokumentasjon om
[lokal kodebase](https://help.figma.com/hc/en-us/articles/40775535020695-Make-in-your-local-codebase)
og
[retningslinjer](https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make).
