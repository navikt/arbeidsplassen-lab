import { CopyButton, Heading, HStack } from "@navikt/ds-react";
import styles from "./StillingDetaljer.module.css";

export default function DelAnnonse({ id }: { id: string }) {
    const path = `/stillinger/stilling/${id}`;

    return (
        <section className={styles.section}>
            <Heading level="2" size="medium" spacing>
                Del annonsen
            </Heading>
            <HStack gap="space-8">
                <CopyButton copyText={path} text="Facebook" activeText="Lenke kopiert" data-color="accent" />
                <CopyButton copyText={path} text="LinkedIn" activeText="Lenke kopiert" data-color="accent" />
                <CopyButton copyText={path} text="X" activeText="Lenke kopiert" data-color="accent" />
            </HStack>
        </section>
    );
}
