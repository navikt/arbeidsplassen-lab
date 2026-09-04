"use client";

import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Box, Button, CopyButton, Heading, HStack, Link, Theme, VStack } from "@navikt/ds-react";
import NextLink from "next/link";
import { profileThemes } from "@/app/_common/bedriftsprofil/profile";
import { formatDeadline } from "@/app/stillinger/_lib/formatStilling";
import type { Stilling } from "@/app/stillinger/_lib/types";
import { useProfilSnapshot } from "../_state/ProfilSnapshotProvider";
import styles from "./ProfilberiketStillingsannonse.module.css";

export default function ProfilertSoknadspanel({ stilling }: { stilling: Stilling }) {
    const { profile } = useProfilSnapshot();
    const theme = profileThemes.find((candidate) => candidate.id === profile.themeId) ?? profileThemes[0];
    const deadline = formatDeadline(stilling);
    const { application } = stilling;

    return (
        <Theme data-color={theme.color} asChild>
            <Box
                as="section"
                aria-labelledby="profilert-soknad-heading"
                background="soft"
                borderColor="neutral-subtle"
                borderWidth="1"
                borderRadius="16"
                padding={{ xs: "space-20", md: "space-24" }}
            >
                <VStack gap="space-20">
                    <VStack gap="space-4">
                        <Heading id="profilert-soknad-heading" level="2" size="medium">
                            Søk på jobben
                        </Heading>
                        {deadline && <BodyLong>{deadline}</BodyLong>}
                        <BodyShort size="small">Søknaden håndteres i den eksisterende prototypeflyten.</BodyShort>
                    </VStack>

                    {application.type === "external" && (
                        <Button
                            as="a"
                            href={application.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<ExternalLinkIcon aria-hidden />}
                            className={styles.fullWidthButton}
                        >
                            Gå til søknad
                        </Button>
                    )}

                    {application.type === "email" && (
                        <VStack gap="space-8">
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
                        <Button
                            as={NextLink}
                            href={`/stillinger/stilling/${stilling.id}/superrask-soknad`}
                            className={styles.fullWidthButton}
                        >
                            Gå til superrask søknad
                        </Button>
                    )}

                    {application.type === "superrask" && application.alternativeEmail && (
                        <BodyShort>
                            Alternativt kan du sende søknad til{" "}
                            <Link href={`mailto:${application.alternativeEmail}`}>{application.alternativeEmail}</Link>
                        </BodyShort>
                    )}
                </VStack>
            </Box>
        </Theme>
    );
}
