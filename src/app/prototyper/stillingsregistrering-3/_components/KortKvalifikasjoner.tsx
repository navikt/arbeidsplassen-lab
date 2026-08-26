import { BodyShort, Box, Button, Heading, HStack, Select, TextField, VStack } from "@navikt/ds-react";
import type { AnnonseFormData, Kvalifikasjon } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
    onNeste: () => void;
    onForrige: () => void;
};

export default function KortKvalifikasjoner({ formData, updateField, onNeste, onForrige }: Props) {
    const leggTil = () => {
        const ny: Kvalifikasjon = { id: crypto.randomUUID(), tekst: "", prioritet: "bor" };
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
        <Box padding="space-24" borderRadius="8" background="neutral-soft">
            <VStack gap="space-16">
                <Heading size="medium" level="2">
                    Kvalifikasjoner
                </Heading>

                <BodyShort size="small">
                    Legg til kvalifikasjoner og velg om de er et krav eller en fordel. Dette brukes til matching og
                    filtrering.
                </BodyShort>

                {formData.kvalifikasjoner.map((kval) => (
                    <HStack key={kval.id} gap="space-8" align="end">
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
                        <Button
                            variant="tertiary-neutral"
                            size="small"
                            onClick={() => fjern(kval.id)}
                            aria-label={`Fjern: ${kval.tekst || "tom kvalifikasjon"}`}
                        >
                            ✕
                        </Button>
                    </HStack>
                ))}

                <Button variant="tertiary" size="small" onClick={leggTil}>
                    + Legg til kvalifikasjon
                </Button>

                <HStack justify="space-between">
                    <Button variant="secondary" onClick={onForrige}>
                        ← Forrige
                    </Button>
                    <Button onClick={onNeste}>Neste →</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
