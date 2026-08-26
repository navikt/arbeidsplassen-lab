import { BodyLong, BodyShort, Box, Button, Heading, HStack, List, Tag, VStack } from "@navikt/ds-react";
import { getScreeningSporsmalTekst } from "../_lib/selection";
import type { AnnonseData } from "../_lib/types";
import styles from "./Annonseverksted.module.css";

type Props = {
    data: AnnonseData;
};

const lines = (value: string) =>
    value
        .split(/\n|•/)
        .map((line) => line.trim())
        .filter(Boolean);

const formatLonn = (data: AnnonseData) => {
    if (data.lonnstype === "fast" && data.fastlonn) {
        return `${Number(data.fastlonn).toLocaleString("nb-NO")} kr per år`;
    }
    if (data.lonnstype === "spenn" && data.lonnFra && data.lonnTil) {
        return `${Number(data.lonnFra).toLocaleString("nb-NO")}–${Number(data.lonnTil).toLocaleString("nb-NO")} kr per år`;
    }
    if (data.lonnstype === "avtale") {
        return "Lønn etter avtale";
    }
    return "";
};

export default function Sokerblikk({ data }: Props) {
    const oppgaver = lines(data.arbeidsoppgaver);
    const lonn = formatLonn(data);
    const screeningSporsmal = data.screeningSporsmal.map(getScreeningSporsmalTekst).filter(Boolean);

    return (
        <VStack gap="space-16">
            <InfoBanner />
            <Box
                as="article"
                background="default"
                borderColor="neutral-subtle"
                borderWidth="1"
                borderRadius="12"
                padding={{ xs: "space-16", md: "space-32" }}
            >
                <VStack gap="space-24">
                    <VStack gap="space-8">
                        <Heading level="2" size="xlarge">
                            {data.stillingstittel || "Stillingstittelen vises her"}
                        </Heading>
                        <BodyShort>{data.bedriftsnavn || "Bedriftsnavn"}</BodyShort>
                        <HStack gap="space-8" wrap>
                            {data.ansettelsesform && (
                                <Tag variant="moderate" data-color="neutral">
                                    {data.ansettelsesform}
                                </Tag>
                            )}
                            {data.omfang && (
                                <Tag variant="moderate" data-color="neutral">
                                    {data.omfang}
                                </Tag>
                            )}
                            {data.arbeidssted && (
                                <Tag variant="moderate" data-color="neutral">
                                    {data.arbeidssted}
                                </Tag>
                            )}
                            {lonn && (
                                <Tag variant="moderate" data-color="success">
                                    {lonn}
                                </Tag>
                            )}
                        </HStack>
                    </VStack>

                    <BodyLong className={styles.previewText}>
                        {data.pitch || "Åpningsteksten gir jobbsøkeren en grunn til å lese videre."}
                    </BodyLong>

                    {oppgaver.length > 0 && (
                        <section aria-labelledby="preview-oppgaver">
                            <Heading level="3" size="medium" id="preview-oppgaver" spacing>
                                Dette blir arbeidshverdagen din
                            </Heading>
                            <List>
                                {oppgaver.map((oppgave) => (
                                    <List.Item key={oppgave}>{oppgave}</List.Item>
                                ))}
                            </List>
                        </section>
                    )}

                    {data.tilbud && (
                        <section aria-labelledby="preview-tilbud">
                            <Heading level="3" size="medium" id="preview-tilbud" spacing>
                                Dette får du hos oss
                            </Heading>
                            <BodyLong className={styles.previewText}>{data.tilbud}</BodyLong>
                        </section>
                    )}

                    {(data.kvalifikasjoner.length > 0 || screeningSporsmal.length > 0) && (
                        <section aria-labelledby="preview-utvelgelse">
                            <Heading level="3" size="medium" id="preview-utvelgelse" spacing>
                                Dette svarer du på når du søker
                            </Heading>
                            {data.kvalifikasjoner.length > 0 && (
                                <VStack gap="space-8">
                                    <BodyShort weight="semibold">Kvalifikasjoner du kan krysse av for</BodyShort>
                                    <List>
                                        {data.kvalifikasjoner.map((kvalifikasjon) => (
                                            <List.Item key={kvalifikasjon.id}>{kvalifikasjon.label}</List.Item>
                                        ))}
                                    </List>
                                </VStack>
                            )}
                            {screeningSporsmal.length > 0 && (
                                <VStack gap="space-8">
                                    <BodyShort weight="semibold">Spørsmål fra arbeidsgiveren</BodyShort>
                                    <List as="ol">
                                        {screeningSporsmal.map((sporsmal) => (
                                            <List.Item key={sporsmal}>{sporsmal}</List.Item>
                                        ))}
                                    </List>
                                </VStack>
                            )}
                        </section>
                    )}

                    <Box background="accent-soft" borderRadius="8" padding="space-20">
                        <VStack gap="space-12" align="start">
                            <Heading level="3" size="small">
                                Klar for å søke?
                            </Heading>
                            <BodyShort>{getSoknadstekst(data)}</BodyShort>
                            <Button>
                                {data.soknadstype === "ekstern" ? "Gå til søknadssiden" : "Søk på stillingen"}
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </VStack>
    );
}

function getSoknadstekst(data: AnnonseData) {
    if (data.soknadstype === "superrask") {
        return `Søk direkte på arbeidsplassen.no. Arbeidsgiveren behandler søknaden her${data.beOmCv ? ", og du blir bedt om å legge ved CV" : ""}.`;
    }
    if (data.soknadstype === "epost") {
        return data.soknadEpost ? `Send søknaden til ${data.soknadEpost}.` : "Søknaden skal sendes på e-post.";
    }
    return data.soknadUrl
        ? `Du blir sendt videre til ${data.soknadUrl}.`
        : "Du blir sendt videre til arbeidsgiverens eksterne søknadsside.";
}

function InfoBanner() {
    return (
        <Box background="info-soft" borderRadius="8" padding="space-16">
            <BodyShort>
                <strong>Søkerblikk:</strong> Her ser du om den viktigste informasjonen er lett å finne og forstå.
            </BodyShort>
        </Box>
    );
}
