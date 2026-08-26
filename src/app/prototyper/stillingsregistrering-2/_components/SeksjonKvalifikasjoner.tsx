import { BodyShort, Button, Select, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData, Kvalifikasjon } from "../_lib/types";
import styles from "./StillingsregistreringArbeidsflate.module.css";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

export default function SeksjonKvalifikasjoner({ formData, updateField }: Props) {
    const leggTil = () => {
        const ny: Kvalifikasjon = {
            id: crypto.randomUUID(),
            tekst: "",
            prioritet: "bor",
        };
        updateField("kvalifikasjoner", [...formData.kvalifikasjoner, ny]);
    };

    const oppdater = (id: string, felt: Partial<Kvalifikasjon>) => {
        updateField(
            "kvalifikasjoner",
            formData.kvalifikasjoner.map((k) => (k.id === id ? { ...k, ...felt } : k)),
        );
    };

    const fjern = (id: string) => {
        updateField(
            "kvalifikasjoner",
            formData.kvalifikasjoner.filter((k) => k.id !== id),
        );
    };

    return (
        <VStack gap="space-16">
            <BodyShort size="small">
                Legg til kvalifikasjoner og marker om de er et krav (må ha) eller en fordel (bør ha). Kvalifikasjoner
                brukes til matching og superrask søknad.
            </BodyShort>

            {formData.kvalifikasjoner.map((kval) => (
                <div key={kval.id} className={styles.kvalifikasjonRad}>
                    <TextField
                        label="Kvalifikasjon"
                        hideLabel
                        value={kval.tekst}
                        onChange={(e) => oppdater(kval.id, { tekst: e.target.value })}
                        placeholder="F.eks. sertifikat klasse B"
                    />
                    <Select
                        label="Prioritet"
                        hideLabel
                        value={kval.prioritet}
                        onChange={(e) => oppdater(kval.id, { prioritet: e.target.value as "ma" | "bor" })}
                    >
                        <option value="ma">Må ha</option>
                        <option value="bor">Bør ha</option>
                    </Select>
                    <button
                        type="button"
                        className={styles.kvalifikasjonFjern}
                        onClick={() => fjern(kval.id)}
                        aria-label={`Fjern kvalifikasjon: ${kval.tekst || "tom"}`}
                    >
                        ✕
                    </button>
                </div>
            ))}

            <Button variant="tertiary" size="small" onClick={leggTil}>
                + Legg til kvalifikasjon
            </Button>
        </VStack>
    );
}
