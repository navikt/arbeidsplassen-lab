import { Heading } from "@navikt/ds-react";
import SearchResultItem from "@/app/stillinger/_components/SearchResultItem";
import type { Stilling } from "@/app/stillinger/_lib/types";
import styles from "./StillingDetaljer.module.css";

export default function LignendeAnnonser({ stillinger }: { stillinger: Stilling[] }) {
    if (stillinger.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <Heading level="2" size="large" spacing>
                Lignende annonser
            </Heading>
            <ul className={styles.similarList}>
                {stillinger.map((stilling) => (
                    <li key={stilling.id}>
                        <SearchResultItem stilling={stilling} headingLevel="3" />
                    </li>
                ))}
            </ul>
        </section>
    );
}
