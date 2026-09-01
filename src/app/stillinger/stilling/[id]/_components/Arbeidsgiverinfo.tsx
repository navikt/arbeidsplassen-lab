import { BodyLong, Heading, Link, VStack } from "@navikt/ds-react";
import type { Employer } from "@/app/stillinger/_lib/types";
import styles from "./StillingDetaljer.module.css";

export default function Arbeidsgiverinfo({ employer }: { employer: Employer }) {
    return (
        <section className={styles.section} aria-labelledby="arbeidsgiver-heading">
            <Heading id="arbeidsgiver-heading" level="2" size="large" spacing>
                Om bedriften
            </Heading>

            <VStack gap="space-16">
                {employer.description?.map((paragraph) => (
                    <BodyLong key={paragraph}>{paragraph}</BodyLong>
                ))}
            </VStack>

            <dl className={styles.descriptionList}>
                <div>
                    <dt>Sektor</dt>
                    <dd>{employer.sector}</dd>
                </div>
                {employer.website && (
                    <div>
                        <dt>Nettsted</dt>
                        <dd>
                            <Link href={employer.website}>{employer.website}</Link>
                        </dd>
                    </div>
                )}
                {employer.linkedin && (
                    <div>
                        <dt>LinkedIn</dt>
                        <dd>
                            <Link href={employer.linkedin}>{employer.linkedin}</Link>
                        </dd>
                    </div>
                )}
                {employer.facebook && (
                    <div>
                        <dt>Facebook</dt>
                        <dd>
                            <Link href={employer.facebook}>{employer.facebook}</Link>
                        </dd>
                    </div>
                )}
            </dl>
        </section>
    );
}
