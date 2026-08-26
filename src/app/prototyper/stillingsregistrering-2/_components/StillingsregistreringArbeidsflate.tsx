"use client";

import { Accordion, Box, Button, Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useState } from "react";
import type { AnnonseFormData, SeksjonId } from "../_lib/types";
import { tipsBySeksjon } from "../_mock/tips";
import Forhandsvisning from "./Forhandsvisning";
import SeksjonKvalifikasjoner from "./SeksjonKvalifikasjoner";
import SeksjonLonn from "./SeksjonLonn";
import SeksjonOmBedriften from "./SeksjonOmBedriften";
import SeksjonOmStillingen from "./SeksjonOmStillingen";
import SeksjonPraktisk from "./SeksjonPraktisk";
import SeksjonSoknad from "./SeksjonSoknad";
import styles from "./StillingsregistreringArbeidsflate.module.css";
import TipsPanel from "./TipsPanel";

const initialFormData: AnnonseFormData = {
    stillingstittel: "",
    antallStillinger: "1",
    oppstartsdato: "",
    etterAvtale: false,
    ansettelsesform: "",
    arbeidstidsordning: "",
    omfang: [],
    arbeidsdager: [],
    arbeidstid: [],
    arbeidssprak: [],
    hjemmekontor: "",
    arbeidsstedType: "adresse",
    gateadresse: "",
    postnummer: "",
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
    sektor: "",
    kontaktFornavn: "",
    kontaktEtternavn: "",
    kontaktTittel: "",
    kontaktTelefon: "",
    superrask: true,
    beOmCv: false,
    beOmBosted: false,
    kvalifikasjoner: [],
    screeningSporsmal: [],
    soknadsfrist: "",
    sokSnarest: false,
    varslingEpost: "",
};

type SeksjonConfig = {
    id: SeksjonId;
    tittel: string;
};

const seksjoner: SeksjonConfig[] = [
    { id: "praktisk", tittel: "Praktisk informasjon" },
    { id: "om-stillingen", tittel: "Om stillingen" },
    { id: "lonn", tittel: "Lønn" },
    { id: "kvalifikasjoner", tittel: "Kvalifikasjoner" },
    { id: "soknad", tittel: "Søknad og innstillinger" },
    { id: "om-bedriften", tittel: "Om bedriften" },
];

export default function StillingsregistreringArbeidsflate() {
    const [formData, setFormData] = useState<AnnonseFormData>(initialFormData);
    const [aktivSeksjon, setAktivSeksjon] = useState<SeksjonId>("praktisk");
    const [visMobilForhandsvisning, setVisMobilForhandsvisning] = useState(false);

    const updateField = <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const renderSeksjonInnhold = (id: SeksjonId) => {
        switch (id) {
            case "praktisk":
                return <SeksjonPraktisk formData={formData} updateField={updateField} />;
            case "om-stillingen":
                return <SeksjonOmStillingen formData={formData} updateField={updateField} />;
            case "lonn":
                return <SeksjonLonn formData={formData} updateField={updateField} />;
            case "kvalifikasjoner":
                return <SeksjonKvalifikasjoner formData={formData} updateField={updateField} />;
            case "soknad":
                return <SeksjonSoknad formData={formData} updateField={updateField} />;
            case "om-bedriften":
                return <SeksjonOmBedriften formData={formData} updateField={updateField} />;
        }
    };

    return (
        <PageBlock width="2xl" gutters>
            <VStack gap="space-16" paddingBlock="space-24 space-48">
                <Heading size="xlarge" level="1">
                    Ny stillingsannonse
                </Heading>

                <Button
                    variant="tertiary"
                    size="small"
                    className={styles.forhandsvisningToggle}
                    onClick={() => setVisMobilForhandsvisning(!visMobilForhandsvisning)}
                >
                    {visMobilForhandsvisning ? "Skjul forhåndsvisning" : "👁️ Vis forhåndsvisning"}
                </Button>

                {visMobilForhandsvisning && (
                    <Box className={styles.forhandsvisningToggle}>
                        <Forhandsvisning formData={formData} />
                    </Box>
                )}

                <div className={styles.arbeidsflate}>
                    <div className={styles.hovedinnhold}>
                        <Accordion>
                            {seksjoner.map((seksjon) => (
                                <Accordion.Item
                                    key={seksjon.id}
                                    open={aktivSeksjon === seksjon.id}
                                    onOpenChange={(open) => {
                                        if (open) {
                                            setAktivSeksjon(seksjon.id);
                                        }
                                    }}
                                >
                                    <Accordion.Header>{seksjon.tittel}</Accordion.Header>
                                    <Accordion.Content>{renderSeksjonInnhold(seksjon.id)}</Accordion.Content>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>

                    <aside className={styles.sidepanelDesktop} aria-label="Forhåndsvisning og tips">
                        <Forhandsvisning formData={formData} />
                        <TipsPanel tips={tipsBySeksjon[aktivSeksjon]} />
                    </aside>
                </div>
            </VStack>
        </PageBlock>
    );
}
