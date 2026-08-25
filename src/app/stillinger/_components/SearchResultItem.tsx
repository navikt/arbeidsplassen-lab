import { Buildings3Icon, LocationPinIcon } from "@navikt/aksel-icons";
import { BodyShort, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import Link from "next/link";
import type { Stilling } from "@/types/stilling";

type SearchResultItemProps = {
    stilling: Stilling;
};

export default function SearchResultItem({ stilling }: SearchResultItemProps) {
    const location = [stilling.location.city, stilling.location.county].filter(Boolean).join(", ");

    return (
        <article aria-label={`${stilling.title}, ${stilling.employer.name}, ${location}`}>
            <VStack gap="space-12">
                <VStack gap="space-4">
                    <BodyShort weight="semibold" size="small" textColor="subtle">
                        {new Date(stilling.published).toLocaleDateString("nb-NO")}
                    </BodyShort>
                    <Heading level="2" size="small" className="overflow-wrap-anywhere">
                        <Link href={`/stillinger/${stilling.id}`} className="purple-when-visited">
                            {stilling.title}
                        </Link>
                    </Heading>
                    {stilling.jobTitle && stilling.title.trim() !== stilling.jobTitle.trim() && (
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
                    {stilling.extent?.map((e) => (
                        <Tag key={e} size="small" variant="neutral-moderate">
                            {e}
                        </Tag>
                    ))}
                    {stilling.applicationDue && (
                        <BodyShort weight="semibold" size="small" textColor="subtle">
                            Frist: {new Date(stilling.applicationDue).toLocaleDateString("nb-NO")}
                        </BodyShort>
                    )}
                </HStack>
            </VStack>
        </article>
    );
}
