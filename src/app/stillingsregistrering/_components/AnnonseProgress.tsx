"use client";

import { FormProgress } from "@navikt/ds-react";
import Link from "next/link";

type AnnonseProgressProps = {
    advertId: string;
    currentStep: number;
};

const steps = ["Praktisk informasjon", "Om stillingen", "Om bedriften", "Hvordan motta søknader", "Publisering"];

export default function AnnonseProgress({ advertId, currentStep }: AnnonseProgressProps) {
    return (
        <FormProgress activeStep={currentStep} totalSteps={steps.length}>
            {steps.map((step, index) => (
                <FormProgress.Step
                    key={step}
                    as={Link}
                    href={`/stillingsregistrering/rediger/${advertId}/steg/${index + 1}`}
                    completed={index + 1 < currentStep}
                >
                    {step}
                </FormProgress.Step>
            ))}
        </FormProgress>
    );
}
