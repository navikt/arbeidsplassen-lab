import { HGrid, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";
import LandingHero from "@/app/_common/landing/LandingHero";
import LandingLinkCard from "@/app/_common/landing/LandingLinkCard";
import { companyLanding } from "@/mock/landingPages";

export const metadata: Metadata = {
    title: "For bedrifter",
    description: "Lys ut stillinger og finn relevante jobbsøkere.",
};

export default function BedriftPage() {
    return (
        <PageBlock width="xl" gutters>
            <VStack gap={{ xs: "space-40", md: "space-64" }} paddingBlock={{ xs: "space-32", md: "space-48" }}>
                <LandingHero hero={companyLanding.hero} />

                <HGrid as="section" aria-label="Snarveier for bedrifter" columns={{ xs: 1, md: 2 }} gap="space-24">
                    {companyLanding.quickLinks.map((card) => (
                        <LandingLinkCard key={card.title} card={card} layout="compact" />
                    ))}
                </HGrid>

                <HGrid
                    as="section"
                    aria-label="Nyttige artikler for bedrifter"
                    columns={{ xs: 1, sm: 2, lg: 3 }}
                    gap="space-24"
                >
                    {companyLanding.editorialCards.map((card) => (
                        <LandingLinkCard key={card.title} card={card} />
                    ))}
                </HGrid>
            </VStack>
        </PageBlock>
    );
}
