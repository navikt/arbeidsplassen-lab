import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    HStack,
    Radio,
    RadioGroup,
    Select,
    TextField,
    VStack,
} from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
    onNeste: () => void;
};

export default function KortGrunnleggende({ formData, updateField, onNeste }: Props) {
    return (
        <Box padding="space-24" borderRadius="8" background="neutral-soft">
            <VStack gap="space-16">
                <Heading size="medium" level="2">
                    Det grunnleggende
                </Heading>

                <Select
                    label="Stillingstittel"
                    description="Velg det yrket som passer best"
                    value={formData.stillingstittel}
                    onChange={(e) => updateField("stillingstittel", e.target.value)}
                >
                    <option value="">Velg yrke</option>
                    <option value="Utvikler">Utvikler</option>
                    <option value="Sykepleier">Sykepleier</option>
                    <option value="Butikkmedarbeider">Butikkmedarbeider</option>
                    <option value="Tømrer">Tømrer</option>
                    <option value="Lærer">Lærer</option>
                    <option value="Kokk">Kokk</option>
                    <option value="Designer">Designer</option>
                </Select>

                <HStack gap="space-16" align="start">
                    <Select
                        label="Ansettelsesform"
                        value={formData.ansettelsesform}
                        onChange={(e) => updateField("ansettelsesform", e.target.value)}
                    >
                        <option value="">Velg</option>
                        <option value="Fast">Fast</option>
                        <option value="Vikariat">Vikariat</option>
                        <option value="Engasjement">Engasjement</option>
                        <option value="Sesong">Sesong</option>
                        <option value="Feriejobb">Feriejobb</option>
                    </Select>
                    <TextField
                        label="Antall stillinger"
                        type="number"
                        value={formData.antallStillinger}
                        onChange={(e) => updateField("antallStillinger", e.target.value)}
                        htmlSize={6}
                    />
                </HStack>

                <CheckboxGroup legend="Omfang" value={formData.omfang} onChange={(val) => updateField("omfang", val)}>
                    <Checkbox value="Heltid">Heltid</Checkbox>
                    <Checkbox value="Deltid">Deltid</Checkbox>
                </CheckboxGroup>

                <RadioGroup
                    legend="Hjemmekontor"
                    value={formData.hjemmekontor}
                    onChange={(val) => updateField("hjemmekontor", val)}
                >
                    <Radio value="ingen">Kun på arbeidsplassen</Radio>
                    <Radio value="delvis">Hybrid</Radio>
                    <Radio value="kun-hjemmekontor">Kun hjemmekontor</Radio>
                </RadioGroup>

                <TextField
                    label="Arbeidssted"
                    description="Sted eller kommune"
                    value={formData.sted}
                    onChange={(e) => updateField("sted", e.target.value)}
                />

                <CheckboxGroup
                    legend="Arbeidsspråk"
                    value={formData.arbeidssprak}
                    onChange={(val) => updateField("arbeidssprak", val)}
                >
                    <Checkbox value="Norsk">Norsk</Checkbox>
                    <Checkbox value="Skandinavisk">Skandinavisk</Checkbox>
                    <Checkbox value="Engelsk">Engelsk</Checkbox>
                </CheckboxGroup>

                <HStack justify="end">
                    <Button onClick={onNeste}>Neste →</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
