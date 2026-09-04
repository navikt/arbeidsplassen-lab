import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMockStilling } from "@/mock/stillinger/annonser";
import BedriftsprofilArbeidsflate from "./_components/BedriftsprofilArbeidsflate";

export const metadata: Metadata = {
    title: "Bedriftsprofilverkstedet",
    description: "Prototype for å bygge og forhåndsvise en offentlig bedriftsprofil",
};

const profileJobId = "lavvo-kafemedarbeider";

export default function BedriftsprofilPage() {
    const stilling = getMockStilling(profileJobId);

    if (!stilling) {
        notFound();
    }

    const location = [stilling.location.address, stilling.location.city].filter(Boolean).join(", ");

    return (
        <BedriftsprofilArbeidsflate
            job={{
                id: stilling.id,
                title: stilling.title,
                jobTitle: stilling.jobTitle,
                location,
                engagementType: stilling.engagementType,
                extent: stilling.extent.join(" og "),
                href: `/stillinger/stilling/${stilling.id}`,
            }}
        />
    );
}
