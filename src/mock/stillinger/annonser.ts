import type { ApplicationChannel, Stilling } from "@/app/stillinger/_lib/types";
import { generellSuperraskSoknad, lavvoSuperraskSoknad } from "./superraskSoknad";

export const MOCK_TODAY = "2026-08-31";

const externalStilling: Stilling = {
    id: "bone-nor-data-lead",
    title: "Vil du forme retningen for data hos oss?",
    jobTitle: "Staff Engineer",
    employer: {
        name: "Bane Nord SF",
        sector: "Offentlig",
        description: [
            "Bane Nord lager digitale tjenester som gjør reisen enklere og mer forutsigbar.",
            "Vi jobber tverrfaglig og deler kunnskap på tvers av fagmiljøene våre.",
        ],
        website: "https://example.invalid/bane-nord",
    },
    location: { city: "Oslo", county: "Oslo" },
    sections: [
        {
            heading: "Om oss",
            paragraphs: [
                "Jernbanen i Norge genererer enorme mengder data hver dag. I Bane Nord jobber vi med å bruke disse dataene til å drive jernbanen bedre og mer effektivt.",
                "I rollen får du ansvar for å utvikle og forvalte målbildet for data. Du blir en viktig brobygger mellom data og teknologi.",
            ],
        },
        {
            heading: "Hvorfor jobbe med data hos oss?",
            paragraphs: ["Data spiller en stadig viktigere rolle i hvordan vi utvikler og driver jernbanen."],
            items: [
                "Påvirke hvordan Bane Nord skal jobbe med data fremover",
                "Jobbe tett med sterke fagmiljøer innen data, arkitektur, analyse og utvikling",
                "Se sammenhenger på tvers av en stor og kompleks teknologiorganisasjon",
                "Bidra til at gode faglige valg blir til en felles retning",
            ],
        },
        {
            heading: "Dette kommer du til å gjøre",
            paragraphs: ["Du får en sentral rolle i å forme hvordan vi bruker og utvikler data."],
            items: [
                "Etablere og holde den røde tråden på tvers av initiativer og prosjekter",
                "Koble sammen data- og arkitekturmiljøene",
                "Koordinere og følge opp problemstillinger på tvers av team",
                "Bidra til retningslinjer, strategier og langsiktige prioriteringer",
            ],
        },
        {
            heading: "Liker du å se helheten og få ting til å henge sammen?",
            paragraphs: [
                "Du er nysgjerrig på teknologi og liker å forstå hvordan mennesker, behov og løsninger henger sammen.",
            ],
        },
        {
            heading: "Kjekt å vite",
            paragraphs: ["Vi planlegger å gjennomføre intervjuer i uke 41 og 42. Du trenger ikke skrive søknadsbrev."],
        },
    ],
    published: "2026-08-31",
    updated: "2026-08-31",
    applicationDue: "2026-09-21",
    startDateLabel: "Etter avtale",
    engagementType: "Fast",
    extent: ["Heltid"],
    workday: ["Dagtid", "Ukedager"],
    workLanguages: ["Norsk"],
    remote: "Hybridkontor",
    positions: 1,
    education: "Høyere utdanning",
    experience: "Fem år eller mer",
    driversLicense: "Ikke nødvendig",
    occupation: "IT",
    isSummerJob: false,
    under18: false,
    contactList: [
        {
            name: "Ola Eksempel",
            title: "Seksjonsleder",
            phone: "00000000",
            email: "kontakt@bane-nord.example.invalid",
        },
    ],
    source: "Stillingsregistrering",
    reference: "BANE-NORD-DATA-2026",
    status: "ACTIVE",
    application: {
        type: "external",
        url: "https://example.invalid/soknad/bone-nor-data-lead",
    },
    similarIds: ["nav-data-engineer", "kommune-it-arkitekt", "helseplattform-utvikler"],
};

