import { Box, VStack } from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import type { EmployerBadgeResult } from "@/app/_common/bedriftsprofil/types";
import type { Stilling } from "@/app/stillinger/_lib/types";
import Annonsedata from "@/app/stillinger/stilling/[id]/_components/Annonsedata";
import Annonseinnhold from "@/app/stillinger/stilling/[id]/_components/Annonseinnhold";
import DelAnnonse from "@/app/stillinger/stilling/[id]/_components/DelAnnonse";
import Kontaktperson from "@/app/stillinger/stilling/[id]/_components/Kontaktperson";
import LignendeAnnonser from "@/app/stillinger/stilling/[id]/_components/LignendeAnnonser";
import styles from "./ProfilberiketStillingsannonse.module.css";
import ProfilertAnnonsehero from "./ProfilertAnnonsehero";
import ProfilertArbeidsgiver from "./ProfilertArbeidsgiver";
import ProfilertSoknadspanel from "./ProfilertSoknadspanel";
import ProfilertStillingsfakta from "./ProfilertStillingsfakta";
import ProfilStorageAlert from "./ProfilStorageAlert";

export default function ProfilberiketStillingsannonse({
    stilling,
    similarStillinger,
    badges,
}: {
    stilling: Stilling;
    similarStillinger: Stilling[];
    badges: EmployerBadgeResult[];
}) {
    return (
        <PageBlock width="xl" gutters>
            <Box
                paddingBlock={{
                    xs: "space-24 space-48",
                    md: "space-40 space-64",
                    lg: "space-24 space-64",
                }}
            >
                <VStack gap="space-24">
                    <ProfilStorageAlert />

                    <article aria-labelledby="profilert-stilling-heading">
                        <VStack gap={{ xs: "space-24", md: "space-32", lg: "space-24" }}>
                            <ProfilertAnnonsehero stilling={stilling} badges={badges} />

                            <div className={styles.mainGrid}>
                                <div className={styles.factsArea}>
                                    <ProfilertStillingsfakta stilling={stilling} />
                                </div>

                                <aside className={styles.applicationColumn} aria-label="Søknad">
                                    <ProfilertSoknadspanel stilling={stilling} />
                                </aside>

                                <div className={styles.contentColumn}>
                                    <Box
                                        background="default"
                                        borderColor="neutral-subtle"
                                        borderWidth="1"
                                        borderRadius="16"
                                        padding={{ xs: "space-20", md: "space-32" }}
                                    >
                                        <Annonseinnhold sections={stilling.sections} />
                                    </Box>

                                    <ProfilertArbeidsgiver badges={badges} employer={stilling.employer} />

                                    <Box
                                        background="default"
                                        borderColor="neutral-subtle"
                                        borderWidth="1"
                                        borderRadius="16"
                                        padding={{ xs: "space-20", md: "space-32" }}
                                    >
                                        <Kontaktperson contacts={stilling.contactList} />
                                        <DelAnnonse id={stilling.id} />
                                        <Annonsedata stilling={stilling} />
                                    </Box>

                                    <Box
                                        background="default"
                                        borderColor="neutral-subtle"
                                        borderWidth="1"
                                        borderRadius="16"
                                        padding={{ xs: "space-20", md: "space-32" }}
                                    >
                                        <LignendeAnnonser stillinger={similarStillinger} />
                                    </Box>
                                </div>
                            </div>
                        </VStack>
                    </article>
                </VStack>
            </Box>
        </PageBlock>
    );
}
