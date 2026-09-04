import type { Metadata } from "next";
import FigmaMakeHome from "./FigmaMakeHome";
import Home from "./Home";

export const metadata: Metadata = {
    title: {
        absolute: "Arbeidsplassen Lab — Alle ledige jobber, samlet på én plass",
    },
};

export default function Page() {
    return process.env.FIGMA_MAKE_EDITABLE === "true" ? <FigmaMakeHome /> : <Home />;
}
