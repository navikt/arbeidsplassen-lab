import { Alert, BodyLong, BodyShort, Checkbox, Heading, List, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "./NyAnnonseFlyt";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function StegPublisering({ formData, updateField }: Props) {
    return (
        <VStack gap="space-24">
            <Heading level="2" size="large">
                Publisering
            </Heading>

            <TextField
                label="Publiseringsdato"
                description="Velg fra hvilken dato annonsen skal vises."
                type="time"
                value={formData.publiseringsdato}
                onChange={(e) => updateField("publiseringsdato", e.target.value)}
            />

            <Alert variant="info">
                <Heading level="3" size="small" spacing>
                    Når du publiserer skjer dette:
                </Heading>
                <List>
                    <List.Item>Annonsen blir synlig på arbeidsplassen.no</List.Item>
                    <List.Item>Du kan endre annonsen når som helst etter publisering</List.Item>
                    <List.Item>Annonsen blir automatisk fjernet etter søknadsfristen</List.Item>
                    <List.Item>Du mottar varsel på e-post dersom du har lagt inn dette</List.Item>
                </List>
            </Alert>

            <BodyLong>Les mer om vilkårene for å publisere stillingsannonser på arbeidsplassen.no.</BodyLong>

            <Checkbox checked={formData.godtattVilkar} onChange={(e) => updateField("godtattVilkar", e.target.checked)}>
                Jeg bekrefter at annonsen overholder gjeldende vilkår for publisering på arbeidsplassen.no
            </Checkbox>

            {!formData.godtattVilkar && (
                <BodyShort textColor="subtle">Du må godta vilkårene før du kan publisere.</BodyShort>
            )}
        </VStack>
    );
}
