import { Heading, HGrid, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import LandingHero from "@/app/_common/landing/LandingHero";
import LandingLinkCard from "@/app/_common/landing/LandingLinkCard";
import PageFeedback from "@/app/_common/landing/PageFeedback";
import PrototypeEntry from "@/app/_common/landing/PrototypeEntry";
import { jobseekerLanding } from "@/mock/landingPages";

export default function Home() {
    return (
        <PageBlock width="xl" gutters>
            <VStack gap={{ xs: "space-40", md: "space-64" }} paddingBlock={{ xs: "space-32", md: "space-48" }}>
                <LandingHero hero={jobseekerLanding.hero} />

                <section aria-label="Jobb for unge">
                    <LandingLinkCard card={jobseekerLanding.youngHighlight} layout="horizontal" />
                </section>

                <HGrid
                    as="section"
                    aria-label="Nyttige artikler for jobbsøkere"
                    columns={{ xs: 1, sm: 2, lg: 3 }}
                    gap="space-24"
                >
                    {jobseekerLanding.editorialCards.map((card) => (
                        <LandingLinkCard key={card.title} card={card} />
                    ))}
                </HGrid>

                <section aria-labelledby="prov-ogsa">
                    <Heading id="prov-ogsa" level="2" size="medium" spacing>
                        Prøv også
                    </Heading>
                    <HGrid columns={{ xs: 1, md: 2 }} gap="space-24">
                        {jobseekerLanding.relatedLinks.map((card) => (
                            <LandingLinkCard key={card.title} card={card} headingLevel="h3" layout="compact" />
                        ))}
                    </HGrid>
                </section>

                <PageFeedback prompt="Hvor fornøyd er du med arbeidsplassen.no?" linkLabel="Svar på undersøkelsen" />

                <PrototypeEntry />
            </VStack>
        </PageBlock>
    );
}
