"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
    type PersistedStillingerState,
    readStillingerStorage,
    STORAGE_UNAVAILABLE_MESSAGE,
    writeStillingerStorage,
} from "../_lib/stillingerStorage";
import type { SavedSearch, SearchCriteria, SearchSort } from "../_lib/types";

export type ArrayFilterKey =
    | "locations"
    | "occupations"
    | "education"
    | "experience"
    | "driversLicense"
    | "workLanguages"
    | "extent"
    | "engagementTypes"
    | "sectors"
    | "remote";

export type BooleanFilterKey = "summerJobOnly" | "superraskOnly";

export type StillingerState = {
    criteria: SearchCriteria;
    sort: SearchSort;
    page: number;
    pageSize: number;
    favoriteIds: string[];
    savedSearches: SavedSearch[];
};

export type StillingerAction =
    | { type: "set-terms"; terms: string[] }
    | { type: "set-published"; published: SearchCriteria["published"] }
    | { type: "toggle-array-filter"; key: ArrayFilterKey; value: string }
    | { type: "set-boolean-filter"; key: BooleanFilterKey; value: boolean }
    | { type: "set-sort"; sort: SearchSort }
    | { type: "set-page"; page: number }
    | { type: "set-page-size"; pageSize: number }
    | { type: "reset-search" }
    | { type: "toggle-favorite"; id: string }
    | { type: "save-search"; savedSearch: SavedSearch }
    | { type: "delete-saved-search"; id: string }
    | { type: "apply-saved-search"; id: string }
    | { type: "hydrate-persisted"; persistedState: PersistedStillingerState };

export const emptySearchCriteria: SearchCriteria = {
    terms: [],
    published: "all",
    locations: [],
    occupations: [],
    education: [],
    experience: [],
    driversLicense: [],
    workLanguages: [],
    extent: [],
    engagementTypes: [],
    sectors: [],
    remote: [],
    summerJobOnly: false,
    superraskOnly: false,
};

export const initialStillingerState: StillingerState = {
    criteria: emptySearchCriteria,
    sort: "relevant",
    page: 1,
    pageSize: 25,
    favoriteIds: [],
    savedSearches: [],
};

function cloneCriteria(criteria: SearchCriteria): SearchCriteria {
    return {
        ...criteria,
        terms: [...criteria.terms],
        locations: [...criteria.locations],
        occupations: [...criteria.occupations],
        education: [...criteria.education],
        experience: [...criteria.experience],
        driversLicense: [...criteria.driversLicense],
        workLanguages: [...criteria.workLanguages],
        extent: [...criteria.extent],
        engagementTypes: [...criteria.engagementTypes],
        sectors: [...criteria.sectors],
        remote: [...criteria.remote],
    };
}

function toggleValue(values: string[], value: string): string[] {
    return values.includes(value) ? values.filter((candidate) => candidate !== value) : [...values, value];
}

export function stillingerReducer(state: StillingerState, action: StillingerAction): StillingerState {
    switch (action.type) {
        case "set-terms":
            return {
                ...state,
                criteria: { ...state.criteria, terms: action.terms },
                page: 1,
            };
        case "set-published":
            return {
                ...state,
                criteria: { ...state.criteria, published: action.published },
                page: 1,
            };
        case "toggle-array-filter":
            return {
                ...state,
                criteria: {
                    ...state.criteria,
                    [action.key]: toggleValue(state.criteria[action.key], action.value),
                },
                page: 1,
            };
        case "set-boolean-filter":
            return {
                ...state,
                criteria: { ...state.criteria, [action.key]: action.value },
                page: 1,
            };
        case "set-sort":
            return { ...state, sort: action.sort, page: 1 };
        case "set-page":
            return { ...state, page: action.page };
        case "set-page-size":
            return { ...state, pageSize: action.pageSize, page: 1 };
        case "reset-search":
            return {
                ...state,
                criteria: cloneCriteria(emptySearchCriteria),
                sort: "relevant",
                page: 1,
            };
        case "toggle-favorite":
            return {
                ...state,
                favoriteIds: toggleValue(state.favoriteIds, action.id),
            };
        case "save-search":
            return {
                ...state,
                savedSearches: [...state.savedSearches, action.savedSearch],
            };
        case "delete-saved-search":
            return {
                ...state,
                savedSearches: state.savedSearches.filter((savedSearch) => savedSearch.id !== action.id),
            };
        case "apply-saved-search": {
            const savedSearch = state.savedSearches.find((candidate) => candidate.id === action.id);
            if (!savedSearch) {
                return state;
            }
            return {
                ...state,
                criteria: cloneCriteria(savedSearch.criteria),
                sort: savedSearch.sort,
                page: 1,
            };
        }
        case "hydrate-persisted": {
            const savedSearches = new Map(
                action.persistedState.savedSearches.map((savedSearch) => [savedSearch.id, savedSearch]),
            );
            for (const savedSearch of state.savedSearches) {
                savedSearches.set(savedSearch.id, savedSearch);
            }

            return {
                ...state,
                favoriteIds: [...new Set([...action.persistedState.favoriteIds, ...state.favoriteIds])],
                savedSearches: [...savedSearches.values()],
            };
        }
    }
}

