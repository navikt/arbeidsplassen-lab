import {
    BriefcaseIcon,
    Buildings3Icon,
    ClockIcon,
    EnvelopeClosedIcon,
    LocationPinIcon,
    PersonIcon,
    PhoneIcon,
} from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Box, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import Link from "next/link";
import type { Stilling } from "@/types/stilling";

type StillingDetaljerProps = {
    stilling: Stilling;
};

export default function StillingDetaljer({ stilling }: StillingDetaljerProps) {
    const location = [stilling.location.city, stilling.location.county].filter(Boolean).join(", ");

    return (
        <PageBlock as="article" width="text" gutters>
            <VStack paddingBlock="space-40 space-64" gap="space-24">
                <div>
                    <Heading level="1" size="xlarge" spacing>
                        {stilling.title}
                    </Heading>

                    <HStack gap="space-16" align="center">
                        <HStack gap="space-8" align="center">
                            <Buildings3Icon aria-hidden="true" />
                            <BodyShort weight="semibold">{stilling.employer.name}</BodyShort>
                        </HStack>
                        {location && (
                            <HStack gap="space-8" align="center">
                                <LocationPinIcon aria-hidden="true" />
                                <BodyShort>{location}</BodyShort>
                            </HStack>
                        )}
                    </HStack>

                    <HStack gap="space-8" paddingBlock="space-12 0">
                        {stilling.extent?.map((e) => (
                            <Tag key={e} size="small" variant="neutral-moderate">
                                {e}
                            </Tag>
                        ))}
                        {stilling.engagementType && (
                            <Tag size="small" variant="neutral-moderate">
                                {stilling.engagementType}
                            </Tag>
                        )}
                        {stilling.remote && stilling.remote !== "Ikke aktuelt" && (
                            <Tag size="small" variant="neutral-moderate">
                                {stilling.remote}
                            </Tag>
                        )}
                    </HStack>
                </div>

                <Box background="neutral-soft" padding="space-24" borderRadius="8">
                    <VStack gap="space-8">
                        {stilling.engagementType && (
                            <HStack gap="space-8" align="center">
                                <BriefcaseIcon aria-hidden="true" />
                                <BodyShort>Ansettelsesform: {stilling.engagementType}</BodyShort>
                            </HStack>
                        )}
                        {stilling.workday && (
                            <HStack gap="space-8" align="center">
                                <ClockIcon aria-hidden="true" />
                                <BodyShort>Arbeidstid: {stilling.workday.join(", ")}</BodyShort>
                            </HStack>
                        )}
                        {stilling.applicationDue && (
                            <HStack gap="space-8" align="center">
                                <ClockIcon aria-hidden="true" />
                                <BodyShort>
                                    Søknadsfrist: {new Date(stilling.applicationDue).toLocaleDateString("nb-NO")}
                                </BodyShort>
                            </HStack>
                        )}
                    </VStack>
                </Box>

                <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: lokalt mock-innhold uten brukerinput
                    dangerouslySetInnerHTML={{ __html: stilling.description }}
                />

                {stilling.contactList && stilling.contactList.length > 0 && (
                    <Box>
                        <Heading size="small" level="2" spacing>
                            Kontaktperson
                        </Heading>
                        <VStack gap="space-16">
                            {stilling.contactList.map((contact) => (
                                <VStack key={contact.name} gap="space-4">
                                    <HStack gap="space-8" align="center">
                                        <PersonIcon aria-hidden="true" />
                                        <BodyShort weight="semibold">{contact.name}</BodyShort>
                                    </HStack>
                                    {contact.title && <BodyShort>{contact.title}</BodyShort>}
                                    {contact.email && (
                                        <HStack gap="space-8" align="center">
                                            <EnvelopeClosedIcon aria-hidden="true" />
                                            <BodyShort>{contact.email}</BodyShort>
                                        </HStack>
                                    )}
                                    {contact.phone && (
                                        <HStack gap="space-8" align="center">
                                            <PhoneIcon aria-hidden="true" />
                                            <BodyShort>{contact.phone}</BodyShort>
                                        </HStack>
                                    )}
                                </VStack>
                            ))}
                        </VStack>
                    </Box>
                )}

                <Box>
                    <Heading size="small" level="2" spacing>
                        Om annonsen
                    </Heading>
                    <VStack gap="space-4">
                        <BodyShort>
                            Publisert: {new Date(stilling.published).toLocaleDateString("nb-NO")}
                        </BodyShort>
                        {stilling.source && <BodyShort>Kilde: {stilling.source}</BodyShort>}
                        <BodyShort>Annonse-ID: {stilling.id}</BodyShort>
                    </VStack>
                </Box>

                <BodyLong>
                    <Link href="/stillinger">← Tilbake til søket</Link>
                </BodyLong>
            </VStack>
        </PageBlock>
    );
}
