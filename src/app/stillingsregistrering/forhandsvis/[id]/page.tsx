import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnnonsePreview from "../../_components/AnnonsePreview";
import { isAdvertId } from "../../_lib/route";

export const metadata: Metadata = {
    title: "Forhåndsvis stillingsannonse",
};

type ForhandsvisningPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ForhandsvisningPage({ params }: ForhandsvisningPageProps) {
    const { id } = await params;
    if (!isAdvertId(id)) {
        notFound();
    }
    return <AnnonsePreview advertId={id} />;
}
