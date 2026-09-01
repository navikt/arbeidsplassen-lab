import { BodyLong, Heading, HGrid, LinkCard, VStack } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";
import Link from "next/link";
import RegistrationStorageAlert from "./_components/RegistrationStorageAlert";

export const metadata: Metadata = {
    title: "Min bedriftsside",
    description: "Administrer stillingsannonser i Arbeidsplassen Lab",
};

export default function MinBedriftssidePage() {
    return (
        <PageBlock width="xl" gutters>
            <VStack gap="space-48" paddingBlock={{ xs: "space-32", md: "space-48" }}>
                <VStack gap="space-8">
                    <Heading level="1" size="xlarge">
                        Min bedriftsside
                    </Heading>
                    <BodyLong size="large">Her kan dere opprette og administrere stillingsannonser.</BodyLong>
                </VStack>
                <RegistrationStorageAlert />
                <HGrid gap="space-16" columns={{ xs: 1, md: 2 }}>
                    <LinkCard>
                        <LinkCardTitle>
                            <LinkCardAnchor asChild>
                                <Link href="/stillingsregistrering/stillingsannonser">Deres stillingsannonser</Link>
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Lag nye, vis eller endre eksisterende annonser i denne nettleseren.
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <LinkCardTitle>
                            <LinkCardAnchor href="mailto:rekrutteringshjelp@example.invalid">
                                Hjelp med rekruttering?
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Dette er en dummylenke som simulerer kontakt med Nav om rekrutteringshjelp.
                        </LinkCardDescription>
                    </LinkCard>
                </HGrid>
            </VStack>
        </PageBlock>
    );
}
