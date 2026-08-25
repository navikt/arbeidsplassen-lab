import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
    title: {
        absolute: "Arbeidsplassen Lab — Alle ledige jobber, samlet på én plass",
    },
};

export default function Page() {
    return <Home />;
}
