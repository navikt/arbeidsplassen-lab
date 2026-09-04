"use client";

import { LocalAlert } from "@navikt/ds-react";
import { useProfilSnapshot } from "../_state/ProfilSnapshotProvider";

export default function ProfilStorageAlert() {
    const { storageError } = useProfilSnapshot();

    if (!storageError) {
        return null;
    }

    return (
        <LocalAlert status="warning" size="small" as="div">
            <LocalAlert.Header>
                <LocalAlert.Title as="div">Kunne ikke lese lagret bedriftsprofil</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{storageError} Standardprofilen vises i stedet.</LocalAlert.Content>
        </LocalAlert>
    );
}
