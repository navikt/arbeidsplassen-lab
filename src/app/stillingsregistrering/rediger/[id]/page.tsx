import { notFound, redirect } from "next/navigation";
import { isAdvertId } from "@/app/stillingsregistrering/_lib/route";

type RedigerPageProps = {
    params: Promise<{ id: string }>;
};

export default async function RedigerPage({ params }: RedigerPageProps) {
    const { id } = await params;
    if (!isAdvertId(id)) {
        notFound();
    }
    redirect(`/stillingsregistrering/rediger/${encodeURIComponent(id)}/steg/1`);
}
