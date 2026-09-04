import { HGrid, Textarea, TextField, VStack } from "@navikt/ds-react";
import type { EmployerProfile, UpdateEmployerProfileField } from "../_lib/types";

type ArbeidsgiverlofteSkjemaProps = {
    profile: EmployerProfile;
    updateField: UpdateEmployerProfileField;
    updateHighlight: (index: number, value: string) => void;
};

const highlightFields = [
    { id: "forste", label: "Kjennetegn 1" },
    { id: "andre", label: "Kjennetegn 2" },
    { id: "tredje", label: "Kjennetegn 3" },
] as const;

export default function ArbeidsgiverlofteSkjema({
    profile,
    updateField,
    updateHighlight,
}: ArbeidsgiverlofteSkjemaProps) {
    return (
        <VStack gap="space-20">
            <Textarea
                label="Hva får en ny kollega hos dere?"
                description="Beskriv påvirkning, læring eller fellesskap fremfor generelle superlativer."
                value={profile.employerPromise}
                maxLength={400}
                minRows={4}
                resize="vertical"
                onChange={(event) => updateField("employerPromise", event.target.value.slice(0, 400))}
            />
            <HGrid columns={{ xs: 1, md: 3 }} gap="space-16">
                {highlightFields.map((field, index) => (
                    <TextField
                        key={field.id}
                        label={field.label}
                        description={index === 2 ? "Legg til dette for å fullføre profilen." : undefined}
                        value={profile.highlights[index] ?? ""}
                        maxLength={120}
                        onChange={(event) => updateHighlight(index, event.target.value.slice(0, 120))}
                    />
                ))}
            </HGrid>
        </VStack>
    );
}
