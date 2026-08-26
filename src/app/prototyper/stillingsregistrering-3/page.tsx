import type { Metadata } from "next";
import GuidetRegistrering from "./_components/GuidetRegistrering";

export const metadata: Metadata = {
    title: "Stillingsregistrering 3.0 — Guidet",
    description: "Prototype av guidet stillingsregistrering med assistent, kort-basert flyt og oppsummering",
};

export default function StillingsregistreringGuidetPage() {
    return <GuidetRegistrering />;
}
