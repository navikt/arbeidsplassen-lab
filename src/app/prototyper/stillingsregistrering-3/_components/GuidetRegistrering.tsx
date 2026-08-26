"use client";

import { Button, Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useState } from "react";
import type { AnnonseFormData, StegId } from "../_lib/types";
import { assistentMeldinger } from "../_mock/assistentData";
import Assistent from "./Assistent";
import Fremdriftslinje from "./Fremdriftslinje";
import styles from "./GuidetRegistrering.module.css";
import KortBedrift from "./KortBedrift";
import KortBeskrivelse from "./KortBeskrivelse";
import KortGrunnleggende from "./KortGrunnleggende";
import KortKvalifikasjoner from "./KortKvalifikasjoner";
import KortLonn from "./KortLonn";
import KortOppsummering from "./KortOppsummering";
import KortSoknad from "./KortSoknad";

const initialFormData: AnnonseFormData = {
    stillingstittel: "",
    antallStillinger: "1",
    oppstartsdato: "",
    etterAvtale: false,
    ansettelsesform: "",
    omfang: [],
    arbeidssprak: [],
    hjemmekontor: "",
    sted: "",
    apningstekst: "",
    arbeidsoppgaver: "",
    hvaTilbyr: "",
    hvemSerEtter: "",
    lonnstype: "",
    fastlonn: "",
    lonnFra: "",
    lonnTil: "",
    bedriftsnavn: "",
    omBedriften: "",
    kontaktFornavn: "",
    kontaktTelefon: "",
    superrask: true,
    beOmCv: false,
    beOmBosted: false,
    kvalifikasjoner: [],
    soknadsfrist: "",
    sokSnarest: false,
};

const stegRekkefolge: StegId[] = [
    "velkommen",
    "grunnleggende",
    "beskrivelse",
    "lonn",
    "kvalifikasjoner",
    "soknad",
    "bedrift",
    "oppsummering",
];

const stegLabels: Record<StegId, string> = {
    velkommen: "Start",
    grunnleggende: "Grunnleggende",
    beskrivelse: "Beskrivelse",
    lonn: "Lønn",
    kvalifikasjoner: "Kvalifikasjoner",
    soknad: "Søknad",
    bedrift: "Bedrift",
    oppsummering: "Oppsummering",
};

export default function GuidetRegistrering() {
    const [formData, setFormData] = useState<AnnonseFormData>(initialFormData);
    const [aktivtSteg, setAktivtSteg] = useState<StegId>("velkommen");

    const updateField = <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const gaVidere = () => {
        const idx = stegRekkefolge.indexOf(aktivtSteg);
        const nesteSteg = stegRekkefolge[idx + 1];
        if (nesteSteg) {
            setAktivtSteg(nesteSteg);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const gaTilbake = () => {
        const idx = stegRekkefolge.indexOf(aktivtSteg);
        const forrigeSteg = stegRekkefolge[idx - 1];
        if (forrigeSteg) {
            setAktivtSteg(forrigeSteg);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const erFerdig = (id: StegId): boolean => {
        switch (id) {
            case "velkommen":
                return aktivtSteg !== "velkommen";
            case "grunnleggende":
                return Boolean(formData.stillingstittel && formData.ansettelsesform);
            case "beskrivelse":
                return Boolean(formData.arbeidsoppgaver);
            case "lonn":
                return Boolean(formData.lonnstype);
            case "kvalifikasjoner":
                return formData.kvalifikasjoner.some((k) => k.tekst);
            case "soknad":
                return Boolean(formData.soknadsfrist || formData.sokSnarest);
            case "bedrift":
                return Boolean(formData.bedriftsnavn);
            case "oppsummering":
                return false;
        }
    };

    const stegInfo = stegRekkefolge.map((id) => ({
        id,
        label: stegLabels[id],
        ferdig: erFerdig(id),
    }));

    return (
        <PageBlock width="xl" gutters>
            <VStack gap="space-16" paddingBlock="space-24 space-48">
                <Heading size="xlarge" level="1">
                    Ny stillingsannonse
                </Heading>

                <div className={styles.layout}>
                    <Fremdriftslinje steg={stegInfo} aktivtSteg={aktivtSteg} onStegValgt={setAktivtSteg} />

                    <div className={styles.hovedinnhold}>
                        <Assistent melding={assistentMeldinger[aktivtSteg]} />

                        {aktivtSteg === "velkommen" && (
                            <Button onClick={gaVidere} size="medium">
                                La oss begynne →
                            </Button>
                        )}

                        {aktivtSteg === "grunnleggende" && (
                            <KortGrunnleggende formData={formData} updateField={updateField} onNeste={gaVidere} />
                        )}

                        {aktivtSteg === "beskrivelse" && (
                            <KortBeskrivelse
                                formData={formData}
                                updateField={updateField}
                                onNeste={gaVidere}
                                onForrige={gaTilbake}
                            />
                        )}

                        {aktivtSteg === "lonn" && (
                            <KortLonn
                                formData={formData}
                                updateField={updateField}
                                onNeste={gaVidere}
                                onForrige={gaTilbake}
                            />
                        )}

                        {aktivtSteg === "kvalifikasjoner" && (
                            <KortKvalifikasjoner
                                formData={formData}
                                updateField={updateField}
                                onNeste={gaVidere}
                                onForrige={gaTilbake}
                            />
                        )}

                        {aktivtSteg === "soknad" && (
                            <KortSoknad
                                formData={formData}
                                updateField={updateField}
                                onNeste={gaVidere}
                                onForrige={gaTilbake}
                            />
                        )}

                        {aktivtSteg === "bedrift" && (
                            <KortBedrift
                                formData={formData}
                                updateField={updateField}
                                onNeste={gaVidere}
                                onForrige={gaTilbake}
                            />
                        )}

                        {aktivtSteg === "oppsummering" && (
                            <KortOppsummering formData={formData} onRediger={setAktivtSteg} />
                        )}
                    </div>
                </div>
            </VStack>
        </PageBlock>
    );
}
