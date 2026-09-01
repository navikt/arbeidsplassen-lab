import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PubliseringFerdig from "../../_components/PubliseringFerdig";
import { isAdvertId } from "../../_lib/route";

export const metadata: Metadata = {
    title: "Stillingsannonsen er publisert",
};

type PubliseringFerdigPageProps = {
    params: Promise<{ id: string }>;
};

export default async function PubliseringFerdigPage({ params }: PubliseringFerdigPageProps) {
    const { id } = await params;
    if (!isAdvertId(id)) {
        notFound();
    }
    return <PubliseringFerdig advertId={id} />;
}
