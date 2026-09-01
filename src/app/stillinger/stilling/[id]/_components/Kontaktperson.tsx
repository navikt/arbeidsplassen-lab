import { BodyLong, CopyButton, Heading, HStack, Link, VStack } from "@navikt/ds-react";
import type { ContactPerson as ContactPersonType } from "@/app/stillinger/_lib/types";
import styles from "./StillingDetaljer.module.css";

export default function Kontaktperson({ contacts }: { contacts: ContactPersonType[] }) {
    if (contacts.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <Heading level="2" size="medium" spacing>
                {contacts.length === 1 ? "Kontaktperson for stillingen" : "Kontaktpersoner for stillingen"}
            </Heading>
            <VStack gap="space-16">
                {contacts.map((contact) => (
                    <VStack key={`${contact.name}-${contact.email}`} gap="space-4">
                        <BodyLong weight="semibold">{contact.name}</BodyLong>
                        {contact.title && <BodyLong>{contact.title}</BodyLong>}
                        {contact.phone && (
                            <HStack gap="space-8" wrap={false}>
                                <BodyLong>{contact.phone}</BodyLong>
                                <CopyButton
                                    title="Kopier telefonnummer"
                                    copyText={contact.phone}
                                    size="xsmall"
                                    data-color="accent"
                                />
                            </HStack>
                        )}
                        {contact.email && (
                            <HStack gap="space-8" wrap={false}>
                                <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                                <CopyButton
                                    title="Kopier e-postadresse"
                                    copyText={contact.email}
                                    size="xsmall"
                                    data-color="accent"
                                />
                            </HStack>
                        )}
                    </VStack>
                ))}
            </VStack>
        </section>
    );
}
