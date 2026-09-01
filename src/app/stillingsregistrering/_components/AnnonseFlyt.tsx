"use client";

import { Heading, Loader, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AdvertFormData, UpdateAdvertField } from "../_lib/types";
import { useStillingsregistrering } from "../_state/StillingsregistreringProvider";
import AnnonseProgress from "./AnnonseProgress";
import EditorNavigation from "./EditorNavigation";
import RegistrationStorageAlert from "./RegistrationStorageAlert";
import StegDinBedrift from "./StegDinBedrift";
import StegOmStillingen from "./StegOmStillingen";
import StegPraktiskInformasjon from "./StegPraktiskInformasjon";
import StegPublisering from "./StegPublisering";
import StegSoknad from "./StegSoknad";

type AnnonseFlytProps = {
    advertId: string;
    currentStep: number;
};

export default function AnnonseFlyt({ advertId, currentStep }: AnnonseFlytProps) {
    const router = useRouter();
    const {
        isReady,
        getAdvert,
        ensureAdvert,
        updateField: updateAdvertField,
        setLastVisitedStep,
        publishAdvert,
    } = useStillingsregistrering();
    const [showTermsError, setShowTermsError] = useState(false);
    const advert = getAdvert(advertId);

    useEffect(() => {
        if (isReady && !advert) {
            ensureAdvert(advertId);
        }
    }, [advert, advertId, ensureAdvert, isReady]);

    useEffect(() => {
        if (!advert) {
            return;
        }
        setLastVisitedStep(advertId, currentStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [advert, advertId, currentStep, setLastVisitedStep]);

    if (!isReady || !advert) {
        return (
            <PageBlock width="md" gutters>
                <VStack align="center" paddingBlock="space-64">
                    <Loader size="xlarge" title="Laster stillingsannonsen" />
                </VStack>
            </PageBlock>
        );
    }

    const updateField: UpdateAdvertField = <K extends keyof AdvertFormData>(field: K, value: AdvertFormData[K]) => {
        updateAdvertField(advertId, field, value);
        if (field === "godtattVilkar" && value) {
            setShowTermsError(false);
        }
    };

    const publish = () => {
        if (!advert.form.godtattVilkar) {
            setShowTermsError(true);
            document.getElementById("publiseringsvilkar")?.focus();
            return;
        }

        publishAdvert(advertId);
        router.push(`/stillingsregistrering/publisering-ferdig/${advertId}`);
    };

    const stepContent = (() => {
        switch (currentStep) {
            case 1:
                return <StegPraktiskInformasjon formData={advert.form} updateField={updateField} />;
            case 2:
                return <StegOmStillingen formData={advert.form} updateField={updateField} />;
            case 3:
                return <StegDinBedrift formData={advert.form} updateField={updateField} />;
            case 4:
                return <StegSoknad formData={advert.form} updateField={updateField} />;
            case 5:
                return (
                    <StegPublisering formData={advert.form} updateField={updateField} showTermsError={showTermsError} />
                );
            default:
                return null;
        }
    })();

    return (
        <VStack gap="space-40" paddingBlock={{ xs: "space-32", md: "space-48" }}>
            <PageBlock gutters>
                <Heading level="1" size="xlarge" align="center">
                    {advert.status === "draft" ? "Ny stillingsannonse" : "Endre stillingsannonse"}
                </Heading>
            </PageBlock>

            <PageBlock width="md" gutters>
                <VStack gap="space-32">
                    <AnnonseProgress advertId={advertId} currentStep={currentStep} />
                    <RegistrationStorageAlert />
                    {stepContent}
                </VStack>
            </PageBlock>

            <PageBlock width="lg" gutters>
                <EditorNavigation advertId={advertId} currentStep={currentStep} onPublish={publish} />
            </PageBlock>
        </VStack>
    );
}
