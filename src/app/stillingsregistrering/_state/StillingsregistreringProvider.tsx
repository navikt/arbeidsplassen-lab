"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { formatDateValue } from "../_lib/date";
import { readRegistrationStorage, writeRegistrationStorage } from "../_lib/registrationStorage";
import type { Advert, AdvertFormData, RegistrationState } from "../_lib/types";
import { cloneAdvertForm, createAdvert, initialRegistrationState } from "../_mock/data";

type StillingsregistreringContextValue = {
    state: RegistrationState;
    isReady: boolean;
    storageMessage?: string;
    getAdvert: (id: string) => Advert | undefined;
    ensureAdvert: (id: string) => void;
    createAdvert: (sourceId?: string) => string;
    deleteAdvert: (id: string) => void;
    updateField: <K extends keyof AdvertFormData>(id: string, field: K, value: AdvertFormData[K]) => void;
    setLastVisitedStep: (id: string, step: number) => void;
    publishAdvert: (id: string) => void;
};

const StillingsregistreringContext = createContext<StillingsregistreringContextValue | null>(null);

function updateAdvert(state: RegistrationState, id: string, updater: (advert: Advert) => Advert): RegistrationState {
    return {
        adverts: state.adverts.map((advert) => (advert.id === id ? updater(advert) : advert)),
    };
}

function createId() {
    return globalThis.crypto.randomUUID();
}

export default function StillingsregistreringProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<RegistrationState>(initialRegistrationState);
    const [isReady, setIsReady] = useState(false);
    const [storageMessage, setStorageMessage] = useState<string>();

    useEffect(() => {
        const result = readRegistrationStorage(window.localStorage);
        if (result.ok) {
            if (result.value) {
                setState(result.value);
            }
        } else {
            setStorageMessage(result.message);
        }
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const result = writeRegistrationStorage(window.localStorage, state);
        setStorageMessage(result.ok ? undefined : result.message);
    }, [isReady, state]);

    const getAdvert = useCallback((id: string) => state.adverts.find((advert) => advert.id === id), [state.adverts]);

    const ensureAdvert = useCallback((id: string) => {
        setState((current) =>
            current.adverts.some((advert) => advert.id === id)
                ? current
                : { adverts: [...current.adverts, createAdvert(id)] },
        );
    }, []);

    const createNewAdvert = useCallback((sourceId?: string) => {
        const id = createId();
        const timestamp = new Date().toISOString();

        setState((current) => {
            const source = sourceId ? current.adverts.find((advert) => advert.id === sourceId) : undefined;
            const advert = createAdvert(id, timestamp);

            if (source) {
                advert.form = cloneAdvertForm(source.form);
                advert.form.overskrift = source.form.overskrift ? `${source.form.overskrift} – kopi` : "";
            }

            return { adverts: [advert, ...current.adverts] };
        });

        return id;
    }, []);

    const deleteAdvert = useCallback((id: string) => {
        setState((current) => ({ adverts: current.adverts.filter((advert) => advert.id !== id) }));
    }, []);

    const updateField = useCallback(
        <K extends keyof AdvertFormData>(id: string, field: K, value: AdvertFormData[K]) => {
            setState((current) =>
                updateAdvert(current, id, (advert) => ({
                    ...advert,
                    updatedAt: new Date().toISOString(),
                    form: { ...advert.form, [field]: value },
                })),
            );
        },
        [],
    );

    const setLastVisitedStep = useCallback((id: string, step: number) => {
        setState((current) => {
            const advert = current.adverts.find((candidate) => candidate.id === id);
            return !advert || advert.lastVisitedStep === step
                ? current
                : updateAdvert(current, id, (candidate) => ({
                      ...candidate,
                      lastVisitedStep: step,
                  }));
        });
    }, []);

    const publishAdvert = useCallback((id: string) => {
        const today = formatDateValue(new Date());
        setState((current) =>
            updateAdvert(current, id, (advert) => ({
                ...advert,
                status: advert.form.publiseringsdato > today ? "scheduled" : "published",
                updatedAt: new Date().toISOString(),
            })),
        );
    }, []);

    const value = useMemo<StillingsregistreringContextValue>(
        () => ({
            state,
            isReady,
            storageMessage,
            getAdvert,
            ensureAdvert,
            createAdvert: createNewAdvert,
            deleteAdvert,
            updateField,
            setLastVisitedStep,
            publishAdvert,
        }),
        [
            state,
            isReady,
            storageMessage,
            getAdvert,
            ensureAdvert,
            createNewAdvert,
            deleteAdvert,
            updateField,
            setLastVisitedStep,
            publishAdvert,
        ],
    );

    return <StillingsregistreringContext.Provider value={value}>{children}</StillingsregistreringContext.Provider>;
}

export function useStillingsregistrering() {
    const context = useContext(StillingsregistreringContext);
    if (!context) {
        throw new Error("useStillingsregistrering må brukes innenfor StillingsregistreringProvider");
    }
    return context;
}
