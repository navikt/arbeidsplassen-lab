import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockStilling, mockStillinger } from "@/mock/stillinger/annonser";
import SuperraskSoknad from "./_components/SuperraskSoknad";

type PageProps = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    return mockStillinger
        .filter((stilling) => stilling.application.type === "superrask")
        .map((stilling) => ({ id: stilling.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const stilling = getMockStilling(id);

    return {
        title: stilling ? `Superrask søknad – ${stilling.title}` : "Superrask søknad",
        description: "Simulert superrask søknad i Arbeidsplassen Lab.",
    };
}

export default async function SuperraskSoknadPage({ params }: PageProps) {
    const { id } = await params;
    const stilling = getMockStilling(id);

    if (stilling?.application.type !== "superrask") {
        notFound();
    }

    return <SuperraskSoknad stilling={stilling} applicationForm={stilling.application.form} />;
}
