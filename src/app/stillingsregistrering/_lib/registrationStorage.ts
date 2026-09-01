import { type Advert, type AdvertFormData, advertStatuses, applicationMethods, type RegistrationState } from "./types";

export const REGISTRATION_STORAGE_KEY = "arbeidsplassen-lab:stillingsregistrering:v1";
export const REGISTRATION_STORAGE_UNAVAILABLE_MESSAGE =
    "Stillingsannonsene kunne ikke lagres i denne nettleseren. Endringene beholdes bare i denne fanen.";

const STORAGE_VERSION = 1;
const MAX_STORED_CHARACTERS = 1_000_000;
const MAX_ADVERTS = 50;
const MAX_TEXT_LENGTH = 20_000;
const MAX_ARRAY_ITEMS = 100;

type PersistedPayload = RegistrationState & {
    version: typeof STORAGE_VERSION;
};

export type RegistrationStorageResult<T> = { ok: true; value: T } | { ok: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown, maxLength = MAX_TEXT_LENGTH): value is string {
    return typeof value === "string" && value.length <= maxLength;
}

function isStringArray(value: unknown): value is string[] {
    return (
        Array.isArray(value) &&
        value.length <= MAX_ARRAY_ITEMS &&
        value.every((item) => isString(item, MAX_TEXT_LENGTH))
    );
}

function isAdvertForm(value: unknown): value is AdvertFormData {
    if (!isRecord(value)) {
        return false;
    }

    const stringFields = [
        "stillingstittel",
        "antallStillinger",
        "oppstartsdato",
        "ansettelsesform",
        "arbeidstidsordning",
        "hjemmekontor",
        "gateadresse",
        "postnummer",
        "sted",
        "omrader",
        "apningstekst",
        "arbeidsoppgaver",
        "hvaTilbyr",
        "hvemSerEtter",
        "annonsetekst",
        "overskrift",
        "bedriftsnavn",
        "omBedriften",
        "sektor",
        "nettside",
        "linkedin",
        "facebook",
        "twitter",
        "kontaktNavn",
        "kontaktEpost",
        "kontaktTittel",
        "kontaktTelefon",
        "soknadEpost",
        "soknadUrl",
        "varslingEpost",
        "soknadsfrist",
        "publiseringsdato",
    ] as const;

    const stringArrayFields = [
        "omfang",
        "arbeidsdager",
        "arbeidstid",
        "arbeidssprak",
        "kanaler",
        "kvalifikasjoner",
    ] as const;

    return (
        stringFields.every((field) => isString(value[field])) &&
        stringArrayFields.every((field) => isStringArray(value[field])) &&
        typeof value.etterAvtale === "boolean" &&
        typeof value.sokSnarest === "boolean" &&
        typeof value.rekrutteringshjelp === "boolean" &&
        typeof value.godtattVilkar === "boolean" &&
        (value.arbeidsstedType === "adresse" || value.arbeidsstedType === "omrader") &&
        (value.annonseformat === "strukturert" || value.annonseformat === "ustrukturert") &&
        Array.isArray(value.soknadstype) &&
        value.soknadstype.length <= applicationMethods.length &&
        value.soknadstype.every(
            (method) => typeof method === "string" && applicationMethods.some((allowed) => allowed === method),
        ) &&
        Array.isArray(value.screeningsporsmal) &&
        value.screeningsporsmal.length <= 5 &&
        value.screeningsporsmal.every(
            (question) =>
                isRecord(question) &&
                isString(question.id, 200) &&
                question.id.length > 0 &&
                isString(question.label, 500) &&
                question.label.length > 0,
        )
    );
}

function isAdvert(value: unknown): value is Advert {
    return (
        isRecord(value) &&
        isString(value.id, 200) &&
        value.id.length > 0 &&
        typeof value.status === "string" &&
        advertStatuses.some((status) => status === value.status) &&
        isString(value.createdAt, 100) &&
        isString(value.updatedAt, 100) &&
        Number.isInteger(value.lastVisitedStep) &&
        typeof value.lastVisitedStep === "number" &&
        value.lastVisitedStep >= 1 &&
        value.lastVisitedStep <= 5 &&
        isAdvertForm(value.form)
    );
}

function parsePayload(value: unknown): RegistrationState | undefined {
    if (
        !isRecord(value) ||
        value.version !== STORAGE_VERSION ||
        !Array.isArray(value.adverts) ||
        value.adverts.length > MAX_ADVERTS ||
        !value.adverts.every(isAdvert)
    ) {
        return undefined;
    }

    return {
        adverts: [...new Map(value.adverts.map((advert) => [advert.id, advert])).values()],
    };
}

export function readRegistrationStorage(
    storage: Pick<Storage, "getItem">,
): RegistrationStorageResult<RegistrationState | null> {
    let storedValue: string | null;

    try {
        storedValue = storage.getItem(REGISTRATION_STORAGE_KEY);
    } catch {
        return { ok: false, message: REGISTRATION_STORAGE_UNAVAILABLE_MESSAGE };
    }

    if (storedValue === null) {
        return { ok: true, value: null };
    }

    if (storedValue.length > MAX_STORED_CHARACTERS) {
        return { ok: false, message: "De lagrede annonsene var for store og ble nullstilt." };
    }

    let parsedValue: unknown;
    try {
        parsedValue = JSON.parse(storedValue);
    } catch {
        return { ok: false, message: "De lagrede annonsene kunne ikke leses og ble nullstilt." };
    }

    const value = parsePayload(parsedValue);
    return value
        ? { ok: true, value }
        : { ok: false, message: "De lagrede annonsene hadde et ukjent format og ble nullstilt." };
}

export function writeRegistrationStorage(
    storage: Pick<Storage, "setItem">,
    state: RegistrationState,
): RegistrationStorageResult<undefined> {
    const payload: PersistedPayload = {
        version: STORAGE_VERSION,
        adverts: state.adverts,
    };

    let serializedPayload: string;
    try {
        serializedPayload = JSON.stringify(payload);
    } catch {
        return { ok: false, message: "Annonsene kunne ikke klargjøres for lokal lagring." };
    }

    if (serializedPayload.length > MAX_STORED_CHARACTERS) {
        return { ok: false, message: "Det er ikke plass til flere annonser i denne nettleseren." };
    }

    try {
        storage.setItem(REGISTRATION_STORAGE_KEY, serializedPayload);
        return { ok: true, value: undefined };
    } catch {
        return { ok: false, message: REGISTRATION_STORAGE_UNAVAILABLE_MESSAGE };
    }
}
