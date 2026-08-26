import { BodyShort, Box, Button, Heading, HGrid, HStack, InfoCard, ProgressBar, Tag, VStack } from "@navikt/ds-react";
import type { FokusId, Kvalitetssjekk } from "../_lib/types";
import styles from "./Annonseverksted.module.css";

type Props = {
    sjekker: Kvalitetssjekk[];
    poeng: number;
    onForbedre: (fokus: FokusId) => void;
    kompakt?: boolean;
};

export default function Kvalitetspanel({ sjekker, poeng, onForbedre, kompakt = false }: Props) {
    const neste = sjekker.find((sjekk) => !sjekk.bestatt);

    return (
        <VStack gap="space-20" className={kompakt ? styles.stickyPanel : undefined}>
            <Box background="neutral-soft" borderRadius="12" padding="space-20">
                <VStack gap="space-12">
                    <HStack justify="space-between" align="center">
                        <Heading level={kompakt ? "2" : "2"} size={kompakt ? "medium" : "large"}>
                            Kvalitetssjekk
                        </Heading>
                        <Tag variant="strong" data-color={poeng >= 75 ? "success" : "accent"}>
                            {poeng}/100
                        </Tag>
                    </HStack>
                    <ProgressBar
                        value={poeng}
                        valueMax={100}
                        aria-label={`Annonsekvalitet: ${poeng} av 100 poeng`}
                        data-color={poeng >= 75 ? "success" : "accent"}
                    />
                    <BodyShort size="small">
                        Dette er ikke en fasit. Sjekken viser om annonsen gir kandidaten nok informasjon til å ta et
                        godt valg.
                    </BodyShort>
                </VStack>
            </Box>

            {neste && (
                <InfoCard data-color="meta-lime" as="section" aria-label="Neste beste forbedring">
                    <InfoCard.Header>
                        <InfoCard.Title>Neste beste grep: {neste.label}</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        <VStack gap="space-12">
                            <BodyShort>{neste.forklaring}</BodyShort>
                            <Button size="small" onClick={() => onForbedre(neste.fokus)}>
                                Forbedre dette nå
                            </Button>
                        </VStack>
                    </InfoCard.Content>
                </InfoCard>
            )}

            <HGrid columns={{ xs: 1, md: kompakt ? 1 : 2 }} gap="space-12" as="ul" className={styles.qualityList}>
                {sjekker.map((sjekk) => (
                    <Box
                        as="li"
                        key={sjekk.id}
                        background={sjekk.bestatt ? "success-soft" : "default"}
                        borderColor={sjekk.bestatt ? "success-subtle" : "neutral-subtle"}
                        borderWidth="1"
                        borderRadius="8"
                        padding="space-16"
                    >
                        <VStack gap="space-8">
                            <HStack justify="space-between" align="start">
                                <BodyShort weight="semibold">
                                    {sjekk.bestatt ? "Bestått: " : "Kan forbedres: "}
                                    {sjekk.label}
                                </BodyShort>
                                <BodyShort size="small">{sjekk.poeng} p</BodyShort>
                            </HStack>
                            {!kompakt && <BodyShort size="small">{sjekk.forklaring}</BodyShort>}
                            {!sjekk.bestatt && (
                                <Button
                                    variant="tertiary"
                                    data-color="neutral"
                                    size="small"
                                    onClick={() => onForbedre(sjekk.fokus)}
                                >
                                    Gå til området
                                </Button>
                            )}
                        </VStack>
                    </Box>
                ))}
            </HGrid>
        </VStack>
    );
}
