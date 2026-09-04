import type { EmployerActivity, EmployerBadgeId, EmployerBadgeResult, EmployerBadgeStatus } from "./types";

type BadgeEvaluation = {
    status: EmployerBadgeStatus;
    progress: number;
    metric: string;
    nextStep: string;
};

type BadgeDefinition = {
    id: EmployerBadgeId;
    label: string;
    description: string;
    icon: EmployerBadgeResult["icon"];
    threshold: string;
    period: string;
    hypothesis?: boolean;
    publicPriority: number;
    evaluate: (activity: EmployerActivity, referenceDate: string) => BadgeEvaluation;
};

const requiredApplications = 10;
const dayInMilliseconds = 86_400_000;
const numberFormatter = new Intl.NumberFormat("nb-NO");

function clampProgress(value: number): number {
    return Math.round(Math.min(100, Math.max(0, value)));
}

function progressToTarget(value: number, target: number): number {
    return target <= 0 ? 100 : clampProgress((value / target) * 100);
}

function progressToLowerTarget(value: number, target: number): number {
    return value <= target ? 100 : clampProgress((target / value) * 100);
}

function unavailable(metric: string, nextStep: string): BadgeEvaluation {
    return {
        status: "unavailable",
        progress: 0,
        metric,
        nextStep,
    };
}

function daysBetween(fromDate: string, toDate: string): number | undefined {
    const from = Date.parse(fromDate);
    const to = Date.parse(toDate);

    if (Number.isNaN(from) || Number.isNaN(to)) {
        return undefined;
    }

    return Math.max(0, Math.floor((to - from) / dayInMilliseconds));
}

