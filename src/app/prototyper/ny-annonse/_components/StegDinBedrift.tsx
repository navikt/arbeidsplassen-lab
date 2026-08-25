import {
    Checkbox,
    CheckboxGroup,
    Heading,
    HStack,
    Radio,
    RadioGroup,
    Textarea,
    TextField,
    VStack,
} from "@navikt/ds-react";
import type { AnnonseFormData } from "./NyAnnonseFlyt";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function StegDinBedrift({ formData, updateField }: Props) {
    return (
        <VStack gap="space-24">
            <Heading level="2" size="large">
                Om bedriften
            </Heading>

            <TextField
                label="Bedriftsnavn"
                description="Må fylles inn"
                value={formData.bedriftsnavn}
                onChange={(e) => updateField("bedriftsnavn", e.target.value)}
            />

            <Textarea
                label="Kort om bedriften"
                description="Valgfritt. Skriv noe som kan få jobbsøkeren til å ønske å jobbe hos dere."
                value={formData.omBedriften}
                onChange={(e) => updateField("omBedriften", e.target.value)}
                maxLength={500}
                minRows={4}
            />

            <RadioGroup
                legend="Sektor"
                description="Må fylles inn"
                value={formData.sektor}
                onChange={(val) => updateField("sektor", val)}
            >
                <Radio value="privat">Privat</Radio>
                <Radio value="offentlig">Offentlig</Radio>
            </RadioGroup>

            <CheckboxGroup
                legend="Sosiale medier"
                description="Valgfritt. Lenker til bedriftens sosiale medier vises i annonsen."
                value={formData.sosialeMedier}
                onChange={(val) => updateField("sosialeMedier", val)}
            >
                <Checkbox value="linkedin">LinkedIn</Checkbox>
                <Checkbox value="facebook">Facebook</Checkbox>
                <Checkbox value="instagram">Instagram</Checkbox>
                <Checkbox value="twitter">X (Twitter)</Checkbox>
            </CheckboxGroup>

            <Heading level="3" size="medium">
                Kontaktperson
            </Heading>

            <HStack gap="space-16" align="start" wrap>
                <TextField
                    label="Fornavn"
                    value={formData.kontaktFornavn}
                    onChange={(e) => updateField("kontaktFornavn", e.target.value)}
                />
                <TextField
                    label="Etternavn"
                    value={formData.kontaktEtternavn}
                    onChange={(e) => updateField("kontaktEtternavn", e.target.value)}
                />
            </HStack>
            <HStack gap="space-16" align="start" wrap>
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
            </HStack>
        </VStack>
    );
}
