"use client";

import { Header } from "@navikt/arbeidsplassen-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { usePathname } from "next/navigation";
import LabBadge from "@/app/_common/components/LabBadge/LabBadge";

function getActiveMenuItem(pathname: string) {
    if (pathname.startsWith("/stillinger")) {
        return "ledige-stillinger" as const;
    }
    return undefined;
}

export default function LabHeader() {
    const pathname = usePathname();
    const isCompanyPage = pathname.startsWith("/ny-stilling");

    return (
        <PageBlock width="2xl" gutters>
            <LabBadge />
            <Header
                variant={isCompanyPage ? "company" : "person"}
                active={getActiveMenuItem(pathname)}
                authenticationStatus="not-authenticated"
                onLogin={() => {}}
                onLogout={() => {}}
            />
        </PageBlock>
    );
}
