import { notFound } from "next/navigation";
import { mockStillinger } from "@/mock/stillinger";
import StillingDetaljer from "./StillingDetaljer";

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    return mockStillinger.map((s) => ({ id: s.id }));
}

export async function generateMetadata(props: PageProps) {
    const { id } = await props.params;
    const stilling = mockStillinger.find((s) => s.id === id);
    if (!stilling) {
        return { title: "Stilling ikke funnet" };
    }
    return {
        title: stilling.title,
        description: `${stilling.title} hos ${stilling.employer.name}`,
    };
}

export default async function StillingPage(props: PageProps) {
    const { id } = await props.params;
    const stilling = mockStillinger.find((s) => s.id === id);

    if (!stilling) {
        notFound();
    }

    return <StillingDetaljer stilling={stilling} />;
}
