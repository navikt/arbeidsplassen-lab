export type LonnsType = "fastlonn" | "lonnsspenn" | "etter-avtale" | "";

export type KvalifikasjonPrioritet = "ma" | "bor";

export type Kvalifikasjon = {
    id: string;
    tekst: string;
    prioritet: KvalifikasjonPrioritet;
};

export type AnnonseFormData = {
    // Praktisk informasjon
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
    arbeidsstedType: string;
    gateadresse: string;
    postnummer: string;
    sted: string;

    // Om stillingen
    apningstekst: string;
    arbeidsoppgaver: string;
    hvaTilbyr: string;
    hvemSerEtter: string;

    // Lønn
    lonnstype: LonnsType;
    fastlonn: string;
    lonnFra: string;
    lonnTil: string;

    // Om bedriften
    bedriftsnavn: string;
    omBedriften: string;
    sektor: string;
    kontaktFornavn: string;
    kontaktEtternavn: string;
    kontaktTittel: string;
    kontaktTelefon: string;

    // Søknad
    superrask: boolean;
    beOmCv: boolean;
    beOmBosted: boolean;
    kvalifikasjoner: Kvalifikasjon[];
    screeningSporsmal: string[];
    soknadsfrist: string;
    sokSnarest: boolean;
    varslingEpost: string;
};

export type SeksjonId = "praktisk" | "om-stillingen" | "lonn" | "kvalifikasjoner" | "soknad" | "om-bedriften";

export type SeksjonStatus = "ikke-startet" | "pabegynt" | "ferdig";
