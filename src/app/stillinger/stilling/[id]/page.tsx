import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockStilling, getSimilarStillinger, mockStillinger } from "@/mock/stillinger/annonser";
import StillingDetaljer from "./_components/StillingDetaljer";

type PageProps = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    return mockStillinger.map((stilling) => ({ id: stilling.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const stilling = getMockStilling(id);

    if (!stilling) {
        return { title: "Stilling ikke funnet" };
    }

    return {
        title: stilling.title,
        description: stilling.shortSummary ?? `${stilling.title} hos ${stilling.employer.name}`,
    };
}

export default async function StillingPage({ params }: PageProps) {
    const { id } = await params;
    const stilling = getMockStilling(id);

    if (!stilling) {
        notFound();
    }

    return <StillingDetaljer stilling={stilling} similarStillinger={getSimilarStillinger(stilling)} />;
}
