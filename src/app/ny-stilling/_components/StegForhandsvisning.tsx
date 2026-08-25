import { BodyLong, BodyShort, Box, Button, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import { LocalAlert } from "@navikt/ds-react/LocalAlert";
import type { StillingFormData } from "./NyStillingFlyt";

type StegForhandsvisningProps = {
    formData: StillingFormData;
    onBack: () => void;
};

export default function StegForhandsvisning({ formData, onBack }: StegForhandsvisningProps) {
    const handlePublish = () => {
        alert("Dette er en prototype — annonsen ble ikke publisert.");
    };

    return (
        <VStack gap="space-24">
            <Heading size="medium" level="2">
                Forhåndsvisning
            </Heading>

            <LocalAlert status="info">
                <LocalAlert.Header>
                    <LocalAlert.Title>Prototype</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    <BodyLong>
                        Dette er en forhåndsvisning av annonsen. I en virkelig løsning ville annonsen blitt publisert
                        og synlig for jobbsøkere.
                    </BodyLong>
                </LocalAlert.Content>
            </LocalAlert>

            <Box background="neutral-soft" padding="space-24" borderRadius="8">
                <VStack gap="space-16">
                    <Heading size="large" level="3">
                        {formData.tittel || "(Ingen tittel)"}
                    </Heading>

                    <BodyShort weight="semibold">{formData.arbeidsgiver || "(Ingen arbeidsgiver)"}</BodyShort>

                    {formData.sted && <BodyShort>{formData.sted}</BodyShort>}

                    <HStack gap="space-8">
                        <Tag size="small" variant="neutral-moderate">
                            {formData.omfang}
                        </Tag>
                        <Tag size="small" variant="neutral-moderate">
                            {formData.ansettelsesform}
                        </Tag>
                    </HStack>

                    {formData.soknadsfrist && (
                        <BodyShort>
                            Søknadsfrist: {new Date(formData.soknadsfrist).toLocaleDateString("nb-NO")}
                        </BodyShort>
                    )}

                    {formData.beskrivelse && (
                        <Box>
                            <Heading size="small" level="4" spacing>
                                Om stillingen
                            </Heading>
                            <BodyLong style={{ whiteSpace: "pre-wrap" }}>{formData.beskrivelse}</BodyLong>
                        </Box>
                    )}
                </VStack>
            </Box>

            <HStack gap="space-16">
                <Button variant="secondary" onClick={onBack}>
                    Tilbake
                </Button>
                <Button variant="primary" onClick={handlePublish}>
                    Publiser annonse (prototype)
                </Button>
            </HStack>
        </VStack>
    );
}
