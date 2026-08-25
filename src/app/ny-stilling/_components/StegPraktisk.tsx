import { Button, Heading, HStack, Select, TextField, VStack } from "@navikt/ds-react";
import type { StillingFormData } from "./NyStillingFlyt";

type StegPraktiskProps = {
    formData: StillingFormData;
    updateField: (field: keyof StillingFormData, value: string) => void;
    onNext: () => void;
    onBack: () => void;
};

export default function StegPraktisk({ formData, updateField, onNext, onBack }: StegPraktiskProps) {
    return (
        <VStack gap="space-24">
            <Heading size="medium" level="2">
                Praktiske opplysninger
            </Heading>

            <TextField
                label="Arbeidssted"
                description="By eller kommune"
                value={formData.sted}
                onChange={(e) => updateField("sted", e.target.value)}
            />

            <Select label="Omfang" value={formData.omfang} onChange={(e) => updateField("omfang", e.target.value)}>
                <option value="Heltid">Heltid</option>
                <option value="Deltid">Deltid</option>
            </Select>

            <Select
                label="Ansettelsesform"
                value={formData.ansettelsesform}
                onChange={(e) => updateField("ansettelsesform", e.target.value)}
            >
                <option value="Fast">Fast</option>
                <option value="Vikariat">Vikariat</option>
                <option value="Engasjement">Engasjement</option>
            </Select>

            <TextField
                label="Søknadsfrist"
                type="date"
                value={formData.soknadsfrist}
                onChange={(e) => updateField("soknadsfrist", e.target.value)}
            />

            <HStack gap="space-16">
                <Button variant="secondary" onClick={onBack}>
                    Tilbake
                </Button>
                <Button variant="primary" onClick={onNext}>
                    Neste: Forhåndsvisning
                </Button>
            </HStack>
        </VStack>
    );
}
