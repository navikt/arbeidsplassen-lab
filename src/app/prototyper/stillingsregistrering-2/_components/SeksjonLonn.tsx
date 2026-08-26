import { BodyShort, Radio, RadioGroup, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";
import styles from "./StillingsregistreringArbeidsflate.module.css";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function SeksjonLonn({ formData, updateField }: Props) {
    return (
        <VStack gap="space-16">
            <RadioGroup
                legend="Hvordan vil du oppgi lønn?"
                description="Annonser med lønn får opptil 30 % flere søkere"
                value={formData.lonnstype}
                onChange={(val) => updateField("lonnstype", val)}
            >
                <Radio value="fastlonn">Fastlønn</Radio>
                <Radio value="lonnsspenn">Lønnsspenn (fra–til)</Radio>
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
                <div className={styles.lonnFelter}>
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
                </div>
            )}

            {formData.lonnstype === "etter-avtale" && (
                <BodyShort size="small" textColor="subtle">
                    Jobbsøkere foretrekker en konkret indikasjon på lønn. Vurder om du kan oppgi et lønnsspenn.
                </BodyShort>
            )}
        </VStack>
    );
}
