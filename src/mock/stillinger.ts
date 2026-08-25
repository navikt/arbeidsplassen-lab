import type { Stilling } from "@/types/stilling";

export const mockStillinger: Stilling[] = [
    {
        id: "1a2b3c4d-0001",
        title: "Seniorutvikler – fullstack",
        jobTitle: "Seniorutvikler",
        employer: { name: "Nav IT", sector: "Offentlig" },
        location: { city: "Oslo", county: "Oslo" },
        description: `<p>Vi søker en erfaren fullstack-utvikler til vårt team som jobber med digitalisering av offentlige tjenester.</p>
<h2>Arbeidsoppgaver</h2>
<ul>
<li>Utvikle og vedlikeholde moderne webapplikasjoner med React og Kotlin</li>
<li>Bidra til tekniske beslutninger og arkitekturvalg</li>
<li>Samarbeide tett med designere og produkteiere</li>
<li>Dele kunnskap og veilede kollegaer</li>
</ul>
<h2>Kvalifikasjoner</h2>
<ul>
<li>Minimum 5 års erfaring med webutvikling</li>
<li>God kjennskap til React, TypeScript og moderne frontend-verktøy</li>
<li>Erfaring med backend-utvikling i Kotlin eller Java</li>
<li>Interesse for universell utforming og brukervennlighet</li>
</ul>
<h2>Vi tilbyr</h2>
<ul>
<li>Fleksibel arbeidstid og mulighet for hjemmekontor</li>
<li>Faglig utvikling og konferanser</li>
<li>Gode pensjons- og forsikringsordninger</li>
</ul>`,
        qualifications: ["React", "TypeScript", "Kotlin", "REST API"],
        published: "2026-08-20T08:00:00Z",
        applicationDue: "2026-09-15",
        engagementType: "Fast",
        extent: ["Heltid"],
        workday: ["Dagtid"],
        workHours: ["Fleksitid"],
        remote: "Hybridkontor",
        contactList: [{ name: "Kari Nordmann", title: "Teamleder", email: "kari.nordmann@nav.no", phone: "99887766" }],
        source: "DIR",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0002",
        title: "UX-designer",
        employer: { name: "Digitaliseringsdirektoratet", sector: "Offentlig" },
        location: { city: "Oslo", county: "Oslo" },
        description: `<p>Vi søker en kreativ UX-designer som brenner for å lage gode brukeropplevelser i offentlig sektor.</p>
<h2>Arbeidsoppgaver</h2>
<ul>
<li>Planlegge og gjennomføre brukertester</li>
<li>Designe brukergrensesnitt i Figma</li>
<li>Samarbeide med utviklere om implementering</li>
</ul>`,
        published: "2026-08-22T10:00:00Z",
        applicationDue: "2026-09-20",
        engagementType: "Fast",
        extent: ["Heltid"],
        remote: "Hybridkontor",
        contactList: [{ name: "Ola Hansen", title: "Designleder" }],
        source: "DIR",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0003",
        title: "Butikkmedarbeider – Kiwi Grünerløkka",
        employer: { name: "Kiwi Norge AS", sector: "Privat" },
        location: { city: "Oslo", county: "Oslo" },
        description: `<p>Vi søker en trivelig og serviceinnstilt butikkmedarbeider til vår butikk på Grünerløkka.</p>
<h2>Arbeidsoppgaver</h2>
<ul>
<li>Kundeservice og kassaarbeid</li>
<li>Varepåfylling og orden i butikken</li>
<li>Mottak av varer</li>
</ul>`,
        published: "2026-08-23T06:00:00Z",
        applicationDue: "2026-09-01",
        engagementType: "Fast",
        extent: ["Deltid"],
        workday: ["Dagtid", "Kveld"],
        remote: "Ikke aktuelt",
        source: "STILLINGSOLANSEN",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0004",
        title: "Sykepleier – medisinsk avdeling",
        employer: { name: "Oslo universitetssykehus", sector: "Offentlig" },
        location: { city: "Oslo", county: "Oslo" },
        description: `<p>Oslo universitetssykehus søker sykepleier til medisinsk avdeling.</p>
<h2>Kvalifikasjoner</h2>
<ul>
<li>Norsk autorisasjon som sykepleier</li>
<li>Gode norskkunnskaper</li>
<li>Erfaring fra sykehus er en fordel</li>
</ul>`,
        published: "2026-08-18T09:00:00Z",
        applicationDue: "2026-09-10",
        engagementType: "Fast",
        extent: ["Heltid"],
        workday: ["Skift"],
        remote: "Ikke aktuelt",
        contactList: [{ name: "Anne Sykepleieleder", title: "Avdelingsleder", phone: "22334455" }],
        source: "DIR",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0005",
        title: "Regnskapsfører",
        employer: { name: "BDO AS", sector: "Privat" },
        location: { city: "Bergen", county: "Vestland" },
        description: `<p>BDO Bergen søker en nøyaktig og strukturert regnskapsfører.</p>
<h2>Arbeidsoppgaver</h2>
<ul>
<li>Bokføring og årsoppgjør</li>
<li>Rådgivning til kunder</li>
<li>MVA-rapportering</li>
</ul>`,
        published: "2026-08-21T07:00:00Z",
        applicationDue: "2026-09-12",
        engagementType: "Fast",
        extent: ["Heltid"],
        remote: "Hybridkontor",
        source: "FINN",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0006",
        title: "Tømrer – nybygg",
        employer: { name: "Veidekke ASA", sector: "Privat" },
        location: { city: "Trondheim", county: "Trøndelag" },
        description: `<p>Veidekke søker tømrere til boligprosjekter i Trondheim-området.</p>
<h2>Vi tilbyr</h2>
<ul>
<li>Konkurransedyktig lønn</li>
<li>Godt arbeidsmiljø</li>
<li>Faglig utvikling</li>
</ul>`,
        published: "2026-08-19T08:00:00Z",
        applicationDue: "2026-09-05",
        engagementType: "Fast",
        extent: ["Heltid"],
        workday: ["Dagtid"],
        remote: "Ikke aktuelt",
        source: "DIR",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0007",
        title: "Sommerjobb – kundeservice",
        employer: { name: "Telenor Norge AS", sector: "Privat" },
        location: { city: "Fornebu", county: "Akershus" },
        description: `<p>Telenor søker studenter til sommerjobb i kundeservice. God mulighet for arbeidserfaring!</p>`,
        published: "2026-08-24T08:00:00Z",
        applicationDue: "2026-10-01",
        engagementType: "Vikariat",
        extent: ["Heltid"],
        workday: ["Dagtid"],
        remote: "Hybridkontor",
        source: "FINN",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0008",
        title: "Lærer – ungdomsskole",
        employer: { name: "Tromsø kommune", sector: "Offentlig" },
        location: { city: "Tromsø", county: "Troms" },
        description: `<p>Tromsø kommune søker engasjert lærer til ungdomsskole med oppstart januar 2027.</p>
<h2>Kvalifikasjoner</h2>
<ul>
<li>Godkjent lærerutdanning</li>
<li>Undervisningskompetanse i norsk og/eller matematikk</li>
</ul>`,
        published: "2026-08-17T10:00:00Z",
        applicationDue: "2026-09-30",
        engagementType: "Fast",
        extent: ["Heltid"],
        workday: ["Dagtid"],
        remote: "Ikke aktuelt",
        source: "DIR",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0009",
        title: "Kokk – restaurant",
        employer: { name: "Maaemo", sector: "Privat" },
        location: { city: "Oslo", county: "Oslo" },
        description: `<p>Maaemo søker en dyktig kokk til vårt kjøkkenteam.</p>`,
        published: "2026-08-15T12:00:00Z",
        applicationDue: "2026-09-08",
        engagementType: "Fast",
        extent: ["Heltid"],
        workday: ["Kveld"],
        remote: "Ikke aktuelt",
        source: "FINN",
        status: "ACTIVE",
    },
    {
        id: "1a2b3c4d-0010",
        title: "Data scientist – maskinlæring",
        employer: { name: "Equinor ASA", sector: "Privat" },
        location: { city: "Stavanger", county: "Rogaland" },
        description: `<p>Equinor søker data scientist med erfaring innen maskinlæring og stordata.</p>
<h2>Arbeidsoppgaver</h2>
<ul>
<li>Utvikle og implementere ML-modeller</li>
<li>Analysere store datasett</li>
<li>Samarbeide med domeneeksperter</li>
</ul>`,
        qualifications: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        published: "2026-08-16T09:00:00Z",
        applicationDue: "2026-09-25",
        engagementType: "Fast",
        extent: ["Heltid"],
        remote: "Hybridkontor",
        contactList: [{ name: "Per Olsen", title: "Seksjonsleder", email: "per.olsen@equinor.com" }],
        source: "DIR",
        status: "ACTIVE",
    },
];
