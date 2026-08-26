export type Rekrutteringsmal = "relevante" | "flere" | "raskt";

export type FokusId = "retning" | "lokkemiddel" | "hverdagen" | "utvelgelse" | "vilkar" | "soknad";

export type Modus = "skriv" | "sokerblikk" | "kvalitet";

export type Lonnstype = "fast" | "spenn" | "avtale" | "";

export type Soknadstype = "superrask" | "epost" | "ekstern";

export type Kvalifikasjon = {
    id: string;
    label: string;
};

export type ScreeningValg = "rett-for-jobben" | "motivasjon" | "erfaring" | "bidrag" | "eget";

export type ScreeningSporsmal = {
    id: string;
    valg: ScreeningValg;
    egenTekst: string;
};

export type AnnonseData = {
    stillingstittel: string;
    bedriftsnavn: string;
    arbeidssted: string;
    ansettelsesform: string;
    omfang: string;
    pitch: string;
    arbeidsoppgaver: string;
    tilbud: string;
    kvalifikasjoner: Kvalifikasjon[];
    screeningSporsmal: ScreeningSporsmal[];
    lonnstype: Lonnstype;
    fastlonn: string;
    lonnFra: string;
    lonnTil: string;
    soknadstype: Soknadstype;
    beOmCv: boolean;
    beOmBosted: boolean;
    varslingEpost: string;
    soknadEpost: string;
    soknadUrl: string;
    soknadsfrist: string;
};

export type Tekstfelt = "pitch" | "arbeidsoppgaver" | "tilbud";

export type Tekstforslag = {
    label: string;
    field: Tekstfelt;
    text: string;
};

export type Kvalitetssjekk = {
    id: string;
    label: string;
    forklaring: string;
    poeng: number;
    bestatt: boolean;
    fokus: FokusId;
};
