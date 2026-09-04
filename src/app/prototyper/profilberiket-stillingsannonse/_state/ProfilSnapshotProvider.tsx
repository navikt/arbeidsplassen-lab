"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { readProfileStorage } from "@/app/_common/bedriftsprofil/profileStorage";
import type { EmployerProfile } from "@/app/_common/bedriftsprofil/types";

type ProfilSnapshotContextValue = {
    profile: EmployerProfile;
    storageReady: boolean;
    storageError?: string;
};

const ProfilSnapshotContext = createContext<ProfilSnapshotContextValue | null>(null);

function cloneProfile(profile: EmployerProfile): EmployerProfile {
    return {
        ...profile,
        highlights: [...profile.highlights],
    };
}

export default function ProfilSnapshotProvider({
    initialProfile,
    children,
}: {
    initialProfile: EmployerProfile;
    children: ReactNode;
}) {
    const [profile, setProfile] = useState(() => cloneProfile(initialProfile));
    const [storageReady, setStorageReady] = useState(false);
    const [storageError, setStorageError] = useState<string>();

    useEffect(() => {
        const result = readProfileStorage(window.localStorage);

        if (result.ok) {
            if (result.value) {
                setProfile(cloneProfile(result.value));
            }
        } else {
            setStorageError(result.message);
        }

        setStorageReady(true);
    }, []);

    const value = useMemo(
        () => ({
            profile,
            storageReady,
            storageError,
        }),
        [profile, storageError, storageReady],
    );

    return <ProfilSnapshotContext.Provider value={value}>{children}</ProfilSnapshotContext.Provider>;
}

export function useProfilSnapshot(): ProfilSnapshotContextValue {
    const context = useContext(ProfilSnapshotContext);

    if (!context) {
        throw new Error("useProfilSnapshot må brukes innenfor ProfilSnapshotProvider");
    }

    return context;
}
