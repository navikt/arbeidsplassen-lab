import type { Metadata } from "next";
import Stillingsannonser from "../_components/Stillingsannonser";

export const metadata: Metadata = {
    title: "Stillingsannonser",
    description: "Lag og administrer lokale stillingsannonser",
};

export default function StillingsannonserPage() {
    return <Stillingsannonser />;
}
