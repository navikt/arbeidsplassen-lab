import { HGrid, Textarea, TextField, VStack } from "@navikt/ds-react";
import type { EmployerProfile, UpdateEmployerProfileField } from "../_lib/types";

type GrunnprofilSkjemaProps = {
    profile: EmployerProfile;
    updateField: UpdateEmployerProfileField;
};

export default function GrunnprofilSkjema({ profile, updateField }: GrunnprofilSkjemaProps) {
    return (
        <VStack gap="space-20">
            <HGrid columns={{ xs: 1, sm: 2 }} gap="space-16">
                <TextField
                    label="Bedriftsnavn"
                    description="Hentes fra den registrerte virksomheten."
                    value={profile.name}
                    readOnly
                />
                <TextField
                    label="Kort slagord"
                    description="Fortell hva dere står for med én setning."
                    value={profile.tagline}
                    maxLength={90}
                    onChange={(event) => updateField("tagline", event.target.value.slice(0, 90))}
                />
            </HGrid>
            <Textarea
                label="Om bedriften"
                description="Skriv for en jobbsøker som møter dere for første gang."
                value={profile.about}
                maxLength={700}
                minRows={5}
                resize="vertical"
                onChange={(event) => updateField("about", event.target.value.slice(0, 700))}
            />
        </VStack>
    );
}
