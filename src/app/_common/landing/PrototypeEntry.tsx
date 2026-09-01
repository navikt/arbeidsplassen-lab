import { BodyLong, Box, Button, Heading, HGrid } from "@navikt/ds-react";
import styles from "./LandingPages.module.css";

export default function PrototypeEntry() {
    return (
        <Box
            as="section"
            aria-labelledby="prototype-entry-title"
            borderRadius="12"
            padding={{ xs: "space-20", md: "space-32" }}
            className={styles.prototypeEntry}
        >
            <HGrid columns={{ xs: 1, sm: "minmax(0, 1fr) auto" }} gap="space-24" align="center">
                <div>
                    <Heading id="prototype-entry-title" level="2" size="medium" spacing>
                        Nysgjerrig på hva vi tester i laben?
                    </Heading>
                    <BodyLong>
                        Utforsk nye konsepter og alternative flyter før de eventuelt finner veien videre.
                    </BodyLong>
                </div>
                <Button as="a" href="/prototyper" variant="secondary">
                    Se prototyper
                </Button>
            </HGrid>
        </Box>
    );
}
