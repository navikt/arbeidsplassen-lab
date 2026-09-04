import { BodyShort, Box, Heading, HStack, ProgressBar, Tag, VStack } from "@navikt/ds-react";
import type { ProfileCompleteness } from "@/app/_common/bedriftsprofil/types";

type ProfilstatusProps = {
    completeness: ProfileCompleteness;
    storageReady: boolean;
};

export default function Profilstatus({ completeness, storageReady }: ProfilstatusProps) {
    const isReady = completeness.score >= 90;

    return (
        <Box
            as="section"
            aria-labelledby="profilstatus-heading"
            background="neutral-soft"
            borderRadius="12"
            padding={{ xs: "space-16", md: "space-20" }}
        >
            <VStack gap="space-12">
                <HStack justify="space-between" align="center" gap="space-12">
                    <Heading id="profilstatus-heading" level="2" size="small">
                        Privat profilstatus
                    </Heading>
                    <Tag variant="strong" data-color={isReady ? "success" : "accent"}>
                        {completeness.score} % klar
                    </Tag>
                </HStack>
                <ProgressBar
                    value={completeness.score}
                    valueMax={100}
                    aria-label={`Bedriftsprofilen er ${completeness.score} prosent klar`}
                    data-color={isReady ? "success" : "accent"}
                />
                <BodyShort>{completeness.nextAction}</BodyShort>
                <BodyShort size="small">
                    {storageReady ? "Endringer lagres automatisk i denne nettleseren." : "Klargjør lokal lagring …"}
                </BodyShort>
            </VStack>
        </Box>
    );
}
