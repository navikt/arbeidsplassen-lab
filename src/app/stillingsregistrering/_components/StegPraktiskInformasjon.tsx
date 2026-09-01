"use client";

import {
    BodyShort,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    Heading,
    HGrid,
    Link,
    Radio,
    RadioGroup,
    Select,
    TextField,
    useDatepicker,
    VStack,
} from "@navikt/ds-react";
import { formatDateValue } from "../_lib/date";
import type { AdvertFormData, UpdateAdvertField } from "../_lib/types";
import styles from "./StegPraktiskInformasjon.module.css";

type StegPraktiskInformasjonProps = {
    formData: AdvertFormData;
    updateField: UpdateAdvertField;
};

export default function StegPraktiskInformasjon({ formData, updateField }: StegPraktiskInformasjonProps) {
    const { datepickerProps, inputProps } = useDatepicker({
        defaultSelected: formData.oppstartsdato ? new Date(formData.oppstartsdato) : undefined,
        onDateChange: (date) => updateField("oppstartsdato", date ? formatDateValue(date) : ""),
    });

    return (
        <VStack gap="space-32">
            <Heading level="2" size="large">
                Praktisk informasjon om stillingen
            </Heading>

            <VStack gap="space-8">
                <Select
                    label="Stillingstittel eller yrke"
                    description="Må fylles inn. Kun ett yrke kan velges."
                    value={formData.stillingstittel}
                    onChange={(event) => updateField("stillingstittel", event.target.value)}
                >
                    <option value="">Start å skrive og velg fra listen</option>
                    <option value="Butikkmedarbeider">Butikkmedarbeider</option>
                    <option value="Designer">Designer</option>
                    <option value="Kokk">Kokk</option>
                    <option value="Lærer">Lærer</option>
                    <option value="Regnskapsfører">Regnskapsfører</option>
                    <option value="Sykepleier">Sykepleier</option>
                    <option value="Tømrer">Tømrer</option>
                    <option value="Utvikler">Utvikler</option>
                </Select>
                <BodyShort size="small">
                    <Link href="/stillingsregistrering/stillingsannonser">
                        Skal du rekruttere til flere ulike stillinger eller yrker?
                    </Link>
                </BodyShort>
            </VStack>

            <HGrid columns={{ xs: 1, sm: "1fr 1.35fr auto" }} gap="space-16" align="start">
                <TextField
                    label="Antall stillinger"
                    description="Må fylles inn"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={99_999}
                    value={formData.antallStillinger}
                    onChange={(event) => updateField("antallStillinger", event.target.value.slice(0, 5))}
                />
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input {...inputProps} label="Oppstartsdato" description="Må fylles inn" />
                </DatePicker>
                <div className={styles.checkboxAlign}>
                    <Checkbox
                        checked={formData.etterAvtale}
                        onChange={(event) => updateField("etterAvtale", event.target.checked)}
                    >
                        Etter avtale
                    </Checkbox>
                </div>
            </HGrid>

            <HGrid columns={{ xs: 1, sm: 2 }} gap="space-16">
                <Select
                    label="Ansettelsesform"
                    description="Må fylles inn"
                    value={formData.ansettelsesform}
                    onChange={(event) => updateField("ansettelsesform", event.target.value)}
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
                    onChange={(event) => updateField("arbeidstidsordning", event.target.value)}
                >
                    <option value="">Velg et alternativ</option>
                    <option value="skift">Skift</option>
                    <option value="turnus">Turnus</option>
                    <option value="vakt">Vakt</option>
                </Select>
            </HGrid>

            <CheckboxGroup
                legend="Omfang"
                description="Velg minst én"
                value={formData.omfang}
                onChange={(values) => updateField("omfang", values)}
            >
                <Checkbox value="heltid">Heltid (100%)</Checkbox>
                <Checkbox value="deltid">Deltid</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Hvilke dager skal man kunne jobbe?"
                description="Velg minst én"
                value={formData.arbeidsdager}
                onChange={(values) => updateField("arbeidsdager", values)}
            >
                <Checkbox value="ukedager">Ukedager</Checkbox>
                <Checkbox value="lordag">Lørdag</Checkbox>
                <Checkbox value="sondag">Søndag</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Hvilken tid skal man kunne jobbe?"
                description="Velg minst én"
                value={formData.arbeidstid}
                onChange={(values) => updateField("arbeidstid", values)}
            >
                <Checkbox value="dagtid">Dagtid</Checkbox>
                <Checkbox value="kveld">Kveld</Checkbox>
                <Checkbox value="natt">Natt</Checkbox>
            </CheckboxGroup>

            <CheckboxGroup
                legend="Arbeidsspråk"
                description="Er norsk et krav for jobben, eller er skandinavisk eller engelsk tilstrekkelig? Velg de språkene som dere aksepterer."
                value={formData.arbeidssprak}
                onChange={(values) => updateField("arbeidssprak", values)}
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
                onChange={(value) => updateField("hjemmekontor", value)}
            >
                <Radio value="ingen">Ingen mulighet for hjemmekontor</Radio>
                <Radio value="kun-hjemmekontor">Kun hjemmekontor</Radio>
                <Radio value="delvis">Delvis hjemmekontor</Radio>
            </RadioGroup>

            <VStack gap="space-16">
                <div>
                    <Heading level="3" size="medium">
                        Arbeidssted
                    </Heading>
                    <BodyShort>
                        Oppgi hvor jobben skal foregå. Skriv inn en adresse eller én eller flere kommuner, fylker eller
                        land.
                    </BodyShort>
                </div>
                <CheckboxGroup
                    legend="Type arbeidssted"
                    hideLegend
                    value={[formData.arbeidsstedType]}
                    onChange={(values) => {
                        const selected = values.at(-1);
                        if (selected === "adresse" || selected === "omrader") {
                            updateField("arbeidsstedType", selected);
                        }
                    }}
                >
                    <Checkbox value="adresse">Adresse</Checkbox>
                    <Checkbox value="omrader">Kommuner, fylker eller land</Checkbox>
                </CheckboxGroup>

                {formData.arbeidsstedType === "adresse" ? (
                    <>
                        <TextField
                            label="Gateadresse"
                            value={formData.gateadresse}
                            onChange={(event) => updateField("gateadresse", event.target.value)}
                        />
                        <HGrid columns={{ xs: 1, sm: "1fr 2.5fr" }} gap="space-16">
                            <TextField
                                label="Postnummer"
                                description="Må fylles inn"
                                inputMode="numeric"
                                maxLength={4}
                                value={formData.postnummer}
                                onChange={(event) => {
                                    const postnummer = event.target.value.replace(/\D/g, "").slice(0, 4);
                                    updateField("postnummer", postnummer);
                                    updateField("sted", postnummer.length === 4 ? "OSLO" : "");
                                }}
                            />
                            <TextField label="Sted" value={formData.sted} readOnly />
                        </HGrid>
                    </>
                ) : (
                    <TextField
                        label="Kommuner, fylker eller land"
                        description="Skill flere steder med komma."
                        value={formData.omrader}
                        onChange={(event) => updateField("omrader", event.target.value)}
                    />
                )}
            </VStack>
        </VStack>
    );
}
