# Arbeidsplassen Lab

Prototype-playground for [arbeidsplassen.no](https://arbeidsplassen.no). Brukes til raske konsepter, brukertesting og designutforskning.

> ⚠️ **Prototype** — dette er ikke en produksjonsapplikasjon. Ingen backend, ingen autentisering, ingen ekte data.

## Kjør lokalt

```bash
pnpm install
pnpm dev
```

Åpne [http://localhost:3006](http://localhost:3006).

## Sider

| Rute | Beskrivelse |
|------|-------------|
| `/` | Forsiden med hero og lenker |
| `/stillinger` | Stillingssøk med filtre og mockede annonser |
| `/stillinger/[id]` | Enkelt stillingsside |
| `/artikler/[slug]` | Artikkelside |
| `/ny-stilling` | Forenklet stillingsregistrering (3 steg) |
| `/prototyper` | Oversikt over prototyper |
| `/prototyper/eksempel` | Eksempelprototype |
| `/prototyper/ny-annonse` | Stillingsregistrering med 5 steg |

---

## Lag en ny prototype

Prototyper følger en **feature by package**-struktur. Alt som hører til en
prototype — komponenter, mockdata, typer og stiler — ligger samlet i én mappe.
Dette gjør det enkelt å løfte kode over til et produksjonsrepo når et konsept
skal realiseres.

### Mappestruktur

```text
src/app/prototyper/<prototype-navn>/
├── page.tsx              # Next.js route — metadata + rendrer hovedkomponent
├── _components/          # UI-komponenter (én per fil)
│   ├── Hovedflyt.tsx     # Orkestrator ("use client")
│   └── Delkomponent.tsx  # Fokusert komponent med tydelig ansvar
├── _mock/                # Mockdata for prototypen (valgfritt)
│   └── data.ts
└── _lib/                 # Typer og hjelpefunksjoner (valgfritt)
    └── types.ts
```

### Steg for steg

1. Opprett en mappe under `src/app/prototyper/`, f.eks. `nytt-stillingssok/`.
2. Legg til en `page.tsx` med metadata.
3. Plasser komponenter i `_components/` — én komponent per fil.
4. Bruk eksisterende Aksel-komponenter og applikasjonsskallet (header/footer).
5. Legg til en lenke fra `src/app/prototyper/page.tsx`.
6. Prototypen er automatisk tilgjengelig på `/prototyper/nytt-stillingssok`.

### Retningslinjer

- Bruk lokale mockdata og `useState` — ingen nettverkskall.
- Gjenbruk eksisterende komponenter før du lager nye.
- Ikke endre andre prototyper eller globale stiler uten avtale.
- Sørg for responsivitet og tastaturnavigasjon.
- Se `src/app/prototyper/ny-annonse/` som referanseeksempel.

---

## For designere (Figma Make)

Figma Make lar deg bruke AI til å endre kode direkte fra Figma, uten å skrive
kode selv. Se [docs/figma-make.md](docs/figma-make.md) for detaljert oppsett.

**Rask start:**

1. Klon repoet: `git clone git@github.com:navikt/arbeidsplassen-lab.git`
2. Installer: `pnpm install`
3. Start: `pnpm dev` → [localhost:3006](http://localhost:3006)
4. Koble Figma Make til prosjektmappen
5. Opprett en branch: `git checkout -b design/mitt-konsept`
6. Gjør endringer via AI i Figma — live preview oppdateres automatisk
7. Push og opprett en PR som utviklere kan gjennomgå

**Tips:**
- Start med å endre eksisterende sider eller kopiere en prototype.
- Nye konsepter legges under `src/app/prototyper/<navn>/`.
- Figma Make leser `Guidelines.md` for prosjektregler.

---

## For utviklere (Copilot / manuelt)

### Med GitHub Copilot

Copilot leser instruksjonene i `AGENTS.md` og `.github/instructions/` automatisk.
Gi en kort beskrivelse av hva du vil lage, så følger Copilot prosjektets
konvensjoner for struktur, Aksel-bruk og mockdata.

Eksempel-prompt:
> «Lag en prototype av et nytt filterpanel for stillingssøk med chips og
> fasetterte filtre. Legg den under /prototyper/nytt-filterpanel.»

### Manuelt

1. Opprett mappen `src/app/prototyper/<navn>/`.
2. Følg mappestrukturen beskrevet over.
3. Kjør `pnpm dev` for live preview.
4. Kjør `pnpm lint && pnpm compileTS` før du pusher.

---

## Tech stack

- **Next.js 16** (App Router)
- **Aksel Design System** (`@navikt/ds-react`, `@navikt/arbeidsplassen-react`)
- **TypeScript**, **pnpm**, **Biome**, **Vitest**
- **Node 24**

## Deploy

Deployes automatisk til dev-gcp ved merge til `main`.

- Ingress: `https://arbeidsplassen-lab.intern.dev.nav.no`
- Ingress: `https://arbeidsplassen-lab.ansatt.dev.nav.no`

### Ekstern tilgang for brukertesting

For å eksponere prototypen eksternt i en begrenset periode:

1. Gå til **Actions** → **Deploy with external ingress** → **Run workflow**
2. Velg `enable_external: true` → kjør
3. Prototypen er nå tilgjengelig på `https://arbeidsplassen-lab.ekstern.dev.nav.no`
4. Del URL-en med testdeltakere

**Kun `/brukertest/*` er tilgjengelig eksternt.** Middleware blokkerer all annen navigasjon på den eksterne ingressen. Legg brukertester under `src/app/brukertest/<test-navn>/`.

**Etter brukertesten:** Kjør den vanlige deploy-workflowen (push til `main`) eller trigger «Deploy with external ingress» med `enable_external: false`. Da deployes kun med interne ingresser igjen.

## Før første deploy

- [ ] Opprett repoet på GitHub under `navikt`
- [ ] Gi `arbeidsplassen`-teamet tilgang i Nais
- [ ] Verifiser at `NAIS_WORKLOAD_IDENTITY_PROVIDER` og `NAIS_MANAGEMENT_PROJECT_ID` er tilgjengelige som secrets/vars
- [ ] Kjør `pnpm install` for å generere `pnpm-lock.yaml`
- [ ] Push til `main` for å trigge første deploy

## Kvalitetssjekker

CI kjører automatisk på alle branches og PRer:
- **Lint**: `pnpm lint` (Biome)
- **Typecheck**: `pnpm compileTS`
- **Test**: `pnpm test`
