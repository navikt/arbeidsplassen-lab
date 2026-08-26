import { Box, Button, Checkbox, DatePicker, Heading, HStack, Switch, useDatepicker, VStack } from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
    onNeste: () => void;
    onForrige: () => void;
};

const formatDateValue = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return localDate.toISOString().slice(0, 10);
};

export default function KortSoknad({ formData, updateField, onNeste, onForrige }: Props) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.soknadsfrist ? new Date(formData.soknadsfrist) : undefined,
        onDateChange: (date) => {
            updateField("soknadsfrist", date ? formatDateValue(date) : "");
        },
    });

    return (
        <Box padding="space-24" borderRadius="8" background="neutral-soft">
            <VStack gap="space-16">
                <Heading size="medium" level="2">
                    Søknad og innstillinger
                </Heading>

                <Switch checked={formData.superrask} onChange={(e) => updateField("superrask", e.target.checked)}>
                    Superrask søknad via arbeidsplassen.no
                </Switch>

                <Switch checked={formData.beOmCv} onChange={(e) => updateField("beOmCv", e.target.checked)}>
                    Be søker om å laste opp CV
                </Switch>

                <Switch checked={formData.beOmBosted} onChange={(e) => updateField("beOmBosted", e.target.checked)}>
                    Be søker oppgi bosted / kommune
                </Switch>

                <HStack gap="space-16" align="end">
                    <DatePicker {...datepickerProps}>
                        <DatePicker.Input {...inputProps} label="Søknadsfrist" />
                    </DatePicker>
                    <Checkbox
                        checked={formData.sokSnarest}
                        onChange={(e) => updateField("sokSnarest", e.target.checked)}
                    >
                        Søk snarest
                    </Checkbox>
                </HStack>

                <HStack justify="space-between">
                    <Button variant="secondary" onClick={onForrige}>
                        ← Forrige
                    </Button>
                    <Button onClick={onNeste}>Neste →</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
