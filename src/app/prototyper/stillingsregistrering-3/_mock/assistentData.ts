import type { StegId } from "../_lib/types";

export type AssistentMelding = {
    tekst: string;
    tips?: string;
};

export const assistentMeldinger: Record<StegId, AssistentMelding> = {
    velkommen: {
        tekst: "Hei! 👋 Jeg hjelper deg med å lage en stillingsannonse. Vi tar det steg for steg — du kan hoppe frem og tilbake når som helst.",
    },
    grunnleggende: {
        tekst: "La oss starte med det grunnleggende. Hva slags stilling er dette?",
        tips: "Bruk en stillingstittel som jobbsøkere faktisk søker etter. «Utvikler» fungerer bedre enn «teknisk medarbeider nivå 3».",
    },
    beskrivelse: {
        tekst: "Nå skal vi gjøre annonsen attraktiv! Fortell jobbsøkerne hva stillingen innebærer.",
        tips: "Annonser med konkrete arbeidsoppgaver og tydelige fordeler får markant flere kvalifiserte søkere. Vær spesifikk!",
    },
    lonn: {
        tekst: "Lønn er noe jobbsøkere bryr seg mye om. Vil du oppgi lønnsinformasjon?",
        tips: "Visste du at annonser med lønn får opptil 30 % flere søkere? Selv et lønnsspenn gir verdi.",
    },
    kvalifikasjoner: {
        tekst: "Hva bør kandidatene ha med seg? Skill gjerne mellom «må ha» og «bør ha» — for mange krav skremmer bort gode søkere.",
        tips: "Forskjellen mellom «må ha» og «bør ha» gjør det enklere å sortere søkere etterpå, og lar flere søke.",
    },
    soknad: {
        tekst: "Hvordan vil du motta søknader? Du kan kombinere superrask søknad med CV for å få det beste fra begge verdener.",
        tips: "Superrask + CV-forespørsel gir rask og enkel søknadsprosess for kandidaten, men fortsatt nok info til deg for å selektere.",
    },
    bedrift: {
        tekst: "Til slutt: fortell litt om bedriften. Jobbsøkere vil vite hvem de søker hos!",
        tips: "En engasjerende bedriftsbeskrivelse og en navngitt kontaktperson øker tilliten betydelig.",
    },
    oppsummering: {
        tekst: "Flott! 🎉 Her er annonsen din. Se gjennom og juster det du vil før du publiserer.",
    },
};
