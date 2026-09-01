import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AnnonseFlyt from "@/app/stillingsregistrering/_components/AnnonseFlyt";
import { isAdvertId } from "@/app/stillingsregistrering/_lib/route";

export const metadata: Metadata = {
    title: "Ny stillingsannonse",
    description: "Lag eller rediger en lokal stillingsannonse",
};

const validSteps = new Set(["1", "2", "3", "4", "5"]);

type EditorPageProps = {
    params: Promise<{ id: string; steg: string }>;
};

export default async function EditorPage({ params }: EditorPageProps) {
    const { id, steg } = await params;

    if (!isAdvertId(id)) {
        notFound();
    }

    if (!validSteps.has(steg)) {
        redirect(`/stillingsregistrering/rediger/${encodeURIComponent(id)}/steg/1`);
    }

    return <AnnonseFlyt advertId={id} currentStep={Number(steg)} />;
}
