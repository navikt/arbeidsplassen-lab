import { HGrid, Radio, RadioGroup, TextField, VStack } from "@navikt/ds-react";
import type { EmployerProfile, UpdateEmployerProfileField } from "@/app/_common/bedriftsprofil/types";
import { workModes } from "@/app/_common/bedriftsprofil/types";
import { getSafeExternalUrl } from "@/app/_common/bedriftsprofil/validation";

type NokkelfaktaSkjemaProps = {
    profile: EmployerProfile;
    updateField: UpdateEmployerProfileField;
};

export default function NokkelfaktaSkjema({ profile, updateField }: NokkelfaktaSkjemaProps) {
    const websiteIsInvalid = profile.website.trim().length > 0 && !getSafeExternalUrl(profile.website);

    return (
        <VStack gap="space-20">
            <HGrid columns={{ xs: 1, sm: 2 }} gap="space-16">
                <TextField
                    label="Hovedsted"
                    value={profile.location}
                    maxLength={120}
                    onChange={(event) => updateField("location", event.target.value.slice(0, 120))}
                />
                <TextField
                    label="Bransje eller fagområde"
                    value={profile.industry}
                    maxLength={120}
                    onChange={(event) => updateField("industry", event.target.value.slice(0, 120))}
                />
                <TextField
                    label="Omtrent hvor mange jobber her?"
                    description="Eksempel: 10–20 ansatte."
                    value={profile.employeeCount}
                    maxLength={80}
                    onChange={(event) => updateField("employeeCount", event.target.value.slice(0, 80))}
                />
                <TextField
                    label="Nettsted"
                    description="Bruk en full adresse som starter med https://."
                    type="url"
                    value={profile.website}
                    maxLength={500}
                    error={websiteIsInvalid ? "Nettadressen må starte med http:// eller https://." : undefined}
                    onChange={(event) => updateField("website", event.target.value.slice(0, 500))}
                />
            </HGrid>
            <RadioGroup
                legend="Vanlig arbeidsform"
                value={profile.workMode}
                onChange={(value) => {
                    const workMode = workModes.find((candidate) => candidate === value);
                    if (workMode) {
                        updateField("workMode", workMode);
                    }
                }}
            >
                {workModes.map((workMode) => (
                    <Radio key={workMode} value={workMode}>
                        {workMode}
                    </Radio>
                ))}
            </RadioGroup>
        </VStack>
    );
}
