"use client";

import { Button, Modal, TextField } from "@navikt/ds-react";
import { type FormEvent, useState } from "react";

type SaveSearchModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
};

const FORM_ID = "save-search-form";

export default function SaveSearchModal({ open, onClose, onSave }: SaveSearchModalProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState<string>();

    function close() {
        setName("");
        setError(undefined);
        onClose();
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("Navn må fylles ut");
            return;
        }

        if (trimmedName.length > 100) {
            setError("Navnet kan ikke være lengre enn 100 tegn");
            return;
        }

        onSave(trimmedName);
        close();
    }

    return (
        <Modal open={open} onClose={close} header={{ heading: "Lagre søk" }} width="medium">
            <Modal.Body>
                <form id={FORM_ID} onSubmit={submit}>
                    <TextField
                        label="Navn"
                        description="Må fylles ut"
                        value={name}
                        maxLength={100}
                        onChange={(event) => {
                            setName(event.target.value);
                            setError(undefined);
                        }}
                        error={error}
                        autoComplete="off"
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form={FORM_ID}>
                    Lagre søk
                </Button>
                <Button type="button" variant="secondary" onClick={close}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
