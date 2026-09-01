import { describe, expect, it } from "vitest";
import { isAdvertId } from "./route";

describe("isAdvertId", () => {
    it("godtar UUID-er som brukes av lokale annonser", () => {
        expect(isAdvertId("058bb7d7-b06a-4d2b-b4d5-7719931885fb")).toBe(true);
    });

    it.each(["", "../stillinger", "058bb7d7-b06a-4d2b-b4d5", "not-a-uuid"])(
        "avviser ugyldige annonse-ID-er",
        (value) => {
            expect(isAdvertId(value)).toBe(false);
        },
    );
});
