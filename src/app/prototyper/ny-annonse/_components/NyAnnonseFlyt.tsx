"use client";

import { Heading, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useState } from "react";
import Navigasjonsbar from "./Navigasjonsbar";
import NavigasjonsKnapper from "./NavigasjonsKnapper";
import StegDinBedrift from "./StegDinBedrift";
import StegOmStillingen from "./StegOmStillingen";
import StegPraktiskInformasjon from "./StegPraktiskInformasjon";
import StegPublisering from "./StegPublisering";
import StegSoknad from "./StegSoknad";

export type AnnonseFormData = {
    // Steg 1: Praktisk informasjon
    stillingstittel: string;
    antallStillinger: string;
    oppstartsdato: string;
    etterAvtale: boolean;
    ansettelsesform: string;
    arbeidstidsordning: string;
    omfang: string[];
    arbeidsdager: string[];
    arbeidstid: string[];
    arbeidssprak: string[];
    hjemmekontor: string;
    arbeidsstedType: string;
    gateadresse: string;
    postnummer: string;
    sted: string;
    // Steg 2: Om stillingen
    annonseformat: string;
    apningstekst: string;
    arbeidsoppgaver: string;
    hvaTilbyr: string;
    hvemSerEtter: string;
    overskrift: string;
    // Steg 3: Om bedriften
    bedriftsnavn: string;
    omBedriften: string;
    sektor: string;
    sosialeMedier: string[];
    kontaktFornavn: string;
    kontaktEtternavn: string;
    kontaktTittel: string;
    kontaktTelefon: string;
    // Steg 4: Søknad
    soknadstype: string[];
    kvalifikasjoner: string[];
    soknadEpost: string;
    soknadUrl: string;
    varslingEpost: string;
    soknadsfrist: string;
    sokSnarest: boolean;
    // Steg 5: Publisering
    publiseringsdato: string;
    godtattVilkar: boolean;
};

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
    annonseformat: "strukturert",
    apningstekst: "",
    arbeidsoppgaver: "",
    hvaTilbyr: "",
    hvemSerEtter: "",
    overskrift: "",
    bedriftsnavn: "",
    omBedriften: "",
    sektor: "",
    sosialeMedier: [],
    kontaktFornavn: "",
    kontaktEtternavn: "",
    kontaktTittel: "",
    kontaktTelefon: "",
    soknadstype: ["superrask"],
    kvalifikasjoner: [""],
    soknadEpost: "",
    soknadUrl: "",
    varslingEpost: "",
    soknadsfrist: "",
    sokSnarest: false,
    publiseringsdato: "",
    godtattVilkar: false,
};

export default function NyAnnonseFlyt() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<AnnonseFormData>(initialFormData);

    const TOTAL_STEPS = 5;

    const updateField = <K extends keyof AnnonseFormData>(field: K, value: AnnonseFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= TOTAL_STEPS) {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <PageBlock width="md" gutters>
            <VStack gap="space-24" paddingBlock="space-24 space-48">
                <Heading size="xlarge" level="1" align="center">
                    Ny stillingsannonse
                </Heading>

                <Navigasjonsbar currentStep={currentStep} totalSteps={TOTAL_STEPS} onStepChangeAction={goToStep} />

                {currentStep === 1 && <StegPraktiskInformasjon formData={formData} updateField={updateField} />}
                {currentStep === 2 && <StegOmStillingen formData={formData} updateField={updateField} />}
                {currentStep === 3 && <StegDinBedrift formData={formData} updateField={updateField} />}
                {currentStep === 4 && <StegSoknad formData={formData} updateField={updateField} />}
                {currentStep === 5 && <StegPublisering formData={formData} updateField={updateField} />}

                <NavigasjonsKnapper
                    currentStep={currentStep}
                    totalSteps={TOTAL_STEPS}
                    onPrevious={() => goToStep(currentStep - 1)}
                    onNext={() => goToStep(currentStep + 1)}
                />
            </VStack>
        </PageBlock>
    );
}
