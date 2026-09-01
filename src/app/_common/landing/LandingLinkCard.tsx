import {
    CelebratingFigure,
    FigureWithEnvelope,
    FigureWithMagnifier,
    WavingFigure,
    WorriedFigure,
} from "@navikt/arbeidsplassen-react";
import { LinkCard } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardImage, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import Link from "next/link";
import type { ComponentType } from "react";
import type { LandingCardData, LandingIllustration, LandingTone } from "@/mock/landingPages";
import styles from "./LandingPages.module.css";

type IllustrationProps = {
    ariaHidden?: boolean;
    className?: string;
    title?: string;
};

const illustrations: Partial<Record<LandingIllustration, ComponentType<IllustrationProps>>> = {
    celebrating: CelebratingFigure,
    envelope: FigureWithEnvelope,
    magnifier: FigureWithMagnifier,
    waving: WavingFigure,
    worried: WorriedFigure,
};

const toneClasses: Record<LandingTone, string | undefined> = {
    blue: "arb-link-panel-primary",
    green: "arb-link-panel-secondary",
    peach: "arb-link-panel-tertiary",
    pink: styles.pinkCard,
};

const illustrationToneClasses: Record<LandingTone, string | undefined> = {
    blue: styles.illustrationBlue,
    green: styles.illustrationGreen,
    peach: styles.illustrationPeach,
    pink: styles.illustrationPink,
};

type LandingLinkCardProps = {
    card: LandingCardData;
    headingLevel?: "h2" | "h3";
    layout?: "compact" | "horizontal" | "vertical";
};

export default function LandingLinkCard({ card, headingLevel = "h2", layout = "vertical" }: LandingLinkCardProps) {
    const Illustration = card.illustration ? illustrations[card.illustration] : undefined;
    const layoutClass =
        layout === "horizontal" ? styles.horizontalCard : layout === "compact" ? styles.compactCard : "";

    if (card.illustration && !Illustration) {
        throw new Error(`Ukjent kortillustrasjon: ${card.illustration}`);
    }

    return (
        <LinkCard
            as="article"
            arrowPosition={layout === "horizontal" ? "center" : "baseline"}
            className={[styles.linkCard, toneClasses[card.tone], layoutClass].filter(Boolean).join(" ")}
        >
            {Illustration && (
                <LinkCardImage aspectRatio={layout === "horizontal" ? undefined : "16/9"}>
                    <div
                        className={[styles.illustrationPanel, illustrationToneClasses[card.tone]]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <Illustration className={styles.cardIllustration} ariaHidden />
                    </div>
                </LinkCardImage>
            )}
            <LinkCardTitle as={headingLevel}>
                {card.href.startsWith("/") ? (
                    <LinkCardAnchor asChild>
                        <Link href={card.href}>{card.title}</Link>
                    </LinkCardAnchor>
                ) : (
                    <LinkCardAnchor href={card.href}>{card.title}</LinkCardAnchor>
                )}
            </LinkCardTitle>
            <LinkCardDescription>{card.description}</LinkCardDescription>
        </LinkCard>
    );
}
