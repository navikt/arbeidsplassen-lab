import { Buildings3Icon, LocationPinIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Heading, HStack, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Stilling } from "@/app/stillinger/_lib/types";
import Annonsedata from "./Annonsedata";
import Annonseinnhold from "./Annonseinnhold";
import Arbeidsgiverinfo from "./Arbeidsgiverinfo";
import DelAnnonse from "./DelAnnonse";
import Jobbdetaljer from "./Jobbdetaljer";
import Kontaktperson from "./Kontaktperson";
import LignendeAnnonser from "./LignendeAnnonser";
import SokPaJobben from "./SokPaJobben";

type StillingDetaljerProps = {
    stilling: Stilling;
    similarStillinger: Stilling[];
};

export default function StillingDetaljer({ stilling, similarStillinger }: StillingDetaljerProps) {
    const location = [stilling.location.address, stilling.location.city].filter(Boolean).join(", ");

    return (
        <PageBlock as="article" width="text" gutters>
            <Box paddingBlock={{ xs: "space-24 space-48", md: "space-40 space-64" }}>
                <Heading level="1" size="xlarge" spacing className="overflow-wrap-anywhere">
                    {stilling.title}
                </Heading>

                <VStack gap="space-8">
                    <HStack gap="space-12" align="center" wrap={false}>
                        <Buildings3Icon aria-hidden fontSize="1.5rem" />
                        <BodyShort weight="semibold">{stilling.employer.name}</BodyShort>
                    </HStack>
                    <HStack gap="space-12" align="center" wrap={false}>
                        <LocationPinIcon aria-hidden fontSize="1.5rem" />
                        <BodyShort weight="semibold">{location}</BodyShort>
                    </HStack>
                </VStack>

                <Jobbdetaljer stilling={stilling} />
                <SokPaJobben stilling={stilling} />
                <Annonseinnhold sections={stilling.sections} />
                <Kontaktperson contacts={stilling.contactList} />
                <Arbeidsgiverinfo employer={stilling.employer} />
                <DelAnnonse id={stilling.id} />
                <Annonsedata stilling={stilling} />
                <LignendeAnnonser stillinger={similarStillinger} />
            </Box>
        </PageBlock>
    );
}
