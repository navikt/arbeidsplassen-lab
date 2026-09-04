import { BodyLong, Heading, LinkCard, VStack } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prototyper",
    description: "Oversikt over tilgjengelige prototyper",
};

export default function PrototyperPage() {
    return (
        <PageBlock width="2xl" gutters>
            <VStack gap="space-24" paddingBlock="space-40 space-48">
                <div>
                    <Heading size="xlarge" level="1" spacing>
                        Prototyper
                    </Heading>
                    <BodyLong>
                        Her finner du prototyper og konsepter under utvikling. Hver prototype har sin egen URL og kan
                        deles for tilbakemelding og brukertesting.
                    </BodyLong>
                </div>

                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/prototyper/eksempel">Eksempelprototype</LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        En enkel eksempelprototype som viser anbefalt struktur for nye konsepter.
                    </LinkCardDescription>
                </LinkCard>

                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/prototyper/bedriftsprofil">Bedriftsprofilverkstedet</LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        Bygg en tydelig bedriftsprofil med kuraterte profilvalg, aktivitetsmerker og levende
                        forhåndsvisning for jobbsøkere.
                    </LinkCardDescription>
                </LinkCard>

                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/prototyper/ny-annonse">Ny stillingsannonse</LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        Produksjonslik stillingsregistrering med lokal innlogging, fem steg, forhåndsvisning og
                        annonseoversikt.
                    </LinkCardDescription>
                </LinkCard>

                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/prototyper/stillingsregistrering-2">
                            Stillingsregistrering 2.0
                        </LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        Ny arbeidsflate for stillingsregistrering med live forhåndsvisning, kontekstuelle tips,
                        lønnsmodul og kvalifikasjoner med prioritering (må ha / bør ha).
                    </LinkCardDescription>
                </LinkCard>

                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/prototyper/stillingsregistrering-3">
                            Stillingsregistrering 3.0 — Guidet
                        </LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        Guidet stillingsregistrering med en assistent som leder arbeidsgiver gjennom prosessen
                        steg-for-steg. Kort-basert layout med fremdriftsindikator og oppsummering med ExpansionCards.
                    </LinkCardDescription>
                </LinkCard>

                <LinkCard>
                    <LinkCardTitle>
                        <LinkCardAnchor href="/prototyper/stillingsregistrering-4">
                            Stillingsregistrering 4.0 — Annonseverkstedet
                        </LinkCardAnchor>
                    </LinkCardTitle>
                    <LinkCardDescription>
                        Adaptivt skriveverksted med rekrutteringsmål, kontekstuell skrivehjelp, tekststartere,
                        søkerblikk og en forklarbar kvalitetssjekk.
                    </LinkCardDescription>
                </LinkCard>
            </VStack>
        </PageBlock>
    );
}
