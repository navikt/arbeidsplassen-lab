import { Box, Chips, HGrid, VStack } from "@navikt/ds-react";
import type { AnnonseData, FokusId, Rekrutteringsmal, Tekstforslag } from "../_lib/types";
import { fokusomrader } from "../_mock/coach";
import FokusSkjema from "./FokusSkjema";
import Skrivehjelp from "./Skrivehjelp";

type Props = {
    fokus: FokusId;
    mal: Rekrutteringsmal;
    data: AnnonseData;
    onFokusChange: (fokus: FokusId) => void;
    updateField: <K extends keyof AnnonseData>(field: K, value: AnnonseData[K]) => void;
    onBrukForslag: (forslag: Tekstforslag) => void;
};

export default function Skriveflate({ fokus, mal, data, onFokusChange, updateField, onBrukForslag }: Props) {
    return (
        <VStack gap="space-24">
            <Chips size="small">
                {fokusomrader.map((omrade) => (
                    <Chips.Toggle
                        key={omrade.id}
                        checkmark={false}
                        selected={fokus === omrade.id}
                        onClick={() => onFokusChange(omrade.id)}
                    >
                        {omrade.kortnavn}
                    </Chips.Toggle>
                ))}
            </Chips>

            <HGrid columns={{ xs: 1, lg: "minmax(0, 1fr) 20rem" }} gap="space-24" align="start">
                <Box
                    background="default"
                    borderColor="neutral-subtle"
                    borderWidth="1"
                    borderRadius="12"
                    padding={{ xs: "space-16", md: "space-24" }}
                >
                    <FokusSkjema fokus={fokus} data={data} updateField={updateField} />
                </Box>
                <Skrivehjelp fokus={fokus} mal={mal} onBrukForslag={onBrukForslag} />
            </HGrid>
        </VStack>
    );
}
