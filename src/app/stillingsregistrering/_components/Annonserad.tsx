"use client";

import { Link as AkselLink, BodyShort, Box, Heading, HStack, Stack, Tag } from "@navikt/ds-react";
import NextLink from "next/link";
import { useState } from "react";
import { formatAdvertUpdatedAt, getAdvertStatus } from "../_lib/formatAdvert";
import type { Advert } from "../_lib/types";
import Annonsemeny from "./Annonsemeny";
import SlettAnnonseModal from "./SlettAnnonseModal";

type AnnonseradProps = {
    advert: Advert;
    onCopy: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function Annonserad({ advert, onCopy, onDelete }: AnnonseradProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const title = advert.form.overskrift.trim() || "Overskrift mangler";
    const status = getAdvertStatus(advert.status);

    return (
        <>
            <Box paddingBlock="space-24" borderWidth="0 0 1 0" borderColor="neutral-subtle">
                <BodyShort size="small" textColor="subtle" spacing>
                    {formatAdvertUpdatedAt(advert.updatedAt)}
                </BodyShort>
                <Stack
                    wrap={false}
                    direction={{ xs: "column", md: "row" }}
                    gap="space-16"
                    align="start"
                    justify="space-between"
                >
                    <AkselLink
                        as={NextLink}
                        href={`/stillingsregistrering/rediger/${advert.id}/steg/${advert.lastVisitedStep}`}
                    >
                        <Heading level="2" size="small">
                            {title}
                        </Heading>
                    </AkselLink>
                    <Annonsemeny
                        id={advert.id}
                        lastVisitedStep={advert.lastVisitedStep}
                        onCopy={() => onCopy(advert.id)}
                        onDelete={() => setDeleteModalOpen(true)}
                    />
                </Stack>
                <HStack paddingBlock="space-16 space-0">
                    <Tag variant="moderate" data-color={status.color} size="small">
                        {status.label}
                    </Tag>
                </HStack>
            </Box>
            <SlettAnnonseModal
                open={deleteModalOpen}
                title={advert.form.overskrift}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    onDelete(advert.id);
                    setDeleteModalOpen(false);
                }}
            />
        </>
    );
}
