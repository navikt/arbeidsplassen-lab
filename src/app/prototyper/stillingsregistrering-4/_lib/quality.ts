import { getScreeningSporsmalTekst } from "./selection";
import type { AnnonseData, Kvalitetssjekk } from "./types";

const lineCount = (value: string) =>
    value
        .split(/\n|•/)
        .map((line) => line.trim())
        .filter(Boolean).length;

export const getKvalitetssjekker = (data: AnnonseData): Kvalitetssjekk[] => [
    {
        id: "retning",
        label: "Tydelig retning",
        forklaring: "Tittel, sted og ansettelsesform gjør annonsen lett å finne og forstå.",
        poeng: 10,
        bestatt: Boolean(data.stillingstittel && data.arbeidssted && data.ansettelsesform),
        fokus: "retning",
    },
    {
        id: "pitch",
        label: "En åpning som vekker interesse",
        forklaring: "Fortell tidlig hvorfor jobben er verdt søkerens tid.",
        poeng: 15,
        bestatt: data.pitch.trim().length >= 80,
        fokus: "lokkemiddel",
    },
    {
        id: "oppgaver",
        label: "Konkret arbeidshverdag",
        forklaring: "Minst tre konkrete oppgaver gjør det lettere å vurdere om jobben passer.",
        poeng: 15,
        bestatt: lineCount(data.arbeidsoppgaver) >= 3,
        fokus: "hverdagen",
    },
    {
        id: "tilbud",
        label: "Tydelig verdi for kandidaten",
        forklaring: "Beskriv hva kandidaten får: utvikling, miljø, fleksibilitet eller ansvar.",
        poeng: 10,
        bestatt: data.tilbud.trim().length >= 60,
        fokus: "lokkemiddel",
    },
    {
        id: "utvelgelse",
        label: "Planlagt utvelgelsesgrunnlag",
        forklaring: "Minst én kvalifikasjon og ett tydelig spørsmål gir et bedre sammenligningsgrunnlag.",
        poeng: 25,
        bestatt:
            data.kvalifikasjoner.length >= 1 &&
            data.screeningSporsmal.length >= 1 &&
            data.screeningSporsmal.every((sporsmal) => Boolean(getScreeningSporsmalTekst(sporsmal))),
        fokus: "utvelgelse",
    },
    {
        id: "lonn",
        label: "Åpenhet om lønn",
        forklaring: "Lønn eller lønnsspenn gir bedre forventningsavklaring.",
        poeng: 15,
        bestatt:
            (data.lonnstype === "fast" && Boolean(data.fastlonn)) ||
            (data.lonnstype === "spenn" && Boolean(data.lonnFra && data.lonnTil)),
        fokus: "vilkar",
    },
    {
        id: "soknad",
        label: "Enkel vei til søknad",
        forklaring: "En valgt søknadstype og en frist gjør neste steg tydelig.",
        poeng: 10,
        bestatt:
            Boolean(data.soknadsfrist) &&
            ((data.soknadstype === "superrask" && Boolean(data.varslingEpost)) ||
                (data.soknadstype === "epost" && Boolean(data.soknadEpost)) ||
                (data.soknadstype === "ekstern" && Boolean(data.soknadUrl))),
        fokus: "soknad",
    },
];

export const getKvalitetspoeng = (sjekker: Kvalitetssjekk[]) =>
    sjekker.reduce((sum, sjekk) => sum + (sjekk.bestatt ? sjekk.poeng : 0), 0);
