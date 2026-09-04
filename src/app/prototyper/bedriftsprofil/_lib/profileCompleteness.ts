import type { EmployerProfile, ProfileCompleteness } from "@/app/_common/bedriftsprofil/types";
import { getSafeExternalUrl } from "@/app/_common/bedriftsprofil/validation";

type CompletenessItem = {
    completed: boolean;
    weight: number;
    action: string;
};

export function getProfileCompleteness(profile: EmployerProfile): ProfileCompleteness {
    const items: CompletenessItem[] = [
        {
            completed: profile.tagline.trim().length >= 20,
            weight: 10,
            action: "Skriv et kort slagord som forteller hva dere står for.",
        },
        {
            completed: profile.about.trim().length >= 120,
            weight: 20,
            action: "Fortell litt mer om hvem dere er og hva dere lager sammen.",
        },
        {
            completed: profile.employerPromise.trim().length >= 50,
            weight: 15,
            action: "Beskriv hva en ny kollega får mulighet til å påvirke eller lære.",
        },
        ...profile.highlights.map((highlight, index) => ({
            completed: highlight.trim().length >= 10,
            weight: 5,
            action: `Legg til kjennetegn ${index + 1} ved arbeidsplassen.`,
        })),
        {
            completed: profile.location.trim().length > 0,
            weight: 5,
            action: "Legg til hvor bedriften holder til.",
        },
        {
            completed: profile.industry.trim().length > 0,
            weight: 5,
            action: "Legg til bransje eller fagområde.",
        },
        {
            completed: profile.employeeCount.trim().length > 0,
            weight: 5,
            action: "Legg til omtrent hvor mange som jobber i bedriften.",
        },
        {
            completed: profile.workMode.trim().length > 0,
            weight: 5,
            action: "Velg hvordan arbeidet vanligvis organiseres.",
        },
        {
            completed: getSafeExternalUrl(profile.website) !== undefined,
            weight: 10,
            action: "Legg til en full nettadresse som starter med https://.",
        },
        {
            completed: Boolean(profile.themeId && profile.heroId && profile.logoId),
            weight: 10,
            action: "Velg profilfarge, toppbilde og logo.",
        },
    ];

    const score = items.reduce((sum, item) => sum + (item.completed ? item.weight : 0), 0);
    const nextAction = items.find((item) => !item.completed)?.action ?? "Profilen er klar for en siste gjennomlesning.";

    return { score, nextAction };
}
