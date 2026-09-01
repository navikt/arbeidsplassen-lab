import type { Artikkel } from "@/types/artikkel";

export const mockArtikler: Artikkel[] = [
    {
        slug: "tips-til-jobbsoknaden",
        title: "Tips til jobbsøknaden",
        description: "Les våre tips om hvordan skrive søknaden slik at en arbeidsgiver får lyst til å møte deg.",
        body: `
<h2>Tilpass søknaden til stillingen</h2>
<p>Det viktigste du kan gjøre er å tilpasse søknaden til den konkrete stillingen du søker på. Les stillingsannonsen nøye og vis at du forstår hva arbeidsgiveren ser etter.</p>

<h2>Vis hvem du er</h2>
<p>En jobbsøknad handler ikke bare om kompetanse. Arbeidsgivere vil også vite hvem du er som person. Fortell om motivasjonen din og hva du brenner for.</p>

<h2>Vær konkret</h2>
<p>Bruk konkrete eksempler fra tidligere jobber, studier eller frivillig arbeid. Vage formuleringer som «jeg er en lagspiller» sier lite uten kontekst.</p>

<h2>Hold det kort</h2>
<p>En god jobbsøknad er sjelden lenger enn én side. Vær presis og kom til poenget raskt.</p>

<h2>Sjekk for feil</h2>
<p>Les gjennom søknaden flere ganger, og be gjerne noen andre lese den også. Skrivefeil og dårlig formatering gir et uprofesjonelt inntrykk.</p>
        `,
    },
    {
        slug: "om-arbeidsplassen",
        title: "Om arbeidsplassen.no",
        description: "Arbeidsplassen.no samler alle ledige jobber på ett sted.",
        body: `
<h2>Hva er arbeidsplassen.no?</h2>
<p>Arbeidsplassen.no er en gratis tjeneste fra Nav som samler ledige stillinger fra hele Norge. Her kan jobbsøkere finne jobber, og arbeidsgivere kan lyse ut stillinger kostnadsfritt.</p>

<h2>For jobbsøkere</h2>
<p>Søk blant tusenvis av ledige stillinger. Du kan filtrere på sted, yrke, omfang og mye mer. Opprett gjerne en bruker for å lagre søk og få varsler om nye stillinger.</p>

<h2>For arbeidsgivere</h2>
<p>Registrer bedriften din og lys ut stillinger gratis. Du kan også bruke superrask søknad for å gjøre det enklere for kandidater å melde sin interesse.</p>
        `,
    },
    {
        slug: "kontakt-oss",
        title: "Kontakt oss",
        description: "Har du spørsmål om arbeidsplassen.no? Her finner du kontaktinformasjon.",
        body: `
<h2>Kontakt oss</h2>
<p>Har du spørsmål om arbeidsplassen.no, kan du ta kontakt med oss.</p>

<h2>For jobbsøkere</h2>
<p>Trenger du hjelp med å søke jobb eller bruke tjenesten? Ring Nav på 55 55 33 33.</p>

<h2>For arbeidsgivere</h2>
<p>Trenger du hjelp med å lyse ut stillinger eller administrere annonser? Ring arbeidsgivertelefonen på 55 55 33 36.</p>

<h2>Tekniske problemer</h2>
<p>Opplever du tekniske problemer med nettsiden? Send oss en e-post til <a href="mailto:arbeidsplassen@nav.no">arbeidsplassen@nav.no</a>.</p>
        `,
    },
];
