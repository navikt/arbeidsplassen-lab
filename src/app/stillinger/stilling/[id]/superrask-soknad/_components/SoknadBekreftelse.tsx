import { Button, LocalAlert, VStack } from "@navikt/ds-react";
import Link from "next/link";

export default function SoknadBekreftelse({ stillingId }: { stillingId: string }) {
    return (
        <VStack gap="space-24" paddingBlock="space-40 space-64" align="start">
            <LocalAlert status="success">
                <LocalAlert.Header>
                    <LocalAlert.Title>Søknaden ble simulert</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>
                    Ingen kontaktopplysninger eller svar ble sendt eller lagret. Skjemaet er nå tømt.
                </LocalAlert.Content>
            </LocalAlert>
            <Button as={Link} href={`/stillinger/stilling/${stillingId}`} variant="secondary">
                Tilbake til stillingen
            </Button>
        </VStack>
    );
}
