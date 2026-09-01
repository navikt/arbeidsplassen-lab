import { beforeEach, describe, expect, it } from "vitest";
import { emptySearchCriteria } from "../_state/StillingerStateProvider";
import {
    type PersistedStillingerState,
    readStillingerStorage,
    STILLINGER_STORAGE_KEY,
    writeStillingerStorage,
} from "./stillingerStorage";

const persistedState: PersistedStillingerState = {
    favoriteIds: ["lavvo-kafemedarbeider"],
    savedSearches: [
        {
            id: "saved-search-oslo",
            name: "IT i Oslo",
            criteria: {
                ...emptySearchCriteria,
                terms: ["utvikler"],
                locations: ["Oslo"],
            },
            sort: "published",
        },
    ],
};

describe("stillingerStorage", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("lagrer og leser favoritter og navngitte søk", () => {
        expect(writeStillingerStorage(window.localStorage, persistedState).ok).toBe(true);

        expect(readStillingerStorage(window.localStorage)).toEqual({
            ok: true,
            value: persistedState,
        });
    });

    it("lagrer bare den versjonerte stillingstilstanden", () => {
        writeStillingerStorage(window.localStorage, persistedState);

        expect(JSON.parse(window.localStorage.getItem(STILLINGER_STORAGE_KEY) ?? "")).toEqual({
            version: 1,
            ...persistedState,
        });
    });

    it.each(["ikke-json", JSON.stringify({ version: 99, favoriteIds: [], savedSearches: [] })])(
        "avviser ugyldig eller ukjent nettleserdata",
        (storedValue) => {
            window.localStorage.setItem(STILLINGER_STORAGE_KEY, storedValue);

            expect(readStillingerStorage(window.localStorage).ok).toBe(false);
        },
    );

    it("rapporterer når nettleseren blokkerer lagring", () => {
        const blockedStorage = {
            getItem: () => {
                throw new DOMException("Blocked", "SecurityError");
            },
            setItem: () => {
                throw new DOMException("Blocked", "SecurityError");
            },
        };

        expect(readStillingerStorage(blockedStorage)).toMatchObject({ ok: false });
        expect(writeStillingerStorage(blockedStorage, persistedState)).toMatchObject({ ok: false });
    });
});
