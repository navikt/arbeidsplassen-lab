import { BodyLong, Box, Heading, HStack, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Eksempelprototype",
    description: "En eksempelprototype som viser anbefalt struktur",
};

export default function EksempelPrototypePage() {
    return (
        <PageBlock width="text" gutters>
            <VStack gap="space-24" paddingBlock="space-40 space-48">
                <div>
                    <Heading size="xlarge" level="1" spacing>
                        Eksempelprototype
                    </Heading>
                    <BodyLong>
                        Denne prototypen viser anbefalt mappestruktur og mønster for nye konsepter. Bruk denne som
                        utgangspunkt når du oppretter en ny prototype.
                    </BodyLong>
                </div>

                <Box background="accent-soft" padding="space-24" borderRadius="8">
                    <Heading size="medium" level="2" spacing>
                        Slik lager du en ny prototype
                    </Heading>
                    <VStack as="ol" gap="space-8">
                        <li>
                            <BodyLong>
                                Opprett en ny mappe under <code>src/app/prototyper/</code>, for eksempel{" "}
                                <code>nytt-stillingssok/</code>
                            </BodyLong>
                        </li>
                        <li>
                            <BodyLong>
                                Legg til en <code>page.tsx</code> i mappen
                            </BodyLong>
                        </li>
                        <li>
                            <BodyLong>
                                Plasser prototype-spesifikke komponenter i en <code>_components/</code>-undermappe
                            </BodyLong>
                        </li>
                        <li>
                            <BodyLong>
                                Prototypen blir automatisk tilgjengelig på <code>/prototyper/ditt-navn</code>
                            </BodyLong>
                        </li>
                    </VStack>
                </Box>

                <Box background="neutral-soft" padding="space-24" borderRadius="8">
                    <Heading size="medium" level="2" spacing>
                        Mappestruktur
                    </Heading>
                    <pre>
                        {`src/app/prototyper/
├── page.tsx                 # Oversiktsside (legg til lenke hit)
└── din-prototype/
    ├── page.tsx             # Selve prototypen
    └── _components/
        ├── MinKomponent.tsx
        └── ...`}
                    </pre>
                </Box>

                <HStack>
                    <Link href="/prototyper">← Tilbake til prototypeoversikten</Link>
                </HStack>
            </VStack>
        </PageBlock>
    );
}
