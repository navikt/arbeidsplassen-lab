import type { SearchSort, Stilling } from "./types";

export function sortStillinger(stillinger: Stilling[], sort: SearchSort): Stilling[] {
    const sorted = [...stillinger];

    switch (sort) {
        case "published":
            return sorted.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
        case "expires":
            return sorted.sort((a, b) => {
                if (!a.applicationDue) {
                    return 1;
                }
                if (!b.applicationDue) {
                    return -1;
                }
                return Date.parse(a.applicationDue) - Date.parse(b.applicationDue);
            });
        case "relevant":
            return sorted;
    }
}
