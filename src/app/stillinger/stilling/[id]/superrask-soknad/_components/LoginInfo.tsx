"use client";

import { BodyLong, Box, Button, Heading, List, Modal, VStack } from "@navikt/ds-react";
import { useState } from "react";

export default function LoginInfo() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box borderRadius="2" padding={{ xs: "space-16", md: "space-32" }} className="bg-brand-peach-subtle">
                <VStack gap="space-12" align="start">
                    <Heading level="2" size="small">
                        Få mer ut av søknaden
                    </Heading>
                    <List>
                        <List.Item>Få full oversikt over søknadene du har sendt.</List.Item>
                        <List.Item>Vis arbeidsgivere at du er en ekte person.</List.Item>
                    </List>
                    <Button type="button" variant="secondary" size="small" onClick={() => setOpen(true)}>
                        Logg inn
                    </Button>
                </VStack>
            </Box>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                header={{ heading: "Innlogging er ikke tilgjengelig" }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>
                        Arbeidsplassen Lab har ingen autentisering. Du kan fullføre den simulerte søknaden uten å logge
                        inn.
                    </BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={() => setOpen(false)}>
                        Fortsett uten innlogging
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
