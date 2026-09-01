"use client";

import {
    BodyLong,
    Checkbox,
    DatePicker,
    ErrorMessage,
    Heading,
    Link,
    List,
    useDatepicker,
    VStack,
} from "@navikt/ds-react";
import { formatDateValue } from "../_lib/date";
import type { AdvertFormData, UpdateAdvertField } from "../_lib/types";

type StegPubliseringProps = {
    formData: AdvertFormData;
    updateField: UpdateAdvertField;
    showTermsError: boolean;
};

export default function StegPublisering({ formData, updateField, showTermsError }: StegPubliseringProps) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.publiseringsdato ? new Date(formData.publiseringsdato) : undefined,
        onDateChange: (date) => updateField("publiseringsdato", date ? formatDateValue(date) : ""),
    });

    return (
        <VStack gap="space-32">
            <Heading level="2" size="large">
                Publisering
            </Heading>

            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    label="Når skal annonsen bli synlig for jobbsøkere?"
                    description="Må fylles inn"
                />
            </DatePicker>

            <div>
                <Heading level="3" size="medium" spacing>
                    Hva skjer når du publiserer?
                </Heading>
                <List>
                    <List.Item>
                        Annonsen blir synlig for jobbsøkere i stillingssøket i løpet av noen minutter.
                    </List.Item>
                    <List.Item>Andre rekrutteringsaktører kan hente annonsen via vårt API.</List.Item>
                    <List.Item>
                        Annonsen sendes over til den{" "}
                        <Link href="/artikler/om-arbeidsplassen" target="_blank" rel="noopener noreferrer">
                            Europeiske jobbmobilitetsportalen (EURES)
                        </Link>
                        .
                    </List.Item>
                    <List.Item>Du kan når som helst endre eller avpublisere annonsen din.</List.Item>
                </List>
            </div>

            <VStack gap="space-12">
                <BodyLong>
                    Les og godkjenn{" "}
                    <Link href="/artikler/om-arbeidsplassen" target="_blank" rel="noopener noreferrer">
                        vilkår og retningslinjer for å publisere stillingsannonser på arbeidsplassen.no (åpnes i ny
                        fane)
                    </Link>
                    .
                </BodyLong>
                <Checkbox
                    id="publiseringsvilkar"
                    checked={formData.godtattVilkar}
                    onChange={(event) => updateField("godtattVilkar", event.target.checked)}
                >
                    Jeg har lest og forstått vilkår og retningslinjer
                </Checkbox>
                {showTermsError && !formData.godtattVilkar && (
                    <ErrorMessage>Du må godta vilkårene før du kan publisere annonsen.</ErrorMessage>
                )}
            </VStack>
        </VStack>
    );
}
