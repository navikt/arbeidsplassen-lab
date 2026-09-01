"use client";

import { FilesIcon, MenuElipsisVerticalIcon, PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import Link from "next/link";

type AnnonsemenyProps = {
    id: string;
    lastVisitedStep: number;
    onCopy: () => void;
    onDelete: () => void;
};

export default function Annonsemeny({ id, lastVisitedStep, onCopy, onDelete }: AnnonsemenyProps) {
    return (
        <ActionMenu>
            <ActionMenu.Trigger>
                <Button
                    size="small"
                    variant="tertiary"
                    icon={<MenuElipsisVerticalIcon aria-hidden="true" />}
                    iconPosition="right"
                >
                    Administrer annonse
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.Group aria-label="Handlinger for stillingsannonsen">
                    <ActionMenu.Item
                        as={Link}
                        href={`/stillingsregistrering/rediger/${id}/steg/${lastVisitedStep}`}
                        icon={<PencilIcon />}
                    >
                        Endre
                    </ActionMenu.Item>
                    <ActionMenu.Item onSelect={onCopy} icon={<FilesIcon />}>
                        Kopier som ny
                    </ActionMenu.Item>
                    <ActionMenu.Item variant="danger" onSelect={onDelete} icon={<TrashIcon />}>
                        Slett
                    </ActionMenu.Item>
                </ActionMenu.Group>
            </ActionMenu.Content>
        </ActionMenu>
    );
}
