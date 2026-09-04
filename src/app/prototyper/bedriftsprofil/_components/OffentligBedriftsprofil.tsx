"use client";

import { Buildings3Icon, LocationPinIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Button, Heading, HStack, Link, LinkCard, Tag, VStack } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import BadgeIcon from "@/app/_common/bedriftsprofil/BadgeIcon";
import { getPublicBadgeResults } from "@/app/_common/bedriftsprofil/badges";
import ProfilLogo from "@/app/_common/bedriftsprofil/ProfilLogo";
import { profileHeroes, profileThemes } from "@/app/_common/bedriftsprofil/profile";
import type { EmployerBadgeResult, EmployerJobSummary, EmployerProfile } from "@/app/_common/bedriftsprofil/types";
import { getSafeExternalUrl } from "@/app/_common/bedriftsprofil/validation";
import styles from "./BedriftsprofilArbeidsflate.module.css";

type OffentligBedriftsprofilProps = {
    profile: EmployerProfile;
    badges: EmployerBadgeResult[];
    job: EmployerJobSummary;
};

export default function OffentligBedriftsprofil({ profile, badges, job }: OffentligBedriftsprofilProps) {
    const [isFollowing, setIsFollowing] = useState(false);
    const theme = profileThemes.find((candidate) => candidate.id === profile.themeId) ?? profileThemes[0];
    const hero = profileHeroes.find((candidate) => candidate.id === profile.heroId) ?? profileHeroes[0];
    const publicBadges = getPublicBadgeResults(badges);
    const safeWebsite = getSafeExternalUrl(profile.website);
    const visibleHighlights = profile.highlights.filter((highlight) => highlight.trim().length > 0);

    return (
        <article className={styles.publicProfile} data-color={theme.color}>
            <div className={styles.hero}>
                <Image
                    src={hero.src}
                    alt={hero.alt}
                    width={1200}
                    height={640}
                    sizes="(max-width: 1023px) 100vw, 44vw"
                    preload
                    className={styles.heroImage}
                />
            </div>

            <div className={styles.publicProfileContent}>
                <div className={styles.logoOverlap}>
                    <ProfilLogo variant={profile.logoId} />
                </div>

                <VStack gap="space-24">
                    <VStack gap="space-12">
                        <Heading level="3" size="large">
                            {profile.name}
                        </Heading>
                        {profile.tagline && <BodyLong size="large">{profile.tagline}</BodyLong>}
                        <HStack gap="space-8" align="center" wrap>
                            <Button
                                size="small"
                                variant={isFollowing ? "secondary" : "primary"}
                                onClick={() => setIsFollowing((current) => !current)}
                            >
                                {isFollowing ? "Følger arbeidsgiver" : "Følg arbeidsgiver"}
                            </Button>
                            <BodyShort size="small" role="status">
                                {isFollowing
                                    ? "Du vil få varsel om nye stillinger i denne demoen."
                                    : "Simulert handling"}
                            </BodyShort>
                        </HStack>
                    </VStack>

                    <dl className={styles.publicFacts}>
                        <div>
                            <dt>Sted</dt>
                            <dd>{profile.location || "Ikke oppgitt"}</dd>
                        </div>
                        <div>
                            <dt>Bransje</dt>
                            <dd>{profile.industry || "Ikke oppgitt"}</dd>
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

                    {publicBadges.length > 0 && (
                        <section aria-labelledby="offentlige-merker-heading">
                            <VStack gap="space-12">
                                <Heading id="offentlige-merker-heading" level="4" size="medium">
                                    Merker fra aktivitet
                                </Heading>
                                <BodyShort size="small">
                                    Merkene bygger på aktivitet i Arbeidsplassen, ikke en vurdering av arbeidsmiljøet.
                                </BodyShort>
                                <ul className={styles.publicBadgeList}>
                                    {publicBadges.map((badge) => (
                                        <li key={badge.id} className={styles.publicBadge}>
                                            <Tag
                                                variant="moderate"
                                                data-color="neutral"
                                                icon={<BadgeIcon icon={badge.icon} />}
                                            >
                                                {badge.label}
                                            </Tag>
                                            <BodyShort size="small">{badge.description}</BodyShort>
                                        </li>
                                    ))}
                                </ul>
                            </VStack>
                        </section>
                    )}

                    <section aria-labelledby="om-oss-heading">
                        <Heading id="om-oss-heading" level="4" size="medium" spacing>
                            Om oss
                        </Heading>
                        <BodyLong>{profile.about || "Bedriften har ikke skrevet en presentasjon ennå."}</BodyLong>
                    </section>

                    <section aria-labelledby="arbeidsgiverlofte-heading">
                        <Heading id="arbeidsgiverlofte-heading" level="4" size="medium" spacing>
                            Derfor jobber folk hos oss
                        </Heading>
                        <VStack gap="space-12">
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

                    <section aria-labelledby="ledige-stillinger-heading">
                        <VStack gap="space-12">
                            <Heading id="ledige-stillinger-heading" level="4" size="medium">
                                Ledige stillinger
                            </Heading>
                            <LinkCard as="article" data-color="neutral">
                                <LinkCardTitle as="h5">
                                    <LinkCardAnchor asChild>
                                        <NextLink href={job.href}>{job.title}</NextLink>
                                    </LinkCardAnchor>
                                </LinkCardTitle>
                                <LinkCardDescription>
                                    <VStack gap="space-4">
                                        <HStack gap="space-6" align="center">
                                            <Buildings3Icon aria-hidden />
                                            <span>{job.jobTitle}</span>
                                        </HStack>
                                        <HStack gap="space-6" align="center">
                                            <LocationPinIcon aria-hidden />
                                            <span>{job.location}</span>
                                        </HStack>
                                        <span>
                                            {job.engagementType} · {job.extent}
                                        </span>
                                    </VStack>
                                </LinkCardDescription>
                            </LinkCard>
                        </VStack>
                    </section>

                    {safeWebsite && (
                        <BodyShort>
                            <Link href={safeWebsite} target="_blank" rel="noreferrer">
                                Besøk nettstedet til {profile.name}
                            </Link>
                        </BodyShort>
                    )}
                </VStack>
            </div>
        </article>
    );
}
