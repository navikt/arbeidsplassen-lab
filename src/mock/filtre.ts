import type { SearchFilters } from "@/types/stilling";
import { mockStillinger } from "./stillinger";

function countByField(field: "county" | "extent" | "engagementType"): { key: string; label: string; count: number }[] {
    const counts = new Map<string, number>();

    for (const s of mockStillinger) {
        let values: string[];
        if (field === "county") {
            values = s.location.county ? [s.location.county] : [];
        } else if (field === "extent") {
            values = s.extent ?? [];
        } else {
            values = s.engagementType ? [s.engagementType] : [];
        }

        for (const v of values) {
            counts.set(v, (counts.get(v) ?? 0) + 1);
        }
    }

    return Array.from(counts.entries())
        .map(([key, count]) => ({ key, label: key, count }))
        .sort((a, b) => b.count - a.count);
}

export const mockFilters: SearchFilters = {
    locations: countByField("county"),
    occupations: [
        { key: "it", label: "IT og utvikling", count: 2 },
        { key: "helse", label: "Helse og omsorg", count: 1 },
        { key: "butikk", label: "Butikk og handel", count: 1 },
        { key: "bygg", label: "Bygg og anlegg", count: 1 },
        { key: "undervisning", label: "Undervisning", count: 1 },
        { key: "okonomi", label: "Økonomi og regnskap", count: 1 },
        { key: "restaurant", label: "Restaurant og mat", count: 1 },
        { key: "kundeservice", label: "Kundeservice", count: 1 },
        { key: "design", label: "Design og brukeropplevelse", count: 1 },
    ],
    extent: countByField("extent"),
    published: [
        { key: "now/d", label: "Nye i dag", count: 1 },
        { key: "now-3d", label: "Siste 3 dager", count: 3 },
        { key: "now-7d", label: "Siste 7 dager", count: 6 },
    ],
};
