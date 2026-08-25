"use client";

import { BodyShort, Checkbox, CheckboxGroup, HGrid, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useState } from "react";
import SearchBox from "@/app/stillinger/_components/SearchBox";
import { mockFilters } from "@/mock/filtre";
import { mockStillinger } from "@/mock/stillinger";
import type { Stilling } from "@/types/stilling";
import SearchResultHeader from "./SearchResultHeader";
import SearchResultItem from "./SearchResultItem";

type SortValue = "relevant" | "published" | "expires";

function filterStillinger(
    stillinger: Stilling[],
    query: string,
    selectedLocations: string[],
    selectedExtent: string[],
): Stilling[] {
    return stillinger.filter((s) => {
        const matchesQuery =
            query === "" ||
            s.title.toLowerCase().includes(query.toLowerCase()) ||
            s.employer.name.toLowerCase().includes(query.toLowerCase()) ||
            (s.jobTitle?.toLowerCase().includes(query.toLowerCase()) ?? false);

        const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(s.location.county ?? "");

        const matchesExtent = selectedExtent.length === 0 || (s.extent ?? []).some((e) => selectedExtent.includes(e));

        return matchesQuery && matchesLocation && matchesExtent;
    });
}

function sortStillinger(stillinger: Stilling[], sortBy: SortValue): Stilling[] {
    const sorted = [...stillinger];
    switch (sortBy) {
        case "published":
            return sorted.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
        case "expires":
            return sorted.sort((a, b) => {
                if (!a.applicationDue) {
                    return 1;
                }
                if (!b.applicationDue) {
                    return -1;
                }
                return new Date(a.applicationDue).getTime() - new Date(b.applicationDue).getTime();
            });
        default:
            return sorted;
    }
}

export default function StillingsSok() {
    const [query, setQuery] = useState("");
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedExtent, setSelectedExtent] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortValue>("relevant");

    const filtered = filterStillinger(mockStillinger, query, selectedLocations, selectedExtent);
    const results = sortStillinger(filtered, sortBy);

    return (
        <>
            <PageBlock width="2xl" gutters className="mb-5">
                <SearchBox query={query} setQuery={setQuery} />
            </PageBlock>

            <SearchResultHeader results={results} sortBy={sortBy} onSortChange={setSortBy} />

            <PageBlock width="2xl" gutters>
                <HGrid columns={{ xs: 1, md: "280px 1fr" }} gap="space-32" paddingBlock="space-16 space-48">
                    <VStack gap="space-24" as="aside" aria-label="Filtre">
                        <CheckboxGroup
                            legend="Sted"
                            size="small"
                            value={selectedLocations}
                            onChange={setSelectedLocations}
                        >
                            {mockFilters.locations.map((loc) => (
                                <Checkbox key={loc.key} value={loc.key}>
                                    {loc.label} ({loc.count})
                                </Checkbox>
                            ))}
                        </CheckboxGroup>

                        <CheckboxGroup legend="Omfang" size="small" value={selectedExtent} onChange={setSelectedExtent}>
                            {mockFilters.extent.map((ext) => (
                                <Checkbox key={ext.key} value={ext.key}>
                                    {ext.label} ({ext.count})
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </VStack>

                    <VStack gap="space-4">
                        <VStack as="ol" gap="space-16" className="list-none p-0 m-0">
                            {results.map((stilling) => (
                                <li key={stilling.id} className="border-b border-b-neutral-300 pb-4">
                                    <SearchResultItem stilling={stilling} />
                                </li>
                            ))}
                        </VStack>

                        {results.length === 0 && (
                            <BodyShort textColor="subtle">
                                Ingen stillinger matcher søket ditt. Prøv å endre filtrene.
                            </BodyShort>
                        )}
                    </VStack>
                </HGrid>
            </PageBlock>
        </>
    );
}
