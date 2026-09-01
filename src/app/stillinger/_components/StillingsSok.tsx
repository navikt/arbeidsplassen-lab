"use client";

import { HGrid, Hide, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useMemo, useState } from "react";
import SearchBox from "@/app/stillinger/_components/SearchBox";
import { filterStillinger } from "@/app/stillinger/_lib/filterStillinger";
import { paginateStillinger } from "@/app/stillinger/_lib/paginateStillinger";
import { sortStillinger } from "@/app/stillinger/_lib/sortStillinger";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";
import { mockStillinger } from "@/mock/stillinger/annonser";
import DesktopFilters from "./DesktopFilters";
import MobileFilters from "./MobileFilters";
import SearchFeedback from "./SearchFeedback";
import SearchPagination from "./SearchPagination";
import SearchResultHeader from "./SearchResultHeader";
import SearchResults from "./SearchResults";

export default function StillingsSok() {
    const { state } = useStillingerState();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const results = useMemo(() => {
        const filtered = filterStillinger(mockStillinger, state.criteria);
        return sortStillinger(filtered, state.sort);
    }, [state.criteria, state.sort]);
    const paginated = paginateStillinger(results, state.page, state.pageSize);
    const totalPositions = results.reduce((sum, stilling) => sum + stilling.positions, 0);

    return (
        <>
            <PageBlock width="2xl" gutters>
                <SearchBox />
            </PageBlock>

            <SearchResultHeader
                totalAds={results.length}
                totalPositions={totalPositions}
                filtersOpen={filtersOpen}
                onToggleFilters={() => setFiltersOpen((open) => !open)}
            />

            <PageBlock width="xl" gutters>
                <HGrid
                    columns={{ xs: 1, lg: "220px auto", xl: "400px auto" }}
                    gap={{ xs: "space-0", lg: "space-24", xl: "space-48" }}
                    paddingBlock="space-16 space-48"
                >
                    <Hide below="lg">
                        <DesktopFilters />
                    </Hide>

                    <MobileFilters
                        open={filtersOpen}
                        resultCount={results.length}
                        onClose={() => setFiltersOpen(false)}
                    />

                    <VStack gap="space-40">
                        <SearchResults
                            results={paginated.items}
                            page={paginated.page}
                            totalPages={paginated.totalPages}
                        />
                        <SearchPagination totalPages={paginated.totalPages} />
                        {results.length > 0 && <SearchFeedback />}
                    </VStack>
                </HGrid>
            </PageBlock>
        </>
    );
}
