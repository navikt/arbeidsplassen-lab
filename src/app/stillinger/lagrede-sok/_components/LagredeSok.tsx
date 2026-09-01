"use client";

import { BodyLong, BodyShort, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SavedViewsStyles from "@/app/stillinger/_components/SavedViews.module.css";
import type { SavedSearch } from "@/app/stillinger/_lib/types";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";

const publishedLabels = {
    all: "",
    today: "Nye i dag",
    last3: "Nye siste 3 dager",
    last7: "Nye siste uka",
};

function describeSearch(savedSearch: SavedSearch): string {
    const { criteria } = savedSearch;
    const values = [
        ...criteria.terms,
        publishedLabels[criteria.published],
        ...criteria.locations,
        ...criteria.occupations,
        ...criteria.education,
        ...criteria.experience,
        ...criteria.driversLicense,
        ...criteria.workLanguages,
        ...criteria.extent,
        ...criteria.engagementTypes,
        ...criteria.sectors,
        ...criteria.remote,
        criteria.summerJobOnly ? "Sommerjobb" : "",
        criteria.superraskOnly ? "Superrask søknad" : "",
    ].filter(Boolean);

    return values.join(" · ");
}

export default function LagredeSok() {
    const router = useRouter();
    const { state, applySavedSearch, deleteSavedSearch, isStorageReady } = useStillingerState();

    return (
        <PageBlock width="md" gutters>
            <VStack gap="space-32" paddingBlock={{ xs: "space-24 space-48", md: "space-40 space-64" }}>
                <div>
                    <Heading level="1" size="xlarge" spacing>
                        Lagrede søk
                    </Heading>
                    <BodyLong>Søkene lagres i denne nettleseren til du sletter dem.</BodyLong>
                </div>

                {!isStorageReady ? (
                    <BodyLong role="status">Laster lagrede søk …</BodyLong>
                ) : state.savedSearches.length > 0 ? (
                    <ul className={SavedViewsStyles.list}>
                        {state.savedSearches.map((savedSearch) => (
                            <li key={savedSearch.id}>
                                <Box background="neutral-soft" borderRadius="8" padding="space-24">
                                    <VStack gap="space-16">
                                        <div>
                                            <Heading level="2" size="small" spacing>
                                                {savedSearch.name}
                                            </Heading>
                                            <BodyShort>{describeSearch(savedSearch)}</BodyShort>
                                        </div>
                                        <HStack gap="space-8">
                                            <Button
                                                type="button"
                                                size="small"
                                                onClick={() => {
                                                    applySavedSearch(savedSearch.id);
                                                    router.push("/stillinger");
                                                }}
                                            >
                                                Bruk søket
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="tertiary"
                                                data-color="danger"
                                                size="small"
                                                onClick={() => deleteSavedSearch(savedSearch.id)}
                                            >
                                                Slett
                                            </Button>
                                        </HStack>
                                    </VStack>
                                </Box>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <VStack gap="space-16" align="start">
                        <Heading level="2" size="medium">
                            Du har ingen lagrede søk
                        </Heading>
                        <BodyLong>Velg ett eller flere søkekriterier, og bruk «Lagre søk» i søkeboksen.</BodyLong>
                        <Button as={Link} href="/stillinger" variant="secondary">
                            Finn ledige stillinger
                        </Button>
                    </VStack>
                )}
            </VStack>
        </PageBlock>
    );
}
