import { BodyShort, Box, HGrid, HStack, InfoCard, ProgressBar, Tag, VStack } from "@navikt/ds-react";
import type { EmployerBadgeResult } from "../_lib/types";
import BadgeIcon from "./BadgeIcon";
import styles from "./BedriftsprofilArbeidsflate.module.css";

export default function Aktivitetsmerker({ badges }: { badges: EmployerBadgeResult[] }) {
    return (
        <VStack gap="space-20">
            <InfoCard data-color="meta-lime" size="small">
                <InfoCard.Header>
                    <InfoCard.Title as="div">Simulerte signaler, ikke en kvalitetsrangering</InfoCard.Title>
                </InfoCard.Header>
                <InfoCard.Content>
                    Merkene bygger på aktivitet Arbeidsplassen i teorien kan observere. Terskel, måleperiode og
                    datagrunnlag skal være synlig for arbeidsgiveren.
                </InfoCard.Content>
            </InfoCard>

            <HGrid as="ul" columns={{ xs: 1, md: 2 }} gap="space-12" className={styles.badgeList}>
                {badges.map((badge) => {
                    const statusColor =
                        badge.status === "earned" ? "success" : badge.status === "progress" ? "accent" : "neutral";
                    const statusLabel =
                        badge.status === "earned"
                            ? "Opptjent"
                            : badge.status === "progress"
                              ? "På vei"
                              : "Ikke nok data";

                    return (
                        <Box
                            as="li"
                            key={badge.id}
                            background={badge.status === "earned" ? "success-soft" : "default"}
                            borderColor={badge.status === "earned" ? "success-subtle" : "neutral-subtle"}
                            borderWidth="1"
                            borderRadius="8"
                            padding="space-16"
                        >
                            <VStack gap="space-12">
                                <HStack justify="space-between" align="start" gap="space-8">
                                    <HStack align="center" gap="space-8">
                                        <span className={styles.badgeIcon}>
                                            <BadgeIcon icon={badge.icon} />
                                        </span>
                                        <BodyShort weight="semibold">{badge.label}</BodyShort>
                                    </HStack>
                                    <HStack gap="space-4">
                                        {badge.hypothesis && (
                                            <Tag variant="moderate" data-color="warning" size="small">
                                                Hypotese
                                            </Tag>
                                        )}
                                        <Tag variant="moderate" data-color={statusColor} size="small">
                                            {statusLabel}
                                        </Tag>
                                    </HStack>
                                </HStack>
                                <BodyShort size="small">{badge.description}</BodyShort>
                                {badge.status !== "unavailable" && (
                                    <ProgressBar
                                        value={badge.progress}
                                        valueMax={100}
                                        size="small"
                                        aria-label={`${badge.label}: ${badge.progress} prosent mot terskelen`}
                                        data-color={badge.status === "earned" ? "success" : "accent"}
                                    />
                                )}
                                <VStack gap="space-4">
                                    <BodyShort size="small">
                                        <strong>Nå:</strong> {badge.metric}
                                    </BodyShort>
                                    <BodyShort size="small">
                                        <strong>Kriterium:</strong> {badge.threshold}
                                    </BodyShort>
                                    <BodyShort size="small">
                                        <strong>Periode:</strong> {badge.period}
                                    </BodyShort>
                                    <BodyShort size="small">{badge.nextStep}</BodyShort>
                                </VStack>
                            </VStack>
                        </Box>
                    );
                })}
            </HGrid>
        </VStack>
    );
}
