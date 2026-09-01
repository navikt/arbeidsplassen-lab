export const SIMULATED_AUTH_STORAGE_KEY = "arbeidsplassen-lab:simulated-auth:v1";
export const AUTH_STORAGE_UNAVAILABLE_MESSAGE =
    "Innloggingen kunne ikke lagres i denne nettleseren. Du er bare innlogget i denne fanen.";

const STORAGE_VERSION = 1;

type PersistedAuthState = {
    version: typeof STORAGE_VERSION;
    authenticated: boolean;
};

export type AuthStorageResult<T> = { ok: true; value: T } | { ok: false; message: string };

function isPersistedAuthState(value: unknown): value is PersistedAuthState {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return false;
    }

    const candidate = value as Record<string, unknown>;
    return candidate.version === STORAGE_VERSION && typeof candidate.authenticated === "boolean";
}

export function readSimulatedAuth(storage: Pick<Storage, "getItem">): AuthStorageResult<boolean> {
    let storedValue: string | null;

    try {
        storedValue = storage.getItem(SIMULATED_AUTH_STORAGE_KEY);
    } catch {
        return { ok: false, message: AUTH_STORAGE_UNAVAILABLE_MESSAGE };
    }

    if (storedValue === null) {
        return { ok: true, value: false };
    }

    let parsedValue: unknown;
    try {
        parsedValue = JSON.parse(storedValue);
    } catch {
        return { ok: false, message: "Den lagrede innloggingen kunne ikke leses og ble nullstilt." };
    }

    return isPersistedAuthState(parsedValue)
        ? { ok: true, value: parsedValue.authenticated }
        : { ok: false, message: "Den lagrede innloggingen hadde et ukjent format og ble nullstilt." };
}

export function writeSimulatedAuth(
    storage: Pick<Storage, "setItem">,
    authenticated: boolean,
): AuthStorageResult<undefined> {
    const payload: PersistedAuthState = {
        version: STORAGE_VERSION,
        authenticated,
    };

    try {
        storage.setItem(SIMULATED_AUTH_STORAGE_KEY, JSON.stringify(payload));
        return { ok: true, value: undefined };
    } catch {
        return { ok: false, message: AUTH_STORAGE_UNAVAILABLE_MESSAGE };
    }
}
