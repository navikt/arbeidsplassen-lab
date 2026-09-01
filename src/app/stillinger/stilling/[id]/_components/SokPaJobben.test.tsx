import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getMockStilling } from "@/mock/stillinger/annonser";
import SokPaJobben from "./SokPaJobben";

function getStilling(id: string) {
    const stilling = getMockStilling(id);
    if (!stilling) {
        throw new Error(`Mangler teststilling ${id}`);
    }
    return stilling;
}

describe("SokPaJobben", () => {
    it("viser ekstern søknadslenke for ekstern søknad", () => {
        render(<SokPaJobben stilling={getStilling("bone-nor-data-lead")} />);

        expect(screen.getByRole("button", { name: /gå til søknad/iu })).toHaveAttribute(
            "href",
            "https://example.invalid/soknad/bone-nor-data-lead",
        );
    });

    it("viser e-postadresse og kopieringsknapp for e-postsøknad", () => {
        render(<SokPaJobben stilling={getStilling("raven-media-salgsreporter")} />);

        expect(screen.getByRole("link", { name: "soknad@palantir-media.example.invalid" })).toHaveAttribute(
            "href",
            "mailto:soknad@palantir-media.example.invalid",
        );
        expect(screen.getByRole("button", { name: /kopier e-postadresse/iu })).toBeInTheDocument();
    });

    it("viser intern lenke for superrask søknad", () => {
        render(<SokPaJobben stilling={getStilling("lavvo-kafemedarbeider")} />);

        expect(screen.getByRole("button", { name: /gå til superrask søknad/iu })).toHaveAttribute(
            "href",
            "/stillinger/stilling/lavvo-kafemedarbeider/superrask-soknad",
        );
    });
});
