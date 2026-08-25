import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockArtikler } from "@/mock/artikler";
import ArtikkelContent from "./ArtikkelContent";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return mockArtikler.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { slug } = await props.params;
    const artikkel = mockArtikler.find((a) => a.slug === slug);
    if (!artikkel) {
        return { title: "Ikke funnet" };
    }
    return {
        title: artikkel.title,
        description: artikkel.description,
    };
}

export default async function ArtikkelPage(props: PageProps) {
    const { slug } = await props.params;
    const artikkel = mockArtikler.find((a) => a.slug === slug);

    if (!artikkel) {
        notFound();
    }

    return <ArtikkelContent artikkel={artikkel} />;
}
