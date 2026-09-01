"use client";

import {
    BodyShort,
    Checkbox,
    CheckboxGroup,
    Heading,
    HGrid,
    Radio,
    RadioGroup,
    TextField,
    VStack,
} from "@navikt/ds-react";
import type { AdvertFormData, UpdateAdvertField } from "../_lib/types";
import RichTextField from "./RichTextField";

type StegDinBedriftProps = {
    formData: AdvertFormData;
    updateField: UpdateAdvertField;
};

export default function StegDinBedrift({ formData, updateField }: StegDinBedriftProps) {
    return (
        <VStack gap="space-32">
            <Heading level="2" size="large">
                Om bedriften
            </Heading>

            <TextField
                label="Navn på bedriften"
                description="Må fylles inn"
                value={formData.bedriftsnavn}
                maxLength={200}
                onChange={(event) => updateField("bedriftsnavn", event.target.value)}
            />

            <RichTextField
                id="om-bedriften"
                label="Kort om bedriften"
                description="Må fylles inn"
                value={formData.omBedriften}
                maxLength={1_000}
                onChange={(value) => updateField("omBedriften", value)}
            />

            <RadioGroup
                legend="Sektor"
                description="Må fylles inn"
                value={formData.sektor}
                onChange={(value) => updateField("sektor", value)}
            >
                <Radio value="privat">Privat</Radio>
                <Radio value="offentlig">Offentlig</Radio>
            </RadioGroup>

            <CheckboxGroup
                legend="Legg til nettside og eventuelle sosiale medier"
                description="Valgfritt"
                value={formData.kanaler}
                onChange={(values) => updateField("kanaler", values)}
            >
                <Checkbox value="nettside">Nettside</Checkbox>
                <Checkbox value="linkedin">LinkedIn</Checkbox>
                <Checkbox value="facebook">Facebook</Checkbox>
                <Checkbox value="twitter">X (Twitter)</Checkbox>
            </CheckboxGroup>

            {formData.kanaler.length > 0 && (
                <VStack gap="space-16">
                    {formData.kanaler.includes("nettside") && (
                        <TextField
                            label="Nettside"
                            type="url"
                            value={formData.nettside}
                            onChange={(event) => updateField("nettside", event.target.value)}
                        />
                    )}
                    {formData.kanaler.includes("linkedin") && (
                        <TextField
                            label="LinkedIn"
                            type="url"
                            value={formData.linkedin}
                            onChange={(event) => updateField("linkedin", event.target.value)}
                        />
                    )}
                    {formData.kanaler.includes("facebook") && (
                        <TextField
                            label="Facebook"
                            type="url"
                            value={formData.facebook}
                            onChange={(event) => updateField("facebook", event.target.value)}
                        />
                    )}
                    {formData.kanaler.includes("twitter") && (
                        <TextField
                            label="X (Twitter)"
                            type="url"
                            value={formData.twitter}
                            onChange={(event) => updateField("twitter", event.target.value)}
                        />
                    )}
                </VStack>
            )}

            <VStack gap="space-16">
                <div>
                    <Heading level="3" size="medium">
                        Kontaktperson
                    </Heading>
                    <BodyShort>
                        Legg til en valgfri kontaktperson. Bruk bare oppdiktede testdata i Arbeidsplassen Lab.
                    </BodyShort>
                </div>
                <HGrid columns={{ xs: 1, sm: 2 }} gap="space-16">
                    <TextField
                        label="Navn på kontaktperson"
                        description="Valgfritt"
                        autoComplete="off"
                        value={formData.kontaktNavn}
                        onChange={(event) => updateField("kontaktNavn", event.target.value)}
                    />
                    <TextField
                        label="E-postadresse til kontaktperson"
                        description="Valgfritt"
                        type="email"
                        autoComplete="off"
                        value={formData.kontaktEpost}
                        onChange={(event) => updateField("kontaktEpost", event.target.value)}
                    />
                    <TextField
                        label="Tittel på kontaktperson"
                        description="Valgfritt. Eksempel: Daglig leder."
                        value={formData.kontaktTittel}
                        onChange={(event) => updateField("kontaktTittel", event.target.value)}
                    />
                    <TextField
                        label="Telefonnummer til kontaktperson"
                        description="Valgfritt"
                        type="tel"
                        autoComplete="off"
                        value={formData.kontaktTelefon}
                        onChange={(event) => updateField("kontaktTelefon", event.target.value)}
                    />
                </HGrid>
            </VStack>
        </VStack>
    );
}
