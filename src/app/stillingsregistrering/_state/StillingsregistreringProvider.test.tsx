import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { readRegistrationStorage } from "../_lib/registrationStorage";
import { INITIAL_ADVERT_ID } from "../_mock/data";
import StillingsregistreringProvider, { useStillingsregistrering } from "./StillingsregistreringProvider";

function StateProbe() {
    const { isReady, state, createAdvert, deleteAdvert, updateField, setLastVisitedStep, publishAdvert } =
        useStillingsregistrering();
    const [copiedAdvertId, setCopiedAdvertId] = useState("");
    const advert = state.adverts.find((candidate) => candidate.id === INITIAL_ADVERT_ID);
    const copiedAdvert = state.adverts.find((candidate) => candidate.id === copiedAdvertId);

    return (
        <>
            <output data-testid="storage-ready">{String(isReady)}</output>
            <output data-testid="headline">{advert?.form.overskrift}</output>
            <output data-testid="step">{advert?.lastVisitedStep}</output>
            <output data-testid="status">{advert?.status}</output>
            <output data-testid="advert-count">{state.adverts.length}</output>
            <output data-testid="copied-headline">{copiedAdvert?.form.overskrift}</output>
            <button type="button" onClick={() => updateField(INITIAL_ADVERT_ID, "overskrift", "Frontendutvikler")}>
                Endre overskrift
            </button>
            <button type="button" onClick={() => setLastVisitedStep(INITIAL_ADVERT_ID, 4)}>
                Gå til steg fire
            </button>
            <button type="button" onClick={() => publishAdvert(INITIAL_ADVERT_ID)}>
                Publiser lokalt
            </button>
            <button
                type="button"
                onClick={() => {
                    setCopiedAdvertId(createAdvert(INITIAL_ADVERT_ID));
                }}
            >
                Kopier annonse
            </button>
            <button type="button" onClick={() => deleteAdvert(copiedAdvertId)}>
                Slett kopien
            </button>
        </>
    );
}

async function waitForStorage() {
    await waitFor(() => expect(screen.getByTestId("storage-ready")).toHaveTextContent("true"));
}

describe("StillingsregistreringProvider", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("beholder endringer, siste steg og publiseringsstatus ved ny montering", async () => {
        const firstRender = render(
            <StillingsregistreringProvider>
                <StateProbe />
            </StillingsregistreringProvider>,
        );
        await waitForStorage();

        fireEvent.click(screen.getByRole("button", { name: "Endre overskrift" }));
        fireEvent.click(screen.getByRole("button", { name: "Gå til steg fire" }));
        fireEvent.click(screen.getByRole("button", { name: "Publiser lokalt" }));

        await waitFor(() => {
            const stored = readRegistrationStorage(window.localStorage);
            expect(stored.ok && stored.value?.adverts[0]?.form.overskrift).toBe("Frontendutvikler");
            expect(stored.ok && stored.value?.adverts[0]?.lastVisitedStep).toBe(4);
            expect(stored.ok && stored.value?.adverts[0]?.status).toBe("published");
        });

        firstRender.unmount();
        render(
            <StillingsregistreringProvider>
                <StateProbe />
            </StillingsregistreringProvider>,
        );
        await waitForStorage();

        expect(screen.getByTestId("headline")).toHaveTextContent("Frontendutvikler");
        expect(screen.getByTestId("step")).toHaveTextContent("4");
        expect(screen.getByTestId("status")).toHaveTextContent("published");
    });

    it("kan kopiere og slette en lokal annonse", async () => {
        render(
            <StillingsregistreringProvider>
                <StateProbe />
            </StillingsregistreringProvider>,
        );
        await waitForStorage();

        fireEvent.click(screen.getByRole("button", { name: "Endre overskrift" }));
        fireEvent.click(screen.getByRole("button", { name: "Kopier annonse" }));

        expect(screen.getByTestId("advert-count")).toHaveTextContent("2");
        expect(screen.getByTestId("copied-headline")).toHaveTextContent("Frontendutvikler – kopi");

        fireEvent.click(screen.getByRole("button", { name: "Slett kopien" }));
        expect(screen.getByTestId("advert-count")).toHaveTextContent("1");
    });
});
