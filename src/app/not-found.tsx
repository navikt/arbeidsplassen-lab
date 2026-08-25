import { Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import Link from "next/link";

export default function NotFound() {
    return (
        <PageBlock width="text" gutters>
            <VStack gap="space-16" paddingBlock="space-40">
                <Heading size="xlarge" level="1">
                    Siden finnes ikke
                </Heading>
                <Link href="/">Gå til forsiden</Link>
            </VStack>
        </PageBlock>
    );
}
