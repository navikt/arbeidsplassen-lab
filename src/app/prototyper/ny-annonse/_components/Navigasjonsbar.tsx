"use client";

import { FormProgress } from "@navikt/ds-react";

type NavigasjonsbarProps = {
    currentStep: number;
    totalSteps: number;
    onStepChange: (step: number) => void;
};

const STEP_NAMES = ["Praktisk informasjon", "Om stillingen", "Om bedriften", "Hvordan motta søknader", "Publisering"];

export default function Navigasjonsbar({ currentStep, totalSteps, onStepChange }: NavigasjonsbarProps) {
    return (
        <FormProgress activeStep={currentStep} totalSteps={totalSteps}>
            {STEP_NAMES.map((name, index) => (
                <FormProgress.Step
                    key={name}
                    completed={index + 1 < currentStep}
                    interactive
                    onClick={() => onStepChange(index + 1)}
                >
                    {name}
                </FormProgress.Step>
            ))}
        </FormProgress>
    );
}
