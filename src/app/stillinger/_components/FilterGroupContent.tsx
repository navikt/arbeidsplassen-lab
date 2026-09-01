"use client";

import { Checkbox, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import type { PublishedFilter } from "@/app/stillinger/_lib/types";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";
import { mockFilters } from "@/mock/stillinger/filtre";
import FilterCheckboxGroup from "./FilterCheckboxGroup";

export const filterGroups = [
    { id: "published", label: "Publisert" },
    { id: "location", label: "Sted" },
    { id: "occupation", label: "Yrkeskategori" },
    { id: "education", label: "Utdanning og arbeidserfaring" },
    { id: "driversLicense", label: "Førerkort" },
    { id: "workLanguage", label: "Arbeidsspråk" },
    { id: "extent", label: "Heltid/deltid" },
    { id: "summerJob", label: "Sommerjobb" },
    { id: "superrask", label: "Superrask søknad" },
    { id: "engagementType", label: "Ansettelsesform" },
    { id: "sector", label: "Sektor" },
    { id: "remote", label: "Hjemmekontor" },
] as const;

export type FilterGroupId = (typeof filterGroups)[number]["id"];

function isPublishedFilter(value: string): value is PublishedFilter {
    return value === "all" || value === "today" || value === "last3" || value === "last7";
}

export default function FilterGroupContent({ group }: { group: FilterGroupId }) {
    const { state, setPublished, setBooleanFilter } = useStillingerState();

    switch (group) {
        case "published":
            return (
                <RadioGroup
                    legend="Filtrer etter når annonsen ble publisert"
                    hideLegend
                    value={state.criteria.published}
                    size="small"
                    onChange={(value) => {
                        if (isPublishedFilter(value)) {
                            setPublished(value);
                        }
                    }}
                >
                    {mockFilters.published.map((option) => (
                        <Radio key={option.value} value={option.value}>
                            {option.label} ({option.count})
                        </Radio>
                    ))}
                </RadioGroup>
            );
        case "location":
            return (
                <FilterCheckboxGroup
                    filterKey="locations"
                    legend="Filtrer etter sted"
                    options={mockFilters.locations}
                />
            );
        case "occupation":
            return (
                <FilterCheckboxGroup
                    filterKey="occupations"
                    legend="Filtrer etter yrkeskategori"
                    options={mockFilters.occupations}
                />
            );
        case "education":
            return (
                <VStack gap="space-24">
                    <FilterCheckboxGroup
                        filterKey="education"
                        legend="Filtrer etter utdanning"
                        options={mockFilters.education}
                    />
                    <FilterCheckboxGroup
                        filterKey="experience"
                        legend="Filtrer etter arbeidserfaring"
                        options={mockFilters.experience}
                    />
                </VStack>
            );
        case "driversLicense":
            return (
                <FilterCheckboxGroup
                    filterKey="driversLicense"
                    legend="Filtrer etter førerkort"
                    options={mockFilters.driversLicense}
                />
            );
        case "workLanguage":
            return (
                <FilterCheckboxGroup
                    filterKey="workLanguages"
                    legend="Filtrer etter arbeidsspråk"
                    options={mockFilters.workLanguages}
                />
            );
        case "extent":
            return (
                <FilterCheckboxGroup filterKey="extent" legend="Filtrer etter omfang" options={mockFilters.extent} />
            );
        case "summerJob": {
            const option = mockFilters.summerJob[0];
            return option ? (
                <Checkbox
                    checked={state.criteria.summerJobOnly}
                    onChange={(event) => setBooleanFilter("summerJobOnly", event.target.checked)}
                >
                    {option.label} ({option.count})
                </Checkbox>
            ) : null;
        }
        case "superrask": {
            const option = mockFilters.superrask[0];
            return option ? (
                <Checkbox
                    checked={state.criteria.superraskOnly}
                    onChange={(event) => setBooleanFilter("superraskOnly", event.target.checked)}
                >
                    {option.label} ({option.count})
                </Checkbox>
            ) : null;
        }
        case "engagementType":
            return (
                <FilterCheckboxGroup
                    filterKey="engagementTypes"
                    legend="Filtrer etter ansettelsesform"
                    options={mockFilters.engagementTypes}
                />
            );
        case "sector":
            return (
                <FilterCheckboxGroup filterKey="sectors" legend="Filtrer etter sektor" options={mockFilters.sectors} />
            );
        case "remote":
            return (
                <FilterCheckboxGroup
                    filterKey="remote"
                    legend="Filtrer etter hjemmekontor"
                    options={mockFilters.remote}
                />
            );
    }
}
