"use client";

import { BodyLong, BodyShort, Box, Button, Heading, HGrid, HStack, Link, Tag, Theme, VStack } from "@navikt/ds-react";
import { useState } from "react";
import BadgeIcon from "@/app/_common/bedriftsprofil/BadgeIcon";
import ProfilLogo from "@/app/_common/bedriftsprofil/ProfilLogo";
import { profileThemes } from "@/app/_common/bedriftsprofil/profile";
import type { EmployerBadgeResult } from "@/app/_common/bedriftsprofil/types";
import { getSafeExternalUrl } from "@/app/_common/bedriftsprofil/validation";
import type { Employer } from "@/app/stillinger/_lib/types";
import { useProfilSnapshot } from "../_state/ProfilSnapshotProvider";
import styles from "./ProfilberiketStillingsannonse.module.css";

export default function ProfilertArbeidsgiver({
    badges,
    employer,
}: {
    badges: EmployerBadgeResult[];
    employer: Employer;
}) {
    const [isFollowing, setIsFollowing] = useState(false);
    const { profile } = useProfilSnapshot();
    const theme = profileThemes.find((candidate) => candidate.id === profile.themeId) ?? profileThemes[0];
    const visibleHighlights = profile.highlights.filter((highlight) => highlight.trim().length > 0);
    const safeWebsite = getSafeExternalUrl(profile.website);
    const socialLinks = [
        { label: "LinkedIn", href: employer.linkedin },
        { label: "Facebook", href: employer.facebook },
    ].flatMap((link) => {
        const href = link.href ? getSafeExternalUrl(link.href) : undefined;
        return href ? [{ ...link, href }] : [];
    });

    return (
        <Theme data-color={theme.color} asChild>
            <Box
                as="section"
                aria-labelledby="profilert-arbeidsgiver-heading"
                background="soft"
                borderColor="neutral-subtle"
                borderWidth="1"
                borderRadius="16"
                padding={{ xs: "space-20", md: "space-32" }}
            >
                <VStack gap="space-32">
                    <HGrid columns={{ xs: 1, md: "minmax(0, 1.5fr) minmax(16rem, 0.8fr)" }} gap="space-32">
                        <VStack gap="space-16">
                            <HStack gap="space-16" align="center" justify="space-between" wrap>
                                <HStack gap="space-12" align="center" wrap={false}>
                                    <ProfilLogo variant={profile.logoId} compact />
                                    <VStack gap="space-2">
                                        <BodyShort size="small">Møt arbeidsgiveren</BodyShort>
                                        <Heading id="profilert-arbeidsgiver-heading" level="2" size="large">
                                            {profile.name}
                                        </Heading>
                                    </VStack>
                                </HStack>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="small"
                                    aria-pressed={isFollowing}
                                    onClick={() => setIsFollowing((current) => !current)}
                                >
                                    {isFollowing ? "Følger arbeidsgiver" : "Følg arbeidsgiver"}
                                </Button>
                            </HStack>
                            {isFollowing ? (
                                <BodyShort size="small" role="status">
                                    Du følger arbeidsgiveren i denne prototypen. Varsler sendes ikke.
                                </BodyShort>
                            ) : (
                                <BodyShort size="small">
                                    Følg arbeidsgiveren for å få beskjed når de publiserer nye stillinger.
                                </BodyShort>
                            )}
                            {profile.tagline && <BodyLong size="large">{profile.tagline}</BodyLong>}
                            <VStack gap="space-12">
                                <BodyLong>
                                    {profile.about || "Bedriften har ikke skrevet en presentasjon ennå."}
                                </BodyLong>
                                {employer.description?.map((paragraph) => (
                                    <BodyLong key={paragraph}>{paragraph}</BodyLong>
                                ))}
                            </VStack>
                            {(safeWebsite || socialLinks.length > 0) && (
                                <HStack gap="space-16" wrap>
                                    {safeWebsite && (
                                        <BodyShort>
                                            <Link href={safeWebsite}>Nettsted</Link>
                                        </BodyShort>
                                    )}
                                    {socialLinks.map((link) => (
                                        <BodyShort key={link.label}>
                                            <Link href={link.href}>{link.label}</Link>
                                        </BodyShort>
                                    ))}
                                </HStack>
                            )}
                        </VStack>

                        <Box background="default" borderRadius="12" padding="space-20">
                            <VStack gap="space-16">
                                <Heading level="3" size="small">
                                    Nøkkelfakta
                                </Heading>
                                <dl className={styles.profileFacts}>
                                    <div>
                                        <dt>Hovedsted</dt>
                                        <dd>{profile.location || "Ikke oppgitt"}</dd>
                                    </div>
                                    <div>
                                        <dt>Bransje</dt>
                                        <dd>{profile.industry || "Ikke oppgitt"}</dd>
                                    </div>
                                    <div>
                                        <dt>Sektor</dt>
                                        <dd>{employer.sector}</dd>
                                    </div>
                                    <div>
                                        <dt>Arbeidsform</dt>
                                        <dd>{profile.workMode}</dd>
                                    </div>
                                    <div>
                                        <dt>Antall ansatte</dt>
                                        <dd>{profile.employeeCount || "Ikke oppgitt"}</dd>
                                    </div>
                                </dl>
                            </VStack>
                        </Box>
                    </HGrid>

                    <section aria-labelledby="profilert-arbeidsgiverlofte-heading">
                        <VStack gap="space-16">
                            <Heading id="profilert-arbeidsgiverlofte-heading" level="3" size="medium">
                                Derfor jobber folk hos oss
                            </Heading>
                            <BodyLong>{profile.employerPromise || "Arbeidsgiverløftet er ikke ferdig ennå."}</BodyLong>
                            {visibleHighlights.length > 0 && (
                                <ul className={styles.highlightList}>
                                    {visibleHighlights.map((highlight) => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>
                            )}
                        </VStack>
                    </section>

                    {badges.length > 0 && (
                        <section aria-labelledby="profilert-aktivitetsmerker-heading">
                            <VStack gap="space-16">
                                <div>
                                    <Heading id="profilert-aktivitetsmerker-heading" level="3" size="medium" spacing>
                                        Aktivitetsmerker
                                    </Heading>
                                    <BodyShort>
                                        Merkene bygger på simulert aktivitet i Arbeidsplassen, ikke en vurdering av
                                        arbeidsmiljøet.
                                    </BodyShort>
                                </div>
                                <HGrid as="ul" columns={{ xs: 1, sm: 2 }} gap="space-12" className={styles.badgeList}>
                                    {badges.map((badge) => (
                                        <Box
                                            as="li"
                                            key={badge.id}
                                            background="default"
                                            borderColor="neutral-subtle"
                                            borderWidth="1"
                                            borderRadius="12"
                                            padding="space-16"
                                        >
                                            <VStack gap="space-8">
                                                <Tag
                                                    variant="moderate"
                                                    size="small"
                                                    data-color="neutral"
                                                    icon={<BadgeIcon icon={badge.icon} />}
                                                >
                                                    {badge.label}
                                                </Tag>
                                                <BodyShort size="small">{badge.description}</BodyShort>
                                            </VStack>
                                        </Box>
                                    ))}
                                </HGrid>
                            </VStack>
                        </section>
                    )}
                </VStack>
            </Box>
        </Theme>
    );
}
