"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useState } from "react";
import type { Stilling } from "@/app/stillinger/_lib/types";
import styles from "./ProfilberiketStillingsannonse.module.css";

export default function ProfilertStillingsfakta({ stilling }: { stilling: Stilling }) {
    const [showMore, setShowMore] = useState(false);
    const details = [
        { label: "Oppstart", value: stilling.startDateLabel },
        { label: "Stillingstittel", value: stilling.jobTitle },
        {
            label: "Type ansettelse",
            value: `${stilling.engagementType}, ${stilling.extent.join(" og ").toLowerCase()}`,
        },
        { label: "Arbeidstid", value: stilling.workday.join(", ") },
        { label: "Antall stillinger", value: String(stilling.positions) },
        { label: "Arbeidsspråk", value: stilling.workLanguages.join(" eller ") },
        { label: "Mulighet for hjemmekontor", value: stilling.remote },
    ];
    const visibleDetails = showMore ? details : details.slice(0, 4);

    return (
        <Box
            as="section"
            aria-labelledby="profilert-jobbdetaljer-heading"
            background="raised"
            borderColor="neutral-subtle"
            borderWidth="1"
            borderRadius="16"
            padding={{ xs: "space-20", md: "space-24" }}
        >
            <VStack gap="space-20">
                <VStack gap="space-8">
                    <Heading id="profilert-jobbdetaljer-heading" level="2" size="large">
                        Om jobben
                    </Heading>
                    {stilling.shortSummary && <BodyLong size="large">{stilling.shortSummary}</BodyLong>}
                </VStack>

                <dl id="profilert-jobbdetaljer-list" className={styles.detailsList}>
                    {visibleDetails.map((detail) => (
                        <div key={detail.label}>
                            <dt>{detail.label}</dt>
                            <dd>{detail.value}</dd>
                        </div>
                    ))}
                </dl>

                <HStack justify="end">
                    <Button
                        type="button"
                        variant="tertiary"
                        aria-expanded={showMore}
                        aria-controls="profilert-jobbdetaljer-list"
                        icon={showMore ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                        onClick={() => setShowMore((current) => !current)}
                    >
                        {showMore ? "Vis færre detaljer" : "Vis flere detaljer"}
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}
