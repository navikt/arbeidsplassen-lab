"use client";

import { SparklesIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Box, Button, Heading, HStack, Link, Textarea, TextField, VStack } from "@navikt/ds-react";
import { useState } from "react";
import type { AdvertFormData, UpdateAdvertField } from "../_lib/types";
import FormatSelector from "./FormatSelector";
import RichTextField from "./RichTextField";
import styles from "./StegOmStillingen.module.css";

type StegOmStillingenProps = {
    formData: AdvertFormData;
    updateField: UpdateAdvertField;
};

export default function StegOmStillingen({ formData, updateField }: StegOmStillingenProps) {
    const [showTitleHelp, setShowTitleHelp] = useState(!formData.overskrift);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const suggestTitles = () => {
        const occupation = formData.stillingstittel || "medarbeider";
        const location = formData.sted ? ` i ${formData.sted.toLocaleLowerCase("nb-NO")}` : "";
        setSuggestions([
            `Vi søker en engasjert ${occupation.toLocaleLowerCase("nb-NO")}${location}`,
            `Bli vår nye ${occupation.toLocaleLowerCase("nb-NO")}`,
            `${occupation} søkes til et inkluderende arbeidsmiljø`,
        ]);
    };

    return (
        <VStack gap="space-32">
            <div>
                <Heading level="2" size="large" spacing>
                    Om stillingen
                </Heading>
                <BodyLong>
                    Vi anbefaler å lese våre tips om{" "}
                    <Link href="/artikler/tips-til-jobbsoknaden" target="_blank" rel="noopener noreferrer">
                        hvordan du skriver en skikkelig bra stillingsannonse (åpnes i ny fane)
                    </Link>
                    .
                </BodyLong>
            </div>

            <FormatSelector value={formData.annonseformat} onChange={(value) => updateField("annonseformat", value)} />

            <Textarea
                label="Skriv en kort åpningstekst for annonsen"
                description="Valgfritt"
                value={formData.apningstekst}
                onChange={(event) => updateField("apningstekst", event.target.value)}
                maxLength={300}
                minRows={3}
            />

            {formData.annonseformat === "strukturert" ? (
                <>
                    <VStack gap="space-12">
                        <Heading level="3" size="medium">
                            Arbeidsoppgaver
                        </Heading>
                        <details className={styles.tips}>
                            <summary>Hva bør du skrive om arbeidsoppgaver og ansvarsområder?</summary>
                            <BodyShort>
                                Beskriv de viktigste oppgavene konkret, og prioriter det kandidaten vil bruke mest tid
                                på.
                            </BodyShort>
                        </details>
                        <RichTextField
                            id="arbeidsoppgaver"
                            label="Beskriv arbeidsoppgavene for stillingen"
                            description="Må fylles inn"
                            value={formData.arbeidsoppgaver}
                            onChange={(value) => updateField("arbeidsoppgaver", value)}
                        />
                    </VStack>

                    <VStack gap="space-12">
                        <Heading level="3" size="medium">
                            Hva tilbyr dere?
                        </Heading>
                        <details className={styles.tips}>
                            <summary>Hva bør du skrive om fordeler og goder?</summary>
                            <BodyShort>
                                Trekk fram det som skiller arbeidsplassen fra andre, uten å love mer enn dere kan holde.
                            </BodyShort>
                        </details>
                        <RichTextField
                            id="hva-tilbyr"
                            label="Beskriv hva dere tilbyr"
                            description="Må fylles inn"
                            value={formData.hvaTilbyr}
                            onChange={(value) => updateField("hvaTilbyr", value)}
                        />
                    </VStack>

                    <VStack gap="space-12">
                        <Heading level="3" size="medium">
                            Hvem ser dere etter?
                        </Heading>
                        <details className={styles.tips}>
                            <summary>Hva bør du skrive om hvem dere ser etter?</summary>
                            <BodyShort>
                                Skill mellom nødvendige krav og egenskaper dere kan hjelpe kandidaten med å utvikle.
                            </BodyShort>
                        </details>
                        <RichTextField
                            id="hvem-ser-dere-etter"
                            label="Beskriv hvem dere ser etter"
                            description="Må fylles inn"
                            value={formData.hvemSerEtter}
                            onChange={(value) => updateField("hvemSerEtter", value)}
                        />
                    </VStack>
                </>
            ) : (
                <RichTextField
                    id="annonsetekst"
                    label="Skriv annonseteksten"
                    description="Må fylles inn"
                    value={formData.annonsetekst}
                    onChange={(value) => updateField("annonsetekst", value)}
                    maxLength={10_000}
                />
            )}

            <TextField
                label="Skriv inn overskrift for annonsen"
                description="Må fylles inn"
                value={formData.overskrift}
                maxLength={150}
                onChange={(event) => updateField("overskrift", event.target.value)}
            />

            {showTitleHelp && (
                <Box className="bg-brand-green-subtle" padding="space-24" borderRadius="4">
                    <VStack gap="space-16">
                        <HStack justify="space-between" align="start" wrap={false}>
                            <Heading level="3" size="small">
                                Ønsker du forslag til overskrift basert på informasjonen du har lagt inn?
                            </Heading>
                            <Button
                                type="button"
                                size="small"
                                variant="tertiary-neutral"
                                icon={<XMarkIcon aria-hidden="true" />}
                                aria-label="Skjul forslag til overskrift"
                                onClick={() => setShowTitleHelp(false)}
                            />
                        </HStack>
                        <BodyShort>
                            Dette er en lokal prototypesimulering. Forslagene lages av informasjonen i skjemaet og
                            sendes ikke noe sted.
                        </BodyShort>
                        <div>
                            <Button
                                type="button"
                                size="small"
                                variant="secondary"
                                icon={<SparklesIcon aria-hidden="true" />}
                                onClick={suggestTitles}
                            >
                                Foreslå overskrifter
                            </Button>
                        </div>
                        {suggestions.length > 0 && (
                            <VStack gap="space-8" aria-live="polite">
                                {suggestions.map((suggestion) => (
                                    <Button
                                        key={suggestion}
                                        type="button"
                                        variant="tertiary"
                                        className={styles.suggestion}
                                        onClick={() => updateField("overskrift", suggestion)}
                                    >
                                        {suggestion}
                                    </Button>
                                ))}
                            </VStack>
                        )}
                    </VStack>
                </Box>
            )}
        </VStack>
    );
}
