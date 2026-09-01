import { beforeEach, describe, expect, it } from "vitest";
import { createAdvert } from "../_mock/data";
import { REGISTRATION_STORAGE_KEY, readRegistrationStorage, writeRegistrationStorage } from "./registrationStorage";
import type { RegistrationState } from "./types";

const persistedState: RegistrationState = {
    adverts: [createAdvert("058bb7d7-b06a-4d2b-b4d5-7719931885fb", "2026-09-01T10:22:00.000Z")],
};

describe("lokal lagring av stillingsannonser", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("lagrer og leser en versjonert annonsetilstand", () => {
        persistedState.adverts[0]!.form.overskrift = "En lokal testannonse";

        expect(writeRegistrationStorage(window.localStorage, persistedState).ok).toBe(true);
        expect(readRegistrationStorage(window.localStorage)).toEqual({
            ok: true,
            value: persistedState,
        });
        expect(JSON.parse(window.localStorage.getItem(REGISTRATION_STORAGE_KEY) ?? "").version).toBe(1);
    });

    it("skiller mellom tom lagring og en lagret tom liste", () => {
        expect(readRegistrationStorage(window.localStorage)).toEqual({ ok: true, value: null });

        writeRegistrationStorage(window.localStorage, { adverts: [] });
        expect(readRegistrationStorage(window.localStorage)).toEqual({ ok: true, value: { adverts: [] } });
    });

    it.each([
        "ikke-json",
        JSON.stringify({ version: 99, adverts: [] }),
        JSON.stringify({
            version: 1,
            adverts: [{ ...persistedState.adverts[0], status: "ukjent" }],
        }),
    ])("avviser ugyldig eller ukjent nettleserdata", (storedValue) => {
        window.localStorage.setItem(REGISTRATION_STORAGE_KEY, storedValue);

        expect(readRegistrationStorage(window.localStorage).ok).toBe(false);
    });

    it("rapporterer når nettleseren blokkerer lagring", () => {
        const blockedStorage = {
            getItem: () => {
                throw new DOMException("Blocked", "SecurityError");
            },
            setItem: () => {
                throw new DOMException("Blocked", "SecurityError");
            },
        };

        expect(readRegistrationStorage(blockedStorage).ok).toBe(false);
        expect(writeRegistrationStorage(blockedStorage, persistedState).ok).toBe(false);
    });
});
