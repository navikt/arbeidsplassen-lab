import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { FiguresGivingHighFive, FiguresSideBySide } from "@navikt/arbeidsplassen-react";
import { BodyLong, Button, Heading, HGrid, VStack } from "@navikt/ds-react";
import type { ComponentType } from "react";
import type { LandingHeroData, LandingIllustration } from "@/mock/landingPages";
import styles from "./LandingPages.module.css";

type IllustrationProps = {
    ariaHidden?: boolean;
    className?: string;
    title?: string;
};

const heroIllustrations: Partial<Record<LandingIllustration, ComponentType<IllustrationProps>>> = {
    "figures-high-five": FiguresGivingHighFive,
    "figures-side-by-side": FiguresSideBySide,
};

type LandingHeroProps = {
    hero: LandingHeroData;
};

export default function LandingHero({ hero }: LandingHeroProps) {
    const Illustration = heroIllustrations[hero.illustration];

    if (!Illustration) {
        throw new Error(`Ukjent heroillustrasjon: ${hero.illustration}`);
    }

    return (
        <HGrid
            as="section"
            aria-labelledby={hero.id}
            columns={{ xs: 1, md: "minmax(0, 1.7fr) minmax(16rem, 0.7fr)" }}
            gap={{ xs: "space-32", md: "space-64" }}
            align="center"
        >
            <VStack gap="space-24" className={styles.heroCopy}>
                <Heading id={hero.id} size="xlarge" level="1">
                    {hero.title}
                </Heading>
                <BodyLong size="large">{hero.description}</BodyLong>
                <div>
                    <Button
                        variant="primary"
                        as="a"
                        href={hero.ctaHref}
                        icon={hero.ctaIcon === "search" ? <MagnifyingGlassIcon aria-hidden="true" /> : undefined}
                    >
                        {hero.ctaLabel}
                    </Button>
                </div>
            </VStack>
            <Illustration className={styles.heroIllustration} ariaHidden />
        </HGrid>
    );
}
