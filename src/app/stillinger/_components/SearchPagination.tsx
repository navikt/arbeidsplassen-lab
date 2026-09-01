"use client";

import { Hide, Pagination, Select, Show, VStack } from "@navikt/ds-react";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";

export default function SearchPagination({ totalPages }: { totalPages: number }) {
    const { state, setPage, setPageSize } = useStillingerState();

    if (totalPages <= 1) {
        return null;
    }

    return (
        <VStack gap="space-32" align="center">
            <Show above="md">
                <Pagination
                    page={state.page}
                    count={totalPages}
                    onPageChange={setPage}
                    boundaryCount={1}
                    siblingCount={1}
                    prevNextTexts
                    srHeading={{ tag: "h2", text: "Navigasjon mellom søketreff" }}
                />
            </Show>
            <Hide above="md">
                <Pagination
                    page={state.page}
                    count={totalPages}
                    onPageChange={setPage}
                    boundaryCount={1}
                    siblingCount={0}
                    size="small"
                    srHeading={{ tag: "h2", text: "Navigasjon mellom søketreff" }}
                />
            </Hide>
            <Select
                label="Antall treff per side"
                size="small"
                value={state.pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
            </Select>
        </VStack>
    );
}
