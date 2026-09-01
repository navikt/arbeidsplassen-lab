"use client";

import { BodyShort, Button, Heading, VStack } from "@navikt/ds-react";
import { useEffect, useRef } from "react";
import type { Stilling } from "@/app/stillinger/_lib/types";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";
import SearchResultItem from "./SearchResultItem";
import styles from "./SearchResults.module.css";

type SearchResultsProps = {
    results: Stilling[];
    page: number;
    totalPages: number;
};

export default function SearchResults({ results, page, totalPages }: SearchResultsProps) {
    const { resetSearch } = useStillingerState();
    const sectionRef = useRef<HTMLElement>(null);
    const previousPage = useRef(page);

    useEffect(() => {
        if (previousPage.current !== page) {
            sectionRef.current?.focus({ preventScroll: true });
            previousPage.current = page;
        }
    }, [page]);

    if (results.length === 0) {
        return (
            <VStack gap="space-16" align="start">
                <Heading level="2" size="medium">
                    Ingen treff
                </Heading>
                <BodyShort>Ingen stillinger matcher søket ditt. Prøv å endre eller nullstille filtrene.</BodyShort>
                <Button type="button" variant="secondary" onClick={resetSearch}>
                    Nullstill søket
                </Button>
            </VStack>
        );
    }

    return (
        <section
            id="search-results"
            ref={sectionRef}
            tabIndex={-1}
            aria-label={`Søketreff, side ${page} av ${totalPages}`}
            className={styles.resultsSection}
        >
            <ol className={styles.resultsList}>
                {results.map((stilling) => (
                    <li key={stilling.id} className={styles.resultItem}>
                        <SearchResultItem stilling={stilling} />
                    </li>
                ))}
            </ol>
        </section>
    );
}
