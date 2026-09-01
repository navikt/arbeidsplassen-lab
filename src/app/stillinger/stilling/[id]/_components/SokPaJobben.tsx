"use client";

import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Button, CopyButton, Heading, HStack, Link, Stack, VStack } from "@navikt/ds-react";
import NextLink from "next/link";
import { formatDeadline } from "@/app/stillinger/_lib/formatStilling";
import type { Stilling } from "@/app/stillinger/_lib/types";

export default function SokPaJobben({ stilling }: { stilling: Stilling }) {
    const deadline = formatDeadline(stilling);
    const { application } = stilling;

    return (
        <Box borderRadius="4" padding="space-16" className="bg-brand-green-soft">
            <Stack
                gap="space-16"
                direction={{ xs: "column", sm: "row" }}
                justify="space-between"
                align={{ xs: "start", sm: "center" }}
            >
                <VStack gap="space-4">
                    <Heading level="2" size="small">
                        Søk på jobben
                    </Heading>
                    {deadline && <BodyLong>{deadline}</BodyLong>}
                </VStack>

                {application.type === "external" && (
                    <Button
                        as="a"
                        href={application.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<ExternalLinkIcon aria-hidden />}
                    >
                        Gå til søknad
                    </Button>
                )}

                {application.type === "email" && (
                    <VStack gap="space-4">
                        <BodyLong>Send søknad til</BodyLong>
                        <HStack gap="space-8" wrap={false}>
                            <Link href={`mailto:${application.email}`}>{application.email}</Link>
                            <CopyButton
                                title="Kopier e-postadresse"
                                copyText={application.email}
                                size="xsmall"
                                data-color="accent"
                            />
                        </HStack>
                    </VStack>
                )}

                {application.type === "superrask" && (
                    <Button as={NextLink} href={`/stillinger/stilling/${stilling.id}/superrask-soknad`}>
                        Gå til superrask søknad
                    </Button>
                )}
            </Stack>

            {application.type === "superrask" && application.alternativeEmail && (
                <BodyLong>
                    Alternativt kan du sende søknad via e-post til{" "}
                    <Link href={`mailto:${application.alternativeEmail}`}>{application.alternativeEmail}</Link>
                </BodyLong>
            )}
        </Box>
    );
}
