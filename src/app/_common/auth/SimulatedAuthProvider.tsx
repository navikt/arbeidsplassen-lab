"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readSimulatedAuth, SIMULATED_AUTH_STORAGE_KEY, writeSimulatedAuth } from "./simulatedAuthStorage";

export type SimulatedAuthStatus = "unknown" | "is-authenticated" | "not-authenticated";

type SimulatedAuthContextValue = {
    status: SimulatedAuthStatus;
    storageMessage?: string;
    login: () => void;
    logout: () => void;
};

const SimulatedAuthContext = createContext<SimulatedAuthContextValue | null>(null);

export default function SimulatedAuthProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<SimulatedAuthStatus>("unknown");
    const [storageMessage, setStorageMessage] = useState<string>();

    useEffect(() => {
        const result = readSimulatedAuth(window.localStorage);
        if (result.ok) {
            setStatus(result.value ? "is-authenticated" : "not-authenticated");
            return;
        }

        setStorageMessage(result.message);
        setStatus("not-authenticated");
    }, []);

    useEffect(() => {
        const syncAcrossTabs = (event: StorageEvent) => {
            if (event.key !== SIMULATED_AUTH_STORAGE_KEY) {
                return;
            }

            const result = readSimulatedAuth(window.localStorage);
            if (result.ok) {
                setStorageMessage(undefined);
                setStatus(result.value ? "is-authenticated" : "not-authenticated");
            } else {
                setStorageMessage(result.message);
                setStatus("not-authenticated");
            }
        };

        window.addEventListener("storage", syncAcrossTabs);
        return () => window.removeEventListener("storage", syncAcrossTabs);
    }, []);

    const updateStatus = useCallback((authenticated: boolean) => {
        setStatus(authenticated ? "is-authenticated" : "not-authenticated");
        const result = writeSimulatedAuth(window.localStorage, authenticated);
        setStorageMessage(result.ok ? undefined : result.message);
    }, []);

    const value = useMemo<SimulatedAuthContextValue>(
        () => ({
            status,
            storageMessage,
            login: () => updateStatus(true),
            logout: () => updateStatus(false),
        }),
        [status, storageMessage, updateStatus],
    );

    return <SimulatedAuthContext.Provider value={value}>{children}</SimulatedAuthContext.Provider>;
}

export function useSimulatedAuth() {
    const context = useContext(SimulatedAuthContext);
    if (!context) {
        throw new Error("useSimulatedAuth må brukes innenfor SimulatedAuthProvider");
    }
    return context;
}
