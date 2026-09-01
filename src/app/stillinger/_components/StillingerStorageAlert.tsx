"use client";

import { Box, LocalAlert } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";

export default function StillingerStorageAlert() {
    const { storageError } = useStillingerState();

    if (!storageError) {
        return null;
    }

    return (
        <PageBlock width="lg" gutters>
            <Box paddingBlock="space-16 space-0">
                <LocalAlert status="warning" size="small" as="div">
                    <LocalAlert.Header>
                        <LocalAlert.Title as="div">Problem med lagring i nettleseren</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>{storageError}</LocalAlert.Content>
                </LocalAlert>
            </Box>
        </PageBlock>
    );
}
