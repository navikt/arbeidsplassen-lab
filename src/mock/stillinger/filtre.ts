import type { FilterOption, FilterOptions, Stilling } from "@/app/stillinger/_lib/types";
import { MOCK_TODAY, mockStillinger } from "./annonser";

function countValues(values: string[]): FilterOption[] {
    const counts = new Map<string, number>();

    for (const value of values) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    return [...counts.entries()]
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "nb"));
}

function valuesFrom(extractor: (stilling: Stilling) => string[]): string[] {
    return mockStillinger.flatMap(extractor).filter((value) => value.length > 0);
}

function daysSincePublished(published: string): number {
    const today = Date.parse(`${MOCK_TODAY}T12:00:00Z`);
    const date = Date.parse(`${published}T12:00:00Z`);
    return Math.floor((today - date) / 86_400_000);
}

export const mockFilters: FilterOptions = {
    published: [
        {
            value: "today",
            label: "Nye i dag",
            count: mockStillinger.filter((stilling) => daysSincePublished(stilling.published) === 0).length,
        },
        {
            value: "last3",
            label: "Nye siste 3 dager",
            count: mockStillinger.filter((stilling) => daysSincePublished(stilling.published) <= 3).length,
        },
        {
            value: "last7",
            label: "Nye siste uka",
            count: mockStillinger.filter((stilling) => daysSincePublished(stilling.published) <= 7).length,
        },
        {
            value: "all",
            label: "Vis alle",
            count: mockStillinger.length,
        },
    ],
    locations: countValues(valuesFrom((stilling) => [stilling.location.county])),
    occupations: countValues(valuesFrom((stilling) => [stilling.occupation])),
    education: countValues(valuesFrom((stilling) => [stilling.education])),
    experience: countValues(valuesFrom((stilling) => [stilling.experience])),
    driversLicense: countValues(valuesFrom((stilling) => [stilling.driversLicense])),
    workLanguages: countValues(valuesFrom((stilling) => stilling.workLanguages)),
    extent: countValues(valuesFrom((stilling) => stilling.extent)),
    engagementTypes: countValues(valuesFrom((stilling) => [stilling.engagementType])),
    sectors: countValues(valuesFrom((stilling) => [stilling.employer.sector])),
    remote: countValues(valuesFrom((stilling) => [stilling.remote])),
    summerJob: [
        {
            value: "true",
            label: "Vis sommerjobber",
            count: mockStillinger.filter((stilling) => stilling.isSummerJob).length,
        },
    ],
    superrask: [
        {
            value: "true",
            label: "Vis kun superrask søknad",
            count: mockStillinger.filter((stilling) => stilling.application.type === "superrask").length,
        },
    ],
};
