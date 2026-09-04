import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { getEmployerBadgeResults, getPublicBadgeResults } from "@/app/_common/bedriftsprofil/badges";
import {
    createDefaultEmployerProfile,
    mockEmployerActivity,
    profileReferenceDate,
} from "@/app/_common/bedriftsprofil/profile";
import { writeProfileStorage } from "@/app/_common/bedriftsprofil/profileStorage";
import { StillingerStateProvider } from "@/app/stillinger/_state/StillingerStateProvider";
import { getMockStilling, getSimilarStillinger } from "@/mock/stillinger/annonser";
import ProfilSnapshotProvider from "../_state/ProfilSnapshotProvider";
import ProfilberiketStillingsannonse from "./ProfilberiketStillingsannonse";

function getPrototypeStilling() {
    const stilling = getMockStilling("lavvo-kafemedarbeider");

    if (!stilling) {
        throw new Error("Mangler prototypeannonsen lavvo-kafemedarbeider");
    }

    return stilling;
}

function renderPrototype() {
    const stilling = getPrototypeStilling();
    const badges = getPublicBadgeResults(getEmployerBadgeResults(mockEmployerActivity, profileReferenceDate));

    return render(
        <StillingerStateProvider>
            <ProfilSnapshotProvider initialProfile={createDefaultEmployerProfile()}>
                <ProfilberiketStillingsannonse
                    stilling={stilling}
                    similarStillinger={getSimilarStillinger(stilling)}
                    badges={badges}
                />
            </ProfilSnapshotProvider>
        </StillingerStateProvider>,
    );
}

describe("ProfilberiketStillingsannonse", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("viser lagret profil sammen med hele stillingsflyten", async () => {
        const profile = {
            ...createDefaultEmployerProfile(),
            tagline: "Lagret slagord for den profilerte annonsen",
            employerPromise: "Her får du påvirke menyen, møteplassen og hvordan vi jobber sammen.",
            themeId: "fjord" as const,
            heroId: "handverk" as const,
            logoId: "ordmerke" as const,
        };
        writeProfileStorage(window.localStorage, profile);

        renderPrototype();

        expect(
            screen.getByRole("heading", {
                level: 1,
                name: /kreativ sjel søkes/iu,
            }),
        ).toBeInTheDocument();
        await waitFor(() => expect(screen.getAllByText(profile.tagline)).toHaveLength(2));

        expect(screen.getByText(profile.employerPromise)).toBeInTheDocument();
        expect(screen.getAllByText("Rask på labben").length).toBeGreaterThan(0);
        expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
            "href",
            "https://gronne-dragen.example.invalid/facebook",
        );
        expect(screen.getByRole("button", { name: /gå til superrask søknad/iu })).toHaveAttribute(
            "href",
            "/stillinger/stilling/lavvo-kafemedarbeider/superrask-soknad",
        );
        expect(screen.getByRole("button", { name: "Rapporter annonse" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Lignende annonser" })).toBeInTheDocument();
    });

    it("bevarer favoritt og utvidede stillingsdetaljer", async () => {
        renderPrototype();

        const followButton = screen.getByRole("button", { name: "Følg arbeidsgiver" });
        expect(followButton).toHaveAttribute("aria-pressed", "false");
        fireEvent.click(followButton);
        expect(screen.getByRole("button", { name: "Følger arbeidsgiver" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("status")).toHaveTextContent("Varsler sendes ikke");

        const heroHeading = screen.getByRole("heading", {
            level: 1,
            name: /kreativ sjel søkes/iu,
        });
        const hero = heroHeading.closest("header");
        expect(hero).not.toBeNull();

        const favoriteButton = within(hero as HTMLElement).getByRole("button", { name: "Lagre favoritt" });
        fireEvent.click(favoriteButton);
        expect(within(hero as HTMLElement).getByRole("button", { name: "Fjern fra favoritter" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Vis flere detaljer" }));
        expect(screen.getByText("Mulighet for hjemmekontor")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Vis færre detaljer" })).toBeInTheDocument();
    });
});
