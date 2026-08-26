import {
    Alert,
    BodyShort,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    Heading,
    HStack,
    TextField,
    VStack,
    useDatepicker,
} from "@navikt/ds-react";
import type { AnnonseFormData } from "./NyAnnonseFlyt";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

const formatDateValue = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return localDate.toISOString().slice(0, 10);
};

export default function StegSoknad({ formData, updateField }: Props) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.soknadsfrist ? new Date(formData.soknadsfrist) : undefined,
        onDateChange: (date) => {
            updateField("soknadsfrist", date ? formatDateValue(date) : "");
        },
    });

    return (
        <VStack gap="space-24">
            <Heading level="2" size="large">
                Hvordan motta søknader
            </Heading>

            <CheckboxGroup
                legend="Søknadstype"
                description="Velg hvordan du ønsker å motta søknader."
                value={formData.soknadstype}
                onChange={(val) => updateField("soknadstype", val)}
            >
                <Checkbox value="superrask">Superrask søknad via arbeidsplassen.no</Checkbox>
                <Checkbox value="epost">Via e-post</Checkbox>
                <Checkbox value="ekstern">Ekstern søknadslenke</Checkbox>
            </CheckboxGroup>

            {formData.soknadstype.includes("superrask") && (
                <Alert variant="info">
                    Med superrask søknad kan kandidater sende søknad direkte fra nav.no med bare noen klikk.
                </Alert>
            )}

            {formData.soknadstype.includes("epost") && (
                <TextField
                    label="E-post for søknader"
                    description="Må fylles inn"
                    type="email"
                    value={formData.soknadEpost}
                    onChange={(e) => updateField("soknadEpost", e.target.value)}
                />
            )}

            {formData.soknadstype.includes("ekstern") && (
                <TextField
                    label="Lenke til ekstern søknad"
                    description="Må fylles inn"
                    type="url"
                    value={formData.soknadUrl}
                    onChange={(e) => updateField("soknadUrl", e.target.value)}
                    placeholder="https://..."
                />
            )}

            <Heading level="3" size="medium">
                Kvalifikasjoner
            </Heading>
            <BodyShort>
                Legg til kvalifikasjoner som kandidaten bør ha. Disse brukes til matching og superrask søknad.
            </BodyShort>

            <VStack gap="space-8">
                {formData.kvalifikasjoner.map((kvalifikasjon, i) => (
                    <HStack key={`kval-${kvalifikasjon}`} gap="space-8" align="end">
                        <TextField
                            label={i === 0 ? "Kvalifikasjon" : undefined}
                            hideLabel={i > 0}
                            value={kvalifikasjon}
                            onChange={(e) => {
                                const updated = [...formData.kvalifikasjoner];
                                updated[i] = e.target.value;
                                updateField("kvalifikasjoner", updated);
                            }}
                        />
                    </HStack>
                ))}
                <BodyShort
                    as="button"
                    onClick={() => updateField("kvalifikasjoner", [...formData.kvalifikasjoner, ""])}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--a-text-action)",
                        textDecoration: "underline",
                        padding: 0,
                    }}
                >
                    + Legg til kvalifikasjon
                </BodyShort>
            </VStack>

            <Heading level="3" size="medium">
                Søknadsfrist
            </Heading>
            <HStack gap="space-16" align="end">
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Søknadsfrist" />
                </DatePicker>
                <Checkbox checked={formData.sokSnarest} onChange={(e) => updateField("sokSnarest", e.target.checked)}>
                    Søk snarest mulig
                </Checkbox>
            </HStack>

            <TextField
                label="E-post for søknadsvarsler"
                description="Valgfritt. Vi sender varsel hit når noen søker."
                type="email"
                value={formData.varslingEpost}
                onChange={(e) => updateField("varslingEpost", e.target.value)}
            />
        </VStack>
    );
}
