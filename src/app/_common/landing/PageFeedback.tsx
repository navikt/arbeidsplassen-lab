import { BodyShort, Link, VStack } from "@navikt/ds-react";

type PageFeedbackProps = {
    prompt: string;
    linkLabel: string;
};

export default function PageFeedback({ prompt, linkLabel }: PageFeedbackProps) {
    return (
        <VStack as="section" aria-label="Tilbakemelding" gap="space-8" align="center">
            <BodyShort>{prompt}</BodyShort>
            <Link href="mailto:tilbakemelding@example.invalid">{linkLabel}</Link>
        </VStack>
    );
}
