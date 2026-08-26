"use client";

import { Box, Button, HGrid, HStack, Tabs, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useState } from "react";
import { getKvalitetspoeng, getKvalitetssjekker } from "../_lib/quality";
import { createScreeningSporsmal } from "../_lib/selection";
import type { AnnonseData, FokusId, Modus, Rekrutteringsmal, Tekstforslag } from "../_lib/types";
import Kvalitetspanel from "./Kvalitetspanel";
import Skriveflate from "./Skriveflate";
import Sokerblikk from "./Sokerblikk";
import VerkstedTopp from "./VerkstedTopp";

const initialData: AnnonseData = {
    stillingstittel: "",
    bedriftsnavn: "",
    arbeidssted: "",
    ansettelsesform: "",
    omfang: "",
    pitch: "",
    arbeidsoppgaver: "",
    tilbud: "",
    kvalifikasjoner: [],
    screeningSporsmal: [createScreeningSporsmal("screening-standard")],
    lonnstype: "",
    fastlonn: "",
    lonnFra: "",
    lonnTil: "",
    soknadstype: "superrask",
    beOmCv: false,
    beOmBosted: false,
    varslingEpost: "",
    soknadEpost: "",
    soknadUrl: "",
    soknadsfrist: "",
};

export default function Annonseverksted() {
    const [data, setData] = useState<AnnonseData>(initialData);
    const [mal, setMal] = useState<Rekrutteringsmal>("relevante");
    const [fokus, setFokus] = useState<FokusId>("retning");
    const [modus, setModus] = useState<Modus>("skriv");

    const updateField = <K extends keyof AnnonseData>(field: K, value: AnnonseData[K]) => {
        setData((current) => ({ ...current, [field]: value }));
    };

    const brukForslag = (forslag: Tekstforslag) => {
        setData((current) => ({
            ...current,
            [forslag.field]: current[forslag.field] ? `${current[forslag.field]}\n\n${forslag.text}` : forslag.text,
        }));
    };

    const sjekker = getKvalitetssjekker(data);
    const poeng = getKvalitetspoeng(sjekker);

    const forbedre = (nyttFokus: FokusId) => {
        setFokus(nyttFokus);
        setModus("skriv");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <PageBlock width="2xl" gutters>
            <VStack gap="space-24" paddingBlock="space-24 space-48">
                <VerkstedTopp mal={mal} onMalChange={setMal} kvalitetspoeng={poeng} />

                <Tabs value={modus} onChange={(value) => setModus(value as Modus)} selectionFollowsFocus>
                    <Tabs.List>
                        <Tabs.Tab value="skriv" label="Skriv annonsen" />
                        <Tabs.Tab value="sokerblikk" label="Se med søkerens blikk" />
                        <Tabs.Tab value="kvalitet" label={`Kvalitetssjekk (${poeng}/100)`} />
                    </Tabs.List>

                    <Tabs.Panel value="skriv">
                        <Box paddingBlock="space-24">
                            <Skriveflate
                                fokus={fokus}
                                mal={mal}
                                data={data}
                                onFokusChange={setFokus}
                                updateField={updateField}
                                onBrukForslag={brukForslag}
                            />
                        </Box>
                    </Tabs.Panel>

                    <Tabs.Panel value="sokerblikk">
                        <Box paddingBlock="space-24">
                            <Sokerblikk data={data} />
                        </Box>
                    </Tabs.Panel>

                    <Tabs.Panel value="kvalitet">
                        <Box paddingBlock="space-24">
                            <Kvalitetspanel sjekker={sjekker} poeng={poeng} onForbedre={forbedre} />
                        </Box>
                    </Tabs.Panel>
                </Tabs>

                <HGrid columns={{ xs: 1, md: "1fr auto" }} gap="space-16" align="center">
                    <Box background="neutral-soft" padding="space-16" borderRadius="8">
                        Prototypen lagrer alt lokalt i nettleseren og sender ingen annonsetekst noe sted.
                    </Box>
                    <HStack gap="space-8" justify="end">
                        <Button variant="secondary">Lagre utkast</Button>
                        <Button onClick={() => setModus("kvalitet")}>Gå til kvalitetssjekk</Button>
                    </HStack>
                </HGrid>
            </VStack>
        </PageBlock>
    );
}
