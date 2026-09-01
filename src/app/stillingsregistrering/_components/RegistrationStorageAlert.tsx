"use client";

import { LocalAlert } from "@navikt/ds-react";
import { useStillingsregistrering } from "../_state/StillingsregistreringProvider";

export default function RegistrationStorageAlert() {
    const { storageMessage } = useStillingsregistrering();

    if (!storageMessage) {
        return null;
    }

    return (
        <LocalAlert status="warning">
            <LocalAlert.Header>
                <LocalAlert.Title>Endringene kan ikke lagres</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{storageMessage}</LocalAlert.Content>
        </LocalAlert>
    );
}
