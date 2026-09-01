"use client";

import {
    BodyLong,
    BodyShort,
    Box,
    Button,
    Heading,
    HGrid,
    Link,
    Loader,
    LocalAlert,
    Tag,
    VStack,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import NextLink from "next/link";
import { useState } from "react";
import { getAdvertStatus } from "../_lib/formatAdvert";
import { useStillingsregistrering } from "../_state/StillingsregistreringProvider";
import styles from "./AnnonsePreview.module.css";

type AnnonsePreviewProps = {
    advertId: string;
};

const dateFormatter = new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
});

function formatDate(value: string) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Ikke oppgitt" : dateFormatter.format(date);
}

export default function AnnonsePreview({ advertId }: AnnonsePreviewProps) {
    const { isReady, getAdvert } = useStillingsregistrering();
    const [applicationMessage, setApplicationMessage] = useState(false);
    const advert = getAdvert(advertId);

    if (!isReady) {
        return (
            <PageBlock width="text" gutters>
                <VStack align="center" paddingBlock="space-64">
                    <Loader size="xlarge" title="Laster forhåndsvisning" />
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

    const { form } = advert;
    const status = getAdvertStatus(advert.status);
    const bodyText = form.annonseformat === "ustrukturert" ? form.annonsetekst : form.apningstekst;

    return (
        <PageBlock width="text" gutters>
            <VStack gap="space-32" paddingBlock={{ xs: "space-32", md: "space-48" }}>
                <HGrid columns={{ xs: 1, sm: "1fr auto" }} gap="space-16" align="center">
                    <Heading level="1" size="large">
                        Forhåndsvisning
                    </Heading>
                    <Button
                        as={NextLink}
                        href={`/stillingsregistrering/rediger/${advert.id}/steg/${advert.lastVisitedStep}`}
                        variant="secondary"
                    >
                        Tilbake til redigering
                    </Button>
                </HGrid>

                <LocalAlert status="announcement">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Dette er en lokal forhåndsvisning</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>Annonsen er ikke sendt til arbeidsplassen.no.</LocalAlert.Content>
                </LocalAlert>

                <article>
                    <VStack gap="space-32">
                        <VStack gap="space-12">
                            <Tag variant="moderate" data-color={status.color} size="small">
                                {status.label}
                            </Tag>
                            <Heading level="2" size="xlarge">
                                {form.overskrift || "Overskrift mangler"}
                            </Heading>
                            <BodyLong size="large">{form.bedriftsnavn || "Bedriftsnavn mangler"}</BodyLong>
                            {bodyText && <BodyLong className={styles.preWrap}>{bodyText}</BodyLong>}
                        </VStack>

                        <Box background="neutral-soft" padding="space-24" borderRadius="8">
                            <HGrid columns={{ xs: 1, sm: 2 }} gap="space-20">
                                <div>
                                    <BodyShort weight="semibold">Stilling</BodyShort>
                                    <BodyShort>{form.stillingstittel || "Ikke oppgitt"}</BodyShort>
                                </div>
                                <div>
                                    <BodyShort weight="semibold">Antall stillinger</BodyShort>
                                    <BodyShort>{form.antallStillinger || "Ikke oppgitt"}</BodyShort>
                                </div>
                                <div>
                                    <BodyShort weight="semibold">Arbeidssted</BodyShort>
                                    <BodyShort>{form.sted || form.omrader || "Ikke oppgitt"}</BodyShort>
                                </div>
                                <div>
                                    <BodyShort weight="semibold">Søknadsfrist</BodyShort>
                                    <BodyShort>{form.sokSnarest ? "Snarest" : formatDate(form.soknadsfrist)}</BodyShort>
                                </div>
                            </HGrid>
                        </Box>

                        {form.annonseformat === "strukturert" && (
                            <>
                                <section>
                                    <Heading level="3" size="medium" spacing>
                                        Arbeidsoppgaver
                                    </Heading>
                                    <BodyLong className={styles.preWrap}>
                                        {form.arbeidsoppgaver || "Arbeidsoppgaver er ikke lagt inn ennå."}
                                    </BodyLong>
                                </section>
                                <section>
                                    <Heading level="3" size="medium" spacing>
                                        Hva tilbyr vi?
                                    </Heading>
                                    <BodyLong className={styles.preWrap}>
                                        {form.hvaTilbyr || "Informasjon om tilbudet er ikke lagt inn ennå."}
                                    </BodyLong>
                                </section>
                                <section>
                                    <Heading level="3" size="medium" spacing>
                                        Hvem ser vi etter?
                                    </Heading>
                                    <BodyLong className={styles.preWrap}>
                                        {form.hvemSerEtter || "Kandidatbeskrivelsen er ikke lagt inn ennå."}
                                    </BodyLong>
                                </section>
                            </>
                        )}

                        <section>
                            <Heading level="3" size="medium" spacing>
                                Om bedriften
                            </Heading>
                            <BodyLong className={styles.preWrap}>
                                {form.omBedriften || "Bedriftsbeskrivelsen er ikke lagt inn ennå."}
                            </BodyLong>
                        </section>

                        <Box background="neutral-soft" padding="space-24" borderRadius="8">
                            <VStack gap="space-16">
                                <Heading level="3" size="medium">
                                    Søk på stillingen
                                </Heading>
                                <BodyLong>
                                    Søknaden kan sendes med{" "}
                                    {form.soknadstype.length > 0
                                        ? form.soknadstype
                                              .map((method) =>
                                                  method === "superrask"
                                                      ? "superrask søknad"
                                                      : method === "epost"
                                                        ? "e-post"
                                                        : "ekstern lenke",
                                              )
                                              .join(", ")
                                        : "en metode arbeidsgiveren velger"}
                                    .
                                </BodyLong>
                                <div>
                                    <Button type="button" onClick={() => setApplicationMessage(true)}>
                                        Søk på stillingen
                                    </Button>
                                </div>
                                {applicationMessage && (
                                    <LocalAlert status="announcement" aria-live="polite">
                                        <LocalAlert.Header>
                                            <LocalAlert.Title>Søknad er bare simulert</LocalAlert.Title>
                                        </LocalAlert.Header>
                                        <LocalAlert.Content>
                                            Ingen opplysninger blir lagret eller sendt fra forhåndsvisningen.
                                        </LocalAlert.Content>
                                    </LocalAlert>
                                )}
                            </VStack>
                        </Box>
                    </VStack>
                </article>
            </VStack>
        </PageBlock>
    );
}
