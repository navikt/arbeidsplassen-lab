import { BodyShort, Button, InfoCard, List, VStack } from "@navikt/ds-react";
import type { FokusId, Rekrutteringsmal, Tekstforslag } from "../_lib/types";
import { maltips, skrivehjelp } from "../_mock/coach";

type Props = {
    fokus: FokusId;
    mal: Rekrutteringsmal;
    onBrukForslag: (forslag: Tekstforslag) => void;
};

export default function Skrivehjelp({ fokus, mal, onBrukForslag }: Props) {
    const hjelp = skrivehjelp[fokus];

    return (
        <VStack gap="space-16">
            <InfoCard data-color="info" size="small" as="section" aria-label="Skrivehjelp">
                <InfoCard.Header>
                    <InfoCard.Title>{hjelp.tittel}</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    <VStack gap="space-12">
                        <BodyShort>{hjelp.intro}</BodyShort>
                        <List size="small">
                            {hjelp.sjekkliste.map((punkt) => (
                                <List.Item key={punkt}>{punkt}</List.Item>
                            ))}
                        </List>
                    </VStack>
                </InfoCard.Content>
            </InfoCard>

            <InfoCard data-color="meta-lime" size="small" as="section" aria-label="Råd for rekrutteringsmålet">
                <InfoCard.Header>
                    <InfoCard.Title>Råd tilpasset målet deres</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>{maltips[mal]}</InfoCard.Content>
            </InfoCard>

            {hjelp.forslag.length > 0 && (
                <InfoCard data-color="brand-beige" size="small" as="section" aria-label="Tekststartere">
                    <InfoCard.Header>
                        <InfoCard.Title>Kom raskt i gang</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        <VStack gap="space-8">
                            <BodyShort size="small">
                                Bruk en tekststarter og tilpass den til deres arbeidsplass.
                            </BodyShort>
                            {hjelp.forslag.map((forslag) => (
                                <Button
                                    key={forslag.label}
                                    variant="secondary"
                                    data-color="neutral"
                                    size="small"
                                    onClick={() => onBrukForslag(forslag)}
                                >
                                    Bruk: {forslag.label}
                                </Button>
                            ))}
                        </VStack>
                    </InfoCard.Content>
                </InfoCard>
            )}
        </VStack>
    );
}
