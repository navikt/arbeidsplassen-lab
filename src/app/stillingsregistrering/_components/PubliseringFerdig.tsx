"use client";

import { Button, Heading, Link, Loader, LocalAlert, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import NextLink from "next/link";
import { useStillingsregistrering } from "../_state/StillingsregistreringProvider";

type PubliseringFerdigProps = {
    advertId: string;
};

export default function PubliseringFerdig({ advertId }: PubliseringFerdigProps) {
    const { isReady, getAdvert } = useStillingsregistrering();
    const advert = getAdvert(advertId);

    if (!isReady) {
        return (
            <PageBlock width="text" gutters>
                <VStack align="center" paddingBlock="space-64">
                    <Loader size="xlarge" title="Laster publisering" />
                </VStack>
            </PageBlock>
        );
    }

    if (!advert) {
        return (
            <PageBlock width="text" gutters>
                <VStack gap="space-24" paddingBlock="space-48">
                    <Heading level="1" size="large">
                        Annonsen finnes ikke
                    </Heading>
                    <Link as={NextLink} href="/stillingsregistrering/stillingsannonser">
                        Tilbake til stillingsannonser
                    </Link>
                </VStack>
            </PageBlock>
        );
    }

    return (
        <PageBlock width="text" gutters>
            <VStack gap="space-32" paddingBlock={{ xs: "space-40", md: "space-64" }}>
                <Heading level="1" size="xlarge">
                    Annonsen er publisert i laben
                </Heading>
                <LocalAlert status="success">
                    <LocalAlert.Header>
                        <LocalAlert.Title>{advert.form.overskrift || "Stillingsannonsen"} er lagret</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        Statusen er oppdatert lokalt i denne nettleseren. Annonsen er ikke sendt til arbeidsplassen.no.
                    </LocalAlert.Content>
                </LocalAlert>
                <VStack gap="space-12" align="start">
                    <Button as={NextLink} href="/stillingsregistrering/stillingsannonser">
                        Gå til stillingsannonser
                    </Button>
                    <Button as={NextLink} href={`/stillingsregistrering/forhandsvis/${advert.id}`} variant="secondary">
                        Se annonsen
                    </Button>
                </VStack>
            </VStack>
        </PageBlock>
    );
}
