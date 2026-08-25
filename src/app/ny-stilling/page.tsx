import type { Metadata } from "next";
import NyStillingFlyt from "./_components/NyStillingFlyt";

export const metadata: Metadata = {
    title: "Ny stillingsannonse",
    description: "Registrer en ny stillingsannonse",
};

export default function NyStillingPage() {
    return <NyStillingFlyt />;
}
