"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { Button, Modal, VStack } from "@navikt/ds-react";
import { useState } from "react";
import FilterGroupContent, { type FilterGroupId, filterGroups } from "./FilterGroupContent";
import styles from "./MobileFilters.module.css";

type MobileFiltersProps = {
    open: boolean;
    resultCount: number;
    onClose: () => void;
};

export default function MobileFilters({ open, resultCount, onClose }: MobileFiltersProps) {
    const [selectedGroup, setSelectedGroup] = useState<FilterGroupId>();
    const selectedLabel = filterGroups.find((group) => group.id === selectedGroup)?.label;

    function close() {
        setSelectedGroup(undefined);
        onClose();
    }

    return (
        <Modal
            open={open}
            onClose={close}
            header={{ heading: selectedLabel ?? "Filtre" }}
            width="100%"
            className={styles.modal}
        >
            <Modal.Body>
                {selectedGroup ? (
                    <FilterGroupContent group={selectedGroup} />
                ) : (
                    <VStack as="nav" aria-label="Velg filter">
                        {filterGroups.map((group) => (
                            <Button
                                key={group.id}
                                type="button"
                                variant="tertiary"
                                className={styles.menuButton}
                                icon={<ChevronRightIcon aria-hidden />}
                                iconPosition="right"
                                onClick={() => setSelectedGroup(group.id)}
                            >
                                {group.label}
                            </Button>
                        ))}
                    </VStack>
                )}
            </Modal.Body>
            <Modal.Footer>
                {selectedGroup && (
                    <Button
                        type="button"
                        variant="tertiary"
                        icon={<ChevronLeftIcon aria-hidden />}
                        onClick={() => setSelectedGroup(undefined)}
                    >
                        Tilbake
                    </Button>
                )}
                <Button type="button" onClick={close}>
                    Vis {resultCount} treff
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
