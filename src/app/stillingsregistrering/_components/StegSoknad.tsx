"use client";

import {
    BodyLong,
    BodyShort,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Chips,
    DatePicker,
    Heading,
    HGrid,
    HStack,
    Link,
    Tag,
    TextField,
    useDatepicker,
    VStack,
} from "@navikt/ds-react";
import { type KeyboardEvent, useState } from "react";
import { formatDateValue } from "../_lib/date";
import { type AdvertFormData, type ApplicationMethod, applicationMethods, type UpdateAdvertField } from "../_lib/types";
import ScreeningQuestions from "./ScreeningQuestions";
import styles from "./StegSoknad.module.css";

type StegSoknadProps = {
    formData: AdvertFormData;
    updateField: UpdateAdvertField;
};

function isApplicationMethod(value: string): value is ApplicationMethod {
    return applicationMethods.some((method) => method === value);
}

export default function StegSoknad({ formData, updateField }: StegSoknadProps) {
    const [qualification, setQualification] = useState("");
    const [qualificationError, setQualificationError] = useState<string>();
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.soknadsfrist ? new Date(formData.soknadsfrist) : undefined,
        onDateChange: (date) => updateField("soknadsfrist", date ? formatDateValue(date) : ""),
    });

    const addQualification = () => {
        const normalizedQualification = qualification.trim();
        if (!normalizedQualification) {
            setQualificationError("Skriv inn en kvalifikasjon før du legger den til.");
            return;
        }
        if (
            formData.kvalifikasjoner.some(
                (item) => item.toLocaleLowerCase("nb-NO") === normalizedQualification.toLocaleLowerCase("nb-NO"),
            )
        ) {
            setQualificationError("Denne kvalifikasjonen er allerede lagt til.");
            return;
        }

        updateField("kvalifikasjoner", [...formData.kvalifikasjoner, normalizedQualification]);
        setQualification("");
        setQualificationError(undefined);
    };

    const handleQualificationKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addQualification();
        }
    };

    return (
        <VStack gap="space-32">
            <Heading level="2" size="large">
                Hvordan motta søknader fra kandidater
            </Heading>

            <CheckboxGroup
                legend="Velg hvordan du ønsker å motta søknader"
                description="Vi anbefaler kun ett valg, men du kan velge flere"
                value={formData.soknadstype}
                onChange={(values) => updateField("soknadstype", values.filter(isApplicationMethod))}
            >
                <Box paddingBlock="space-8 space-20" paddingInline="space-16" className="bg-brand-green-subtle">
                    <Checkbox
                        value="superrask"
                        description="Jobbsøkere søker direkte på arbeidsplassen.no. Du får alle søknadene samlet på ett sted og varsel på e-post når noen søker."
                    >
                        <HStack as="span" gap="space-8" align="center">
                            <span>Superrask søknad</span>
                            <Tag data-color="accent" variant="strong" size="small">
                                Anbefalt
                            </Tag>
                        </HStack>
                    </Checkbox>
                    <Box paddingInline="space-32 space-0">
                        <BodyLong>
                            <Link href="/artikler/om-arbeidsplassen" target="_blank" rel="noopener noreferrer">
                                Les mer om superrask søknad (åpnes i ny fane)
                            </Link>
                        </BodyLong>
                    </Box>
                </Box>
                <Checkbox value="epost" description="Passer hvis dere vil håndtere søknader direkte i innboksen.">
                    E-post
                </Checkbox>
                <Checkbox
                    value="ekstern"
                    description="Passer hvis dere bruker eget rekrutteringssystem eller en ekstern søknadsside."
                >
                    Ekstern lenke
                </Checkbox>
            </CheckboxGroup>

            {formData.soknadstype.includes("superrask") && (
                <VStack gap="space-24">
                    <div>
                        <Heading level="3" size="medium" spacing>
                            Motta søknader med superrask søknad
                        </Heading>
                        <BodyShort>
                            Velg kvalifikasjoner og spørsmål, så jobbsøkere raskt kan vise hvorfor de er rett for
                            jobben.
                        </BodyShort>
                    </div>

                    <VStack gap="space-12">
                        <HGrid columns={{ xs: 1, sm: "minmax(0, 1fr) auto" }} gap="space-12" align="end">
                            <TextField
                                label="Kvalifikasjoner, egenskaper og må-krav for jobben"
                                description="Legg til minst én. Eksempel: Må ha truckførerbevis"
                                value={qualification}
                                error={qualificationError}
                                onKeyDown={handleQualificationKeyDown}
                                onChange={(event) => {
                                    setQualification(event.target.value);
                                    setQualificationError(undefined);
                                }}
                            />
                            <Button type="button" variant="secondary" onClick={addQualification}>
                                Legg til
                            </Button>
                        </HGrid>
                        {formData.kvalifikasjoner.length > 0 && (
                            <Chips>
                                {formData.kvalifikasjoner.map((item) => (
                                    <Chips.Removable
                                        key={item}
                                        onClick={() =>
                                            updateField(
                                                "kvalifikasjoner",
                                                formData.kvalifikasjoner.filter(
                                                    (qualificationItem) => qualificationItem !== item,
                                                ),
                                            )
                                        }
                                    >
                                        {item}
                                    </Chips.Removable>
                                ))}
                            </Chips>
                        )}
                        <details className={styles.details}>
                            <summary>Hvordan spesifisere gode kvalifikasjoner og må-krav?</summary>
                            <BodyShort>
                                Bruk korte og konkrete krav. Unngå krav som ikke er nødvendige for å gjøre jobben.
                            </BodyShort>
                        </details>
                    </VStack>

                    <ScreeningQuestions
                        questions={formData.screeningsporsmal}
                        onChange={(questions) => updateField("screeningsporsmal", questions)}
                    />

                    <TextField
                        label="E-post for søknadsvarsler"
                        description="Må fylles inn. Du får e-post når noen sender inn en søknad."
                        type="email"
                        autoComplete="off"
                        value={formData.varslingEpost}
                        onChange={(event) => updateField("varslingEpost", event.target.value)}
                    />
                </VStack>
            )}

            {formData.soknadstype.includes("epost") && (
                <VStack gap="space-16">
                    <div>
                        <Heading level="3" size="medium" spacing>
                            Motta søknader på e-post
                        </Heading>
                        <BodyShort>
                            E-postadressen vises i annonsen, slik at søkere kan sende deg søknaden direkte.
                        </BodyShort>
                    </div>
                    <TextField
                        label="E-postadresse for søknader"
                        description="Må fylles inn"
                        type="email"
                        autoComplete="off"
                        value={formData.soknadEpost}
                        onChange={(event) => updateField("soknadEpost", event.target.value)}
                    />
                </VStack>
            )}

            {formData.soknadstype.includes("ekstern") && (
                <VStack gap="space-16">
                    <div>
                        <Heading level="3" size="medium" spacing>
                            Motta søknader via ekstern lenke
                        </Heading>
                        <BodyShort>Jobbsøker vil få beskjed i annonsen om å sende søknad via deres portal.</BodyShort>
                    </div>
                    <TextField
                        label="Lenke til søknadssiden"
                        description="Må fylles inn. Eksempel: https://bedrift.no/soknad"
                        type="url"
                        value={formData.soknadUrl}
                        onChange={(event) => updateField("soknadUrl", event.target.value)}
                    />
                </VStack>
            )}

            <HGrid columns={{ xs: 1, sm: "minmax(0, 14rem) 1fr" }} gap="space-16" align="end">
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Søknadsfrist" description="Må fylles inn" />
                </DatePicker>
                <Checkbox
                    checked={formData.sokSnarest}
                    onChange={(event) => updateField("sokSnarest", event.target.checked)}
                >
                    Søk snarest mulig
                </Checkbox>
            </HGrid>

            <Box paddingBlock="space-32 space-0" borderWidth="1 0 0 0" borderColor="neutral-subtle">
                <VStack gap="space-8">
                    <Heading level="3" size="small">
                        Kan dere gi arbeidssøkere som står utenfor arbeidslivet en mulighet til å komme i jobb?
                    </Heading>
                    <BodyShort>
                        Nav samarbeider med bedrifter som vil gi flere en mulighet til å komme i jobb. Nav ønsker flere
                        samarbeidspartnere som vil være med.
                    </BodyShort>
                    <Checkbox
                        checked={formData.rekrutteringshjelp}
                        onChange={(event) => updateField("rekrutteringshjelp", event.target.checked)}
                    >
                        Jeg ønsker å bli kontaktet av mitt lokale Nav-kontor for en uforpliktende prat.
                    </Checkbox>
                </VStack>
            </Box>
        </VStack>
    );
}
