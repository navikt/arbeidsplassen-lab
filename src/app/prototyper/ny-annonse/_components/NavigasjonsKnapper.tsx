import {
    CheckmarkCircleIcon,
    ChevronLeftCircleIcon,
    ChevronRightCircleIcon,
    EyeIcon,
    FloppydiskIcon,
} from "@navikt/aksel-icons";
import { Button, HStack, Label, Stack } from "@navikt/ds-react";

type NavigasjonsKnapperProps = {
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
};

export default function NavigasjonsKnapper({ currentStep, totalSteps, onPrevious, onNext }: NavigasjonsKnapperProps) {
    const isLastStep = currentStep === totalSteps;

    const handlePublish = () => {
        alert("Dette er en prototype — annonsen ble ikke publisert.");
    };

    return (
        <div>
            <Stack
                gap="space-32"
                direction={{ xs: "column", md: "row" }}
                align="center"
                justify={{ md: "space-between" }}
                className="mb-8"
            >
                <Button
                    variant="tertiary"
                    onClick={onPrevious}
                    disabled={currentStep <= 1}
                    icon={<ChevronLeftCircleIcon aria-hidden="true" fontSize="1.5rem" />}
                >
                    Forrige steg
                </Button>

                <Button variant="tertiary" icon={<EyeIcon aria-hidden="true" />} onClick={() => alert("Forhåndsvisning er ikke implementert i prototypen.")}>
                    Forhåndsvis annonsen
                </Button>

                {isLastStep ? (
                    <Button variant="primary" onClick={handlePublish} icon={<CheckmarkCircleIcon aria-hidden="true" />}>
                        Publiser
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        onClick={onNext}
                        icon={<ChevronRightCircleIcon aria-hidden="true" />}
                    >
                        Neste steg
                    </Button>
                )}
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} gap="space-32" justify="center" align="center">
                <Label as="p" textColor="subtle">
                    <HStack as="span" align="center" gap="space-8">
                        <FloppydiskIcon aria-hidden="true" height="1.5em" width="1.5em" />
                        Dine endringer blir lagret underveis
                    </HStack>
                </Label>
                <Button variant="tertiary" onClick={() => alert("Prototype — lagring er ikke implementert.")}>
                    Avslutt og fortsett senere
                </Button>
            </Stack>
        </div>
    );
}
