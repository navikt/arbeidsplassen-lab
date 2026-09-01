import { Buildings3Icon, LocationPinIcon } from "@navikt/aksel-icons";
import { BodyShort, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import Link from "next/link";
import { formatDeadline, formatPublished } from "@/app/stillinger/_lib/formatStilling";
import type { Stilling } from "@/app/stillinger/_lib/types";
import FavoriteButton from "./FavoriteButton";

type SearchResultItemProps = {
    stilling: Stilling;
    hideFavorite?: boolean;
    headingLevel?: "2" | "3";
};

export default function SearchResultItem({
    stilling,
    hideFavorite = false,
    headingLevel = "2",
}: SearchResultItemProps) {
    const location = [stilling.location.city, stilling.location.county].filter(Boolean).join(", ");
    const deadline = formatDeadline(stilling);

    return (
        <HStack
            as="article"
            gap="space-12"
            justify="space-between"
            wrap={false}
            aria-label={`${stilling.title}, ${stilling.employer.name}, ${location}`}
        >
            <VStack gap="space-12">
                <VStack gap="space-4">
                    <BodyShort weight="semibold" size="small" textColor="subtle">
                        {formatPublished(stilling)}
                    </BodyShort>
                    <Heading level={headingLevel} size="small" className="overflow-wrap-anywhere">
                        <Link href={`/stillinger/stilling/${stilling.id}`} className="purple-when-visited">
                            {stilling.title}
                        </Link>
                    </Heading>
                    {stilling.title.trim() !== stilling.jobTitle.trim() && (
                        <BodyShort weight="semibold" className="overflow-wrap-anywhere">
                            {stilling.jobTitle}
                        </BodyShort>
                    )}
                </VStack>

                <VStack gap="space-4">
                    <HStack gap="space-8" wrap={false} align="center">
                        <Buildings3Icon fontSize="1.5rem" aria-hidden="true" />
                        <BodyShort>{stilling.employer.name}</BodyShort>
                    </HStack>
                    {location && (
                        <HStack gap="space-8" wrap={false} align="center">
                            <LocationPinIcon fontSize="1.5rem" aria-hidden="true" />
                            <BodyShort>{location}</BodyShort>
                        </HStack>
                    )}
                </VStack>

                <HStack gap="space-16" align="center">
                    {stilling.application.type === "superrask" && (
                        <Tag size="small" variant="moderate" data-color="accent">
                            Superrask søknad
                        </Tag>
                    )}
                    {deadline && (
                        <BodyShort weight="semibold" size="small" textColor="subtle">
                            {deadline}
                        </BodyShort>
                    )}
                </HStack>
            </VStack>
            {!hideFavorite && <FavoriteButton id={stilling.id} hideText />}
        </HStack>
    );
}
