"use client";

import { BodyLong, Button, Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import Link from "next/link";
import SavedViewsStyles from "@/app/stillinger/_components/SavedViews.module.css";
import SearchResultItem from "@/app/stillinger/_components/SearchResultItem";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";
import { mockStillinger } from "@/mock/stillinger/annonser";

export default function Favoritter() {
    const { state, isStorageReady } = useStillingerState();
    const favorites = mockStillinger.filter((stilling) => state.favoriteIds.includes(stilling.id));

    return (
        <PageBlock width="md" gutters>
            <VStack gap="space-32" paddingBlock={{ xs: "space-24 space-48", md: "space-40 space-64" }}>
                <div>
                    <Heading level="1" size="xlarge" spacing>
                        Favoritter
                    </Heading>
                    <BodyLong>Favorittene lagres i denne nettleseren til du fjerner dem.</BodyLong>
                </div>

                {!isStorageReady ? (
                    <BodyLong role="status">Laster favoritter …</BodyLong>
                ) : favorites.length > 0 ? (
                    <ul className={SavedViewsStyles.list}>
                        {favorites.map((stilling) => (
                            <li key={stilling.id} className={SavedViewsStyles.favorite}>
                                <SearchResultItem stilling={stilling} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <VStack gap="space-16" align="start">
                        <Heading level="2" size="medium">
                            Du har ingen favoritter
                        </Heading>
                        <BodyLong>Trykk på hjertet ved en stilling du vil finne igjen.</BodyLong>
                        <Button as={Link} href="/stillinger" variant="secondary">
                            Finn ledige stillinger
                        </Button>
                    </VStack>
                )}
            </VStack>
        </PageBlock>
    );
}
