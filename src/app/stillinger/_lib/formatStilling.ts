import { MOCK_TODAY } from "@/mock/stillinger/annonser";
import type { Stilling } from "./types";

const DAY_IN_MILLISECONDS = 86_400_000;
const dateFormatter = new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
});

export function formatDate(date: string): string {
    return dateFormatter.format(new Date(`${date}T12:00:00Z`));
}

export function formatPublished(stilling: Stilling): string {
    const today = Date.parse(`${MOCK_TODAY}T12:00:00Z`);
    const published = Date.parse(`${stilling.published}T12:00:00Z`);
    const daysAgo = Math.floor((today - published) / DAY_IN_MILLISECONDS);

    if (daysAgo === 0) {
        return "Ny i dag";
    }
    if (daysAgo === 1) {
        return "I går";
    }
    if (daysAgo === 2) {
        return "To dager siden";
    }
    return formatDate(stilling.published);
}

export function formatDeadline(stilling: Stilling): string | undefined {
    if (stilling.applicationDueLabel) {
        return `Søk ${stilling.applicationDueLabel.toLocaleLowerCase("nb-NO")}`;
    }
    if (stilling.applicationDue) {
        return `Søk senest ${formatDate(stilling.applicationDue)}`;
    }
    return undefined;
}
