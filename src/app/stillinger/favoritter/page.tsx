import type { Metadata } from "next";
import Favoritter from "./_components/Favoritter";

export const metadata: Metadata = {
    title: "Favoritter – Ledige stillinger",
    description: "Stillinger du har merket som favoritter i Arbeidsplassen Lab.",
};

export default function FavoritterPage() {
    return <Favoritter />;
}
