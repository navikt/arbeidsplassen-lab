"use client";

import { BodyLong, Button, Heading, Loader, LocalAlert, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { ReactNode } from "react";
import { useSimulatedAuth } from "@/app/_common/auth/SimulatedAuthProvider";

export default function SimulatedAuthGate({ children }: { children: ReactNode }) {
    const { status, storageMessage, login } = useSimulatedAuth();

    if (status === "unknown") {
        return (
            <PageBlock width="text" gutters>
                <VStack align="center" paddingBlock="space-64">
                    <Loader size="xlarge" title="Laster innlogging" />
                </VStack>
            </PageBlock>
        );
    }

    if (status === "not-authenticated") {
        return (
            <PageBlock width="text" gutters>
                <VStack gap="space-24" paddingBlock={{ xs: "space-40", md: "space-64" }}>
                    <Heading level="1" size="xlarge">
                        Logg inn som arbeidsgiver
                    </Heading>
                    <BodyLong size="large">
                        Logg inn for å lage og administrere stillingsannonser. Innloggingen er bare en lokal simulering
                        i Arbeidsplassen Lab.
                    </BodyLong>
                    {storageMessage && (
                        <LocalAlert status="warning">
                            <LocalAlert.Header>
                                <LocalAlert.Title>Innloggingen kan ikke huskes</LocalAlert.Title>
                            </LocalAlert.Header>
                            <LocalAlert.Content>{storageMessage}</LocalAlert.Content>
                        </LocalAlert>
                    )}
                    <div>
                        <Button onClick={login}>Logg inn</Button>
                    </div>
                </VStack>
            </PageBlock>
        );
    }

    return children;
}
