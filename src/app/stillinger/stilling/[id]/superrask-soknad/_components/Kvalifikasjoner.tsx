import { BodyLong, Checkbox, CheckboxGroup, Heading, VStack } from "@navikt/ds-react";
import type { Qualification } from "@/app/stillinger/_lib/types";

export default function Kvalifikasjoner({ qualifications }: { qualifications: Qualification[] }) {
    if (qualifications.length === 0) {
        return null;
    }

    return (
        <VStack as="section" gap="space-16">
            <div>
                <Heading level="2" size="medium" spacing>
                    Bedriftens ønskede kvalifikasjoner
                </Heading>
                <BodyLong>
                    Husk at du kan være rett person for jobben selv om du ikke treffer på alle kvalifikasjoner.
                </BodyLong>
            </div>
            <CheckboxGroup legend="Huk av for kvalifikasjonene du oppfyller">
                {qualifications.map((qualification) => (
                    <Checkbox key={qualification.id} name="qualification" value={qualification.id}>
                        {qualification.label}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </VStack>
    );
}
