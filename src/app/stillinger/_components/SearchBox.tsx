"use client";

import { ClockDashedIcon, FloppydiskIcon, HeartIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack, UNSAFE_Combobox, VStack } from "@navikt/ds-react";
import Link from "next/link";
import { useState } from "react";
import { validateSearchTerm } from "@/app/stillinger/_lib/filterStillinger";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";
import { mockFilters } from "@/mock/stillinger/filtre";
import SaveSearchModal from "./SaveSearchModal";
import styles from "./SearchBox.module.css";

const searchOptions = [...new Set([...mockFilters.locations, ...mockFilters.occupations].map((option) => option.label))]
    .sort((a, b) => a.localeCompare(b, "nb"))
    .map((option) => ({ label: option, value: option }));

function SearchBox() {
    const { state, setTerms, resetSearch, saveCurrentSearch, hasActiveCriteria } = useStillingerState();
    const [searchError, setSearchError] = useState<string>();
    const [saveSearchOpen, setSaveSearchOpen] = useState(false);
    const [savedMessage, setSavedMessage] = useState("");

    function toggleTerm(option: string, isSelected: boolean, isCustomOption: boolean) {
        setSearchError(undefined);

        if (isSelected && isCustomOption) {
            const error = validateSearchTerm(option);
            if (error) {
                setSearchError(error);
                return;
            }
        }

        const terms = isSelected
            ? [...state.criteria.terms, option]
            : state.criteria.terms.filter((term) => term !== option);
        setTerms([...new Set(terms)]);
    }

    return (
        <Box paddingBlock={{ xs: "space-0 space-24", lg: "space-40 space-48" }}>
            <Box
                paddingInline={{ xs: "space-16", md: "space-32" }}
                paddingBlock={{ xs: "space-16", md: "space-24" }}
                borderRadius={{ lg: "8" }}
                maxWidth={{ lg: "800px" }}
                className={styles.searchContainer}
            >
                <HStack justify="space-between" align="center" gap="space-16">
                    <Heading level="1" size="large">
                        Søk etter jobber
                    </Heading>
                    <HStack gap="space-4">
                        <Button
                            as={Link}
                            href="/stillinger/lagrede-sok"
                            variant="tertiary"
                            icon={<ClockDashedIcon aria-hidden />}
                            size="small"
                        >
                            Lagrede søk
                        </Button>
                        <Button
                            as={Link}
                            href="/stillinger/favoritter"
                            variant="tertiary"
                            icon={<HeartIcon aria-hidden />}
                            size="small"
                        >
                            Favoritter
                        </Button>
                    </HStack>
                </HStack>

                <BodyShort>
                    <Link href="/artikler/om-arbeidsplassen">Slik bruker du søket for best resultat</Link>
                </BodyShort>

                <VStack gap="space-12" paddingBlock="space-24 space-0">
                    <UNSAFE_Combobox
                        label="Legg til sted, yrker og andre søkeord"
                        options={searchOptions}
                        allowNewValues
                        shouldAutocomplete
                        isMultiSelect
                        selectedOptions={state.criteria.terms}
                        onToggleSelected={toggleTerm}
                        error={searchError}
                    />

                    {hasActiveCriteria && (
                        <HStack justify="end" gap="space-8">
                            <Button
                                type="button"
                                variant="tertiary"
                                size="small"
                                icon={<FloppydiskIcon aria-hidden />}
                                onClick={() => setSaveSearchOpen(true)}
                            >
                                Lagre søk
                            </Button>
                            <Button
                                type="button"
                                variant="tertiary"
                                size="small"
                                onClick={() => {
                                    resetSearch();
                                    setSearchError(undefined);
                                    setSavedMessage("");
                                }}
                            >
                                Nullstill
                            </Button>
                        </HStack>
                    )}

                    {savedMessage && (
                        <BodyShort role="status" className={styles.savedMessage}>
                            {savedMessage}
                        </BodyShort>
                    )}
                </VStack>
            </Box>

            <SaveSearchModal
                open={saveSearchOpen}
                onClose={() => setSaveSearchOpen(false)}
                onSave={(name) => {
                    saveCurrentSearch(name);
                    setSavedMessage(`Søket «${name}» er lagret i denne nettleseren.`);
                }}
            />
        </Box>
    );
}

export default SearchBox;
