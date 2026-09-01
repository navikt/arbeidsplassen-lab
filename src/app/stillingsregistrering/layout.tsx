import type { ReactNode } from "react";
import SimulatedAuthGate from "./_components/SimulatedAuthGate";
import StillingsregistreringProvider from "./_state/StillingsregistreringProvider";

export default function StillingsregistreringLayout({ children }: { children: ReactNode }) {
    return (
        <StillingsregistreringProvider>
            <SimulatedAuthGate>{children}</SimulatedAuthGate>
        </StillingsregistreringProvider>
    );
}
