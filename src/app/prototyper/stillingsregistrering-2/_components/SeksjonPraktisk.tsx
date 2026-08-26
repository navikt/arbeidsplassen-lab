import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
    HStack,
    Radio,
    RadioGroup,
    Select,
    TextField,
    useDatepicker,
    VStack,
} from "@navikt/ds-react";
import type { AnnonseFormData } from "../_lib/types";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

const formatDateValue = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return localDate.toISOString().slice(0, 10);
};

export default function SeksjonPraktisk({ formData, updateField }: Props) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.oppstartsdato ? new Date(formData.oppstartsdato) : undefined,
        onDateChange: (date) => {
            updateField("oppstartsdato", date ? formatDateValue(date) : "");
        },
    });

    return (
        <VStack gap="space-16">
            <Select
                label="Stillingstittel eller yrke"
                value={formData.stillingstittel}
                onChange={(e) => updateField("stillingstittel", e.target.value)}
            >
                <option value="">Velg fra listen</option>
                <option value="Utvikler">Utvikler</option>
                <option value="Sykepleier">Sykepleier</option>
                <option value="Butikkmedarbeider">Butikkmedarbeider</option>
                <option value="Tømrer">Tømrer</option>
                <option value="Lærer">Lærer</option>
                <option value="Kokk">Kokk</option>
                <option value="Designer">Designer</option>
            </Select>

            <HStack gap="space-16" align="start">
                <TextField
                    label="Antall stillinger"
                    type="number"
                    value={formData.antallStillinger}
                    onChange={(e) => updateField("antallStillinger", e.target.value)}
                    htmlSize={8}
                />
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Oppstartsdato" />
                </DatePicker>
                <Checkbox checked={formData.etterAvtale} onChange={(e) => updateField("etterAvtale", e.target.checked)}>
                    Etter avtale
                </Checkbox>
            </HStack>

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
                <Select
                    label="Arbeidstidsordning"
                    value={formData.arbeidstidsordning}
                    onChange={(e) => updateField("arbeidstidsordning", e.target.value)}
                >
                    <option value="">Velg</option>
                    <option value="Skift">Skift</option>
                    <option value="Turnus">Turnus</option>
                    <option value="Vakt">Vakt</option>
                </Select>
            </HStack>

            <CheckboxGroup legend="Omfang" value={formData.omfang} onChange={(val) => updateField("omfang", val)}>
                <Checkbox value="Heltid">Heltid</Checkbox>
                <Checkbox value="Deltid">Deltid</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Arbeidsspråk"
                value={formData.arbeidssprak}
                onChange={(val) => updateField("arbeidssprak", val)}
            >
                <Checkbox value="Norsk">Norsk</Checkbox>
                <Checkbox value="Skandinavisk">Skandinavisk</Checkbox>
                <Checkbox value="Engelsk">Engelsk</Checkbox>
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
                label="Gateadresse"
                value={formData.gateadresse}
                onChange={(e) => updateField("gateadresse", e.target.value)}
            />
            <HStack gap="space-16">
                <TextField
                    label="Postnummer"
                    value={formData.postnummer}
                    onChange={(e) => updateField("postnummer", e.target.value)}
                    htmlSize={8}
                />
                <TextField label="Sted" value={formData.sted} onChange={(e) => updateField("sted", e.target.value)} />
            </HStack>
        </VStack>
    );
}
