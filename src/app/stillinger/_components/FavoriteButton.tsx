"use client";

import { HeartFillIcon, HeartIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useStillingerState } from "@/app/stillinger/_state/StillingerStateProvider";

type FavoriteButtonProps = {
    id: string;
    hideText?: boolean;
};

export default function FavoriteButton({ id, hideText = false }: FavoriteButtonProps) {
    const { state, toggleFavorite } = useStillingerState();
    const isFavorite = state.favoriteIds.includes(id);
    const label = isFavorite ? "Fjern fra favoritter" : "Lagre favoritt";

    return (
        <Button
            type="button"
            variant="tertiary"
            size="small"
            aria-label={hideText ? label : undefined}
            icon={isFavorite ? <HeartFillIcon aria-hidden /> : <HeartIcon aria-hidden />}
            onClick={() => toggleFavorite(id)}
        >
            {hideText ? undefined : label}
        </Button>
    );
}
