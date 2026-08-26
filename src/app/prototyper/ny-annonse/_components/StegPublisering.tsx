import {
    Alert,
    BodyLong,
    BodyShort,
    Checkbox,
    DatePicker,
    Heading,
    List,
    useDatepicker,
    VStack,
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

export default function StegPublisering({ formData, updateField }: Props) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.publiseringsdato ? new Date(formData.publiseringsdato) : undefined,
        onDateChange: (date) => {
            updateField("publiseringsdato", date ? formatDateValue(date) : "");
        },
    });

    return (
        <VStack gap="space-24">
            <Heading level="2" size="large">
                Publisering
            </Heading>

            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    label="Publiseringsdato"
                    description="Velg fra hvilken dato annonsen skal vises."
                />
            </DatePicker>

            <Alert variant="info">
                <Heading level="3" size="small" spacing>
                    Når du publiserer skjer dette:
                </Heading>
                <List>
                    <List.Item>Annonsen blir synlig på arbeidsplassen.no</List.Item>
                    <List.Item>Du kan endre annonsen når som helst etter publisering</List.Item>
                    <List.Item>Annonsen blir automatisk fjernet etter søknadsfristen</List.Item>
                    <List.Item>Du mottar varsel på e-post dersom du har lagt inn dette</List.Item>
                </List>
            </Alert>

            <BodyLong>Les mer om vilkårene for å publisere stillingsannonser på arbeidsplassen.no.</BodyLong>

            <Checkbox checked={formData.godtattVilkar} onChange={(e) => updateField("godtattVilkar", e.target.checked)}>
                Jeg bekrefter at annonsen overholder gjeldende vilkår for publisering på arbeidsplassen.no
            </Checkbox>

            {!formData.godtattVilkar && (
                <BodyShort textColor="subtle">Du må godta vilkårene før du kan publisere.</BodyShort>
            )}
        </VStack>
    );
}
