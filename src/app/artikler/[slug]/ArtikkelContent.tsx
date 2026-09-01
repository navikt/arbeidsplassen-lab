import { BodyLong, Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Artikkel } from "@/types/artikkel";

type ArtikkelContentProps = {
    artikkel: Artikkel;
};

export default function ArtikkelContent({ artikkel }: ArtikkelContentProps) {
    return (
        <PageBlock as="article" width="text" gutters>
            <VStack gap="space-16" paddingBlock="space-40 space-64">
                <Heading size="xlarge" level="1" spacing>
                    {artikkel.title}
                </Heading>
                <BodyLong size="large" textColor="subtle">
                    {artikkel.description}
                </BodyLong>
                <div
                    className="artikkel-body"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: lokalt mock-innhold uten brukerinput
                    dangerouslySetInnerHTML={{ __html: artikkel.body }}
                />
            </VStack>
        </PageBlock>
    );
}