const badgeDefinitions: BadgeDefinition[] = [
    {
        id: "rask-pa-labben",
        label: "Rask på labben",
        description: "Gir søkerne et tidlig svar eller en statusoppdatering.",
        icon: "car",
        threshold: "Median svartid på 48 timer eller mindre",
        period: "Siste 90 dager",
        publicPriority: 1,
        evaluate: (activity) => {
            if (activity.applicationsLast90Days < requiredApplications) {
                return unavailable(
                    `${activity.applicationsLast90Days} søknader i måleperioden`,
                    `Minst ${requiredApplications} søknader må være behandlet før svartiden vises.`,
                );
            }

            const earned = activity.medianResponseHours <= 48;
            return {
                status: earned ? "earned" : "progress",
                progress: progressToLowerTarget(activity.medianResponseHours, 48),
                metric: `${activity.medianResponseHours} timer i median`,
                nextStep: earned
                    ? "Fortsett å gi søkerne en tidlig statusoppdatering."
                    : `Reduser median svartid til 48 timer eller mindre.`,
            };
        },
    },
    {
        id: "lynrask",
        label: "Lynrask",
        description: "Har ekstra kort responstid når nye søknader kommer inn.",
        icon: "lightning",
        threshold: "Median svartid på 12 timer eller mindre",
        period: "Siste 90 dager",
        publicPriority: 0,
        evaluate: (activity) => {
            if (activity.applicationsLast90Days < requiredApplications) {
                return unavailable(
                    `${activity.applicationsLast90Days} søknader i måleperioden`,
                    `Minst ${requiredApplications} søknader må være behandlet før svartiden vises.`,
                );
            }

            const earned = activity.medianResponseHours <= 12;
            return {
                status: earned ? "earned" : "progress",
                progress: progressToLowerTarget(activity.medianResponseHours, 12),
                metric: `${activity.medianResponseHours} timer i median`,
                nextStep: earned
                    ? "Fortsett den raske oppfølgingen."
                    : `Reduser median svartid fra ${activity.medianResponseHours} til 12 timer eller mindre.`,
            };
        },
    },
    {
        id: "her-skjer-det",
        label: "Her skjer det!",
        description: "Har ansatt flere nye kolleger gjennom året.",
        icon: "trend",
        threshold: "Minst 12 ansettelser",
        period: "Siste 12 måneder",
        publicPriority: 5,
        evaluate: (activity) => {
            const earned = activity.hiresLast12Months >= 12;
            return {
                status: earned ? "earned" : "progress",
                progress: progressToTarget(activity.hiresLast12Months, 12),
                metric: `${activity.hiresLast12Months} ansettelser`,
                nextStep: earned
                    ? "Merket oppdateres når aktiviteten endrer seg."
                    : `${12 - activity.hiresLast12Months} flere ansettelser mangler til merket.`,
            };
        },
    },
    {
        id: "talentbygger",
        label: "Talentbygger",
        description: "Utforsker om arbeidsgiveren gir mange tidlig i karrieren en mulighet.",
        icon: "plant",
        threshold: "Minst 6 av 10 ansettelser tidlig i karrieren",
        period: "Siste 12 måneder",
        hypothesis: true,
        publicPriority: 9,
        evaluate: (activity) => {
            if (activity.hiresLast12Months < 10) {
                return unavailable(
                    `${activity.hiresLast12Months} ansettelser i måleperioden`,
                    "Minst 10 ansettelser kreves før denne hypotesen kan vurderes.",
                );
            }

            const share = activity.entryLevelHiresLast12Months / activity.hiresLast12Months;
            const earned = activity.entryLevelHiresLast12Months >= 6 && share >= 0.5;
            return {
                status: earned ? "earned" : "progress",
                progress: Math.min(
                    progressToTarget(activity.entryLevelHiresLast12Months, 6),
                    progressToTarget(share, 0.5),
                ),
                metric: `${activity.entryLevelHiresLast12Months} av ${activity.hiresLast12Months} ansettelser`,
                nextStep: earned
                    ? "Kriteriet må vurderes faglig før eventuell offentlig bruk."
                    : "Flere ansettelser tidlig i karrieren må registreres.",
            };
        },
    },
    {
        id: "dora-er-apen",
        label: "Døra er åpen",
        description: "Har flere ledige muligheter akkurat nå.",
        icon: "door",
        threshold: "Minst 2 aktive stillinger",
        period: "Akkurat nå",
        publicPriority: 3,
        evaluate: (activity) => {
            const earned = activity.activePositions >= 2;
            return {
                status: earned ? "earned" : "progress",
                progress: progressToTarget(activity.activePositions, 2),
                metric: `${activity.activePositions} aktive stillinger i ${activity.activeAdverts} annonse`,
                nextStep: earned
                    ? "Merket forsvinner automatisk når det er færre enn to aktive stillinger."
                    : "Publiser én aktiv stilling til for å åpne flere muligheter.",
            };
        },
    },
    {
        id: "stadig-pa-jakt",
        label: "Stadig på jakt",
        description: "Rekrutterer jevnlig gjennom året.",
        icon: "repeat",
        threshold: "Aktive annonser i minst 6 ulike måneder",
        period: "Siste 12 måneder",
        publicPriority: 6,
        evaluate: (activity) => {
            const earned = activity.recruitingMonthsLast12 >= 6;
            return {
                status: earned ? "earned" : "progress",
                progress: progressToTarget(activity.recruitingMonthsLast12, 6),
                metric: `${activity.recruitingMonthsLast12} aktive måneder`,
                nextStep: earned
                    ? "Merket vurderes på nytt hver måned."
                    : `${6 - activity.recruitingMonthsLast12} flere aktive måneder mangler.`,
            };
        },
    },
    {
        id: "god-pa-dialog",
        label: "God på dialog",
        description: "Holder søkerne orientert mens rekrutteringen pågår.",
        icon: "chat",
        threshold: "Minst 90 % får en statusoppdatering",
        period: "Siste 90 dager",
        publicPriority: 2,
        evaluate: (activity) => {
            if (activity.applicationsLast90Days < requiredApplications) {
                return unavailable(
                    `${activity.applicationsLast90Days} søknader i måleperioden`,
                    `Minst ${requiredApplications} søknader må være behandlet før dialogen vurderes.`,
                );
            }

            const earned = activity.statusUpdateRate >= 0.9;
            const percentage = Math.round(activity.statusUpdateRate * 100);
            return {
                status: earned ? "earned" : "progress",
                progress: progressToTarget(activity.statusUpdateRate, 0.9),
                metric: `${percentage} % har fått status`,
                nextStep: earned
                    ? "Fortsett å oppdatere søkerne når prosessen endrer seg."
                    : `Øk andelen som får statusoppdatering fra ${percentage} til 90 %.`,
            };
        },
    },
    {
        id: "populaer-arbeidsgiver",
        label: "Populær arbeidsgiver",
        description: "Utforsker om mange ønsker varsler om nye stillinger.",
        icon: "star",
        threshold: "Minst 500 følgere",
        period: "Løpende",
        hypothesis: true,
        publicPriority: 8,
        evaluate: (activity) => {
            const earned = activity.followers >= 500;
            return {
                status: earned ? "earned" : "progress",
                progress: progressToTarget(activity.followers, 500),
                metric: `${numberFormatter.format(activity.followers)} følgere`,
                nextStep: earned
                    ? "Følgertall må vurderes mot bedriftsstørrelse før offentlig bruk."
                    : `${numberFormatter.format(500 - activity.followers)} flere følgere mangler.`,
            };
        },
    },
    {
        id: "ny-pa-arbeidsplassen",
        label: "Ny på Arbeidsplassen",
        description: "Er nylig registrert og har akkurat kommet i gang.",
        icon: "clock",
        threshold: "Registrert for mindre enn 90 dager siden",
        period: "Første 90 dager",
        publicPriority: 7,
        evaluate: (activity, referenceDate) => {
            const days = daysBetween(activity.registeredAt, referenceDate);

            if (days === undefined) {
                return unavailable("Registreringsdato mangler", "Legg inn en gyldig registreringsdato.");
            }

            const earned = days <= 90;
            return {
                status: earned ? "earned" : "progress",
                progress: earned ? 100 : 0,
                metric: `${days} dager siden registrering`,
                nextStep: earned
                    ? `Merket vises i ${90 - days} dager til.`
                    : "Dette merket er bare tilgjengelig de første 90 dagene.",
            };
        },
    },
    {
        id: "lokal-jobbskaper",
        label: "Lokal jobbskaper",
        description: "Skaper mange av jobbmulighetene sine i samme område.",
        icon: "location",
        threshold: "Minst 8 lokale ansettelser og 75 % lokale stillinger",
        period: "Siste 12 måneder",
        publicPriority: 4,
        evaluate: (activity) => {
            const earned = activity.localHiresLast12Months >= 8 && activity.localJobShare >= 0.75;
            const percentage = Math.round(activity.localJobShare * 100);
            return {
                status: earned ? "earned" : "progress",
                progress: Math.min(
                    progressToTarget(activity.localHiresLast12Months, 8),
                    progressToTarget(activity.localJobShare, 0.75),
                ),
                metric: `${activity.localHiresLast12Months} lokale ansettelser · ${percentage} % lokale stillinger`,
                nextStep: earned
                    ? "Merket følger aktiviteten i det valgte området."
                    : "Flere lokale stillinger eller ansettelser må registreres.",
            };
        },
    },
];

export function getEmployerBadgeResults(activity: EmployerActivity, referenceDate: string): EmployerBadgeResult[] {
    return badgeDefinitions.map((definition) => ({
        id: definition.id,
        label: definition.label,
        description: definition.description,
        icon: definition.icon,
        threshold: definition.threshold,
        period: definition.period,
        hypothesis: definition.hypothesis ?? false,
        publicPriority: definition.publicPriority,
        ...definition.evaluate(activity, referenceDate),
    }));
}

export function getPublicBadgeResults(results: EmployerBadgeResult[]): EmployerBadgeResult[] {
    const hasLightningBadge = results.some((result) => result.id === "lynrask" && result.status === "earned");

    return results
        .filter(
            (result) =>
                result.status === "earned" &&
                !result.hypothesis &&
                !(hasLightningBadge && result.id === "rask-pa-labben"),
        )
        .sort((a, b) => a.publicPriority - b.publicPriority)
        .slice(0, 4);
}
