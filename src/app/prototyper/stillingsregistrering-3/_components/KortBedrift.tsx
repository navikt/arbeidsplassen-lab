import { Box, Button, Heading, HStack, Textarea, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
    onNeste: () => void;
    onForrige: () => void;
};

export default function KortBedrift({ formData, updateField, onNeste, onForrige }: Props) {
    return (
        <Box padding="space-24" borderRadius="8" background="neutral-soft">
            <VStack gap="space-16">
                <Heading size="medium" level="2">
                    Om bedriften
                </Heading>

                <TextField
                    label="Bedriftsnavn"
                    value={formData.bedriftsnavn}
                    onChange={(e) => updateField("bedriftsnavn", e.target.value)}
                />

                <Textarea
                    label="Kort om bedriften"
                    description="Hva gjør dere og hvorfor er det et bra sted å jobbe?"
                    value={formData.omBedriften}
                    onChange={(e) => updateField("omBedriften", e.target.value)}
                    minRows={3}
                />

                <HStack gap="space-16">
                    <TextField
                        label="Kontaktperson"
                        value={formData.kontaktFornavn}
                        onChange={(e) => updateField("kontaktFornavn", e.target.value)}
                    />
                    <TextField
                        label="Telefon"
                        type="tel"
                        value={formData.kontaktTelefon}
                        onChange={(e) => updateField("kontaktTelefon", e.target.value)}
                    />
                </HStack>

                <HStack justify="space-between">
                    <Button variant="secondary" onClick={onForrige}>
                        ← Forrige
                    </Button>
                    <Button onClick={onNeste}>Se oppsummering →</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
