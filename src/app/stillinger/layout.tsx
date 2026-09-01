import type { ReactNode } from "react";
import StillingerStorageAlert from "./_components/StillingerStorageAlert";
import { StillingerStateProvider } from "./_state/StillingerStateProvider";

export default function StillingerLayout({ children }: { children: ReactNode }) {
    return (
        <StillingerStateProvider>
            <StillingerStorageAlert />
            {children}
        </StillingerStateProvider>
    );
}
