"use client";

import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, HGrid, HStack, LinkCard } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import { PageBlock } from "@navikt/ds-react/Page";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <PageBlock width="2xl" gutters>
                <HStack gap="space-80" align="center" paddingBlock="space-40 space-48">
                    <div>
                        <Heading size="xlarge" level="1" spacing>
                            Alle ledige jobber, <br />
                            samlet på én plass
                        </Heading>

                        <BodyLong size="large" spacing>
                            Å lete etter jobb skal være enkelt. Fra deltid til direktør, finn jobben som passer for deg.
                        </BodyLong>

                        <HStack gap="space-16">
                            <Button
                                variant="primary"
                                as="a"
                                href="/stillinger"
                                icon={<MagnifyingGlassIcon aria-hidden="true" />}
                            >
                                Søk etter jobber
                            </Button>
                        </HStack>
                    </div>
                </HStack>
            </PageBlock>

            <PageBlock width="2xl" gutters>
                <Heading size="medium" spacing level="2">
                    Nyttige ressurser
                </Heading>
                <HGrid gap="space-20 space-32" columns={{ xs: 1, md: "1fr 1fr 1fr" }}>
                    <LinkCard>
                        <LinkCardTitle>
                            <LinkCardAnchor href="/artikler/tips-til-jobbsoknaden">
                                Tips til jobbsøknaden
                            </LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Les våre tips om hvordan skrive søknaden slik at en arbeidsgiver får lyst til å møte deg.
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <LinkCardTitle>
                            <LinkCardAnchor href="/artikler/om-arbeidsplassen">Om arbeidsplassen.no</LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>
                            Arbeidsplassen.no samler alle ledige jobber på ett sted.
                        </LinkCardDescription>
                    </LinkCard>
                    <LinkCard>
                        <LinkCardTitle>
                            <LinkCardAnchor href="/ny-stilling">Lys ut en stilling</LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>Registrer en stillingsannonse enkelt og gratis.</LinkCardDescription>
                    </LinkCard>
                </HGrid>
            </PageBlock>

            <PageBlock width="2xl" gutters>
                <HStack paddingBlock="space-48 space-24" justify="center">
                    <Heading size="small" level="2">
                        <Link href="/prototyper">Se prototyper →</Link>
                    </Heading>
                </HStack>
            </PageBlock>
        </div>
    );
}
