import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SaveSearchModal from "./SaveSearchModal";

describe("SaveSearchModal", () => {
    async function flushModalEffects() {
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
    }

    it("krever et navn før søket lagres", async () => {
        const onSave = vi.fn();

        render(<SaveSearchModal open onClose={vi.fn()} onSave={onSave} />);
        await flushModalEffects();
        fireEvent.click(screen.getByRole("button", { name: "Lagre søk" }));

        expect(await screen.findByText("Navn må fylles ut")).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });

    it("lagrer et trimmet navn og lukker modalen", async () => {
        const onClose = vi.fn();
        const onSave = vi.fn();

        render(<SaveSearchModal open onClose={onClose} onSave={onSave} />);
        await flushModalEffects();
        fireEvent.change(screen.getByRole("textbox", { name: /navn/iu }), {
            target: { value: "  Jobber i Oslo  " },
        });
        fireEvent.click(screen.getByRole("button", { name: "Lagre søk" }));
        await flushModalEffects();

        expect(onSave).toHaveBeenCalledWith("Jobber i Oslo");
        expect(onClose).toHaveBeenCalledOnce();
    });

    it("viser veiledningen fra referansedialogen", async () => {
        render(<SaveSearchModal open onClose={vi.fn()} onSave={vi.fn()} />);
        await flushModalEffects();

        expect(screen.getByRole("dialog", { name: "Lagre søk" })).toBeInTheDocument();
        expect(screen.getByText("Må fylles ut")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Avbryt" }));
        await flushModalEffects();
    });
});
