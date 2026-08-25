# Figma Make — arbeidsflyt

## Hva er Figma Make?

Figma Make lar designere bruke AI til å endre kode direkte fra Figma. Endringene gjøres i en lokal kopi av prosjektet og kan sendes som en pull request.

## Oppsett

### 1. Klon repoet

```bash
git clone git@github.com:navikt/arbeidsplassen-lab.git
cd arbeidsplassen-lab
```

### 2. Installer avhengigheter

```bash
pnpm install
```

### 3. Start utviklingsserveren

```bash
pnpm dev
```

Applikasjonen kjører nå på [http://localhost:3006](http://localhost:3006).

### 4. Koble Figma Make

1. Åpne Figma og aktiver «Make in your local codebase»
2. Pek Figma Make til prosjektmappen
3. Figma Make leser `.figma/make/config.json` for å forstå prosjektstrukturen

## Arbeidsflyt

1. **Opprett en branch**: `git checkout -b design/mitt-konsept`
2. **Gjør endringer**: Bruk Figma Make til å endre sider eller komponenter
3. **Se endringer live**: Utviklingsserveren oppdateres automatisk
4. **Commit og push**: `git add . && git commit -m "design: mitt konsept" && git push`
5. **Opprett PR**: Lag en pull request på GitHub som frontendutviklere kan gjennomgå

## Tips

- Start med å endre eksisterende sider før du lager nye
- Hold deg til Aksel-komponenter (`@navikt/ds-react`) for konsistent utseende
- Plasser nye konsepter under `src/app/prototyper/ditt-konsept/`
- Se `src/app/prototyper/eksempel/` for anbefalt struktur

## Filstruktur

Figma Make har tilgang til filer som matcher `.figma/make/config.json`:

```
src/**/*.tsx    — React-komponenter og sider
src/**/*.ts     — TypeScript-logikk og typer
src/**/*.css    — Stilark
```

Testfiler (`*.test.*`) og `node_modules` er ekskludert.
