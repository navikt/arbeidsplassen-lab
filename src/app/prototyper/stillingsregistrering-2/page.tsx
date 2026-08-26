import type { Metadata } from "next";
import StillingsregistreringArbeidsflate from "./_components/StillingsregistreringArbeidsflate";

export const metadata: Metadata = {
    title: "Stillingsregistrering 2.0",
    description: "Prototype av forbedret stillingsregistrering med live forhåndsvisning og kontekstuelle tips",
};

export default function StillingsregistreringPage() {
    return <StillingsregistreringArbeidsflate />;
}
