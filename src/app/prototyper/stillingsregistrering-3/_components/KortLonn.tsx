import { BodyShort, Box, Button, Heading, HStack, Radio, RadioGroup, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
    onNeste: () => void;
    onForrige: () => void;
};

export default function KortLonn({ formData, updateField, onNeste, onForrige }: Props) {
    return (
        <Box padding="space-24" borderRadius="8" background="neutral-soft">
            <VStack gap="space-16">
                <Heading size="medium" level="2">
                    Lønn
                </Heading>

                <RadioGroup
                    legend="Hvordan vil du oppgi lønn?"
                    value={formData.lonnstype}
                    onChange={(val) => updateField("lonnstype", val)}
                >
                    <Radio value="fastlonn">Fast årslønn</Radio>
                    <Radio value="lonnsspenn">Lønnsspenn (fra – til)</Radio>
                    <Radio value="etter-avtale">Lønn etter avtale</Radio>
                </RadioGroup>

                {formData.lonnstype === "fastlonn" && (
                    <TextField
                        label="Årslønn (kr)"
                        type="number"
                        value={formData.fastlonn}
                        onChange={(e) => updateField("fastlonn", e.target.value)}
                        htmlSize={15}
                    />
                )}

                {formData.lonnstype === "lonnsspenn" && (
                    <HStack gap="space-16">
                        <TextField
                            label="Fra (kr/år)"
                            type="number"
                            value={formData.lonnFra}
                            onChange={(e) => updateField("lonnFra", e.target.value)}
                            htmlSize={12}
                        />
                        <TextField
                            label="Til (kr/år)"
                            type="number"
                            value={formData.lonnTil}
                            onChange={(e) => updateField("lonnTil", e.target.value)}
                            htmlSize={12}
                        />
                    </HStack>
                )}

                {formData.lonnstype === "etter-avtale" && (
                    <BodyShort size="small" textColor="subtle">
                        Jobbsøkere foretrekker konkret lønn. Vurder om du heller kan oppgi et lønnsspenn.
                    </BodyShort>
                )}

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
