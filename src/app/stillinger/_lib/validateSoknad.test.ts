import { describe, expect, it } from "vitest";
import { lavvoSuperraskSoknad } from "@/mock/stillinger/superraskSoknad";
import { hasSoknadErrors, validateSoknad } from "./validateSoknad";

describe("validateSoknad", () => {
    it("krever kontaktinformasjon og svar på arbeidsgivers spørsmål", () => {
        const errors = validateSoknad(
            {
                email: "",
                telephone: "",
                answers: {},
            },
            lavvoSuperraskSoknad,
        );

        expect(errors.email).toMatch(/e-postadressen/u);
        expect(errors.telephone).toMatch(/telefonnummeret/u);
        expect(errors.answers["rett-person"]).toMatch(/svare/u);
        expect(hasSoknadErrors(errors)).toBe(true);
    });

    it("avviser ugyldig e-post, telefon og for langt svar", () => {
        const errors = validateSoknad(
            {
                email: "ikke-en-epost",
                telephone: "123",
                answers: { "rett-person": "a".repeat(801) },
            },
            lavvoSuperraskSoknad,
        );

        expect(errors.email).toMatch(/gyldig e-postadresse/u);
        expect(errors.telephone).toMatch(/gyldig telefonnummer/u);
        expect(errors.answers["rett-person"]).toMatch(/800 tegn/u);
    });

    it("godtar gyldige testverdier", () => {
        const errors = validateSoknad(
            {
                email: "test@example.invalid",
                telephone: "00000000",
                answers: { "rett-person": "Jeg liker å hjelpe kunder." },
            },
            lavvoSuperraskSoknad,
        );

        expect(hasSoknadErrors(errors)).toBe(false);
    });
});
