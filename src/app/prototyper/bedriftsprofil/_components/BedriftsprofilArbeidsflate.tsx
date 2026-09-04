"use client";

import { BodyLong, BodyShort, Button, Heading, HGrid, LocalAlert, ToggleGroup, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { useEffect, useMemo, useState } from "react";
import { getEmployerBadgeResults } from "@/app/_common/bedriftsprofil/badges";
import {
    createDefaultEmployerProfile,
    mockEmployerActivity,
    profileReferenceDate,
} from "@/app/_common/bedriftsprofil/profile";
import {
    clearProfileStorage,
    PROFILE_STORAGE_UNAVAILABLE_MESSAGE,
    readProfileStorage,
    writeProfileStorage,
} from "@/app/_common/bedriftsprofil/profileStorage";
import type {
    EmployerJobSummary,
    EmployerProfile,
    UpdateEmployerProfileField,
} from "@/app/_common/bedriftsprofil/types";
import { getProfileCompleteness } from "../_lib/profileCompleteness";
import styles from "./BedriftsprofilArbeidsflate.module.css";
import OffentligBedriftsprofil from "./OffentligBedriftsprofil";
import Profilredigering from "./Profilredigering";
import Profilstatus from "./Profilstatus";

type MobileView = "edit" | "preview";

export default function BedriftsprofilArbeidsflate({ job }: { job: EmployerJobSummary }) {
    const [profile, setProfile] = useState<EmployerProfile>(createDefaultEmployerProfile);
    const [mobileView, setMobileView] = useState<MobileView>("edit");
    const [storageReady, setStorageReady] = useState(false);
    const [canPersist, setCanPersist] = useState(true);
    const [storageError, setStorageError] = useState<string>();
    const [statusMessage, setStatusMessage] = useState<string>();

    const badges = useMemo(() => getEmployerBadgeResults(mockEmployerActivity, profileReferenceDate), []);
    const completeness = useMemo(() => getProfileCompleteness(profile), [profile]);

    useEffect(() => {
        const result = readProfileStorage(window.localStorage);

        if (result.ok) {
            if (result.value) {
                setProfile({
                    ...result.value,
                    highlights: [...result.value.highlights],
                });
            }
        } else {
            setStorageError(result.message);
            if (result.message === PROFILE_STORAGE_UNAVAILABLE_MESSAGE) {
                setCanPersist(false);
            }
        }

        setStorageReady(true);
    }, []);

    useEffect(() => {
        if (!storageReady || !canPersist) {
            return;
        }

        const result = writeProfileStorage(window.localStorage, profile);
        if (!result.ok) {
            setStorageError(result.message);
            setCanPersist(false);
        }
    }, [canPersist, profile, storageReady]);

    const updateField: UpdateEmployerProfileField = <K extends keyof EmployerProfile>(
        field: K,
        value: EmployerProfile[K],
    ) => {
        setProfile((current) => ({ ...current, [field]: value }));
        setStatusMessage(undefined);
    };

    const updateHighlight = (index: number, value: string) => {
        setProfile((current) => ({
            ...current,
            highlights: current.highlights.map((highlight, currentIndex) =>
                currentIndex === index ? value : highlight,
            ),
        }));
        setStatusMessage(undefined);
    };

    const resetDemo = () => {
        const result = clearProfileStorage(window.localStorage);
        setProfile(createDefaultEmployerProfile());

        if (result.ok) {
            setStorageError(undefined);
            setCanPersist(true);
            setStatusMessage("Demoen er tilbakestilt til utgangspunktet.");
        } else {
            setStorageError(result.message);
            setCanPersist(false);
            setStatusMessage("Profilen er tilbakestilt i denne fanen.");
        }
    };

    return (
        <PageBlock width="2xl" gutters>
            <VStack gap="space-24" paddingBlock={{ xs: "space-24 space-48", md: "space-40 space-64" }}>
                <HGrid columns={{ xs: 1, md: "1fr auto" }} gap="space-16" align="start">
                    <VStack gap="space-8">
                        <Heading level="1" size="xlarge">
                            Bedriftsprofilverkstedet
                        </Heading>
                        <BodyLong size="large">
                            Vis hvem dere er med bilder, nøkkelinformasjon og aktivitet som hjelper jobbsøkeren å
                            vurdere bedriften.
                        </BodyLong>
                    </VStack>
                    <Button variant="tertiary" data-color="neutral" onClick={resetDemo}>
                        Tilbakestill demo
                    </Button>
                </HGrid>

                <Profilstatus completeness={completeness} storageReady={storageReady} />

                {storageError && (
                    <LocalAlert status="warning" size="small" as="div">
                        <LocalAlert.Header>
                            <LocalAlert.Title as="div">Kunne ikke bruke lagret profil</LocalAlert.Title>
                        </LocalAlert.Header>
                        <LocalAlert.Content>{storageError}</LocalAlert.Content>
                    </LocalAlert>
                )}

                {statusMessage && (
                    <BodyShort role="status" className={styles.statusMessage}>
                        {statusMessage}
                    </BodyShort>
                )}

                <div className={styles.mobileToggle}>
                    <ToggleGroup
                        label="Velg arbeidsvisning"
                        value={mobileView}
                        onChange={(value) => {
                            if (value === "edit" || value === "preview") {
                                setMobileView(value);
                            }
                        }}
                        fill
                    >
                        <ToggleGroup.Item value="edit" label="Rediger" />
                        <ToggleGroup.Item value="preview" label="Forhåndsvis" />
                    </ToggleGroup>
                </div>

                <div className={styles.workspace} data-mobile-view={mobileView}>
                    <section className={styles.editorPanel} aria-labelledby="profilredigering-heading">
                        <Profilredigering
                            profile={profile}
                            badges={badges}
                            updateField={updateField}
                            updateHighlight={updateHighlight}
                        />
                    </section>

                    <aside className={styles.previewPanel} aria-labelledby="profilforhandsvisning-heading">
                        <VStack gap="space-12">
                            <div>
                                <Heading id="profilforhandsvisning-heading" level="2" size="medium">
                                    Forhåndsvisning for jobbsøker
                                </Heading>
                                <BodyShort size="small">Alle handlinger og aktivitetsdata er simulert.</BodyShort>
                            </div>
                            <OffentligBedriftsprofil profile={profile} badges={badges} job={job} />
                        </VStack>
                    </aside>
                </div>
            </VStack>
        </PageBlock>
    );
}
