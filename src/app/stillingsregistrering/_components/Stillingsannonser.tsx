"use client";

import { BodyLong, Button, Heading, Loader, Search, Select, Stack, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { type AdvertStatus, advertStatuses } from "../_lib/types";
import { useStillingsregistrering } from "../_state/StillingsregistreringProvider";
import Annonserad from "./Annonserad";
import RegistrationStorageAlert from "./RegistrationStorageAlert";
import styles from "./Stillingsannonser.module.css";

type StatusFilter = "all" | AdvertStatus;

function isStatusFilter(value: string): value is StatusFilter {
    return value === "all" || advertStatuses.some((status) => status === value);
}

export default function Stillingsannonser() {
    const router = useRouter();
    const { state, isReady, createAdvert, deleteAdvert } = useStillingsregistrering();
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAdverts = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLocaleLowerCase("nb-NO");
        return state.adverts.filter((advert) => {
            const matchesStatus = statusFilter === "all" || advert.status === statusFilter;
            const title = advert.form.overskrift || "Overskrift mangler";
            return matchesStatus && title.toLocaleLowerCase("nb-NO").includes(normalizedSearch);
        });
    }, [searchTerm, state.adverts, statusFilter]);

    const createAndOpenAdvert = (sourceId?: string) => {
        const id = createAdvert(sourceId);
        router.push(`/stillingsregistrering/rediger/${id}/steg/1`);
    };

    const resultText =
        filteredAdverts.length === 0
            ? "Ingen annonser"
            : filteredAdverts.length === 1
              ? "1 annonse"
              : `${filteredAdverts.length} annonser`;

    return (
        <PageBlock width="lg" gutters>
            <VStack gap="space-32" paddingBlock={{ xs: "space-32", md: "space-48" }}>
                <Heading level="1" size="xlarge" align="center">
                    Stillingsannonser
                </Heading>

                <RegistrationStorageAlert />

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap="space-24"
                    align={{ md: "end" }}
                    className={styles.controls}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        gap="space-24"
                        align={{ sm: "end" }}
                        justify={{ sm: "space-between" }}
                    >
                        <Button onClick={() => createAndOpenAdvert()}>Lag ny annonse</Button>
                        <Select
                            label="Filtrer etter status"
                            value={statusFilter}
                            onChange={(event) => {
                                if (isStatusFilter(event.target.value)) {
                                    setStatusFilter(event.target.value);
                                }
                            }}
                        >
                            <option value="all">Alle status</option>
                            <option value="draft">Påbegynt</option>
                            <option value="pending">Til godkjenning</option>
                            <option value="scheduled">Til publisering</option>
                            <option value="published">Publisert</option>
                            <option value="closed">Avpublisert</option>
                        </Select>
                    </Stack>
                    <search className={styles.search}>
                        <Search
                            label="Søk blant annonser"
                            hideLabel={false}
                            variant="simple"
                            placeholder="Søk på tittel"
                            value={searchTerm}
                            onChange={setSearchTerm}
                            onClear={() => setSearchTerm("")}
                            autoComplete="off"
                        />
                    </search>
                </Stack>

                {!isReady ? (
                    <VStack align="center" paddingBlock="space-48">
                        <Loader size="xlarge" title="Laster stillingsannonser" />
                    </VStack>
                ) : (
                    <VStack gap="space-8">
                        <Heading level="2" size="medium" aria-live="polite">
                            {resultText}
                        </Heading>
                        {filteredAdverts.length === 0 ? (
                            <BodyLong>Ingen stillingsannonser samsvarer med filteret eller søket.</BodyLong>
                        ) : (
                            filteredAdverts.map((advert) => (
                                <Annonserad
                                    key={advert.id}
                                    advert={advert}
                                    onCopy={createAndOpenAdvert}
                                    onDelete={deleteAdvert}
                                />
                            ))
                        )}
                    </VStack>
                )}
            </VStack>
        </PageBlock>
    );
}
