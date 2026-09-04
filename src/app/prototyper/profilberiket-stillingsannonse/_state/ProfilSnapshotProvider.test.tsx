import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { createDefaultEmployerProfile } from "@/app/_common/bedriftsprofil/profile";
import { PROFILE_STORAGE_KEY, writeProfileStorage } from "@/app/_common/bedriftsprofil/profileStorage";
import ProfilSnapshotProvider, { useProfilSnapshot } from "./ProfilSnapshotProvider";

function SnapshotProbe() {
    const { profile, storageReady, storageError } = useProfilSnapshot();

    return (
        <>
            <output data-testid="profile-name">{profile.name}</output>
            <output data-testid="profile-tagline">{profile.tagline}</output>
            <output data-testid="storage-ready">{String(storageReady)}</output>
            <output data-testid="storage-error">{storageError}</output>
        </>
    );
}

function renderProvider() {
    return render(
        <ProfilSnapshotProvider initialProfile={createDefaultEmployerProfile()}>
            <SnapshotProbe />
        </ProfilSnapshotProvider>,
    );
}

describe("ProfilSnapshotProvider", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("bruker standardprofil når ingen profil er lagret", async () => {
        const defaultProfile = createDefaultEmployerProfile();

        renderProvider();

        await waitFor(() => expect(screen.getByTestId("storage-ready")).toHaveTextContent("true"));
        expect(screen.getByTestId("profile-name")).toHaveTextContent(defaultProfile.name);
        expect(screen.getByTestId("profile-tagline")).toHaveTextContent(defaultProfile.tagline);
        expect(screen.getByTestId("storage-error")).toBeEmptyDOMElement();
    });

    it("henter lagret profil etter hydrering", async () => {
        const profile = {
            ...createDefaultEmployerProfile(),
            tagline: "Denne teksten kommer fra lagret profil",
        };
        writeProfileStorage(window.localStorage, profile);

        renderProvider();

        await waitFor(() =>
            expect(screen.getByTestId("profile-tagline")).toHaveTextContent("Denne teksten kommer fra lagret profil"),
        );
        expect(screen.getByTestId("storage-ready")).toHaveTextContent("true");
    });

    it("beholder standardprofil og viser feil for ugyldig lagring", async () => {
        const defaultProfile = createDefaultEmployerProfile();
        window.localStorage.setItem(PROFILE_STORAGE_KEY, '{"version":1,"profile":{"name":""}}');

        renderProvider();

        await waitFor(() => expect(screen.getByTestId("storage-ready")).toHaveTextContent("true"));
        expect(screen.getByTestId("profile-name")).toHaveTextContent(defaultProfile.name);
        expect(screen.getByTestId("storage-error")).toHaveTextContent("ukjent format");
    });

    it("oppdaterer ikke profilen fra storage-hendelser uten ny lasting", async () => {
        renderProvider();
        await waitFor(() => expect(screen.getByTestId("storage-ready")).toHaveTextContent("true"));

        const changedProfile = {
            ...createDefaultEmployerProfile(),
            tagline: "Skal ikke vises uten ny lasting",
        };
        writeProfileStorage(window.localStorage, changedProfile);

        act(() => {
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key: PROFILE_STORAGE_KEY,
                    newValue: window.localStorage.getItem(PROFILE_STORAGE_KEY),
                }),
            );
        });

        expect(screen.getByTestId("profile-tagline")).not.toHaveTextContent(changedProfile.tagline);
    });
});
