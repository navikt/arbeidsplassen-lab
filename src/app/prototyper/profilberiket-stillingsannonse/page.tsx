import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEmployerBadgeResults, getPublicBadgeResults } from "@/app/_common/bedriftsprofil/badges";
import {
    createDefaultEmployerProfile,
    mockEmployerActivity,
    profileReferenceDate,
} from "@/app/_common/bedriftsprofil/profile";
import StillingerStorageAlert from "@/app/stillinger/_components/StillingerStorageAlert";
import { StillingerStateProvider } from "@/app/stillinger/_state/StillingerStateProvider";
import { getMockStilling, getSimilarStillinger } from "@/mock/stillinger/annonser";
import ProfilberiketStillingsannonse from "./_components/ProfilberiketStillingsannonse";
import ProfilSnapshotProvider from "./_state/ProfilSnapshotProvider";

export const metadata: Metadata = {
    title: "Profilberiket stillingsannonse",
    description: "Prototype på en stillingsannonse med visuell bedriftsprofil og aktivitetsmerker",
};

const prototypeJobId = "lavvo-kafemedarbeider";

export default function ProfilberiketStillingsannonsePage() {
    const stilling = getMockStilling(prototypeJobId);

    if (!stilling) {
        notFound();
    }

    const badges = getPublicBadgeResults(getEmployerBadgeResults(mockEmployerActivity, profileReferenceDate));

    return (
        <StillingerStateProvider>
            <StillingerStorageAlert />
            <ProfilSnapshotProvider initialProfile={createDefaultEmployerProfile()}>
                <ProfilberiketStillingsannonse
                    stilling={stilling}
                    similarStillinger={getSimilarStillinger(stilling)}
                    badges={badges}
                />
            </ProfilSnapshotProvider>
        </StillingerStateProvider>
    );
}
