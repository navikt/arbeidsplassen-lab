import { describe, expect, it } from "vitest";
import { mockStillinger } from "@/mock/stillinger/annonser";
import { mockFilters } from "@/mock/stillinger/filtre";
import { emptySearchCriteria } from "../_state/StillingerStateProvider";
import { filterStillinger, validateSearchTerm } from "./filterStillinger";
import { paginateStillinger } from "./paginateStillinger";
import { sortStillinger } from "./sortStillinger";

describe("filterStillinger", () => {
    it("filtrerer på normalisert søketekst og valgte egenskaper", () => {
        const results = filterStillinger(mockStillinger, {
            ...emptySearchCriteria,
            terms: ["KREATIV SJEL SØKES"],
            locations: ["Finnmark"],
            superraskOnly: true,
        });

        expect(results.map((stilling) => stilling.id)).toEqual(["lavvo-kafemedarbeider"]);
    });

    it("avleder filtertellinger fra de samme stillingene som vises", () => {
        for (const option of mockFilters.locations) {
            const matching = mockStillinger.filter((stilling) => stilling.location.county === option.value);

            expect(option.count).toBe(matching.length);
        }
    });
});

describe("validateSearchTerm", () => {
    it.each(["navn@example.invalid", "123 456 789 01"])("avviser mulige personopplysninger: %s", (value) => {
        expect(validateSearchTerm(value)).toMatch(/personopplysninger/u);
    });

    it("avviser søkeord over 100 tegn", () => {
        expect(validateSearchTerm("a".repeat(101))).toMatch(/100 tegn/u);
    });

    it("godtar generelle søkeord", () => {
        expect(validateSearchTerm("Sykepleier i Tromsø")).toBeUndefined();
    });
});

describe("sortering og paginering", () => {
    it("sorterer uten å endre den opprinnelige listen", () => {
        const originalOrder = mockStillinger.map((stilling) => stilling.id);
        const sorted = sortStillinger(mockStillinger, "published");

        expect(sorted.map((stilling) => stilling.published)).toEqual(
            [...sorted]
                .map((stilling) => stilling.published)
                .sort()
                .reverse(),
        );
        expect(mockStillinger.map((stilling) => stilling.id)).toEqual(originalOrder);
    });

    it("avgrenser ugyldige sidetall og returnerer riktig utsnitt", () => {
        const firstPage = paginateStillinger(mockStillinger, -2, 10);
        const lastPage = paginateStillinger(mockStillinger, 999, 10);

        expect(firstPage.page).toBe(1);
        expect(firstPage.items).toHaveLength(10);
        expect(lastPage.page).toBe(lastPage.totalPages);
        expect(lastPage.items.length).toBeGreaterThan(0);
        expect(lastPage.items.length).toBeLessThanOrEqual(10);
    });
});
