export const advertStatuses = ["draft", "pending", "scheduled", "published", "closed"] as const;
export type AdvertStatus = (typeof advertStatuses)[number];

export const applicationMethods = ["superrask", "epost", "ekstern"] as const;
export type ApplicationMethod = (typeof applicationMethods)[number];

export type ScreeningQuestion = {
    id: string;
    label: string;
};

export type AdvertFormData = {
    stillingstittel: string;
    antallStillinger: string;
    oppstartsdato: string;
    etterAvtale: boolean;
    ansettelsesform: string;
    arbeidstidsordning: string;
    omfang: string[];
    arbeidsdager: string[];
    arbeidstid: string[];
    arbeidssprak: string[];
    hjemmekontor: string;
    arbeidsstedType: "adresse" | "omrader";
    gateadresse: string;
    postnummer: string;
    sted: string;
    omrader: string;
    annonseformat: "strukturert" | "ustrukturert";
    apningstekst: string;
    arbeidsoppgaver: string;
    hvaTilbyr: string;
    hvemSerEtter: string;
    annonsetekst: string;
    overskrift: string;
    bedriftsnavn: string;
    omBedriften: string;
    sektor: string;
    kanaler: string[];
    nettside: string;
    linkedin: string;
    facebook: string;
    twitter: string;
    kontaktNavn: string;
    kontaktEpost: string;
    kontaktTittel: string;
    kontaktTelefon: string;
    soknadstype: ApplicationMethod[];
    kvalifikasjoner: string[];
    screeningsporsmal: ScreeningQuestion[];
    soknadEpost: string;
    soknadUrl: string;
    varslingEpost: string;
    soknadsfrist: string;
    sokSnarest: boolean;
    rekrutteringshjelp: boolean;
    publiseringsdato: string;
    godtattVilkar: boolean;
};

export type Advert = {
    id: string;
    status: AdvertStatus;
    createdAt: string;
    updatedAt: string;
    lastVisitedStep: number;
    form: AdvertFormData;
};

export type RegistrationState = {
    adverts: Advert[];
};

export type UpdateAdvertField = <K extends keyof AdvertFormData>(field: K, value: AdvertFormData[K]) => void;
