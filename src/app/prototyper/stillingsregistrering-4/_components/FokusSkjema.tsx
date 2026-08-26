import {
    BodyShort,
    Box,
    Heading,
    HGrid,
    HStack,
    InfoCard,
    List,
    Radio,
    RadioGroup,
    Select,
    Textarea,
    TextField,
    VStack,
} from "@navikt/ds-react";
import type { AnnonseData, FokusId } from "../_lib/types";
import UtvelgelseSkjema from "./UtvelgelseSkjema";

type Props = {
    fokus: FokusId;
    data: AnnonseData;
    updateField: <K extends keyof AnnonseData>(field: K, value: AnnonseData[K]) => void;
};

export default function FokusSkjema({ fokus, data, updateField }: Props) {
    if (fokus === "retning") {
        return (
            <VStack gap="space-20">
                <Heading level="2" size="large">
                    Sett retning
                </Heading>
                <TextField
                    label="Stillingstittel"
                    description="Bruk en tittel kandidater kjenner og søker etter."
                    value={data.stillingstittel}
                    onChange={(event) => updateField("stillingstittel", event.target.value)}
                />
                <HGrid columns={{ xs: 1, sm: 2 }} gap="space-16">
                    <TextField
                        label="Bedrift"
                        value={data.bedriftsnavn}
                        onChange={(event) => updateField("bedriftsnavn", event.target.value)}
                    />
                    <TextField
                        label="Arbeidssted"
                        description="Sted eller kommune"
                        value={data.arbeidssted}
                        onChange={(event) => updateField("arbeidssted", event.target.value)}
                    />
                    <Select
                        label="Ansettelsesform"
                        value={data.ansettelsesform}
                        onChange={(event) => updateField("ansettelsesform", event.target.value)}
                    >
                        <option value="">Velg ansettelsesform</option>
                        <option value="Fast">Fast</option>
                        <option value="Vikariat">Vikariat</option>
                        <option value="Engasjement">Engasjement</option>
                        <option value="Sesong">Sesong</option>
                    </Select>
                    <Select
                        label="Omfang"
                        value={data.omfang}
                        onChange={(event) => updateField("omfang", event.target.value)}
                    >
                        <option value="">Velg omfang</option>
                        <option value="Heltid">Heltid</option>
                        <option value="Deltid">Deltid</option>
                        <option value="Heltid eller deltid">Heltid eller deltid</option>
                    </Select>
                </HGrid>
            </VStack>
        );
    }

    if (fokus === "lokkemiddel") {
        return (
            <VStack gap="space-20">
                <Heading level="2" size="large">
                    Gjør jobben attraktiv
                </Heading>
                <Textarea
                    label="Åpningstekst"
                    description="Gi søkeren én god grunn til å lese videre. Skriv 2–4 setninger."
                    value={data.pitch}
                    onChange={(event) => updateField("pitch", event.target.value)}
                    maxLength={500}
                    minRows={5}
                />
                <Textarea
                    label="Dette får du hos oss"
                    description="Beskriv utvikling, arbeidsmiljø, fleksibilitet og hva kandidaten kan påvirke."
                    value={data.tilbud}
                    onChange={(event) => updateField("tilbud", event.target.value)}
                    minRows={6}
                />
            </VStack>
        );
    }

    if (fokus === "hverdagen") {
        return (
            <VStack gap="space-20">
                <Heading level="2" size="large">
                    Vis arbeidshverdagen
                </Heading>
                <Textarea
                    label="Hva skal kandidaten gjøre?"
                    description="Skriv én konkret oppgave per linje. Tre til fem oppgaver er ofte nok."
                    value={data.arbeidsoppgaver}
                    onChange={(event) => updateField("arbeidsoppgaver", event.target.value)}
                    minRows={10}
                />
                <Box background="neutral-soft" padding="space-16" borderRadius="8">
                    <BodyShort size="small">
                        <strong>Les høyt-testen:</strong> Kan en person utenfor bedriften forstå hvordan en vanlig
                        arbeidsuke ser ut? Hvis ikke, bytt interne begreper med konkrete handlinger.
                    </BodyShort>
                </Box>
            </VStack>
        );
    }

    if (fokus === "vilkar") {
        return (
            <VStack gap="space-20">
                <Heading level="2" size="large">
                    Vær åpen om vilkår
                </Heading>
                <RadioGroup
                    legend="Hvordan vil dere oppgi lønn?"
                    description="Lønn gjør det enklere for søkeren å vurdere om stillingen passer."
                    value={data.lonnstype}
                    onChange={(value) => updateField("lonnstype", value)}
                >
                    <Radio value="fast">Fast årslønn</Radio>
                    <Radio value="spenn">Lønnsspenn</Radio>
                    <Radio value="avtale">Etter avtale</Radio>
                </RadioGroup>
                {data.lonnstype === "fast" && (
                    <TextField
                        label="Årslønn i kroner"
                        type="number"
                        value={data.fastlonn}
                        onChange={(event) => updateField("fastlonn", event.target.value)}
                        htmlSize={16}
                    />
                )}
                {data.lonnstype === "spenn" && (
                    <HStack gap="space-16">
                        <TextField
                            label="Fra"
                            type="number"
                            value={data.lonnFra}
                            onChange={(event) => updateField("lonnFra", event.target.value)}
                            htmlSize={14}
                        />
                        <TextField
                            label="Til"
                            type="number"
                            value={data.lonnTil}
                            onChange={(event) => updateField("lonnTil", event.target.value)}
                            htmlSize={14}
                        />
                    </HStack>
                )}
                {data.lonnstype === "avtale" && (
                    <Box background="warning-soft" padding="space-16" borderRadius="8">
                        <BodyShort>
                            «Etter avtale» gir søkeren lite informasjon. Et realistisk spenn kan gi bedre
                            forventningsavklaring og flere relevante søkere.
                        </BodyShort>
                    </Box>
                )}
            </VStack>
        );
    }

    if (fokus === "utvelgelse") {
        return <UtvelgelseSkjema data={data} updateField={updateField} />;
    }

    return (
        <VStack gap="space-20">
            <Heading level="2" size="large">
                Gjør det lett å søke
            </Heading>
            <RadioGroup
                legend="Hvordan skal kandidaten søke?"
                value={data.soknadstype}
                onChange={(value) => updateField("soknadstype", value)}
            >
                <Radio value="superrask">Superrask søknad på arbeidsplassen.no</Radio>
                <Radio value="epost">Motta søknader på e-post</Radio>
                <Radio value="ekstern">Send jobbsøkere til ekstern søknadsside</Radio>
            </RadioGroup>
            {data.soknadstype === "superrask" && (
                <InfoCard data-color="success" size="small">
                    <InfoCard.Header>
                        <InfoCard.Title>Søknadene samles i Arbeidsplassen</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        <List size="small">
                            <List.Item>Jobbsøkere søker direkte på arbeidsplassen.no.</List.Item>
                            <List.Item>Dere vurderer og følger opp søknadene i Arbeidsplassen.</List.Item>
                            <List.Item>E-post brukes bare til varsel når en ny søknad kommer inn.</List.Item>
                        </List>
                    </InfoCard.Content>
                </InfoCard>
            )}
            {data.soknadstype === "superrask" && (
                <TextField
                    label="E-post for varsel om nye søknader"
                    type="email"
                    description="Søknaden sendes ikke til denne adressen."
                    value={data.varslingEpost}
                    onChange={(event) => updateField("varslingEpost", event.target.value)}
                />
            )}
            {data.soknadstype === "epost" && (
                <InfoCard data-color="info" size="small">
                    <InfoCard.Header>
                        <InfoCard.Title>Søknaden sendes til innboksen deres</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        Kandidaten sender selve søknaden til e-postadressen dere oppgir. Søknaden blir ikke tilgjengelig
                        for utvelgelse i Arbeidsplassen.
                    </InfoCard.Content>
                </InfoCard>
            )}
            {data.soknadstype === "epost" && (
                <TextField
                    label="E-postadresse for søknader"
                    type="email"
                    value={data.soknadEpost}
                    onChange={(event) => updateField("soknadEpost", event.target.value)}
                />
            )}
            {data.soknadstype === "ekstern" && (
                <InfoCard data-color="info" size="small">
                    <InfoCard.Header>
                        <InfoCard.Title>Kandidaten sendes til deres løsning</InfoCard.Title>
                    </InfoCard.Header>
                    <InfoCard.Content>
                        Annonsen får en lenke til rekrutteringssystemet eller søknadssiden dere bruker.
                    </InfoCard.Content>
                </InfoCard>
            )}
            {data.soknadstype === "ekstern" && (
                <TextField
                    label="Lenke til ekstern søknadsside"
                    type="url"
                    placeholder="https://"
                    value={data.soknadUrl}
                    onChange={(event) => updateField("soknadUrl", event.target.value)}
                />
            )}
            <TextField
                label="Søknadsfrist"
                description="Skriv dato som dd.mm.åååå"
                placeholder="31.10.2026"
                value={data.soknadsfrist}
                onChange={(event) => updateField("soknadsfrist", event.target.value)}
            />
        </VStack>
    );
}
