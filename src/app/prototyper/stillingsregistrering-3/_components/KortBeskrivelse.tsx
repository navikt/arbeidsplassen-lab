import { Box, Button, Heading, HStack, Textarea, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
    onNeste: () => void;
    onForrige: () => void;
};

export default function KortBeskrivelse({ formData, updateField, onNeste, onForrige }: Props) {
    return (
        <Box padding="space-24" borderRadius="8" background="neutral-soft">
            <VStack gap="space-16">
                <Heading size="medium" level="2">
                    Beskriv stillingen
                </Heading>

                <Textarea
                    label="Åpningstekst"
                    description="Fang oppmerksomheten — hva gjør denne stillingen spennende?"
                    value={formData.apningstekst}
                    onChange={(e) => updateField("apningstekst", e.target.value)}
                    maxLength={300}
                    minRows={3}
                />

                <Textarea
                    label="Arbeidsoppgaver"
                    description="List 3–5 konkrete oppgaver kandidaten skal gjøre"
                    value={formData.arbeidsoppgaver}
                    onChange={(e) => updateField("arbeidsoppgaver", e.target.value)}
                    minRows={5}
                />

                <Textarea
                    label="Hva tilbyr dere?"
                    description="Hva gjør dere til en attraktiv arbeidsgiver?"
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

                <HStack justify="space-between">
                    <Button variant="secondary" onClick={onForrige}>
                        ← Forrige
                    </Button>
                    <Button onClick={onNeste}>Neste →</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
