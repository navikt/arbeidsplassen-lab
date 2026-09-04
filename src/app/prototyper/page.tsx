import { BodyLong, Detail, Heading, LinkCard, VStack } from "@navikt/ds-react";
import { LinkCardAnchor, LinkCardDescription, LinkCardFooter, LinkCardTitle } from "@navikt/ds-react/LinkCard";
import { PageBlock } from "@navikt/ds-react/Page";
import type { Metadata } from "next";

type PrototypeOverviewItem = {
    href: `/prototyper/${string}`;
    title: string;
    description: string;
    createdAt: `${number}-${number}-${number}`;
};

const prototypeDateFormatter = new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
});

const prototypes = [
    {
        href: "/prototyper/eksempel",
        title: "Eksempelprototype",
        description: "En enkel eksempelprototype som viser anbefalt struktur for nye konsepter.",
        createdAt: "2026-08-26",
    },
    {
        href: "/prototyper/bedriftsprofil",
        title: "Bedriftsprofilverkstedet",
        description:
            "Bygg en tydelig bedriftsprofil med kuraterte profilvalg, aktivitetsmerker og levende forhåndsvisning for jobbsøkere.",
        createdAt: "2026-09-04",
    },
    {
        href: "/prototyper/profilberiket-stillingsannonse",
        title: "Profilberiket stillingsannonse",
        description:
            "Se Den Grønne Dragen-annonsen med profilfarge, toppbilde, logo, arbeidsgiverløfte og aktivitetsmerker fra bedriftsprofilverkstedet.",
        createdAt: "2026-09-04",
    },
    {
        href: "/prototyper/stillingsregistrering-4",
        title: "Stillingsregistrering 4.0 — Annonseverkstedet",
        description:
            "Adaptivt skriveverksted med rekrutteringsmål, kontekstuell skrivehjelp, tekststartere, søkerblikk og en forklarbar kvalitetssjekk.",
        createdAt: "2026-08-26",
    },
] satisfies readonly PrototypeOverviewItem[];

function formatPrototypeDate(date: PrototypeOverviewItem["createdAt"]) {
    return prototypeDateFormatter.format(new Date(`${date}T12:00:00Z`));
}

export const metadata: Metadata = {
    title: "Prototyper",
    description: "Oversikt over tilgjengelige prototyper",
};

export default function PrototyperPage() {
    return (
        <PageBlock width="2xl" gutters>
            <VStack gap="space-24" paddingBlock="space-40 space-48">
                <div>
                    <Heading size="xlarge" level="1" spacing>
                        Prototyper
                    </Heading>
                    <BodyLong>
                        Her finner du prototyper og konsepter under utvikling. Hver prototype har sin egen URL og kan
                        deles for tilbakemelding og brukertesting.
                    </BodyLong>
                </div>

                {prototypes.map((prototype) => (
                    <LinkCard key={prototype.href}>
                        <LinkCardTitle>
                            <LinkCardAnchor href={prototype.href}>{prototype.title}</LinkCardAnchor>
                        </LinkCardTitle>
                        <LinkCardDescription>{prototype.description}</LinkCardDescription>
                        <LinkCardFooter>
                            <Detail as="time" dateTime={prototype.createdAt} textColor="subtle">
                                Opprettet {formatPrototypeDate(prototype.createdAt)}
                            </Detail>
                        </LinkCardFooter>
                    </LinkCard>
                ))}
            </VStack>
        </PageBlock>
    );
}
