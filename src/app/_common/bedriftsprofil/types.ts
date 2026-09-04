export const profileThemeIds = ["skog", "leire", "fjord"] as const;
export type ProfileThemeId = (typeof profileThemeIds)[number];

export type ProfileThemeColor = "meta-lime" | "brand-beige" | "brand-blue";

export const profileHeroIds = ["fellesskap", "handverk", "lokalt-liv"] as const;
export type ProfileHeroId = (typeof profileHeroIds)[number];

export const profileLogoIds = ["monogram", "emblem", "ordmerke"] as const;
export type ProfileLogoId = (typeof profileLogoIds)[number];

export const workModes = ["På arbeidsplassen", "Hybrid", "Fleksibelt"] as const;
export type WorkMode = (typeof workModes)[number];

export type EmployerProfile = {
    name: string;
    tagline: string;
    about: string;
    employerPromise: string;
    highlights: string[];
    location: string;
    industry: string;
    employeeCount: string;
    workMode: WorkMode;
    website: string;
    themeId: ProfileThemeId;
    heroId: ProfileHeroId;
    logoId: ProfileLogoId;
};

export type ProfileTheme = {
    id: ProfileThemeId;
    label: string;
    description: string;
    color: ProfileThemeColor;
};

export type ProfileHero = {
    id: ProfileHeroId;
    label: string;
    description: string;
    src: string;
    alt: string;
};

export type ProfileLogo = {
    id: ProfileLogoId;
    label: string;
    description: string;
};

export type EmployerActivity = {
    applicationsLast90Days: number;
    medianResponseHours: number;
    statusUpdateRate: number;
    activeAdverts: number;
    activePositions: number;
    recruitingMonthsLast12: number;
    hiresLast12Months: number;
    entryLevelHiresLast12Months: number;
    followers: number;
    registeredAt: string;
    localJobShare: number;
    localHiresLast12Months: number;
};

export const employerBadgeIds = [
    "rask-pa-labben",
    "lynrask",
    "her-skjer-det",
    "talentbygger",
    "dora-er-apen",
    "stadig-pa-jakt",
    "god-pa-dialog",
    "populaer-arbeidsgiver",
    "ny-pa-arbeidsplassen",
    "lokal-jobbskaper",
] as const;

export type EmployerBadgeId = (typeof employerBadgeIds)[number];

export type BadgeIconName =
    | "car"
    | "lightning"
    | "trend"
    | "plant"
    | "door"
    | "repeat"
    | "chat"
    | "star"
    | "clock"
    | "location";

export type EmployerBadgeStatus = "earned" | "progress" | "unavailable";

export type EmployerBadgeResult = {
    id: EmployerBadgeId;
    label: string;
    description: string;
    icon: BadgeIconName;
    status: EmployerBadgeStatus;
    progress: number;
    metric: string;
    threshold: string;
    period: string;
    nextStep: string;
    hypothesis: boolean;
    publicPriority: number;
};

export type ProfileCompleteness = {
    score: number;
    nextAction: string;
};

export type EmployerJobSummary = {
    id: string;
    title: string;
    jobTitle: string;
    location: string;
    engagementType: string;
    extent: string;
    href: string;
};

export type UpdateEmployerProfileField = <K extends keyof EmployerProfile>(field: K, value: EmployerProfile[K]) => void;
