import type { PublishedFilter, SavedSearch, SearchCriteria, SearchSort } from "./types";

export const STILLINGER_STORAGE_KEY = "arbeidsplassen-lab:stillinger:v1";
export const STORAGE_UNAVAILABLE_MESSAGE =
    "Favoritter og lagrede søk kunne ikke lagres i denne nettleseren. Endringene beholdes bare i denne fanen.";

const STORAGE_VERSION = 1;
const MAX_STORED_CHARACTERS = 100_000;
const MAX_FAVORITES = 100;
const MAX_FILTER_VALUES = 100;
const MAX_VALUE_LENGTH = 200;
const MAX_NAME_LENGTH = 100;

export type PersistedStillingerState = {
    favoriteIds: string[];
    savedSearches: SavedSearch[];
};

export type StorageResult<T> = { ok: true; value: T } | { ok: false; message: string };

type PersistedPayload = PersistedStillingerState & {
    version: typeof STORAGE_VERSION;
};

const publishedFilters: PublishedFilter[] = ["all", "today", "last3", "last7"];
const searchSorts: SearchSort[] = ["relevant", "published", "expires"];

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseString(value: unknown, maxLength = MAX_VALUE_LENGTH): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const trimmedValue = value.trim();
    return trimmedValue.length > 0 && trimmedValue.length <= maxLength ? trimmedValue : undefined;
}

function parseStringArray(value: unknown, maxItems = MAX_FILTER_VALUES): string[] | undefined {
    if (!Array.isArray(value) || value.length > maxItems) {
        return undefined;
    }

    const values: string[] = [];
    for (const item of value) {
        const parsedItem = parseString(item);
        if (!parsedItem) {
            return undefined;
        }
        values.push(parsedItem);
    }

    return [...new Set(values)];
}

function isPublishedFilter(value: unknown): value is PublishedFilter {
    return typeof value === "string" && publishedFilters.some((published) => published === value);
}

function isSearchSort(value: unknown): value is SearchSort {
    return typeof value === "string" && searchSorts.some((sort) => sort === value);
}

function parseSearchCriteria(value: unknown): SearchCriteria | undefined {
    if (!isRecord(value)) {
        return undefined;
    }

    const terms = parseStringArray(value.terms);
    const locations = parseStringArray(value.locations);
    const occupations = parseStringArray(value.occupations);
    const education = parseStringArray(value.education);
    const experience = parseStringArray(value.experience);
    const driversLicense = parseStringArray(value.driversLicense);
    const workLanguages = parseStringArray(value.workLanguages);
    const extent = parseStringArray(value.extent);
    const engagementTypes = parseStringArray(value.engagementTypes);
    const sectors = parseStringArray(value.sectors);
    const remote = parseStringArray(value.remote);

    if (
        !terms ||
        !locations ||
        !occupations ||
        !education ||
        !experience ||
        !driversLicense ||
        !workLanguages ||
        !extent ||
        !engagementTypes ||
        !sectors ||
        !remote ||
        !isPublishedFilter(value.published) ||
        typeof value.summerJobOnly !== "boolean" ||
        typeof value.superraskOnly !== "boolean"
    ) {
        return undefined;
    }

    return {
        terms,
        published: value.published,
        locations,
        occupations,
        education,
        experience,
        driversLicense,
        workLanguages,
        extent,
        engagementTypes,
        sectors,
        remote,
        summerJobOnly: value.summerJobOnly,
        superraskOnly: value.superraskOnly,
    };
}

function parseSavedSearch(value: unknown): SavedSearch | undefined {
    if (!isRecord(value)) {
        return undefined;
    }

    const id = parseString(value.id);
    const name = parseString(value.name, MAX_NAME_LENGTH);
    const criteria = parseSearchCriteria(value.criteria);

    if (!id || !name || !criteria || !isSearchSort(value.sort)) {
        return undefined;
    }

    return {
        id,
        name,
        criteria,
        sort: value.sort,
    };
}

function parsePayload(value: unknown): PersistedStillingerState | undefined {
    if (!isRecord(value) || value.version !== STORAGE_VERSION) {
        return undefined;
    }

    const favoriteIds = parseStringArray(value.favoriteIds, MAX_FAVORITES);
    if (!favoriteIds || !Array.isArray(value.savedSearches)) {
        return undefined;
    }

    const savedSearches: SavedSearch[] = [];
    for (const savedSearch of value.savedSearches) {
        const parsedSavedSearch = parseSavedSearch(savedSearch);
        if (!parsedSavedSearch) {
            return undefined;
        }
        savedSearches.push(parsedSavedSearch);
    }

    return {
        favoriteIds,
        savedSearches: [...new Map(savedSearches.map((search) => [search.id, search])).values()],
    };
}

export function readStillingerStorage(storage: Pick<Storage, "getItem">): StorageResult<PersistedStillingerState> {
    let storedValue: string | null;

    try {
        storedValue = storage.getItem(STILLINGER_STORAGE_KEY);
    } catch {
        return { ok: false, message: STORAGE_UNAVAILABLE_MESSAGE };
    }

    if (storedValue === null) {
        return { ok: true, value: { favoriteIds: [], savedSearches: [] } };
    }

    if (storedValue.length > MAX_STORED_CHARACTERS) {
        return { ok: false, message: "Lagrede favoritter og søk var for store og ble nullstilt." };
    }

    let parsedValue: unknown;
    try {
        parsedValue = JSON.parse(storedValue);
    } catch {
        return { ok: false, message: "Lagrede favoritter og søk kunne ikke leses og ble nullstilt." };
    }

    const value = parsePayload(parsedValue);
    return value
        ? { ok: true, value }
        : { ok: false, message: "Lagrede favoritter og søk hadde et ukjent format og ble nullstilt." };
}

export function writeStillingerStorage(
    storage: Pick<Storage, "setItem">,
    state: PersistedStillingerState,
): StorageResult<undefined> {
    const payload: PersistedPayload = {
        version: STORAGE_VERSION,
        favoriteIds: state.favoriteIds,
        savedSearches: state.savedSearches,
    };

    let serializedPayload: string;
    try {
        serializedPayload = JSON.stringify(payload);
    } catch {
        return { ok: false, message: "Favoritter og lagrede søk kunne ikke klargjøres for lokal lagring." };
    }

    if (serializedPayload.length > MAX_STORED_CHARACTERS) {
        return { ok: false, message: "Det er ikke plass til flere lagrede søk i denne nettleseren." };
    }

    try {
        storage.setItem(STILLINGER_STORAGE_KEY, serializedPayload);
        return { ok: true, value: undefined };
    } catch {
        return { ok: false, message: STORAGE_UNAVAILABLE_MESSAGE };
    }
}
