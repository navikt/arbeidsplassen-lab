"use client";

import { Buildings3Icon, LocationPinIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Box, Heading, HGrid, HStack, Tag, Theme, VStack } from "@navikt/ds-react";
import Image from "next/image";
import BadgeIcon from "@/app/_common/bedriftsprofil/BadgeIcon";
import ProfilLogo from "@/app/_common/bedriftsprofil/ProfilLogo";
import { profileHeroes, profileThemes } from "@/app/_common/bedriftsprofil/profile";
import type { EmployerBadgeResult } from "@/app/_common/bedriftsprofil/types";
import FavoriteButton from "@/app/stillinger/_components/FavoriteButton";
import type { Stilling } from "@/app/stillinger/_lib/types";
import { useProfilSnapshot } from "../_state/ProfilSnapshotProvider";
import styles from "./ProfilberiketStillingsannonse.module.css";

export default function ProfilertAnnonsehero({
    stilling,
    badges,
}: {
    stilling: Stilling;
    badges: EmployerBadgeResult[];
}) {
    const { profile } = useProfilSnapshot();
    const theme = profileThemes.find((candidate) => candidate.id === profile.themeId) ?? profileThemes[0];
    const hero = profileHeroes.find((candidate) => candidate.id === profile.heroId) ?? profileHeroes[0];
    const location = [stilling.location.address, stilling.location.city].filter(Boolean).join(", ");

    return (
        <Theme data-color={theme.color} asChild>
            <Box
                as="header"
                background="soft"
                borderColor="neutral-subtle"
                borderWidth="1"
                borderRadius="16"
                className={styles.hero}
            >
                <div className={styles.heroMedia}>
                    <Image
                        src={hero.src}
                        alt={hero.alt}
                        width={1200}
                        height={640}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1200px"
                        preload
                        className={styles.heroImage}
                    />
                </div>

                <Box padding={{ xs: "space-16", sm: "space-24", md: "space-32", lg: "space-24" }}>
                    <div className={styles.logoOverlap}>
                        <ProfilLogo variant={profile.logoId} />
                    </div>

                    <HGrid columns={{ xs: 1, md: "minmax(0, 1fr) auto" }} gap="space-20" align="start">
                        <VStack gap="space-16">
                            <VStack gap="space-8">
                                <Tag variant="strong" size="small" data-color="neutral">
                                    {stilling.jobTitle}
                                </Tag>
                                <Heading
                                    id="profilert-stilling-heading"
                                    level="1"
                                    size="xlarge"
                                    className={styles.heroHeading}
                                >
                                    {stilling.title}
                                </Heading>
                                {profile.tagline && <BodyLong size="large">{profile.tagline}</BodyLong>}
                            </VStack>

                            <HStack gap="space-16" align="center" wrap>
                                <HStack gap="space-8" align="center" wrap={false}>
                                    <Buildings3Icon aria-hidden />
                                    <BodyShort weight="semibold">{profile.name}</BodyShort>
                                </HStack>
                                <HStack gap="space-8" align="center" wrap={false}>
                                    <LocationPinIcon aria-hidden />
                                    <BodyShort weight="semibold">{location}</BodyShort>
                                </HStack>
                            </HStack>

                            {badges.length > 0 && (
                                <ul className={styles.heroBadgeList} aria-label="Aktivitetsmerker for arbeidsgiveren">
                                    {badges.map((badge) => (
                                        <li key={badge.id}>
                                            <Tag
                                                variant="moderate"
                                                size="small"
                                                data-color="neutral"
                                                icon={<BadgeIcon icon={badge.icon} />}
                                            >
                                                {badge.label}
                                            </Tag>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </VStack>

                        <div className={styles.heroFavorite}>
                            <FavoriteButton id={stilling.id} />
                        </div>
                    </HGrid>
                </Box>
            </Box>
        </Theme>
    );
}
