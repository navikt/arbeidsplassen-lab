"use client";

import { BodyShort, Box, Button, Heading, HGrid, HStack, Select, Show, Stack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { SearchSort } from "@/app/stillinger/_lib/types";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";
import styles from "./SearchResultHeader.module.css";

type SearchResultHeaderProps = {
    totalAds: number;
    totalPositions: number;
    filtersOpen: boolean;
    onToggleFilters: () => void;
};

function isSearchSort(value: string): value is SearchSort {
    return value === "relevant" || value === "published" || value === "expires";
}

export default function SearchResultHeader({
    totalAds,
    totalPositions,
    filtersOpen,
    onToggleFilters,
}: SearchResultHeaderProps) {
    const { state, setSort } = useStillingerState();
    const positionLabel = totalPositions === 1 ? "stilling" : "stillinger";

    return (
        <Box paddingBlock={{ xs: "space-12", lg: "space-16" }} className={styles.header}>
            <PageBlock as="section" width="xl" gutters>
                <HGrid
                    columns={{ xs: 1, lg: "220px auto", xl: "400px auto" }}
                    gap={{ xs: "space-0", lg: "space-24", xl: "space-48" }}
                >
                    <div />
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justify={{ md: "space-between" }}
                        align={{ xs: "stretch", md: "center" }}
                        gap="space-16 space-32"
                        wrap={false}
                    >
                        <div aria-live="polite">
                            <Heading level="2" size="small">
                                {totalAds > 0 ? `${totalAds} treff` : "Ingen treff"}
                            </Heading>
                            {totalAds > 0 && (
                                <BodyShort>
                                    {totalPositions} {positionLabel}
                                </BodyShort>
                            )}
                        </div>

                        <HStack gap="space-8" align="end" wrap={false}>
                            <Select
                                label="Sorter etter"
                                size="small"
                                value={state.sort}
                                onChange={(event) => {
                                    if (isSearchSort(event.target.value)) {
                                        setSort(event.target.value);
                                    }
                                }}
                            >
                                <option value="relevant">Mest relevant</option>
                                <option value="published">Nyeste øverst</option>
                                <option value="expires">Søknadsfrist</option>
                            </Select>

                            <Show below="lg">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="small"
                                    aria-expanded={filtersOpen}
                                    onClick={onToggleFilters}
                                >
                                    Filtre
                                </Button>
                            </Show>
                        </HStack>
                    </Stack>
                </HGrid>
            </PageBlock>
        </Box>
    );
}
