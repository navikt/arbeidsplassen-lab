import { BodyLong, BodyShort, Box, Chips, Heading, HStack, ProgressBar, VStack } from "@navikt/ds-react";
import type { Rekrutteringsmal } from "../_lib/types";

type Props = {
    mal: Rekrutteringsmal;
    onMalChange: (mal: Rekrutteringsmal) => void;
    kvalitetspoeng: number;
};

const malvalg: Array<{ id: Rekrutteringsmal; label: string }> = [
    { id: "relevante", label: "Få mer relevante søkere" },
    { id: "flere", label: "Få flere søkere" },
    { id: "raskt", label: "Ansette raskere" },
];

export default function VerkstedTopp({ mal, onMalChange, kvalitetspoeng }: Props) {
    return (
        <Box background="accent-soft" borderRadius="12" padding={{ xs: "space-16", md: "space-24" }}>
            <HStack gap="space-24" justify="space-between" align="end">
                <VStack gap="space-12">
                    <div>
                        <Heading level="1" size="xlarge" spacing>
                            Annonseverkstedet
                        </Heading>
                        <BodyLong>
                            Skriv en annonse som hjelper de riktige kandidatene å forstå jobben, se muligheten og velge
                            dere.
                        </BodyLong>
                    </div>
                    <VStack gap="space-8">
                        <BodyShort weight="semibold">Hva er viktigst i denne rekrutteringen?</BodyShort>
                        <Chips>
                            {malvalg.map((valg) => (
                                <Chips.Toggle
                                    key={valg.id}
                                    selected={mal === valg.id}
                                    onClick={() => onMalChange(valg.id)}
                                >
                                    {valg.label}
                                </Chips.Toggle>
                            ))}
                        </Chips>
                    </VStack>
                </VStack>

                <Box background="default" borderRadius="8" padding="space-16" width={{ xs: "100%", md: "14rem" }}>
                    <VStack gap="space-8">
                        <HStack justify="space-between">
                            <BodyShort id="verksted-kvalitet" weight="semibold">
                                Annonsekvalitet
                            </BodyShort>
                            <BodyShort weight="semibold">{kvalitetspoeng}/100</BodyShort>
                        </HStack>
                        <ProgressBar
                            value={kvalitetspoeng}
                            valueMax={100}
                            size="medium"
                            aria-labelledby="verksted-kvalitet"
                            data-color={kvalitetspoeng >= 75 ? "success" : "accent"}
                        />
                        <BodyShort size="small" textColor="subtle">
                            Poengene viser hvilke opplysninger som gjør annonsen nyttig for søkeren.
                        </BodyShort>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
}