type StillingerStateContextValue = {
    state: StillingerState;
    setTerms: (terms: string[]) => void;
    setPublished: (published: SearchCriteria["published"]) => void;
    toggleArrayFilter: (key: ArrayFilterKey, value: string) => void;
    setBooleanFilter: (key: BooleanFilterKey, value: boolean) => void;
    setSort: (sort: SearchSort) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    resetSearch: () => void;
    toggleFavorite: (id: string) => void;
    saveCurrentSearch: (name: string) => void;
    deleteSavedSearch: (id: string) => void;
    applySavedSearch: (id: string) => void;
    hasActiveCriteria: boolean;
    isStorageReady: boolean;
    storageError?: string;
};

const StillingerStateContext = createContext<StillingerStateContextValue | null>(null);

function criteriaIsActive(criteria: SearchCriteria): boolean {
    return (
        criteria.terms.length > 0 ||
        criteria.published !== "all" ||
        criteria.locations.length > 0 ||
        criteria.occupations.length > 0 ||
        criteria.education.length > 0 ||
        criteria.experience.length > 0 ||
        criteria.driversLicense.length > 0 ||
        criteria.workLanguages.length > 0 ||
        criteria.extent.length > 0 ||
        criteria.engagementTypes.length > 0 ||
        criteria.sectors.length > 0 ||
        criteria.remote.length > 0 ||
        criteria.summerJobOnly ||
        criteria.superraskOnly
    );
}

export function StillingerStateProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(stillingerReducer, initialStillingerState);
    const [isStorageReady, setIsStorageReady] = useState(false);
    const [storageError, setStorageError] = useState<string>();

    useEffect(() => {
        try {
            const result = readStillingerStorage(window.localStorage);
            if (result.ok) {
                dispatch({ type: "hydrate-persisted", persistedState: result.value });
            } else {
                setStorageError(result.message);
            }
        } catch {
            setStorageError(STORAGE_UNAVAILABLE_MESSAGE);
        } finally {
            setIsStorageReady(true);
        }
    }, []);

    useEffect(() => {
        if (!isStorageReady) {
            return;
        }

        try {
            const result = writeStillingerStorage(window.localStorage, {
                favoriteIds: state.favoriteIds,
                savedSearches: state.savedSearches,
            });
            if (!result.ok) {
                setStorageError(result.message);
            }
        } catch {
            setStorageError(STORAGE_UNAVAILABLE_MESSAGE);
        }
    }, [isStorageReady, state.favoriteIds, state.savedSearches]);

    const value = useMemo<StillingerStateContextValue>(
        () => ({
            state,
            setTerms: (terms) => dispatch({ type: "set-terms", terms }),
            setPublished: (published) => dispatch({ type: "set-published", published }),
            toggleArrayFilter: (key, filterValue) => dispatch({ type: "toggle-array-filter", key, value: filterValue }),
            setBooleanFilter: (key, filterValue) => dispatch({ type: "set-boolean-filter", key, value: filterValue }),
            setSort: (sort) => dispatch({ type: "set-sort", sort }),
            setPage: (page) => dispatch({ type: "set-page", page }),
            setPageSize: (pageSize) => dispatch({ type: "set-page-size", pageSize }),
            resetSearch: () => dispatch({ type: "reset-search" }),
            toggleFavorite: (id) => dispatch({ type: "toggle-favorite", id }),
            saveCurrentSearch: (name) => {
                dispatch({
                    type: "save-search",
                    savedSearch: {
                        id: `saved-search-${crypto.randomUUID()}`,
                        name,
                        criteria: cloneCriteria(state.criteria),
                        sort: state.sort,
                    },
                });
            },
            deleteSavedSearch: (id) => dispatch({ type: "delete-saved-search", id }),
            applySavedSearch: (id) => dispatch({ type: "apply-saved-search", id }),
            hasActiveCriteria: criteriaIsActive(state.criteria),
            isStorageReady,
            storageError,
        }),
        [isStorageReady, state, storageError],
    );

    return <StillingerStateContext.Provider value={value}>{children}</StillingerStateContext.Provider>;
}

export function useStillingerState(): StillingerStateContextValue {
    const context = useContext(StillingerStateContext);

    if (!context) {
        throw new Error("useStillingerState må brukes innenfor StillingerStateProvider");
    }

    return context;
}
