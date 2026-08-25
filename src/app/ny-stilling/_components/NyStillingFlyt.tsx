"use client";

import { Heading, Stepper, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useState } from "react";
import StegForhandsvisning from "./StegForhandsvisning";
import StegOmStillingen from "./StegOmStillingen";
import StegPraktisk from "./StegPraktisk";

export type StillingFormData = {
    tittel: string;
    beskrivelse: string;
    arbeidsgiver: string;
    sted: string;
    omfang: string;
    ansettelsesform: string;
    soknadsfrist: string;
};

const initialFormData: StillingFormData = {
    tittel: "",
    beskrivelse: "",
    arbeidsgiver: "",
    sted: "",
    omfang: "Heltid",
    ansettelsesform: "Fast",
    soknadsfrist: "",
};

export default function NyStillingFlyt() {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState<StillingFormData>(initialFormData);

    const updateField = (field: keyof StillingFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <PageBlock width="text" gutters>
            <VStack gap="space-24" paddingBlock="space-24 space-48">
                <Heading size="xlarge" level="1">
                    Ny stillingsannonse
                </Heading>

                <Stepper activeStep={activeStep} onStepChange={setActiveStep} orientation="horizontal">
                    <Stepper.Step completed={activeStep > 1}>Om stillingen</Stepper.Step>
                    <Stepper.Step completed={activeStep > 2}>Praktiske opplysninger</Stepper.Step>
                    <Stepper.Step>Forhåndsvisning</Stepper.Step>
                </Stepper>

                {activeStep === 1 && (
                    <StegOmStillingen formData={formData} updateField={updateField} onNext={() => setActiveStep(2)} />
                )}
                {activeStep === 2 && (
                    <StegPraktisk
                        formData={formData}
                        updateField={updateField}
                        onNext={() => setActiveStep(3)}
                        onBack={() => setActiveStep(1)}
                    />
                )}
                {activeStep === 3 && <StegForhandsvisning formData={formData} onBack={() => setActiveStep(2)} />}
            </VStack>
        </PageBlock>
    );
}
