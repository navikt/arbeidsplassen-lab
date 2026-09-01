export type LandingTone = "blue" | "green" | "peach" | "pink";

export type LandingIllustration =
    | "celebrating"
    | "envelope"
    | "figures-high-five"
    | "figures-side-by-side"
    | "magnifier"
    | "waving"
    | "worried";

export type LandingHeroData = {
    id: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    ctaIcon?: "search";
    illustration: LandingIllustration;
};

export type LandingCardData = {
    title: string;
    description: string;
    href: string;
    tone: LandingTone;
    illustration?: LandingIllustration;
};

export const jobseekerLanding = {
    hero: {
        id: "jobbsoker-hero",
        title: "Alle ledige jobber, samlet på én plass",
        description: "Å lete etter jobb skal være enkelt. Fra deltid til direktør, finn jobben som passer for deg.",
        ctaLabel: "Søk etter jobber",
        ctaHref: "/stillinger",
        ctaIcon: "search",
        illustration: "figures-side-by-side",
    },
    youngHighlight: {
        title: "Er du ung og vil jobbe?",
        description:
            "Leter du etter din første jobb, deltid eller lærlingplass? Her finner du jobber for unge og hjelp til å søke.",
        href: "/ung",
        tone: "blue",
        illustration: "waving",
    },
    editorialCards: [
        {
            title: "Superrask søknad",
            description: "En enklere måte å komme i kontakt med bedrifter.",
            href: "/stillinger",
            tone: "blue",
            illustration: "envelope",
        },
        {
            title: "Tips til jobbsøknaden",
            description: "Les våre tips om hvordan du skriver en søknad som gjør at arbeidsgiveren vil møte deg.",
            href: "/artikler/tips-til-jobbsoknaden",
            tone: "green",
            illustration: "celebrating",
        },
        {
            title: "Jobbe i utlandet?",
            description: "Finn en jobb i EU- og EØS-området gjennom den europeiske jobbmobilitetsportalen EURES.",
            href: "/stillinger",
            tone: "peach",
            illustration: "magnifier",
        },
    ],
    relatedLinks: [
        {
            title: "Karriereveiledning.no",
            description: "Få gratis veiledning og verktøy som hjelper deg med å søke jobb.",
            href: "https://karriereveiledning.no",
            tone: "peach",
        },
        {
            title: "Utdanning.no",
            description: "Finn informasjon om utdanning, karriere og yrker.",
            href: "https://utdanning.no",
            tone: "peach",
        },
    ],
} satisfies {
    hero: LandingHeroData;
    youngHighlight: LandingCardData;
    editorialCards: LandingCardData[];
    relatedLinks: LandingCardData[];
};

export const companyLanding = {
    hero: {
        id: "bedrift-hero",
        title: "Enkel jobbutlysning, kostnadsfritt",
        description: "Kom raskt i kontakt med kvalifiserte jobbsøkere.",
        ctaLabel: "Gå til min bedriftsside",
        ctaHref: "/stillingsregistrering",
        illustration: "figures-high-five",
    },
    quickLinks: [
        {
            title: "Lag ny stillingsannonse",
            description: "Gjør deg synlig i et av Norges største stillingssøk.",
            href: "/stillingsregistrering",
            tone: "peach",
        },
        {
            title: "Ønsker du å rekruttere flyktninger?",
            description: "Ta kontakt for råd om hvordan du kan nå ut til relevante kandidater.",
            href: "mailto:rekruttering@example.invalid",
            tone: "blue",
        },
    ],
    editorialCards: [
        {
            title: "Superrask søknad",
            description: "En enklere måte å komme i kontakt med relevante jobbsøkere.",
            href: "/stillingsregistrering",
            tone: "blue",
            illustration: "envelope",
        },
        {
            title: "Når dere ikke gir tilbakemelding – slik oppleves det for unge jobbsøkere",
            description: "Mange unge bruker mye tid og håp på en jobbsøknad. Når de ikke får svar, oppleves det tungt.",
            href: "/ung",
            tone: "green",
            illustration: "worried",
        },
        {
            title: "Slik skriver du en skikkelig bra stillingsannonse",
            description: "Se hva jobbsøkere ser etter, og hva du bør tenke på når du skriver annonsen.",
            href: "/stillingsregistrering",
            tone: "peach",
            illustration: "magnifier",
        },
    ],
} satisfies {
    hero: LandingHeroData;
    quickLinks: LandingCardData[];
    editorialCards: LandingCardData[];
};

export const youngLanding = {
    intro: {
        id: "ung-intro",
        title: "Jobb for deg som er ung",
        description:
            "Leter du etter din første jobb, deltid eller lærlingplass? Her finner du stillinger og tips som gjør det enklere å søke.",
    },
    quickLinks: [
        {
            title: "Jobber for deg under 18 år",
            description: "Se jobber du kan søke på selv om du er under 18.",
            href: "/stillinger",
            tone: "blue",
        },
        {
            title: "Jobber uten krav til erfaring",
            description: "Ingen erfaring? Ingen problem. Se stillinger uten krav til erfaring.",
            href: "/stillinger",
            tone: "blue",
        },
    ],
    superraskHighlight: {
        title: "Superrask søknad: søk på jobben med kun noen få klikk!",
        description: "Er du på jakt etter deltidsjobb? Eller kanskje du leter etter din aller første jobb?",
        href: "/stillinger",
        tone: "peach",
        illustration: "celebrating",
    },
    editorialCards: [
        {
            title: "Får du avslag på jobbsøknader? Dette kan hjelpe deg videre",
            description: "Fem konkrete råd til deg som har fått avslag og vil komme deg videre i jobbsøkingen.",
            href: "/artikler/tips-til-jobbsoknaden",
            tone: "blue",
            illustration: "worried",
        },
        {
            title: "Dette må du huske når du bruker KI i søknaden din",
            description: "Finn ut hvordan du kan bruke KI smart i jobbsøknaden og hva du må passe på underveis.",
            href: "/artikler/tips-til-jobbsoknaden",
            tone: "green",
            illustration: "magnifier",
        },
        {
            title: "Blitt ghosta av arbeidsgiver? Hva nå?",
            description: "Her er hva du kan gjøre når du ikke får svar.",
            href: "/artikler/tips-til-jobbsoknaden",
            tone: "peach",
            illustration: "envelope",
        },
    ],
} satisfies {
    intro: { id: string; title: string; description: string };
    quickLinks: LandingCardData[];
    superraskHighlight: LandingCardData;
    editorialCards: LandingCardData[];
};
