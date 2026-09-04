import { type EmployerProfile, profileHeroIds, profileLogoIds, profileThemeIds, workModes } from "./types";

export const PROFILE_STORAGE_KEY = "arbeidsplassen-lab:bedriftsprofil:v1";
export const PROFILE_STORAGE_UNAVAILABLE_MESSAGE =
    "Bedriftsprofilen kunne ikke lagres i denne nettleseren. Endringene beholdes bare i denne fanen.";

const storageVersion = 1;
const maxStoredCharacters = 50_000;
const maxTextLength = 2_000;

type ProfileStorageResult<T> = { ok: true; value: T } | { ok: false; message: string };

type PersistedProfile = {
    version: typeof storageVersion;
    profile: EmployerProfile;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown, maxLength = maxTextLength): value is string {
    return typeof value === "string" && value.length <= maxLength;
}

function isEmployerProfile(value: unknown): value is EmployerProfile {
    if (!isRecord(value)) {
        return false;
    }

    const stringFields = [
        "tagline",
        "about",
        "employerPromise",
        "location",
        "industry",
        "employeeCount",
        "website",
    ] as const;

    return (
        isString(value.name, 200) &&
        value.name.trim().length > 0 &&
        stringFields.every((field) => isString(value[field])) &&
        isString(value.workMode, 100) &&
        workModes.some((workMode) => workMode === value.workMode) &&
        Array.isArray(value.highlights) &&
        value.highlights.length === 3 &&
        value.highlights.every((highlight) => isString(highlight, 200)) &&
        isString(value.themeId, 100) &&
        profileThemeIds.some((id) => id === value.themeId) &&
        isString(value.heroId, 100) &&
        profileHeroIds.some((id) => id === value.heroId) &&
        isString(value.logoId, 100) &&
        profileLogoIds.some((id) => id === value.logoId)
    );
}

export function readProfileStorage(storage: Pick<Storage, "getItem">): ProfileStorageResult<EmployerProfile | null> {
    let storedValue: string | null;

    try {
        storedValue = storage.getItem(PROFILE_STORAGE_KEY);
    } catch {
        return { ok: false, message: PROFILE_STORAGE_UNAVAILABLE_MESSAGE };
    }

    if (storedValue === null) {
        return { ok: true, value: null };
    }

    if (storedValue.length > maxStoredCharacters) {
        return { ok: false, message: "Den lagrede bedriftsprofilen var for stor og ble ikke lest." };
    }

    let parsedValue: unknown;
    try {
        parsedValue = JSON.parse(storedValue);
    } catch {
        return { ok: false, message: "Den lagrede bedriftsprofilen kunne ikke leses." };
    }

    if (!isRecord(parsedValue) || parsedValue.version !== storageVersion || !isEmployerProfile(parsedValue.profile)) {
        return { ok: false, message: "Den lagrede bedriftsprofilen hadde et ukjent format." };
    }

    return { ok: true, value: parsedValue.profile };
}

export function writeProfileStorage(
    storage: Pick<Storage, "setItem">,
    profile: EmployerProfile,
): ProfileStorageResult<undefined> {
    const payload: PersistedProfile = {
        version: storageVersion,
        profile,
    };

    let serializedPayload: string;
    try {
        serializedPayload = JSON.stringify(payload);
    } catch {
        return { ok: false, message: "Bedriftsprofilen kunne ikke klargjøres for lokal lagring." };
    }

    if (serializedPayload.length > maxStoredCharacters) {
        return { ok: false, message: "Bedriftsprofilen er for stor til å lagres i nettleseren." };
    }

    try {
        storage.setItem(PROFILE_STORAGE_KEY, serializedPayload);
        return { ok: true, value: undefined };
    } catch {
        return { ok: false, message: PROFILE_STORAGE_UNAVAILABLE_MESSAGE };
    }
}

export function clearProfileStorage(storage: Pick<Storage, "removeItem">): ProfileStorageResult<undefined> {
    try {
        storage.removeItem(PROFILE_STORAGE_KEY);
        return { ok: true, value: undefined };
    } catch {
        return { ok: false, message: PROFILE_STORAGE_UNAVAILABLE_MESSAGE };
    }
}
