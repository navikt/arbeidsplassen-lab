"use client";

import { BodyShort, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useState } from "react";

export default function SearchFeedback() {
    const [answered, setAnswered] = useState(false);

    return (
        <VStack gap="space-12" align="center">
            <Box padding={{ xs: "space-16", md: "space-24" }} borderRadius="8" className="bg-brand-peach-subtle">
                <VStack gap="space-8" align="center">
                    <Heading level="2" size="small">
                        Var søkeresultatene relevante?
                    </Heading>
                    {answered ? (
                        <BodyShort role="status">Takk for tilbakemeldingen!</BodyShort>
                    ) : (
                        <HStack gap="space-8">
                            <Button type="button" variant="tertiary" onClick={() => setAnswered(true)}>
                                Ja
                            </Button>
                            <Button type="button" variant="tertiary" onClick={() => setAnswered(true)}>
                                Nei
                            </Button>
                        </HStack>
                    )}
                </VStack>
            </Box>
            <BodyShort textColor="subtle">Tilbakemeldingen brukes bare lokalt i denne visningen.</BodyShort>
        </VStack>
    );
}
