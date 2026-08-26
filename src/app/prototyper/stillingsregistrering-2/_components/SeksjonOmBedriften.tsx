import { Textarea, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function SeksjonOmBedriften({ formData, updateField }: Props) {
    return (
        <VStack gap="space-16">
            <TextField
                label="Bedriftsnavn"
                value={formData.bedriftsnavn}
                onChange={(e) => updateField("bedriftsnavn", e.target.value)}
            />
            <Textarea
                label="Om bedriften"
                description="Kort beskrivelse av bedriften og hva dere gjør"
                value={formData.omBedriften}
                onChange={(e) => updateField("omBedriften", e.target.value)}
                minRows={3}
            />
            <TextField
                label="Kontaktperson (fornavn)"
                value={formData.kontaktFornavn}
                onChange={(e) => updateField("kontaktFornavn", e.target.value)}
            />
            <TextField
                label="Kontaktperson (etternavn)"
                value={formData.kontaktEtternavn}
                onChange={(e) => updateField("kontaktEtternavn", e.target.value)}
            />
            <TextField
                label="Tittel"
                value={formData.kontaktTittel}
                onChange={(e) => updateField("kontaktTittel", e.target.value)}
            />
            <TextField
                label="Telefon"
                type="tel"
                value={formData.kontaktTelefon}
                onChange={(e) => updateField("kontaktTelefon", e.target.value)}
            />
        </VStack>
    );
}
