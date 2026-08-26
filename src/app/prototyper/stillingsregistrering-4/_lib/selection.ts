import type { Kvalifikasjon, ScreeningSporsmal, ScreeningValg } from "./types";

export const screeningAlternativer: Array<{ value: ScreeningValg; label: string }> = [
    { value: "rett-for-jobben", label: "Hvorfor er du den rette for jobben?" },
    { value: "motivasjon", label: "Hva motiverer deg til å søke denne jobben?" },
    { value: "erfaring", label: "Hvilken relevant erfaring vil du trekke fram?" },
    { value: "bidrag", label: "Hva kan du bidra med i denne rollen?" },
    { value: "eget", label: "Skriv et eget spørsmål" },
];

export const createScreeningSporsmal = (id: string, valg: ScreeningValg = "rett-for-jobben"): ScreeningSporsmal => ({
    id,
    valg,
    egenTekst: "",
});

export const removeScreeningSporsmal = (sporsmal: ScreeningSporsmal[], id: string): ScreeningSporsmal[] => {
    if (sporsmal.length <= 1) {
        return sporsmal;
    }
    return sporsmal.filter((item) => item.id !== id);
};

export const getScreeningSporsmalTekst = (sporsmal: ScreeningSporsmal): string => {
    if (sporsmal.valg === "eget") {
        return sporsmal.egenTekst.trim();
    }
    return screeningAlternativer.find((alternativ) => alternativ.value === sporsmal.valg)?.label ?? "";
};

export const addKvalifikasjon = (kvalifikasjoner: Kvalifikasjon[], id: string, label: string): Kvalifikasjon[] => {
    const trimmedLabel = label.trim();
    const finnes = kvalifikasjoner.some(
        (kvalifikasjon) => kvalifikasjon.label.toLocaleLowerCase("nb-NO") === trimmedLabel.toLocaleLowerCase("nb-NO"),
    );

    if (!trimmedLabel || finnes) {
        return kvalifikasjoner;
    }

    return [...kvalifikasjoner, { id, label: trimmedLabel }];
};