const emailStilling: Stilling = {
    id: "raven-media-salgsreporter",
    title: "Er du vår nye salgsreporter i Oslo?",
    jobTitle: "Selger B2B",
    employer: {
        name: "Raven Media AS",
        sector: "Privat",
        description: [
            "Raven Media er et uavhengig medieselskap med et engasjert fagmiljø.",
            "Vi kombinerer redaksjonell forståelse med kommersiell teft.",
        ],
        website: "https://example.invalid/raven-media",
        linkedin: "https://example.invalid/raven-media/linkedin",
        facebook: "https://example.invalid/raven-media/facebook",
    },
    location: { city: "Oslo", county: "Oslo" },
    shortSummary: "Vi søker en spennende vekstbedrift og utfordrer innen B2B-kommunikasjon og formidling.",
    sections: [
        {
            paragraphs: [
                "Vi i Raven Media AS ser på oss selv som en spennende vekstbedrift og en utfordrer innen B2B-kommunikasjon og formidling.",
                "I denne rollen skal du gjennomføre undersøkelser om lokalt næringsliv, avtale møter med spennende bedrifter og tilby synlighet i våre publikasjoner.",
                "Du vil være bindeledd mellom lokale næringsliv, avtalte møter med spennende bedrifter og tilby synlighet i våre publikasjoner.",
            ],
        },
        {
            heading: "Dette er krav du må oppfylle",
            items: [
                "Du må mestre norsk, både muntlig og skriftlig",
                "Førerkort klasse B",
                "Erfaring eller utdannelse som reporter eller journalist er en fordel",
                "God forståelse av markedsføring i sosiale medier",
            ],
        },
        {
            heading: "Vi ser etter",
            items: [
                "En disiplinert person som trives med ansvar",
                "En positiv lagspiller som liker å hjelpe andre",
                "En profesjonell fremtoning og tydelig kommunikasjon",
            ],
        },
    ],
    published: "2026-08-31",
    updated: "2026-08-31",
    applicationDueLabel: "Snarest mulig",
    startDateLabel: "Etter avtale",
    engagementType: "Fast",
    extent: ["Heltid"],
    workday: ["Dagtid", "Ukedager"],
    workLanguages: ["Norsk"],
    remote: "På arbeidsplassen",
    positions: 1,
    education: "Ingen krav",
    experience: "Noe erfaring",
    driversLicense: "Klasse B",
    occupation: "Salg og service",
    isSummerJob: false,
    under18: false,
    contactList: [
        {
            name: "Henrik Eksempel",
            title: "Salgssjef",
            phone: "00000000",
            email: "kontakt@raven-media.example.invalid",
        },
    ],
    source: "Stillingsregistrering",
    reference: "RAVEN-SALG-2026",
    status: "ACTIVE",
    application: {
        type: "email",
        email: "soknad@raven-media.example.invalid",
    },
    similarIds: ["sales-partner-oslo", "account-manager-vestland", "kundekonsulent-bodo"],
};

const superraskStilling: Stilling = {
    id: "lavvo-kafemedarbeider",
    title: "🔥 KREATIV SJEL SØKES – VIL DU SETTE DITT PREG PÅ HOS MAGNUS?",
    jobTitle: "Kafemedarbeider",
    employer: {
        name: "Lavvo AS",
        sector: "Privat",
        description: [
            "Hos Magnus er et kafékonsept på Banaksenteret i Lakselv. Her kombinerer vi lokal mat og drikke med kultur, gjenbruk og fellesskap.",
            "Vi ønsker å være et naturlig møtested for både lokale og besøkende.",
        ],
        facebook: "https://example.invalid/hos-magnus/facebook",
    },
    location: {
        address: "Torgveien 3",
        city: "Lakselv",
        county: "Finnmark",
    },
    shortSummary:
        "Hos Magnus er i vekst og vi søker en kreativ og engasjert person til 100 % stilling som har lyst til å være med på å utvikle konseptet videre.",
    sections: [
        {
            heading: "Hva vi ser etter",
            items: [
                "Du bryr deg om resultatet, maten som går ut døra, kunden som sitter ved bordet og hvordan Hos Magnus fremstår",
                "Du har lyst til å utvikle og utforme en kafé, prøve ut egne ideer og skape noe du kan være stolt av",
            ],
        },
        {
            heading: "Arbeidsoppgaver",
            items: [
                "Lage mat og bake",
                "Tenke nytt og prøve ut nye ideer",
                "Ta smashburgeren vår til neste nivå",
                "Lage skikkelig gode sandwicher, kaker og andre godsaker",
                "Ta ansvar og være opptatt av gode resultater",
                "Jobbe godt i team, men også selvstendig",
            ],
        },
        {
            heading: "Vi tilbyr",
            items: ["Stor handlefrihet og mulighet til å utvikle egne ideer", "100 % eller etter avtale"],
        },
    ],
    published: "2026-08-31",
    updated: "2026-08-31",
    applicationDueLabel: "Snarest mulig",
    startDateLabel: "Etter avtale",
    engagementType: "Fast",
    extent: ["Heltid", "Deltid"],
    workday: ["Vakt", "Dagtid", "Kveld", "Ukedager"],
    workLanguages: ["Norsk"],
    remote: "På arbeidsplassen",
    positions: 1,
    education: "Ingen krav",
    experience: "Ingen",
    driversLicense: "Ikke nødvendig",
    occupation: "Restaurant og mat",
    isSummerJob: false,
    under18: false,
    contactList: [
        {
            name: "Magnus Eksempel",
            title: "Daglig leder",
            phone: "00000000",
            email: "kontakt@lavvo.example.invalid",
        },
    ],
    source: "Stillingsregistrering",
    reference: "LAVVO-KAFE-2026",
    status: "ACTIVE",
    application: {
        type: "superrask",
        alternativeEmail: "soknad@lavvo.example.invalid",
        form: lavvoSuperraskSoknad,
    },
    similarIds: ["kiwi-kafe-lakselv", "restaurantmedarbeider-oslo", "sommerjobb-kafe-tromso"],
};

