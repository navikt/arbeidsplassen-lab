import {
    Checkbox,
    CheckboxGroup,
    DatePicker,
    Heading,
    HStack,
    Radio,
    RadioGroup,
    Select,
    TextField,
    useDatepicker,
    VStack,
} from "@navikt/ds-react";
import type { AnnonseFormData } from "./NyAnnonseFlyt";

type Props = {
    formData: AnnonseFormData;
    updateField: <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => void;
};

const formatDateValue = (date: Date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return localDate.toISOString().slice(0, 10);
};

export default function StegPraktiskInformasjon({ formData, updateField }: Props) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.oppstartsdato ? new Date(formData.oppstartsdato) : undefined,
        onDateChange: (date) => {
            updateField("oppstartsdato", date ? formatDateValue(date) : "");
        },
    });

    return (
        <VStack gap="space-24">
            <Heading level="2" size="large">
                Praktisk informasjon om stillingen
            </Heading>

            <Select
                label="Stillingstittel eller yrke"
                description="Må fylles inn. Kun ett yrke kan velges."
                value={formData.stillingstittel}
                onChange={(e) => updateField("stillingstittel", e.target.value)}
            >
                <option value="">Start å skrive og velg fra listen</option>
                <option value="Utvikler">Utvikler</option>
                <option value="Sykepleier">Sykepleier</option>
                <option value="Butikkmedarbeider">Butikkmedarbeider</option>
                <option value="Tømrer">Tømrer</option>
                <option value="Lærer">Lærer</option>
                <option value="Regnskapsfører">Regnskapsfører</option>
                <option value="Kokk">Kokk</option>
                <option value="Designer">Designer</option>
            </Select>

            <HStack gap="space-16" align="start">
                <TextField
                    label="Antall stillinger"
                    description="Må fylles inn"
                    type="number"
                    value={formData.antallStillinger}
                    onChange={(e) => updateField("antallStillinger", e.target.value)}
                    htmlSize={10}
                />
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Oppstartsdato" description="Må fylles inn" />
                </DatePicker>
                <Checkbox checked={formData.etterAvtale} onChange={(e) => updateField("etterAvtale", e.target.checked)}>
                    Etter avtale
                </Checkbox>
            </HStack>

            <HStack gap="space-16" align="start">
                <Select
                    label="Ansettelsesform"
                    description="Må fylles inn"
                    value={formData.ansettelsesform}
                    onChange={(e) => updateField("ansettelsesform", e.target.value)}
                >
                    <option value="">Velg et alternativ</option>
                    <option value="fast">Fast</option>
                    <option value="vikariat">Vikariat</option>
                    <option value="engasjement">Engasjement</option>
                    <option value="prosjekt">Prosjekt</option>
                    <option value="sesong">Sesong</option>
                    <option value="feriejobb">Feriejobb</option>
                    <option value="laerling">Lærling</option>
                </Select>
                <Select
                    label="Arbeidstidsordning"
                    description="Valgfritt"
                    value={formData.arbeidstidsordning}
                    onChange={(e) => updateField("arbeidstidsordning", e.target.value)}
                >
                    <option value="">Velg et alternativ</option>
                    <option value="skift">Skift</option>
                    <option value="turnus">Turnus</option>
                    <option value="vakt">Vakt</option>
                </Select>
            </HStack>

            <CheckboxGroup
                legend="Omfang"
                description="Velg minst én"
                value={formData.omfang}
                onChange={(val) => updateField("omfang", val)}
            >
                <Checkbox value="heltid">Heltid (100%)</Checkbox>
                <Checkbox value="deltid">Deltid</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Hvilke dager skal man kunne jobbe?"
                description="Velg minst én"
                value={formData.arbeidsdager}
                onChange={(val) => updateField("arbeidsdager", val)}
            >
                <Checkbox value="ukedager">Ukedager</Checkbox>
                <Checkbox value="lordag">Lørdag</Checkbox>
                <Checkbox value="sondag">Søndag</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Hvilken tid skal man kunne jobbe?"
                description="Velg minst én"
                value={formData.arbeidstid}
                onChange={(val) => updateField("arbeidstid", val)}
            >
                <Checkbox value="dagtid">Dagtid</Checkbox>
                <Checkbox value="kveld">Kveld</Checkbox>
                <Checkbox value="natt">Natt</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Arbeidsspråk"
                description="Er norsk et krav for jobben, eller er skandinavisk eller engelsk tilstrekkelig? Velg de språkene som dere aksepterer."
                value={formData.arbeidssprak}
                onChange={(val) => updateField("arbeidssprak", val)}
            >
                <Checkbox value="norsk">Norsk</Checkbox>
                <Checkbox value="samisk">Samisk</Checkbox>
                <Checkbox value="skandinavisk">Skandinavisk</Checkbox>
                <Checkbox value="engelsk">Engelsk</Checkbox>
            </CheckboxGroup>

            <RadioGroup
                legend="Mulighet for hybrid- eller hjemmekontor?"
                description="Velg om stillingen kun innebærer å jobbe hos arbeidsgiver, hjemmefra eller en kombinasjon av de to."
                value={formData.hjemmekontor}
                onChange={(val) => updateField("hjemmekontor", val)}
            >
                <Radio value="ingen">Ingen mulighet for hjemmekontor</Radio>
                <Radio value="kun-hjemmekontor">Kun hjemmekontor</Radio>
                <Radio value="delvis">Delvis hjemmekontor</Radio>
            </RadioGroup>

            <Heading level="3" size="medium">
                Arbeidssted
            </Heading>

            <CheckboxGroup
                legend="Oppgi hvor jobben skal foregå. Skriv inn en adresse eller én eller flere kommuner, fylker eller land."
                hideLegend
                value={[formData.arbeidsstedType]}
                onChange={(val) => updateField("arbeidsstedType", val[val.length - 1] ?? "adresse")}
            >
                <Checkbox value="adresse">Adresse</Checkbox>
                <Checkbox value="kommune">Kommuner, fylker eller land</Checkbox>
            </CheckboxGroup>

            {formData.arbeidsstedType === "adresse" && (
                <VStack gap="space-16">
                    <TextField
                        label="Gateadresse"
                        value={formData.gateadresse}
                        onChange={(e) => updateField("gateadresse", e.target.value)}
                    />
                    <HStack gap="space-16">
                        <TextField
                            label="Postnummer"
                            description="Må fylles inn"
                            value={formData.postnummer}
                            onChange={(e) => updateField("postnummer", e.target.value)}
                            htmlSize={8}
                        />
                        <TextField
                            label="Sted"
                            value={formData.sted}
                            onChange={(e) => updateField("sted", e.target.value)}
                            readOnly
                            disabled
                        />
                    </HStack>
                </VStack>
            )}
        </VStack>
    );
}
