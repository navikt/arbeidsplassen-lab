import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getMockStilling } from "@/mock/stillinger/annonser";
import Soknadsskjema from "./Soknadsskjema";

function getSuperraskStilling() {
    const stilling = getMockStilling("lavvo-kafemedarbeider");
    if (stilling?.application.type !== "superrask") {
        throw new Error("Mangler superrask teststilling");
    }
    return { stilling, applicationForm: stilling.application.form };
}

describe("Soknadsskjema", () => {
    it("viser feiloppsummering og flytter fokus ved manglende verdier", async () => {
        const { stilling, applicationForm } = getSuperraskStilling();
        render(<Soknadsskjema stilling={stilling} applicationForm={applicationForm} />);

        fireEvent.click(screen.getByRole("button", { name: "Send søknad" }));

        const summary = await screen.findByText("Du må rette disse feilene før du kan fortsette");
        expect(screen.getAllByText("Du må oppgi e-postadressen din")).toHaveLength(2);
        expect(screen.getAllByText("Du må oppgi telefonnummeret ditt")).toHaveLength(2);
        await waitFor(() => expect(summary.closest("[tabindex='-1']")).toHaveFocus());
    });

    it("forkaster feltverdiene etter en simulert innsending", async () => {
        const { stilling, applicationForm } = getSuperraskStilling();
        render(<Soknadsskjema stilling={stilling} applicationForm={applicationForm} />);

        fireEvent.change(screen.getByLabelText("Hvorfor er du rett person for denne jobben?"), {
            target: { value: "Jeg liker å hjelpe kunder." },
        });
        fireEvent.change(screen.getByLabelText("E-post"), {
            target: { value: "test@example.invalid" },
        });
        fireEvent.change(screen.getByLabelText("Telefonnummer"), {
            target: { value: "00000000" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Send søknad" }));

        expect(await screen.findByText("Søknaden ble simulert")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("test@example.invalid")).not.toBeInTheDocument();
        expect(screen.getByText(/ingen kontaktopplysninger eller svar ble sendt eller lagret/iu)).toBeInTheDocument();
    });
});
