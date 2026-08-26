"use client";

import {
    BodyShort,
    Box,
    Button,
    Chips,
    Heading,
    HStack,
    ReadMore,
    Select,
    Switch,
    TextField,
    VStack,
} from "@navikt/ds-react";
import { useState } from "react";
import {
    addKvalifikasjon,
    createScreeningSporsmal,
    removeScreeningSporsmal,
    screeningAlternativer,
} from "../_lib/selection";
import type { AnnonseData, ScreeningValg } from "../_lib/types";

type Props = {
    data: AnnonseData;
    updateField: <K extends keyof AnnonseData>(field: K, value: AnnonseData[K]) => void;
};

export default function UtvelgelseSkjema({ data, updateField }: Props) {
    const [nyKvalifikasjon, setNyKvalifikasjon] = useState("");
    const [kvalifikasjonError, setKvalifikasjonError] = useState("");

    const leggTilKvalifikasjon = () => {
        const trimmed = nyKvalifikasjon.trim();
        if (!trimmed) {
            setKvalifikasjonError("Skriv en kvalifikasjon før du legger den til.");
            return;
        }
        if (
            data.kvalifikasjoner.some(
                (kvalifikasjon) =>
                    kvalifikasjon.label.toLocaleLowerCase("nb-NO") === trimmed.toLocaleLowerCase("nb-NO"),
            )
        ) {
            setKvalifikasjonError("Denne kvalifikasjonen er allerede lagt til.");
            return;
        }

        updateField("kvalifikasjoner", addKvalifikasjon(data.kvalifikasjoner, crypto.randomUUID(), trimmed));
        setNyKvalifikasjon("");
        setKvalifikasjonError("");
    };

    return (
        <VStack gap="space-32">
            <div>
                <Heading level="2" size="large" spacing>
                    Planlegg utvelgelsen
                </Heading>
                <BodyShort>
                    Kvalifikasjonene og spørsmålene er uavhengige av søknadskanalen. Bruk dem som et felles grunnlag når
                    dere vurderer kandidatene.
                </BodyShort>
            </div>

            <VStack gap="space-16">
                <div>
                    <Heading level="3" size="medium" spacing>
                        Kvalifikasjoner
                    </Heading>
                    <BodyShort size="small">
                        Kandidaten kan oppgi hvilke kvalifikasjoner hen oppfyller. Legg til én om gangen.
                    </BodyShort>
                </div>
                <ReadMore header="Eksempler på gode kvalifikasjoner">
                    Må ha førerkort klasse B, relevant utdanning innen landbruk, erfaring fra salg eller
                    kundebehandling, eller kunne jobbe fleksible arbeidstider.
                </ReadMore>
                <HStack gap="space-12" align="end">
                    <TextField
                        label="Ny kvalifikasjon"
                        description="Eksempel: Må ha truckførerbevis"
                        value={nyKvalifikasjon}
                        error={kvalifikasjonError}
                        onChange={(event) => {
                            setNyKvalifikasjon(event.target.value);
                            setKvalifikasjonError("");
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                leggTilKvalifikasjon();
                            }
                        }}
                    />
                    <Button variant="secondary" onClick={leggTilKvalifikasjon}>
                        Legg til
                    </Button>
                </HStack>
                {data.kvalifikasjoner.length > 0 ? (
                    <Chips>
                        {data.kvalifikasjoner.map((kvalifikasjon) => (
                            <Chips.Removable
                                key={kvalifikasjon.id}
                                onClick={() =>
                                    updateField(
                                        "kvalifikasjoner",
                                        data.kvalifikasjoner.filter((item) => item.id !== kvalifikasjon.id),
                                    )
                                }
                            >
                                {kvalifikasjon.label}
                            </Chips.Removable>
                        ))}
                    </Chips>
                ) : (
                    <Box background="neutral-soft" borderRadius="8" padding="space-16">
                        <BodyShort size="small">Ingen kvalifikasjoner er lagt til ennå.</BodyShort>
                    </Box>
                )}
            </VStack>

            <VStack gap="space-16">
                <div>
                    <Heading level="3" size="medium" spacing>
                        Screeningspørsmål
                    </Heading>
                    <BodyShort size="small">
                        Standardspørsmålet er lagt inn automatisk. Dere kan bytte det eller legge til flere, men
                        søknaden må alltid inneholde minst ett spørsmål.
                    </BodyShort>
                </div>

                {data.screeningSporsmal.map((sporsmal, index) => (
                    <Box key={sporsmal.id} background="neutral-soft" borderRadius="8" padding="space-16">
                        <VStack gap="space-12">
                            <Select
                                label={`Spørsmål ${index + 1}`}
                                value={sporsmal.valg}
                                onChange={(event) => {
                                    const valg = event.target.value as ScreeningValg;
                                    updateField(
                                        "screeningSporsmal",
                                        data.screeningSporsmal.map((item) =>
                                            item.id === sporsmal.id ? { ...item, valg } : item,
                                        ),
                                    );
                                }}
                            >
                                {screeningAlternativer.map((alternativ) => (
                                    <option key={alternativ.value} value={alternativ.value}>
                                        {alternativ.label}
                                    </option>
                                ))}
                            </Select>
                            {sporsmal.valg === "eget" && (
                                <TextField
                                    label="Eget spørsmål"
                                    value={sporsmal.egenTekst}
                                    error={!sporsmal.egenTekst.trim() ? "Skriv inn spørsmålet." : undefined}
                                    onChange={(event) =>
                                        updateField(
                                            "screeningSporsmal",
                                            data.screeningSporsmal.map((item) =>
                                                item.id === sporsmal.id
                                                    ? { ...item, egenTekst: event.target.value }
                                                    : item,
                                            ),
                                        )
                                    }
                                />
                            )}
                            <Button
                                variant="tertiary"
                                data-color="danger"
                                size="small"
                                disabled={data.screeningSporsmal.length === 1}
                                onClick={() =>
                                    updateField(
                                        "screeningSporsmal",
                                        removeScreeningSporsmal(data.screeningSporsmal, sporsmal.id),
                                    )
                                }
                            >
                                Fjern spørsmål {index + 1}
                            </Button>
                        </VStack>
                    </Box>
                ))}

                <HStack gap="space-12" align="center">
                    <Button
                        variant="secondary"
                        size="small"
                        onClick={() =>
                            updateField("screeningSporsmal", [
                                ...data.screeningSporsmal,
                                createScreeningSporsmal(crypto.randomUUID(), "motivasjon"),
                            ])
                        }
                    >
                        Legg til spørsmål
                    </Button>
                    <BodyShort size="small" textColor="subtle">
                        Minst ett spørsmål er obligatorisk.
                    </BodyShort>
                </HStack>
            </VStack>

            <VStack gap="space-12">
                <Heading level="3" size="medium">
                    Andre opplysninger
                </Heading>
                <Switch checked={data.beOmCv} onChange={(event) => updateField("beOmCv", event.target.checked)}>
                    Be kandidaten legge ved CV
                </Switch>
                <Switch checked={data.beOmBosted} onChange={(event) => updateField("beOmBosted", event.target.checked)}>
                    Be kandidaten oppgi bosted eller kommune
                </Switch>
            </VStack>
        </VStack>
    );
}
