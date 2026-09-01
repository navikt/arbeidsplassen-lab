"use client";

import { ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, HStack, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { formatDate } from "@/app/stillinger/_lib/formatStilling";
import type { Stilling } from "@/app/stillinger/_lib/types";
import styles from "./StillingDetaljer.module.css";

export default function Annonsedata({ stilling }: { stilling: Stilling }) {
    const [reportOpen, setReportOpen] = useState(false);

    return (
        <section className={styles.section} aria-labelledby="annonsedata-heading">
            <HStack justify="space-between" align="center" gap="space-16">
                <Heading id="annonsedata-heading" level="2" size="medium">
                    Annonsedata
                </Heading>
                <Button
                    type="button"
                    variant="tertiary"
                    icon={<ExclamationmarkTriangleIcon aria-hidden />}
                    onClick={() => setReportOpen(true)}
                >
                    Rapporter annonse
                </Button>
            </HStack>

            <dl className={styles.descriptionList}>
                <div>
                    <dt>Stillingsnummer</dt>
                    <dd>{stilling.id}</dd>
                </div>
                <div>
                    <dt>Sist endret</dt>
                    <dd>{formatDate(stilling.updated)}</dd>
                </div>
                <div>
                    <dt>Hentet fra</dt>
                    <dd>{stilling.source}</dd>
                </div>
                <div>
                    <dt>Referanse</dt>
                    <dd>{stilling.reference}</dd>
                </div>
            </dl>

            <Modal
                open={reportOpen}
                onClose={() => setReportOpen(false)}
                header={{ heading: "Rapporter annonse" }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>Dette er en lokal prototype. Rapporten blir ikke sendt eller lagret.</BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={() => setReportOpen(false)}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}
