import { describe, expect, it } from "vitest";
import { getLabHeaderConfig } from "./headerConfig";

describe("headerkonfigurasjon", () => {
    it.each([
        ["/", { variant: "person" }],
        ["/ung", { variant: "person", active: "ung" }],
        ["/stillinger", { variant: "person", active: "ledige-stillinger" }],
        ["/stillinger/favoritter", { variant: "person", active: "ledige-stillinger" }],
        ["/bedrift", { variant: "company" }],
        ["/stillingsregistrering", { variant: "company", active: undefined }],
        ["/stillingsregistrering/stillingsannonser", { variant: "company", active: "stillingsannonser" }],
        ["/stillingsregistrering/rediger/annonse/steg/2", { variant: "company", active: "stillingsannonser" }],
    ] as const)("velger riktig meny for %s", (pathname, expected) => {
        expect(getLabHeaderConfig(pathname)).toEqual(expected);
    });
});
