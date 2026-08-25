import { BodyShort, Box, Heading, HGrid, HStack, Select, Stack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Stilling } from "@/types/stilling";

type SortValue = "relevant" | "published" | "expires";

type SearchResultHeaderProps = {
    results: Stilling[];
    sortBy: SortValue;
    onSortChange: (value: SortValue) => void;
};

export default function SearchResultHeader({ results, sortBy, onSortChange }: SearchResultHeaderProps) {
    const count = results.length;

    return (
        <Box background="success-softA" paddingBlock={{ lg: "space-16" }}>
            <PageBlock as="section" width="xl" gutters>
                <HGrid
                    columns={{ xs: 1, lg: "220px auto", xl: "400px auto" }}
                    gap={{ xs: "space-0", lg: "space-24", xl: "space-48" }}
                >
                    <div />
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justify={{ md: "space-between" }}
                        align={{ sm: "start", md: "center" }}
                        gap="space-16 space-32"
                        wrap={false}
                    >
                        <HStack
                            gap="space-8"
                            wrap={false}
                            justify="space-between"
                            align="center"
                            className="full-width"
                        >
                            <Heading level="2" size="small" aria-live="polite">
                                {count > 0 ? `${count} treff` : "Ingen treff"}
                            </Heading>
                            {count > 0 && (
                                <BodyShort>
                                    {count} {count === 1 ? "stilling" : "stillinger"}
                                </BodyShort>
                            )}
                        </HStack>
                        <Select
                            label="Sorter etter"
                            size="small"
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value as SortValue)}
                            hideLabel
                        >
                            <option value="relevant">Mest relevant</option>
                            <option value="published">Nyeste øverst</option>
                            <option value="expires">Søknadsfrist</option>
                        </Select>
                    </Stack>
                </HGrid>
            </PageBlock>
        </Box>
    );
}
