import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { readStillingerStorage, writeStillingerStorage } from "../_lib/stillingerStorage";
import { emptySearchCriteria, StillingerStateProvider, useStillingerState } from "./StillingerStateProvider";

function StateProbe() {
    const { state, isStorageReady, toggleFavorite, saveCurrentSearch } = useStillingerState();

    return (
        <>
            <output data-testid="storage-ready">{String(isStorageReady)}</output>
            <output data-testid="favorites">{state.favoriteIds.join(",")}</output>
            <output data-testid="saved-searches">{state.savedSearches.map((search) => search.name).join(",")}</output>
            <button type="button" onClick={() => toggleFavorite("lavvo-kafemedarbeider")}>
                Bytt favoritt
            </button>
            <button type="button" onClick={() => saveCurrentSearch("Mitt søk")}>
                Lagre testsøk
            </button>
        </>
    );
}

async function waitForStorage() {
    await waitFor(() => expect(screen.getByTestId("storage-ready")).toHaveTextContent("true"));
}

describe("StillingerStateProvider med nettleserlagring", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("henter favoritter og lagrede søk etter hydrering", async () => {
        writeStillingerStorage(window.localStorage, {
            favoriteIds: ["lavvo-kafemedarbeider"],
            savedSearches: [
                {
                    id: "saved-search-oslo",
                    name: "IT i Oslo",
                    criteria: { ...emptySearchCriteria, locations: ["Oslo"] },
                    sort: "relevant",
                },
            ],
        });

        render(
            <StillingerStateProvider>
                <StateProbe />
            </StillingerStateProvider>,
        );
        await waitForStorage();

        expect(screen.getByTestId("favorites")).toHaveTextContent("lavvo-kafemedarbeider");
        expect(screen.getByTestId("saved-searches")).toHaveTextContent("IT i Oslo");
    });

    it("beholder nye favoritter og søk når provideren monteres på nytt", async () => {
        const firstRender = render(
            <StillingerStateProvider>
                <StateProbe />
            </StillingerStateProvider>,
        );
        await waitForStorage();

        fireEvent.click(screen.getByRole("button", { name: "Bytt favoritt" }));
        fireEvent.click(screen.getByRole("button", { name: "Lagre testsøk" }));

        await waitFor(() => {
            const stored = readStillingerStorage(window.localStorage);
            expect(stored.ok && stored.value.favoriteIds).toContain("lavvo-kafemedarbeider");
            expect(stored.ok && stored.value.savedSearches[0]?.name).toBe("Mitt søk");
        });

        firstRender.unmount();
        render(
            <StillingerStateProvider>
                <StateProbe />
            </StillingerStateProvider>,
        );
        await waitForStorage();

        expect(screen.getByTestId("favorites")).toHaveTextContent("lavvo-kafemedarbeider");
        expect(screen.getByTestId("saved-searches")).toHaveTextContent("Mitt søk");
    });
});
