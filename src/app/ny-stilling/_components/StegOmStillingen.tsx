import { Button, Heading, HStack, Textarea, TextField, VStack } from "@navikt/ds-react";
import type { StillingFormData } from "./NyStillingFlyt";

type StegOmStillingenProps = {
    formData: StillingFormData;
    updateField: (field: keyof StillingFormData, value: string) => void;
    onNext: () => void;
};

export default function StegOmStillingen({ formData, updateField, onNext }: StegOmStillingenProps) {
    return (
        <VStack gap="space-24">
            <Heading size="medium" level="2">
                Om stillingen
            </Heading>

            <TextField
                label="Stillingstittel"
                description="For eksempel: Seniorutvikler, Sykepleier, Butikkmedarbeider"
                value={formData.tittel}
                onChange={(e) => updateField("tittel", e.target.value)}
            />

            <TextField
                label="Arbeidsgiver"
                value={formData.arbeidsgiver}
                onChange={(e) => updateField("arbeidsgiver", e.target.value)}
            />

            <Textarea
                label="Beskrivelse av stillingen"
                description="Beskriv arbeidsoppgaver, kvalifikasjoner og hva dere tilbyr"
                value={formData.beskrivelse}
                onChange={(e) => updateField("beskrivelse", e.target.value)}
                minRows={8}
            />

            <HStack>
                <Button variant="primary" onClick={onNext}>
                    Neste: Praktiske opplysninger
                </Button>
            </HStack>
        </VStack>
    );
}
