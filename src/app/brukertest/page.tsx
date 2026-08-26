import { BodyLong, Heading, LinkCard, VStack } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Brukertest",
    description: "Aktive brukertester",
};

export default function BrukertestPage() {
    return (
        <PageBlock width="2xl" gutters>
            <VStack gap="space-24" paddingBlock="space-40 space-48">
                <div>
                    <Heading size="xlarge" level="1" spacing>
                        Brukertest
                    </Heading>
                    <BodyLong>Velkommen! Nedenfor finner du konseptene vi ønsker tilbakemelding på.</BodyLong>
                </div>

                {/* Legg til aktive brukertester her */}
                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/brukertest/eksempel">Eksempel brukertest</LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        En eksempelteste som viser hvordan brukertester settes opp.
                    </LinkCardDescription>
                </LinkCard>
            </VStack>
        </PageBlock>
    );
}
