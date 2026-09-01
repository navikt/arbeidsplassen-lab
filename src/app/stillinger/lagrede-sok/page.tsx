import type { Metadata } from "next";
import LagredeSok from "./_components/LagredeSok";

export const metadata: Metadata = {
    title: "Lagrede søk – Ledige stillinger",
    description: "Søk du har lagret midlertidig i Arbeidsplassen Lab.",
};

export default function LagredeSokPage() {
    return <LagredeSok />;
}
