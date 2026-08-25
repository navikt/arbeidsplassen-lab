import type { Metadata } from "next";
import StillingsSok from "./_components/StillingsSok";

export const metadata: Metadata = {
    title: "Ledige stillinger",
    description: "Søk etter ledige jobber. Her har vi samlet ledige stillinger fra hele Norge.",
};

export default function StillingerPage() {
    return <StillingsSok />;
}
