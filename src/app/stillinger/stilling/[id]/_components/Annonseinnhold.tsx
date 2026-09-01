import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import type { AdSection } from "@/app/stillinger/_lib/types";
import styles from "./StillingDetaljer.module.css";

export default function Annonseinnhold({ sections }: { sections: AdSection[] }) {
    return (
        <VStack gap="space-24" className={`${styles.section} ${styles.content}`}>
            {sections.map((section) => (
                <section key={section.heading ?? section.paragraphs?.[0] ?? section.items?.[0]}>
                    {section.heading && (
                        <Heading level="2" size="medium" spacing>
                            {section.heading}
                        </Heading>
                    )}
                    {section.paragraphs?.map((paragraph) => (
                        <BodyLong key={paragraph} spacing>
                            {paragraph}
                        </BodyLong>
                    ))}
                    {section.items && (
                        <ul className={styles.contentList}>
                            {section.items.map((item) => (
                                <li key={item}>
                                    <BodyLong>{item}</BodyLong>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            ))}
        </VStack>
    );
}
