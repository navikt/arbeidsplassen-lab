import { BodyShort, Box, Heading, HStack, Search, VStack } from "@navikt/ds-react";
import Link from "next/link";
import styles from "./SearchBox.module.css";

type SearchBoxProps = {
    query: string;
    setQuery: (query: string) => void;
};
function SearchBox({ query, setQuery }: SearchBoxProps) {
    return (
        <Box
            paddingInline={{ xs: "space-16", md: "space-32" }}
            paddingBlock={{ xs: "space-16", md: "space-24" }}
            borderRadius={{ lg: "8" }}
            maxWidth={{ lg: "800px" }}
            className={`${styles["search-container"]} bg-brand-green-subtle`}
        >
            <HStack justify="space-between" align="center" className="mb-1">
                <Heading level="1" size="large">
                    Søk etter jobber
                </Heading>
                {/*<LoggedInButtons />*/}
            </HStack>

            <BodyShort>
                <Link href="/slik-bruker-du-det-nye-soket">Slik bruker du søket for best resultat</Link>
            </BodyShort>
            <VStack gap="space-16" paddingBlock="space-24 space-16">
                <HStack gap="space-8" align="end">
                    <Search
                        label="Legg til sted, yrker og andre søkeord"
                        hideLabel={false}
                        variant="primary"
                        value={query}
                        onChange={setQuery}
                        onClear={() => setQuery("")}
                        className="flex-1"
                    />
                </HStack>
            </VStack>
        </Box>
    );
}

export default SearchBox;
