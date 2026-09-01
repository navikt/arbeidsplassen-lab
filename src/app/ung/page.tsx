import { BodyLong, Heading, HGrid, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";
import LandingLinkCard from "@/app/_common/landing/LandingLinkCard";
import PageFeedback from "@/app/_common/landing/PageFeedback";
import { youngLanding } from "@/mock/landingPages";

export const metadata: Metadata = {
    title: "Ung",
    description: "Jobber og råd for unge jobbsøkere.",
};

export default function UngPage() {
    return (
        <PageBlock width="xl" gutters>
            <VStack gap={{ xs: "space-40", md: "space-64" }} paddingBlock={{ xs: "space-32", md: "space-48" }}>
                <VStack as="section" aria-labelledby={youngLanding.intro.id} gap="space-16">
                    <Heading id={youngLanding.intro.id} level="1" size="large">
                        {youngLanding.intro.title}
                    </Heading>
                    <BodyLong size="large">{youngLanding.intro.description}</BodyLong>
                </VStack>

                <HGrid as="section" aria-label="Finn jobber for unge" columns={{ xs: 1, md: 2 }} gap="space-24">
                    {youngLanding.quickLinks.map((card) => (
                        <LandingLinkCard key={card.title} card={card} layout="compact" />
                    ))}
                </HGrid>

                <section aria-label="Superrask søknad">
                    <LandingLinkCard card={youngLanding.superraskHighlight} layout="horizontal" />
                </section>

                <HGrid
                    as="section"
                    aria-label="Råd til unge jobbsøkere"
                    columns={{ xs: 1, sm: 2, lg: 3 }}
                    gap="space-24"
                >
                    {youngLanding.editorialCards.map((card) => (
                        <LandingLinkCard key={card.title} card={card} />
                    ))}
                </HGrid>

                <PageFeedback
                    prompt="Vil du gi oss innspill til hva siden skal inneholde?"
                    linkLabel="Skriv en kort tilbakemelding"
                />
            </VStack>
        </PageBlock>
    );
}
