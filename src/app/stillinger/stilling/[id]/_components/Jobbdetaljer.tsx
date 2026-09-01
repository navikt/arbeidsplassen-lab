"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, HStack } from "@navikt/ds-react";
import { useState } from "react";
import FavoriteButton from "@/app/stillinger/_components/FavoriteButton";
import type { Stilling } from "@/app/stillinger/_lib/types";
import styles from "./StillingDetaljer.module.css";

export default function Jobbdetaljer({ stilling }: { stilling: Stilling }) {
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
        <section className={styles.section} aria-labelledby="jobbdetaljer-heading">
            <HStack justify="space-between" align="center" gap="space-16">
                <Heading id="jobbdetaljer-heading" level="2" size="large">
                    Om jobben
                </Heading>
                <FavoriteButton id={stilling.id} />
            </HStack>

            {stilling.shortSummary && <BodyLong spacing>{stilling.shortSummary}</BodyLong>}

            <dl id="jobbdetaljer-list" className={styles.detailsList}>
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
                    aria-controls="jobbdetaljer-list"
                    icon={showMore ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
                    onClick={() => setShowMore((current) => !current)}
                >
                    {showMore ? "Vis færre detaljer" : "Vis flere detaljer"}
                </Button>
            </HStack>
        </section>
    );
}
