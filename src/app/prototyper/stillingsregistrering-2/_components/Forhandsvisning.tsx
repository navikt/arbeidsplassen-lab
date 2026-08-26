import { BodyLong, BodyShort, Box, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";
import styles from "./StillingsregistreringArbeidsflate.module.css";

type Props = {
    formData: AnnonseFormData;
};

export default function Forhandsvisning({ formData }: Props) {
    const harInnhold = formData.stillingstittel || formData.apningstekst || formData.arbeidsoppgaver;

    return (
        <div className={styles.forhandsvisningBoks}>
            <div className={styles.forhandsvisningLabel}>👁️ Slik ser annonsen ut for jobbsøker</div>

            {!harInnhold ? (
                <BodyShort textColor="subtle">Begynn å fylle ut annonsen for å se en forhåndsvisning her.</BodyShort>
            ) : (
                <VStack gap="space-16">
                    {formData.stillingstittel && (
                        <Heading size="large" level="3">
                            {formData.stillingstittel}
                        </Heading>
                    )}

                    {formData.bedriftsnavn && <BodyShort textColor="subtle">{formData.bedriftsnavn}</BodyShort>}

                    <HStack gap="space-4" wrap>
                        {formData.ansettelsesform && (
                            <Tag variant="neutral-moderate" size="small">
                                {formData.ansettelsesform}
                            </Tag>
                        )}
                        {formData.omfang.map((o) => (
                            <Tag key={o} variant="neutral-moderate" size="small">
                                {o}
                            </Tag>
                        ))}
                        {formData.hjemmekontor && formData.hjemmekontor !== "ingen" && (
                            <Tag variant="neutral-moderate" size="small">
                                {formData.hjemmekontor === "kun-hjemmekontor" ? "Hjemmekontor" : "Hybrid"}
                            </Tag>
                        )}
                    </HStack>

                    {formData.lonnstype && (
                        <Box
                            padding="space-8"
                            borderRadius="8"
                            style={{ background: "var(--a-surface-success-subtle)" }}
                        >
                            <BodyShort weight="semibold">
                                {formData.lonnstype === "fastlonn" &&
                                    formData.fastlonn &&
                                    `${Number(formData.fastlonn).toLocaleString("nb-NO")} kr/år`}
                                {formData.lonnstype === "lonnsspenn" &&
                                    formData.lonnFra &&
                                    formData.lonnTil &&
                                    `${Number(formData.lonnFra).toLocaleString("nb-NO")} – ${Number(formData.lonnTil).toLocaleString("nb-NO")} kr/år`}
                                {formData.lonnstype === "etter-avtale" && "Lønn etter avtale"}
                            </BodyShort>
                        </Box>
                    )}

                    {formData.apningstekst && <BodyLong>{formData.apningstekst}</BodyLong>}

                    {formData.arbeidsoppgaver && (
                        <div>
                            <Heading size="xsmall" level="4" spacing>
                                Arbeidsoppgaver
                            </Heading>
                            <BodyLong>{formData.arbeidsoppgaver}</BodyLong>
                        </div>
                    )}

                    {formData.hvaTilbyr && (
                        <div>
                            <Heading size="xsmall" level="4" spacing>
                                Vi tilbyr
                            </Heading>
                            <BodyLong>{formData.hvaTilbyr}</BodyLong>
                        </div>
                    )}

                    {formData.hvemSerEtter && (
                        <div>
                            <Heading size="xsmall" level="4" spacing>
                                Hvem ser vi etter?
                            </Heading>
                            <BodyLong>{formData.hvemSerEtter}</BodyLong>
                        </div>
                    )}

                    {formData.kvalifikasjoner.length > 0 && formData.kvalifikasjoner.some((k) => k.tekst) && (
                        <div>
                            <Heading size="xsmall" level="4" spacing>
                                Kvalifikasjoner
                            </Heading>
                            <VStack gap="space-4">
                                {formData.kvalifikasjoner
                                    .filter((k) => k.tekst)
                                    .map((k) => (
                                        <HStack key={k.id} gap="space-4" align="center">
                                            <Tag
                                                variant={k.prioritet === "ma" ? "warning-moderate" : "info-moderate"}
                                                size="small"
                                            >
                                                {k.prioritet === "ma" ? "Må ha" : "Bør ha"}
                                            </Tag>
                                            <BodyShort size="small">{k.tekst}</BodyShort>
                                        </HStack>
                                    ))}
                            </VStack>
                        </div>
                    )}

                    {formData.sted && (
                        <BodyShort size="small" textColor="subtle">
                            📍 {formData.gateadresse ? `${formData.gateadresse}, ` : ""}
                            {formData.sted}
                        </BodyShort>
                    )}

                    <HStack gap="space-4">
                        {formData.superrask && (
                            <Tag variant="success-moderate" size="small">
                                Superrask søknad
                            </Tag>
                        )}
                        {formData.beOmCv && (
                            <Tag variant="neutral-moderate" size="small">
                                CV ønskes
                            </Tag>
                        )}
                    </HStack>
                </VStack>
            )}
        </div>
    );
}
