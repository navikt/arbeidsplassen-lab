import { MOCK_TODAY } from "@/mock/stillinger/annonser";
import type { SearchCriteria, Stilling } from "./types";

const DAY_IN_MILLISECONDS = 86_400_000;

function normalize(value: string): string {
    return value
        .normalize("NFKD")
        .replace(/\p{Diacritic}/gu, "")
        .toLocaleLowerCase("nb-NO")
        .trim();
}

function matchesSelectedValues(selected: string[], values: string[]): boolean {
    return selected.length === 0 || selected.some((value) => values.includes(value));
}

function publishedDaysAgo(published: string): number {
    const today = Date.parse(`${MOCK_TODAY}T12:00:00Z`);
    const publishedDate = Date.parse(`${published}T12:00:00Z`);
    return Math.floor((today - publishedDate) / DAY_IN_MILLISECONDS);
}

function matchesPublished(stilling: Stilling, published: SearchCriteria["published"]): boolean {
    const age = publishedDaysAgo(stilling.published);

    switch (published) {
        case "today":
            return age === 0;
        case "last3":
            return age >= 0 && age <= 3;
        case "last7":
            return age >= 0 && age <= 7;
        case "all":
            return true;
    }
}

function matchesTerms(stilling: Stilling, terms: string[]): boolean {
    if (terms.length === 0) {
        return true;
    }

    const searchableText = normalize(
        [
            stilling.title,
            stilling.jobTitle,
            stilling.employer.name,
            stilling.location.city,
            stilling.location.county,
            stilling.occupation,
        ].join(" "),
    );

    return terms.every((term) => searchableText.includes(normalize(term)));
}

export function filterStillinger(stillinger: Stilling[], criteria: SearchCriteria): Stilling[] {
    return stillinger.filter(
        (stilling) =>
            matchesTerms(stilling, criteria.terms) &&
            matchesPublished(stilling, criteria.published) &&
            matchesSelectedValues(criteria.locations, [stilling.location.county]) &&
            matchesSelectedValues(criteria.occupations, [stilling.occupation]) &&
            matchesSelectedValues(criteria.education, [stilling.education]) &&
            matchesSelectedValues(criteria.experience, [stilling.experience]) &&
            matchesSelectedValues(criteria.driversLicense, [stilling.driversLicense]) &&
            matchesSelectedValues(criteria.workLanguages, stilling.workLanguages) &&
            matchesSelectedValues(criteria.extent, stilling.extent) &&
            matchesSelectedValues(criteria.engagementTypes, [stilling.engagementType]) &&
            matchesSelectedValues(criteria.sectors, [stilling.employer.sector]) &&
            matchesSelectedValues(criteria.remote, [stilling.remote]) &&
            (!criteria.summerJobOnly || stilling.isSummerJob) &&
            (!criteria.superraskOnly || stilling.application.type === "superrask"),
    );
}

export function validateSearchTerm(value: string): string | undefined {
    const trimmed = value.trim();

    if (trimmed.length > 100) {
        return "Søkeord kan ikke ha mer enn 100 tegn";
    }

    const compactDigits = trimmed.replace(/\D/g, "");
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(trimmed);
    const looksLikeIdentifier = compactDigits.length === 11 && /^[\d\s.-]+$/u.test(trimmed);

    if (looksLikeEmail || looksLikeIdentifier) {
        return "Søket kan inneholde personopplysninger. Bruk yrke, sted eller andre generelle søkeord.";
    }

    return undefined;
}
