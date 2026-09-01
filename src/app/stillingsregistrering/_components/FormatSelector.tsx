"use client";

import { HGrid, Radio, RadioGroup } from "@navikt/ds-react";
import type { AdvertFormData } from "../_lib/types";
import styles from "./FormatSelector.module.css";

type FormatSelectorProps = {
    value: AdvertFormData["annonseformat"];
    onChange: (value: AdvertFormData["annonseformat"]) => void;
};

export default function FormatSelector({ value, onChange }: FormatSelectorProps) {
    const handleChange = (nextValue: string) => {
        if (nextValue === "strukturert" || nextValue === "ustrukturert") {
            onChange(nextValue);
        }
    };

    return (
        <RadioGroup legend="Format på annonse" value={value} onChange={handleChange}>
            <HGrid columns={{ xs: 1, sm: 2 }} gap="space-12">
                <div>
                    <div className={styles.structured} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>
                    <Radio value="strukturert">Strukturert annonse</Radio>
                </div>
                <div>
                    <div className={styles.unstructured} aria-hidden="true">
                        <span />
                    </div>
                    <Radio value="ustrukturert">Ikke strukturert annonse</Radio>
                </div>
            </HGrid>
        </RadioGroup>
    );
}
