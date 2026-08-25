import { BodyShort, Heading, Radio, RadioGroup, Textarea, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "./NyAnnonseFlyt";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function StegOmStillingen({ formData, updateField }: Props) {
    return (
        <VStack gap="space-24">
            <div>
                <Heading level="2" size="large" spacing>
                    Om stillingen
                </Heading>
                <BodyShort>
                    Vi anbefaler å lese våre tips om hvordan du skriver en skikkelig bra stillingsannonse.
                </BodyShort>
            </div>

            <RadioGroup
                legend="Format på annonse"
                value={formData.annonseformat}
                onChange={(val) => updateField("annonseformat", val)}
            >
                <Radio value="strukturert">Strukturert annonse</Radio>
                <Radio value="ustrukturert">Ikke strukturert annonse</Radio>
            </RadioGroup>

            <Textarea
                label="Skriv en kort åpningstekst for annonsen"
                description="Valgfritt"
                value={formData.apningstekst}
                onChange={(e) => updateField("apningstekst", e.target.value)}
                maxLength={300}
                minRows={3}
            />

            {formData.annonseformat === "strukturert" && (
                <>
                    <div>
                        <Heading level="3" size="medium" spacing>
                            Arbeidsoppgaver
                        </Heading>
                        <Textarea
                            label="Beskriv arbeidsoppgavene for stillingen"
                            description="Må fylles inn"
                            value={formData.arbeidsoppgaver}
                            onChange={(e) => updateField("arbeidsoppgaver", e.target.value)}
                            minRows={6}
                        />
                    </div>

                    <div>
                        <Heading level="3" size="medium" spacing>
                            Hva tilbyr dere?
                        </Heading>
                        <Textarea
                            label="Beskriv hva dere tilbyr"
                            description="Må fylles inn"
                            value={formData.hvaTilbyr}
                            onChange={(e) => updateField("hvaTilbyr", e.target.value)}
                            minRows={6}
                        />
                    </div>

                    <div>
                        <Heading level="3" size="medium" spacing>
                            Hvem ser dere etter?
                        </Heading>
                        <Textarea
                            label="Beskriv hvem dere ser etter"
                            description="Må fylles inn"
                            value={formData.hvemSerEtter}
                            onChange={(e) => updateField("hvemSerEtter", e.target.value)}
                            minRows={6}
                        />
                    </div>
                </>
            )}

            {formData.annonseformat === "ustrukturert" && (
                <Textarea
                    label="Annonsetekst"
                    description="Skriv hele annonseteksten her"
                    value={formData.arbeidsoppgaver}
                    onChange={(e) => updateField("arbeidsoppgaver", e.target.value)}
                    minRows={12}
                />
            )}

            <TextField
                label="Skriv inn overskrift for annonsen"
                description="Må fylles inn"
                value={formData.overskrift}
                onChange={(e) => updateField("overskrift", e.target.value)}
            />
        </VStack>
    );
}
