"use client";

import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import type { FilterOption } from "@/app/stillinger/_lib/types";
import { type ArrayFilterKey, useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";

type FilterCheckboxGroupProps = {
    filterKey: ArrayFilterKey;
    legend: string;
    options: FilterOption[];
};

export default function FilterCheckboxGroup({ filterKey, legend, options }: FilterCheckboxGroupProps) {
    const { state, toggleArrayFilter } = useStillingerState();
    const selectedValues = state.criteria[filterKey];

    return (
        <CheckboxGroup legend={legend} hideLegend value={selectedValues} size="small">
            {options.map((option) => (
                <Checkbox
                    key={option.value}
                    value={option.value}
                    onChange={() => toggleArrayFilter(filterKey, option.value)}
                >
                    {option.label} ({option.count})
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
}
