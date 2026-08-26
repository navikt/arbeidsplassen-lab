import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eksempel brukertest",
};

export default function EksempelBrukertestPage() {
    return (
        <PageBlock width="md" gutters>
            <VStack gap="space-16" paddingBlock="space-40 space-48">
                <Heading size="xlarge" level="1">
                    Eksempel brukertest
                </Heading>
                <BodyLong>
                    Dette er en eksempelside som viser hvordan en brukertest kan settes opp. Erstatt dette innholdet med
                    prototypen du vil teste.
                </BodyLong>
                <BodyLong>
                    Du kan lenke direkte til en prototype herfra, eller bygge en dedikert flyt for brukertesten.
                </BodyLong>
            </VStack>
        </PageBlock>
    );
}
