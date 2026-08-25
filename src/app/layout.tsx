import "@navikt/ds-css/dist/global/tokens.css";
import "@navikt/ds-css/dist/global/reset.css";
import "@navikt/ds-css/dist/global/baseline.css";
import "@navikt/ds-css/dist/global/print.css";
import "@navikt/ds-css/dist/components.css";
import "@navikt/arbeidsplassen-css";
import "@navikt/arbeidsplassen-theme";
import "./styles.css";

import { Footer, SkipLink } from "@navikt/arbeidsplassen-react";
import { Page } from "@navikt/ds-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import LabHeader from "@/app/_common/components/LabHeader";
import PrototypeBanner from "@/app/_common/components/PrototypeBanner";

export const metadata: Metadata = {
    title: {
        template: "%s — Arbeidsplassen Lab",
        default: "Arbeidsplassen Lab",
    },
    description: "Prototype-playground for arbeidsplassen.no",
    robots: "noindex, nofollow",
    icons: { icon: "/favicon.png" },
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="nb" className="light">
            <body data-theme="arbeidsplassen">
                <SkipLink href="#main-content" />
                <PrototypeBanner />
                <Page contentBlockPadding="end" as="div" footer={<Footer />}>
                    <LabHeader />
                    <main id="main-content">{children}</main>
                </Page>
            </body>
        </html>
    );
}
