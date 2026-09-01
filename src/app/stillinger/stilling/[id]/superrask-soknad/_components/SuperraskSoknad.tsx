import { BodyShort, Box } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Stilling, SuperraskApplicationForm } from "@/app/stillinger/_lib/types";
import Soknadsskjema from "./Soknadsskjema";

type SuperraskSoknadProps = {
    stilling: Stilling;
    applicationForm: SuperraskApplicationForm;
};

export default function SuperraskSoknad({ stilling, applicationForm }: SuperraskSoknadProps) {
    return (
        <>
            <Box paddingBlock="space-16" className="bg-brand-green-subtle">
                <PageBlock width="lg" gutters>
                    <BodyShort weight="semibold">{stilling.employer.name}</BodyShort>
                    <BodyShort>{stilling.title}</BodyShort>
                </PageBlock>
            </Box>
            <PageBlock width="md" gutters>
                <Soknadsskjema stilling={stilling} applicationForm={applicationForm} />
            </PageBlock>
        </>
    );
}
