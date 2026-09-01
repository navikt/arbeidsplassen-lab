import { describe, expect, it } from "vitest";
import type { SavedSearch } from "../_lib/types";
import {
    emptySearchCriteria,
    initialStillingerState,
    type StillingerState,
    stillingerReducer,
} from "./StillingerStateProvider";

function stateWith(overrides: Partial<StillingerState> = {}): StillingerState {
    return {
        ...initialStillingerState,
        criteria: { ...emptySearchCriteria },
        favoriteIds: [],
        savedSearches: [],
        ...overrides,
    };
}

describe("stillingerReducer", () => {
    it("nullstiller siden når søket endres", () => {
        const state = stateWith({ page: 3 });

        expect(stillingerReducer(state, { type: "set-terms", terms: ["utvikler"] }).page).toBe(1);
        expect(stillingerReducer(state, { type: "set-sort", sort: "published" }).page).toBe(1);
        expect(stillingerReducer(state, { type: "set-page-size", pageSize: 10 }).page).toBe(1);
    });

    it("legger til og fjerner favoritter", () => {
        const favorite = stillingerReducer(stateWith(), { type: "toggle-favorite", id: "stilling-1" });
        const removed = stillingerReducer(favorite, { type: "toggle-favorite", id: "stilling-1" });

        expect(favorite.favoriteIds).toEqual(["stilling-1"]);
        expect(removed.favoriteIds).toEqual([]);
    });

    it("slår sammen hydrerte verdier med handlinger gjort før lagringen var klar", () => {
        const current = stateWith({
            favoriteIds: ["stilling-1"],
            savedSearches: [
                {
                    id: "current",
                    name: "Nåværende søk",
                    criteria: { ...emptySearchCriteria },
                    sort: "relevant",
                },
            ],
        });

        const hydrated = stillingerReducer(current, {
            type: "hydrate-persisted",
            persistedState: {
                favoriteIds: ["stilling-2"],
                savedSearches: [
                    {
                        id: "stored",
                        name: "Lagret søk",
                        criteria: { ...emptySearchCriteria },
                        sort: "published",
                    },
                ],
            },
        });

        expect(hydrated.favoriteIds).toEqual(["stilling-2", "stilling-1"]);
        expect(hydrated.savedSearches.map((search) => search.id)).toEqual(["stored", "current"]);
    });

    it("bruker snapshotet fra et lagret søk og nullstiller siden", () => {
        const savedSearch: SavedSearch = {
            id: "saved-search-1",
            name: "IT i Oslo",
            criteria: {
                ...emptySearchCriteria,
                terms: ["utvikler"],
                locations: ["Oslo"],
            },
            sort: "published",
        };
        const state = stateWith({
            page: 4,
            criteria: { ...emptySearchCriteria, terms: ["kokk"] },
            savedSearches: [savedSearch],
        });

        const applied = stillingerReducer(state, { type: "apply-saved-search", id: savedSearch.id });

        expect(applied.criteria).toEqual(savedSearch.criteria);
        expect(applied.criteria).not.toBe(savedSearch.criteria);
        expect(applied.sort).toBe("published");
        expect(applied.page).toBe(1);
    });

    it("sletter bare det valgte lagrede søket", () => {
        const searches = ["1", "2"].map(
            (id): SavedSearch => ({
                id,
                name: `Søk ${id}`,
                criteria: { ...emptySearchCriteria },
                sort: "relevant",
            }),
        );

        const updated = stillingerReducer(stateWith({ savedSearches: searches }), {
            type: "delete-saved-search",
            id: "1",
        });

        expect(updated.savedSearches).toEqual([searches[1]]);
    });
});
