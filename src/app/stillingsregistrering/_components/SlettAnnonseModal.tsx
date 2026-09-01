"use client";

import { BodyLong, Button, Modal } from "@navikt/ds-react";

type SlettAnnonseModalProps = {
    open: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
};

export default function SlettAnnonseModal({ open, title, onClose, onConfirm }: SlettAnnonseModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{ heading: "Slett stillingsannonsen?", closeButton: false }}
            width="small"
        >
            <Modal.Body>
                <BodyLong>
                    «{title || "Overskrift mangler"}» slettes fra denne nettleseren. Handlingen kan ikke angres.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" data-color="danger" onClick={onConfirm}>
                    Slett
                </Button>
                <Button type="button" variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
