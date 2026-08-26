import { Textarea, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function SeksjonOmStillingen({ formData, updateField }: Props) {
    return (
        <VStack gap="space-16">
            <Textarea
                label="Åpningstekst"
                description="Kort tekst som fanger oppmerksomheten til søkeren"
                value={formData.apningstekst}
                onChange={(e) => updateField("apningstekst", e.target.value)}
                maxLength={300}
                minRows={3}
            />
            <Textarea
                label="Arbeidsoppgaver"
                description="Beskriv 3–5 konkrete arbeidsoppgaver"
                value={formData.arbeidsoppgaver}
                onChange={(e) => updateField("arbeidsoppgaver", e.target.value)}
                minRows={5}
            />
            <Textarea
                label="Hva tilbyr dere?"
                description="Hva gjør dere attraktive som arbeidsgiver?"
                value={formData.hvaTilbyr}
                onChange={(e) => updateField("hvaTilbyr", e.target.value)}
                minRows={4}
            />
            <Textarea
                label="Hvem ser dere etter?"
                description="Beskriv den ideelle kandidaten"
                value={formData.hvemSerEtter}
                onChange={(e) => updateField("hvemSerEtter", e.target.value)}
                minRows={4}
            />
        </VStack>
    );
}
