"use client";

import {
    CheckmarkCircleIcon,
    ChevronLeftCircleIcon,
    ChevronRightCircleIcon,
    EyeIcon,
    FloppydiskIcon,
} from "@navikt/aksel-icons";
import { Button, HStack, Label, Stack, VStack } from "@navikt/ds-react";
import Link from "next/link";

type EditorNavigationProps = {
    advertId: string;
    currentStep: number;
    onPublish: () => void;
};

export default function EditorNavigation({ advertId, currentStep, onPublish }: EditorNavigationProps) {
    const previousHref = `/stillingsregistrering/rediger/${advertId}/steg/${currentStep - 1}`;
    const nextHref = `/stillingsregistrering/rediger/${advertId}/steg/${currentStep + 1}`;

    return (
        <VStack gap="space-32">
            <Stack
                gap="space-24"
                direction={{ xs: "column", md: "row" }}
                align="center"
                justify={{ md: "space-between" }}
            >
                {currentStep > 1 ? (
                    <Button
                        as={Link}
                        href={previousHref}
                        variant="tertiary"
                        icon={<ChevronLeftCircleIcon aria-hidden="true" />}
                    >
                        Forrige steg
                    </Button>
                ) : (
                    <Button variant="tertiary" disabled icon={<ChevronLeftCircleIcon aria-hidden="true" />}>
                        Forrige steg
                    </Button>
                )}

                <Button
                    as={Link}
                    href={`/stillingsregistrering/forhandsvis/${advertId}`}
                    variant="tertiary"
                    icon={<EyeIcon aria-hidden="true" />}
                >
                    Forhåndsvis annonsen
                </Button>

                {currentStep === 5 ? (
                    <Button
                        type="button"
                        variant="primary"
                        icon={<CheckmarkCircleIcon aria-hidden="true" />}
                        onClick={onPublish}
                    >
                        Publiser
                    </Button>
                ) : (
                    <Button
                        as={Link}
                        href={nextHref}
                        variant="primary"
                        icon={<ChevronRightCircleIcon aria-hidden="true" />}
                    >
                        Neste steg
                    </Button>
                )}
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} gap="space-32" justify="center" align="center">
                <Label as="p" textColor="subtle">
                    <HStack as="span" align="center" gap="space-8">
                        <FloppydiskIcon aria-hidden="true" />
                        Dine endringer blir lagret underveis
                    </HStack>
                </Label>
                <Button as={Link} href="/stillingsregistrering/stillingsannonser" variant="tertiary">
                    Avslutt og fortsett senere
                </Button>
            </Stack>
        </VStack>
    );
}