type CompactSeed = {
    id: string;
    title: string;
    jobTitle: string;
    employer: string;
    city: string;
    county: string;
    occupation: string;
    application?: "email" | "superrask";
    extent?: string[];
    engagementType?: string;
    sector?: "Offentlig" | "Privat";
    remote?: string;
    education?: string;
    experience?: string;
    driversLicense?: string;
    workLanguage?: string;
    summerJob?: boolean;
    under18?: boolean;
    positions?: number;
};

const compactSeeds: CompactSeed[] = [
    {
        id: "sales-partner-oslo",
        title: "Bli vår nye salgspartner i Oslo",
        jobTitle: "Selger B2B",
        employer: "Raven Media AS",
        city: "Oslo",
        county: "Oslo",
        occupation: "Salg og service",
    },
    {
        id: "sales-reporter-trondheim",
        title: "Er du vår nye salgsreporter i Trondheimsregionen?",
        jobTitle: "Selger B2B",
        employer: "Raven Media AS",
        city: "Trondheim",
        county: "Trøndelag",
        occupation: "Salg og service",
    },
    {
        id: "sales-reporter-romerike",
        title: "Er du vår nye salgsreporter i Romerike?",
        jobTitle: "Selger B2B",
        employer: "Raven Media AS",
        city: "Lillestrøm",
        county: "Akershus",
        occupation: "Salg og service",
    },
    {
        id: "restaurantmedarbeider-oslo",
        title: "Burgerkjede søker restaurantmedarbeidere",
        jobTitle: "Restaurantmedarbeider",
        employer: "Burgerhuset AS",
        city: "Oslo",
        county: "Oslo",
        occupation: "Restaurant og mat",
        application: "superrask",
        experience: "Ingen",
    },
    {
        id: "butikkmedarbeider-bodo",
        title: "Vil du forme retningen for data hos oss?",
        jobTitle: "Butikkmedarbeider",
        employer: "Bodø Handel AS",
        city: "Bodø",
        county: "Nordland",
        occupation: "Butikk og handel",
        extent: ["Deltid"],
    },
    {
        id: "it-konsulent-trondheim",
        title: "HKS søker IT-konsulent og rådgiver",
        jobTitle: "IT-konsulent",
        employer: "HKS Husholding AS",
        city: "Trondheim",
        county: "Trøndelag",
        occupation: "IT",
        remote: "Hybridkontor",
        education: "Høyere utdanning",
    },
    {
        id: "lager-aalesund",
        title: "Rapporter eller klikke og driftskyer søkes i Ålesund",
        jobTitle: "Lagerarbeider",
        employer: "Repaiable Operations AS",
        city: "Ålesund",
        county: "Møre og Romsdal",
        occupation: "Transport og lager",
        driversLicense: "Klasse B",
    },
    {
        id: "kiwi-kafe-lakselv",
        title: "Hos Magnus søker matglad menneske med glimt i øyet",
        jobTitle: "Kafemedarbeider",
        employer: "Lavvo AS",
        city: "Lakselv",
        county: "Finnmark",
        occupation: "Restaurant og mat",
        application: "superrask",
        extent: ["Deltid"],
        experience: "Ingen",
    },
    {
        id: "servicearbeider-stemnestod",
        title: "Lager- og servicemedarbeider – fleksibel rolle",
        jobTitle: "Servicemedarbeider",
        employer: "Jamt AS",
        city: "Stemnestad",
        county: "Rogaland",
        occupation: "Transport og lager",
    },
    {
        id: "renholder-vikariat",
        title: "Søker renholder i fast stilling",
        jobTitle: "Renholder",
        employer: "Velkommen AS",
        city: "Vinje",
        county: "Telemark",
        occupation: "Renhold",
        engagementType: "Vikariat",
    },
    {
        id: "selger-kongsvinger",
        title: "Selger i en spennende vekstbedrift",
        jobTitle: "Selger",
        employer: "Kundehuset AS",
        city: "Kongsvinger",
        county: "Innlandet",
        occupation: "Salg og service",
    },
    {
        id: "grafisk-designer-bodo",
        title: "Jobb som grafisk designer i et sterkt fagmiljø",
        jobTitle: "Grafisk designer",
        employer: "Nordlys Design AS",
        city: "Bodø",
        county: "Nordland",
        occupation: "Kunst og kreative yrker",
        education: "Høyere utdanning",
    },
    {
        id: "avdelingsleder-oslo",
        title: "Avdelingsleder til bo- og behandlingstilbud i Oslo",
        jobTitle: "Avdelingsleder",
        employer: "Aurora Omsorg AS",
        city: "Oslo",
        county: "Oslo",
        occupation: "Helse og omsorg",
        education: "Høyere utdanning",
        experience: "Fem år eller mer",
    },
    {
        id: "renholder-skjelsjoen",
        title: "Kontormedarbeider 60 % – Sjøsjøen Renhold",
        jobTitle: "Kontormedarbeider",
        employer: "Sjøsjøen Renhold AS",
        city: "Skiptvet",
        county: "Østfold",
        occupation: "Kontor og administrasjon",
        extent: ["Deltid"],
    },
    {
        id: "lastebilsjafor",
        title: "Lastebilsjåfør klasse C – humør og flyt kan fikses",
        jobTitle: "Lastebilsjåfør",
        employer: "L.M. Transport AS",
        city: "Innlandet",
        county: "Innlandet",
        occupation: "Transport og lager",
        driversLicense: "Klasse C",
    },
    {
        id: "ventilasjonsmontor",
        title: "Ventilasjonsinstallatør søkes – fagbrev ikke nødvendig",
        jobTitle: "Ventilasjonsinstallatør",
        employer: "Pust Ventilasjon AS",
        city: "Oslo",
        county: "Oslo",
        occupation: "Bygg og anlegg",
        education: "Ingen krav",
    },
    {
        id: "selger-gandio",
        title: "Gandio utvider og søker hyggelig og motivert selger",
        jobTitle: "Selger",
        employer: "Gandio AS",
        city: "Oslo",
        county: "Oslo",
        occupation: "Salg og service",
        application: "superrask",
    },
    {
        id: "utleier-trondheim",
        title: "Vi søker utleier for korttidsboliger",
        jobTitle: "Utleier",
        employer: "Trømse Ferie AS",
        city: "Tromsø",
        county: "Troms",
        occupation: "Reiseliv",
        workLanguage: "Engelsk",
    },
    {
        id: "pedagogisk-leder",
        title: "Pedagogisk leder søkes til Små Barnehager",
        jobTitle: "Pedagogisk leder",
        employer: "Små Barnehager AS",
        city: "Haugesund",
        county: "Rogaland",
        occupation: "Barn og undervisning",
        education: "Høyere utdanning",
    },
    {
        id: "nav-data-engineer",
        title: "Data engineer til moderne analyseteam",
        jobTitle: "Data Engineer",
        employer: "Nav eksempel",
        city: "Oslo",
        county: "Oslo",
        occupation: "IT",
        sector: "Offentlig",
        remote: "Hybridkontor",
        education: "Høyere utdanning",
    },
    {
        id: "kommune-it-arkitekt",
        title: "IT-arkitekt for sammenhengende tjenester",
        jobTitle: "IT-arkitekt",
        employer: "Eksempel kommune",
        city: "Drammen",
        county: "Buskerud",
        occupation: "IT",
        sector: "Offentlig",
        remote: "Hybridkontor",
        experience: "Fem år eller mer",
    },
    {
        id: "helseplattform-utvikler",
        title: "Frontendutvikler til digitale helsetjenester",
        jobTitle: "Frontendutvikler",
        employer: "Helseeksempel HF",
        city: "Trondheim",
        county: "Trøndelag",
        occupation: "IT",
        sector: "Offentlig",
        remote: "Hybridkontor",
    },
    {
        id: "account-manager-vestland",
        title: "Account manager til bedriftsmarkedet",
        jobTitle: "Account Manager",
        employer: "Vestland Partner AS",
        city: "Bergen",
        county: "Vestland",
        occupation: "Salg og service",
    },
    {
        id: "kundekonsulent-bodo",
        title: "Kundekonsulent med sans for gode opplevelser",
        jobTitle: "Kundekonsulent",
        employer: "Nordkundeservice AS",
        city: "Bodø",
        county: "Nordland",
        occupation: "Salg og service",
        extent: ["Deltid"],
    },
    {
        id: "sommerjobb-kafe-tromso",
        title: "Sommerjobb på kafé i Tromsø",
        jobTitle: "Kafemedarbeider",
        employer: "Nordkafé AS",
        city: "Tromsø",
        county: "Troms",
        occupation: "Restaurant og mat",
        application: "superrask",
        extent: ["Deltid"],
        summerJob: true,
        under18: true,
        experience: "Ingen",
    },
];

