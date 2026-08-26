export type LonnsType = "fastlonn" | "lonnsspenn" | "etter-avtale" | "";

export type KvalifikasjonPrioritet = "ma" | "bor";

export type Kvalifikasjon = {
    id: string;
    tekst: string;
    prioritet: KvalifikasjonPrioritet;
};

export type AnnonseFormData = {
    stillingstittel: string;
    antallStillinger: string;
    oppstartsdato: string;
    etterAvtale: boolean;
    ansettelsesform: string;
    omfang: string[];
    arbeidssprak: string[];
    hjemmekontor: string;
    sted: string;
    apningstekst: string;
    arbeidsoppgaver: string;
    hvaTilbyr: string;
    hvemSerEtter: string;
    lonnstype: LonnsType;
    fastlonn: string;
    lonnFra: string;
    lonnTil: string;
    bedriftsnavn: string;
    omBedriften: string;
    kontaktFornavn: string;
    kontaktTelefon: string;
    superrask: boolean;
    beOmCv: boolean;
    beOmBosted: boolean;
    kvalifikasjoner: Kvalifikasjon[];
    soknadsfrist: string;
    sokSnarest: boolean;
};

export type StegId =
    | "velkommen"
    | "grunnleggende"
    | "beskrivelse"
    | "lonn"
    | "kvalifikasjoner"
    | "soknad"
    | "bedrift"
    | "oppsummering";
