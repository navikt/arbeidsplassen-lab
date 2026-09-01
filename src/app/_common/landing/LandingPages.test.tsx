import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BedriftPage from "@/app/bedrift/page";
import Home from "@/app/Home";
import UngPage from "@/app/ung/page";

vi.mock("@navikt/arbeidsplassen-react", () => {
    const Illustration = ({ className }: { className?: string }) => (
        <svg className={className} aria-hidden="true" data-testid="illustrasjon" />
    );

    return {
        CelebratingFigure: Illustration,
        FigureWithEnvelope: Illustration,
        FigureWithMagnifier: Illustration,
        FiguresGivingHighFive: Illustration,
        FiguresSideBySide: Illustration,
        WavingFigure: Illustration,
        WorriedFigure: Illustration,
    };
});

describe("inngangssidene", () => {
    it("viser jobbsøkerforsiden", () => {
        render(<Home />);

        expect(screen.getByRole("heading", { level: 1, name: "Alle ledige jobber, samlet på én plass" })).toBeVisible();
        expect(screen.getByRole("button", { name: "Søk etter jobber" })).toHaveAttribute("href", "/stillinger");
        expect(screen.getByRole("button", { name: "Se prototyper" })).toHaveAttribute("href", "/prototyper");
    });

    it("viser bedriftssiden", () => {
        render(<BedriftPage />);

        expect(screen.getByRole("heading", { level: 1, name: "Enkel jobbutlysning, kostnadsfritt" })).toBeVisible();
        expect(screen.getByRole("button", { name: "Gå til min bedriftsside" })).toHaveAttribute(
            "href",
            "/stillingsregistrering",
        );
    });

    it("viser siden for unge", () => {
        render(<UngPage />);

        expect(screen.getByRole("heading", { level: 1, name: "Jobb for deg som er ung" })).toBeVisible();
        expect(screen.getByRole("link", { name: "Jobber for deg under 18 år" })).toHaveAttribute("href", "/stillinger");
    });
});