const publishedDates = [
    "2026-08-31",
    "2026-08-30",
    "2026-08-29",
    "2026-08-28",
    "2026-08-27",
    "2026-08-26",
    "2026-08-25",
    "2026-08-24",
];

function getApplication(seed: CompactSeed): ApplicationChannel {
    if (seed.application === "superrask") {
        return {
            type: "superrask",
            alternativeEmail: `soknad@${seed.id}.example.invalid`,
            form: generellSuperraskSoknad,
        };
    }

    return {
        type: "email",
        email: `soknad@${seed.id}.example.invalid`,
    };
}

function createCompactStilling(seed: CompactSeed, index: number): Stilling {
    const published = publishedDates[index % publishedDates.length] ?? MOCK_TODAY;

    return {
        id: seed.id,
        title: seed.title,
        jobTitle: seed.jobTitle,
        employer: {
            name: seed.employer,
            sector: seed.sector ?? "Privat",
            description: [`${seed.employer} søker en ny kollega til et inkluderende og faglig sterkt arbeidsmiljø.`],
        },
        location: {
            city: seed.city,
            county: seed.county,
        },
        sections: [
            {
                heading: "Om jobben",
                paragraphs: [
                    `Vi søker en engasjert ${seed.jobTitle.toLowerCase()} som vil bidra til gode resultater og et godt arbeidsmiljø.`,
                ],
            },
            {
                heading: "Vi ser etter",
                items: ["Du samarbeider godt med andre", "Du tar ansvar og arbeider strukturert"],
            },
            {
                heading: "Vi tilbyr",
                items: ["God opplæring", "Et inkluderende arbeidsmiljø", "Mulighet for faglig utvikling"],
            },
        ],
        published,
        updated: published,
        applicationDue: "2026-09-30",
        startDateLabel: "Etter avtale",
        engagementType: seed.engagementType ?? "Fast",
        extent: seed.extent ?? ["Heltid"],
        workday: ["Dagtid", "Ukedager"],
        workLanguages: [seed.workLanguage ?? "Norsk"],
        remote: seed.remote ?? "På arbeidsplassen",
        positions: seed.positions ?? 1,
        education: seed.education ?? "Ingen krav",
        experience: seed.experience ?? "Noe erfaring",
        driversLicense: seed.driversLicense ?? "Ikke nødvendig",
        occupation: seed.occupation,
        isSummerJob: seed.summerJob ?? false,
        under18: seed.under18 ?? false,
        contactList: [],
        source: "Stillingsregistrering",
        reference: seed.id.toUpperCase(),
        status: "ACTIVE",
        application: getApplication(seed),
        similarIds: [],
    };
}

export const mockStillinger: Stilling[] = [
    externalStilling,
    emailStilling,
    superraskStilling,
    ...compactSeeds.map(createCompactStilling),
];

export function getMockStilling(id: string): Stilling | undefined {
    return mockStillinger.find((stilling) => stilling.id === id);
}

export function getSimilarStillinger(stilling: Stilling): Stilling[] {
    const selected = stilling.similarIds
        .map((id) => getMockStilling(id))
        .filter((candidate): candidate is Stilling => candidate !== undefined);

    if (selected.length >= 3) {
        return selected.slice(0, 3);
    }

    const fallback = mockStillinger.filter(
        (candidate) =>
            candidate.id !== stilling.id &&
            !selected.some((selectedStilling) => selectedStilling.id === candidate.id) &&
            (candidate.occupation === stilling.occupation || candidate.location.county === stilling.location.county),
    );

    return [...selected, ...fallback].slice(0, 3);
}
