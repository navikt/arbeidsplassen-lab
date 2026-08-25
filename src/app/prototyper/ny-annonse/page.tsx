import type { Metadata } from "next";
import NyAnnonseFlyt from "./_components/NyAnnonseFlyt";

export const metadata: Metadata = {
    title: "Ny stillingsannonse (prototype)",
    description: "Prototype av stillingsregistrering med 5 steg",
};

export default function NyAnnonsePage() {
    return <NyAnnonseFlyt />;
}
