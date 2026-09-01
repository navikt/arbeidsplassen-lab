"use client";

import { Header } from "@navikt/arbeidsplassen-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { usePathname } from "next/navigation";
import { useSimulatedAuth } from "@/app/_common/auth/SimulatedAuthProvider";
import { getLabHeaderConfig } from "@/app/_common/components/headerConfig";
import LabBadge from "@/app/_common/components/LabBadge/LabBadge";

export default function LabHeader() {
    const pathname = usePathname();
    const { status, login, logout } = useSimulatedAuth();
    const { active, variant } = getLabHeaderConfig(pathname);
    const isCompanyPage = variant === "company";

    return (
        <PageBlock width="2xl" gutters>
            <LabBadge />
            <Header
                variant={variant}
                active={active}
                authenticationStatus={isCompanyPage ? status : "not-authenticated"}
                onLogin={isCompanyPage ? login : () => {}}
                onLogout={isCompanyPage ? logout : () => {}}
            />
        </PageBlock>
    );
}
