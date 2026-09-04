import type { Active, Variant } from "@navikt/arbeidsplassen-react";

export type LabHeaderConfig = {
    active?: Active;
    variant: Variant;
};

function matchesPathSegment(pathname: string, route: string) {
    return pathname === route || pathname.startsWith(`${route}/`);
}

export function getLabHeaderConfig(pathname: string): LabHeaderConfig {
    const isCompanyPage = ["/bedrift", "/ny-stilling", "/stillingsregistrering", "/prototyper/bedriftsprofil"].some(
        (route) => matchesPathSegment(pathname, route),
    );

    if (isCompanyPage) {
        return {
            variant: "company",
            active:
                matchesPathSegment(pathname, "/stillingsregistrering") && pathname !== "/stillingsregistrering"
                    ? "stillingsannonser"
                    : undefined,
        };
    }

    if (matchesPathSegment(pathname, "/ung")) {
        return { variant: "person", active: "ung" };
    }

    if (matchesPathSegment(pathname, "/stillinger")) {
        return { variant: "person", active: "ledige-stillinger" };
    }

    return { variant: "person" };
}
