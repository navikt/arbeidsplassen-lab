import type { AdvertStatus } from "./types";

const updatedAtFormatter = new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
});

export function formatAdvertUpdatedAt(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "Sist endret tidspunkt er ukjent";
    }

    return `Sist endret ${updatedAtFormatter.format(date).replace(/(\d{2}):(\d{2})$/, "$1.$2")}`;
}

export function getAdvertStatus(status: AdvertStatus): {
    label: string;
    color: "neutral" | "info" | "success";
} {
    switch (status) {
        case "draft":
            return { label: "Påbegynt", color: "neutral" };
        case "pending":
            return { label: "Til godkjenning", color: "info" };
        case "scheduled":
            return { label: "Til publisering", color: "info" };
        case "published":
            return { label: "Publisert", color: "success" };
        case "closed":
            return { label: "Avpublisert", color: "neutral" };
    }
}
