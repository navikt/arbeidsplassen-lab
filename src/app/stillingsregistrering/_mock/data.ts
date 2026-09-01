import { fictionalEmployerNames } from "@/mock/stillinger/mockIdentities";
import type { Advert, AdvertFormData, RegistrationState, ScreeningQuestion } from "../_lib/types";

export const INITIAL_ADVERT_ID = "058bb7d7-b06a-4d2b-b4d5-7719931885fb";

export const screeningQuestionSuggestions: ScreeningQuestion[] = [
    { id: "relevant-erfaring", label: "Beskriv din relevante erfaring fra dette fagfeltet." },
    {
        id: "utdanningsbakgrunn",
        label: "Fortell om din utdanningsbakgrunn og hvordan den er relevant for stillingen.",
    },
    { id: "verktoy-systemer", label: "Hvilke verktøy eller systemer har du jobbet med, og på hvilket nivå?" },
    {
        id: "utfordrende-oppgave",
        label: "Beskriv en situasjon der du løste en utfordrende oppgave i en lignende rolle.",
    },
    { id: "motivasjon", label: "Hva motiverer deg til å søke akkurat denne stillingen?" },
    { id: "teamarbeid", label: "Beskriv din erfaring med å jobbe i team." },
    {
        id: "tilgjengelighet",
        label: "Hvilken tilgjengelighet har du for oppstart, og eventuelt hvilke begrensninger?",
    },
    { id: "kundeservice", label: "Beskriv din erfaring fra kundeservice eller klientkontakt." },
    { id: "prosjektledelse", label: "Fortell om din erfaring med prosjektledelse eller koordinering." },
    { id: "norsk", label: "Beskriv din norskspråklige kompetanse, muntlig og skriftlig." },
];

export function createEmptyAdvertForm(): AdvertFormData {
    return {
        stillingstittel: "",
        antallStillinger: "1",
        oppstartsdato: "",
        etterAvtale: false,
        ansettelsesform: "",
        arbeidstidsordning: "",
        omfang: [],
        arbeidsdager: [],
        arbeidstid: [],
        arbeidssprak: [],
        hjemmekontor: "",
        arbeidsstedType: "adresse",
        gateadresse: "",
        postnummer: "",
        sted: "",
        omrader: "",
        annonseformat: "strukturert",
        apningstekst: "",
        arbeidsoppgaver: "",
        hvaTilbyr: "",
        hvemSerEtter: "",
        annonsetekst: "",
        overskrift: "",
        bedriftsnavn: fictionalEmployerNames.secondBreakfast,
        omBedriften: "",
        sektor: "",
        kanaler: [],
        nettside: "",
        linkedin: "",
        facebook: "",
        twitter: "",
        kontaktNavn: "",
        kontaktEpost: "",
        kontaktTittel: "",
        kontaktTelefon: "",
        soknadstype: ["superrask"],
        kvalifikasjoner: [],
        screeningsporsmal: [
            {
                id: "rett-person",
                label: "Hvorfor er du rett person for denne jobben?",
            },
        ],
        soknadEpost: "",
        soknadUrl: "",
        varslingEpost: "",
        soknadsfrist: "2026-09-22",
        sokSnarest: false,
        rekrutteringshjelp: false,
        publiseringsdato: "2026-09-01",
        godtattVilkar: false,
    };
}

export function createAdvert(id: string, createdAt = new Date().toISOString()): Advert {
    return {
        id,
        status: "draft",
        createdAt,
        updatedAt: createdAt,
        lastVisitedStep: 1,
        form: createEmptyAdvertForm(),
    };
}

export function cloneAdvertForm(form: AdvertFormData): AdvertFormData {
    return {
        ...form,
        omfang: [...form.omfang],
        arbeidsdager: [...form.arbeidsdager],
        arbeidstid: [...form.arbeidstid],
        arbeidssprak: [...form.arbeidssprak],
        kanaler: [...form.kanaler],
        soknadstype: [...form.soknadstype],
        kvalifikasjoner: [...form.kvalifikasjoner],
        screeningsporsmal: form.screeningsporsmal.map((question) => ({ ...question })),
        godtattVilkar: false,
    };
}

export const initialRegistrationState: RegistrationState = {
    adverts: [createAdvert(INITIAL_ADVERT_ID, "2026-09-01T10:22:00.000Z")],
};
