import { Button, DatePicker, Heading, HStack, Select, TextField, useDatepicker, VStack } from "@navikt/ds-react";
import type { StillingFormData } from "./NyStillingFlyt";

type StegPraktiskProps = {
    formData: StillingFormData;
    updateField: (field: keyof StillingFormData, value: string) => void;
    onNext: () => void;
    onBack: () => void;
};

const formatDateValue = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return localDate.toISOString().slice(0, 10);
};

export default function StegPraktisk({ formData, updateField, onNext, onBack }: StegPraktiskProps) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.soknadsfrist ? new Date(formData.soknadsfrist) : undefined,
        onDateChange: (date) => {
            updateField("soknadsfrist", date ? formatDateValue(date) : "");
        },
    });

    return (
        <VStack gap="space-24">
            <Heading size="medium" level="2">
                Praktiske opplysninger
            </Heading>

            <TextField
                label="Arbeidssted"
                description="By eller kommune"
                value={formData.sted}
                onChange={(e) => updateField("sted", e.target.value)}
            />

            <Select label="Omfang" value={formData.omfang} onChange={(e) => updateField("omfang", e.target.value)}>
                <option value="Heltid">Heltid</option>
                <option value="Deltid">Deltid</option>
            </Select>

            <Select
                label="Ansettelsesform"
                value={formData.ansettelsesform}
                onChange={(e) => updateField("ansettelsesform", e.target.value)}
            >
                <option value="Fast">Fast</option>
                <option value="Vikariat">Vikariat</option>
                <option value="Engasjement">Engasjement</option>
            </Select>

            <DatePicker {...datepickerProps}>
                <DatePicker.Input {...inputProps} label="Søknadsfrist" />
            </DatePicker>

            <HStack gap="space-16">
                <Button variant="secondary" onClick={onBack}>
                    Tilbake
                </Button>
                <Button variant="primary" onClick={onNext}>
                    Neste: Forhåndsvisning
                </Button>
            </HStack>
        </VStack>
    );
}
