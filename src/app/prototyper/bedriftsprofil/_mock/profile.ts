import type { EmployerActivity, EmployerProfile, ProfileHero, ProfileLogo, ProfileTheme } from "../_lib/types";

export const profileThemes = [
    {
        id: "skog",
        label: "Skog og mynte",
        description: "Friskt og lokalt, med tydelig grønn profil.",
        color: "meta-lime",
    },
    {
        id: "leire",
        label: "Varm leire",
        description: "Varmt og håndlaget, med en rolig beige profil.",
        color: "brand-beige",
    },
    {
        id: "fjord",
        label: "Dyp fjord",
        description: "Tydelig og moderne, med en dyp blå profil.",
        color: "brand-blue",
    },
] satisfies readonly [ProfileTheme, ...ProfileTheme[]];

export const profileHeroes = [
    {
        id: "fellesskap",
        label: "Fellesskap rundt bordet",
        description: "Illustrasjon av kolleger og gjester som møtes i kafeen.",
        src: "/images/prototyper/bedriftsprofil/fellesskap.svg",
        alt: "Illustrasjon av mennesker som møtes rundt et kafebord",
    },
    {
        id: "handverk",
        label: "Mat og håndverk",
        description: "Illustrasjon av kaffe, bakst og arbeid med gode råvarer.",
        src: "/images/prototyper/bedriftsprofil/handverk.svg",
        alt: "Illustrasjon av kaffe, bakst og arbeid med lokale råvarer",
    },
    {
        id: "lokalt-liv",
        label: "Lokalt liv",
        description: "Illustrasjon av kafeen som møteplass i Lakselv.",
        src: "/images/prototyper/bedriftsprofil/lokalt-liv.svg",
        alt: "Illustrasjon av en lokal kafé med fjell i bakgrunnen",
    },
] satisfies readonly [ProfileHero, ...ProfileHero[]];

export const profileLogos = [
    {
        id: "monogram",
        label: "Monogram",
        description: "Et kompakt GD-merke som fungerer godt i små flater.",
    },
    {
        id: "emblem",
        label: "Drageemblem",
        description: "Et lekent merke med en tydelig D.",
    },
    {
        id: "ordmerke",
        label: "Ordmerke",
        description: "Bedriftsnavnet skrevet som et enkelt ordmerke.",
    },
] satisfies readonly [ProfileLogo, ...ProfileLogo[]];

const defaultEmployerProfile: EmployerProfile = {
    name: "Den Grønne Dragen AS",
    tagline: "Mat, kultur og fellesskap midt i Lakselv",
    about: "Den Grønne Dragen er en lokal kafé og møteplass der vi kombinerer god mat med konserter, verksteder og små arrangementer. Vi vil skape et sted der både kolleger, naboer og tilreisende kjenner seg velkommen.",
    employerPromise:
        "Hos oss får du rom til å prøve ideer, påvirke konseptet og lære hele veien fra råvare til ferdig opplevelse.",
    highlights: ["Påvirk menyen og konseptet", "Jobb tett med lokale produsenter", ""],
    location: "Lakselv, Finnmark",
    industry: "Servering og opplevelser",
    employeeCount: "",
    workMode: "På arbeidsplassen",
    website: "https://gronne-dragen.example.invalid",
    themeId: "skog",
    heroId: "fellesskap",
    logoId: "emblem",
};

export function createDefaultEmployerProfile(): EmployerProfile {
    return {
        ...defaultEmployerProfile,
        highlights: [...defaultEmployerProfile.highlights],
    };
}

export const profileReferenceDate = "2026-09-04";

export const mockEmployerActivity: EmployerActivity = {
    applicationsLast90Days: 46,
    medianResponseHours: 18,
    statusUpdateRate: 0.93,
    activeAdverts: 1,
    activePositions: 2,
    recruitingMonthsLast12: 7,
    hiresLast12Months: 14,
    entryLevelHiresLast12Months: 8,
    followers: 342,
    registeredAt: "2026-07-12",
    localJobShare: 0.86,
    localHiresLast12Months: 11,
};
