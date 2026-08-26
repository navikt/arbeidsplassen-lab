import { describe, expect, it } from "vitest";
import {
    addKvalifikasjon,
    createScreeningSporsmal,
    getScreeningSporsmalTekst,
    removeScreeningSporsmal,
} from "./selection";

describe("screeningspørsmål", () => {
    it("oppretter standardspørsmålet som første spørsmål", () => {
        const sporsmal = createScreeningSporsmal("screening-1");

        expect(getScreeningSporsmalTekst(sporsmal)).toBe("Hvorfor er du den rette for jobben?");
    });

    it("beholder det siste spørsmålet når noen forsøker å fjerne det", () => {
        const sporsmal = [createScreeningSporsmal("screening-1")];

        expect(removeScreeningSporsmal(sporsmal, "screening-1")).toEqual(sporsmal);
    });

    it("kan fjerne et spørsmål når det finnes flere", () => {
        const sporsmal = [createScreeningSporsmal("screening-1"), createScreeningSporsmal("screening-2", "motivasjon")];

        expect(removeScreeningSporsmal(sporsmal, "screening-1")).toEqual([sporsmal[1]]);
    });

    it("bruker teksten fra et eget spørsmål", () => {
        const sporsmal = {
            ...createScreeningSporsmal("screening-1", "eget"),
            egenTekst: "  Kan du jobbe turnus?  ",
        };

        expect(getScreeningSporsmalTekst(sporsmal)).toBe("Kan du jobbe turnus?");
    });
});

describe("kvalifikasjoner", () => {
    it("legger til en trimmet kvalifikasjon", () => {
        expect(addKvalifikasjon([], "kval-1", "  Truckførerbevis  ")).toEqual([
            { id: "kval-1", label: "Truckførerbevis" },
        ]);
    });

    it("avviser tomme og dupliserte kvalifikasjoner", () => {
        const kvalifikasjoner = [{ id: "kval-1", label: "Truckførerbevis" }];

        expect(addKvalifikasjon(kvalifikasjoner, "kval-2", " ")).toBe(kvalifikasjoner);
        expect(addKvalifikasjon(kvalifikasjoner, "kval-3", "truckførerbevis")).toBe(kvalifikasjoner);
    });
});
