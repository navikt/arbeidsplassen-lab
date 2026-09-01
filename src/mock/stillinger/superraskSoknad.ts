import type { SuperraskApplicationForm } from "@/app/stillinger/_lib/types";

export const lavvoSuperraskSoknad = {
    qualifications: [
        { id: "kundebehandling", label: "Kundebehandling og betjening av kasse" },
        { id: "matlaging", label: "Enkel matlaging og tilrettelegging" },
        { id: "renhold", label: "Rydding og renhold" },
        { id: "selvstendig", label: "Selvstendig og effektiv" },
    ],
    questions: [
        {
            id: "rett-person",
            label: "Hvorfor er du rett person for denne jobben?",
            maxLength: 800,
        },
    ],
} satisfies SuperraskApplicationForm;

export const generellSuperraskSoknad = {
    qualifications: [
        { id: "samarbeid", label: "Samarbeider godt med andre" },
        { id: "initiativ", label: "Tar initiativ og arbeider selvstendig" },
    ],
    questions: [
        {
            id: "motivasjon",
            label: "Hva motiverer deg til å søke denne jobben?",
            maxLength: 800,
        },
    ],
} satisfies SuperraskApplicationForm;
