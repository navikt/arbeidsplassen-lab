import type { FokusId, Rekrutteringsmal, Tekstforslag } from "../_lib/types";

export const fokusomrader: Array<{ id: FokusId; label: string; kortnavn: string }> = [
    { id: "retning", label: "Sett retning", kortnavn: "Retning" },
    { id: "lokkemiddel", label: "Gjør jobben attraktiv", kortnavn: "Attraktivitet" },
    { id: "hverdagen", label: "Vis arbeidshverdagen", kortnavn: "Arbeidshverdag" },
    { id: "utvelgelse", label: "Planlegg utvelgelsen", kortnavn: "Utvelgelse" },
    { id: "vilkar", label: "Vær åpen om vilkår", kortnavn: "Vilkår" },
    { id: "soknad", label: "Gjør det lett å søke", kortnavn: "Søknad" },
];

export const maltips: Record<Rekrutteringsmal, string> = {
    relevante:
        "Prioriter konkrete arbeidsoppgaver og få, tydelige må-krav. Det gjør det lettere for riktige kandidater å kjenne seg igjen.",
    flere: "Vis hva kandidaten får igjen for å søke: lønn, fleksibilitet, læring og hva som gjør arbeidsmiljøet godt.",
    raskt: "Hold søknadsprosessen kort, oppgi en tydelig frist og skill mellom det kandidaten må kunne nå og kan lære senere.",
};

export const skrivehjelp: Record<
    FokusId,
    { tittel: string; intro: string; sjekkliste: string[]; forslag: Tekstforslag[] }
> = {
    retning: {
        tittel: "Start med det søkeren faktisk leter etter",
        intro: "En presis tittel og et tydelig arbeidssted gjør at flere relevante søkere finner annonsen.",
        sjekkliste: [
            "Bruk en kjent yrkestittel, ikke en intern tittel.",
            "Oppgi om stillingen er fast, midlertidig, heltid eller deltid.",
            "Skriv hvor jobben faktisk skal utføres.",
        ],
        forslag: [],
    },
    lokkemiddel: {
        tittel: "Svar på spørsmålet: Hvorfor akkurat denne jobben?",
        intro: "Åpningen bør gi en konkret grunn til å lese videre. Vis muligheten, ikke bare behovet deres.",
        sjekkliste: [
            "Start med det mest interessante ved rollen.",
            "Nevn hva kandidaten kan påvirke eller lære.",
            "Unngå fraser som «spennende mulighet» uten å forklare hvorfor.",
        ],
        forslag: [
            {
                label: "Vis påvirkning",
                field: "pitch",
                text: "Hos oss får du påvirke hvordan vi løser oppgavene, samtidig som du jobber tett med kolleger som deler kunnskap og hjelper hverandre.",
            },
            {
                label: "Vis utvikling",
                field: "tilbud",
                text: "Du får god opplæring, tid til faglig utvikling og mulighet til å ta mer ansvar i takt med at du blir trygg i rollen.",
            },
        ],
    },
    hverdagen: {
        tittel: "Gjør arbeidshverdagen lett å se for seg",
        intro: "Konkrete oppgaver hjelper søkeren å vurdere både motivasjon og relevans før de søker.",
        sjekkliste: [
            "Bruk aktive verb som «veilede», «planlegge» og «samarbeide».",
            "Beskriv tre til fem oppgaver som faktisk fyller arbeidsuken.",
            "Fortell hvem kandidaten jobber sammen med.",
        ],
        forslag: [
            {
                label: "Lag en konkret start",
                field: "arbeidsoppgaver",
                text: "I denne rollen vil du:\n• planlegge og gjennomføre de viktigste oppgavene i teamet\n• samarbeide tett med kolleger og fagmiljøer\n• foreslå forbedringer og følge dem fra idé til resultat",
            },
        ],
    },
    utvelgelse: {
        tittel: "Bestem hva dere trenger for å velge kandidater",
        intro: "Kvalifikasjoner og spørsmål gir et felles sammenligningsgrunnlag, uavhengig av hvor søknaden leveres.",
        sjekkliste: [
            "Be om det jobben faktisk trenger, ikke hele ønskelisten for en drømmekandidat.",
            "Legg inn én kvalifikasjon om gangen, slik at svarene blir lette å sortere.",
            "Gjør erfaring og personlige egenskaper konkrete og mulige å svare på.",
            "Spør om noe dere faktisk skal bruke i utvelgelsen.",
            "Behold minst ett åpent spørsmål som gir kandidaten mulighet til å forklare relevansen sin.",
        ],
        forslag: [],
    },
    vilkar: {
        tittel: "Åpenhet gjør det enklere å velge dere",
        intro: "Lønn og tydelige rammer reduserer usikkerhet og kan spare både søker og arbeidsgiver for tid.",
        sjekkliste: [
            "Oppgi lønn eller et realistisk lønnsspenn.",
            "Unngå et så bredt spenn at det mister verdi.",
            "Fortell om omfang og ansettelsesform tidlig.",
        ],
        forslag: [],
    },
    soknad: {
        tittel: "Velg hvor søknadene skal håndteres",
        intro: "Søknadskanalen bestemmer hvor søknadene kommer inn. Kvalifikasjoner og spørsmål bestemmer hva dere vil vite.",
        sjekkliste: [
            "Superrask samler søknader og utvelgelse i Arbeidsplassen.",
            "E-post sender selve søknaden til den oppgitte innboksen.",
            "Ekstern søknad sender kandidaten videre til deres løsning.",
            "Oppgi en konkret frist og hva som skjer etterpå.",
        ],
        forslag: [],
    },
};
