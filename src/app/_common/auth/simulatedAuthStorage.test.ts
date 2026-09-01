import { beforeEach, describe, expect, it } from "vitest";
import { readSimulatedAuth, SIMULATED_AUTH_STORAGE_KEY, writeSimulatedAuth } from "./simulatedAuthStorage";

describe("simulert innlogging i nettleseren", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("lagrer og leser innloggingsstatus", () => {
        expect(writeSimulatedAuth(window.localStorage, true).ok).toBe(true);
        expect(readSimulatedAuth(window.localStorage)).toEqual({ ok: true, value: true });
        expect(JSON.parse(window.localStorage.getItem(SIMULATED_AUTH_STORAGE_KEY) ?? "")).toEqual({
            version: 1,
            authenticated: true,
        });
    });

    it.each(["ikke-json", JSON.stringify({ version: 2, authenticated: true })])(
        "avviser ugyldig eller ukjent innloggingsdata",
        (storedValue) => {
            window.localStorage.setItem(SIMULATED_AUTH_STORAGE_KEY, storedValue);

            expect(readSimulatedAuth(window.localStorage).ok).toBe(false);
        },
    );

    it("rapporterer når nettleseren blokkerer lagring", () => {
        const blockedStorage = {
            getItem: () => {
                throw new DOMException("Blocked", "SecurityError");
            },
            setItem: () => {
                throw new DOMException("Blocked", "SecurityError");
            },
        };

        expect(readSimulatedAuth(blockedStorage).ok).toBe(false);
        expect(writeSimulatedAuth(blockedStorage, true).ok).toBe(false);
    });
});
