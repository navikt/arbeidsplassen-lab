import { beforeEach, describe, expect, it } from "vitest";
import { createDefaultEmployerProfile } from "./profile";
import {
    PROFILE_STORAGE_KEY,
    PROFILE_STORAGE_UNAVAILABLE_MESSAGE,
    readProfileStorage,
    writeProfileStorage,
} from "./profileStorage";

describe("bedriftsprofillagring", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("skriver og leser en gyldig profil", () => {
        const profile = {
            ...createDefaultEmployerProfile(),
            tagline: "Lagret profiltekst",
            highlights: ["Første", "Andre", "Tredje"],
        };

        const writeResult = writeProfileStorage(window.localStorage, profile);
        const readResult = readProfileStorage(window.localStorage);

        expect(writeResult.ok).toBe(true);
        expect(readResult).toEqual({ ok: true, value: profile });
    });

    it("avviser en profil med ukjent struktur", () => {
        window.localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify({
                version: 1,
                profile: {
                    name: "",
                },
            }),
        );

        expect(readProfileStorage(window.localStorage)).toEqual({
            ok: false,
            message: "Den lagrede bedriftsprofilen hadde et ukjent format.",
        });
    });

    it("rapporterer utilgjengelig nettleserlagring", () => {
        const unavailableStorage = {
            getItem: () => {
                throw new Error("Storage unavailable");
            },
        };

        expect(readProfileStorage(unavailableStorage)).toEqual({
            ok: false,
            message: PROFILE_STORAGE_UNAVAILABLE_MESSAGE,
        });
    });
});
