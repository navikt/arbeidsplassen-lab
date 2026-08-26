import type { SeksjonId } from "../_lib/types";

export type Tips = {
    tittel: string;
    innhold: string;
};

export const tipsBySeksjon: Record<SeksjonId, Tips[]> = {
    praktisk: [
        {
            tittel: "Velg riktig stillingstittel",
            innhold:
                "Bruk en stillingstittel som jobbsøkere faktisk søker etter. Unngå interne titler som «medarbeider nivå 3». Titler som «sykepleier» eller «utvikler» gir bedre treff.",
        },
        {
            tittel: "Arbeidsspråk hjelper med filtrering",
            innhold:
                "Ved å oppgi arbeidsspråk hjelper du jobbsøkere å vurdere om de er kvalifiserte. Det reduserer irrelevante søknader.",
        },
    ],
    "om-stillingen": [
        {
            tittel: "Vær konkret om arbeidsoppgavene",
            innhold:
                "List 3–5 konkrete arbeidsoppgaver. Unngå generelle beskrivelser som «varierte oppgaver». Søkere ønsker å se hva hverdagen innebærer.",
        },
        {
            tittel: "Hva gjør dere attraktive?",
            innhold:
                "Trekk frem det som skiller dere fra andre arbeidsgivere. Fleksibel arbeidstid, utviklingsmuligheter, godt arbeidsmiljø — vær spesifikk.",
        },
        {
            tittel: "Åpningsteksten er det første søkere ser",
            innhold: "En god åpningstekst fanger oppmerksomheten. Fortell kort hva som gjør stillingen spennende.",
        },
    ],
    lonn: [
        {
            tittel: "Lønn øker antall søkere",
            innhold:
                "Annonser som oppgir lønn får opptil 30 % flere søkere. Selv et lønnsspenn gir jobbsøkere en indikasjon på hva de kan forvente.",
        },
        {
            tittel: "Vær realistisk med lønnsspenn",
            innhold:
                "Et for bredt spenn (f.eks. 400 000–800 000) gir lite verdi for søkeren. Hold spennet innenfor 100 000–150 000 kr for best effekt.",
        },
    ],
    kvalifikasjoner: [
        {
            tittel: "Skille mellom må og bør",
            innhold:
                "For mange «må ha»-krav skremmer bort gode kandidater. Vurder hva som virkelig er nødvendig fra dag én, og hva som kan læres.",
        },
        {
            tittel: "Kvalifikasjoner brukes til matching",
            innhold:
                "Kvalifikasjonene du legger inn brukes til å matche annonsen med jobbsøkere, og til superrask søknad. Vær presis.",
        },
        {
            tittel: "Prioritering hjelper selektering",
            innhold: "Ved å rangere kvalifikasjoner etter viktighet kan du lettere sortere søkere basert på relevans.",
        },
    ],
    soknad: [
        {
            tittel: "Superrask gir raskere søknader",
            innhold:
                "Med superrask søknad kan kandidater søke med noen få klikk. Det gir flere søkere, men kortere søknader. Kombiner med kvalifikasjoner for bedre filtrering.",
        },
        {
            tittel: "CV gir mer grunnlag",
            innhold:
                "Hvis du opplever at motivasjonstekst alene gir for lite grunnlag til selektering, kan du be om CV i tillegg til superrask søknad.",
        },
        {
            tittel: "Bosted kan hjelpe filtrering",
            innhold:
                "Hvis lokasjon er viktig for stillingen, kan du be søker oppgi bosted. Dette hjelper deg filtrere ut kandidater som er for langt unna.",
        },
    ],
    "om-bedriften": [
        {
            tittel: "Profiler bedriften",
            innhold:
                "Søkere vil vite hvem de søker hos. En kort, engasjerende beskrivelse av bedriften gjør annonsen mer attraktiv.",
        },
        {
            tittel: "Kontaktperson skaper tillit",
            innhold:
                "Å oppgi en kontaktperson med telefonnummer gjør at søkere kan stille spørsmål. Det viser åpenhet.",
        },
    ],
};
