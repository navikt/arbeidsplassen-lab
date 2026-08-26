import { BodyShort } from "@navikt/ds-react";
import type { StegId } from "../_lib/types";
import styles from "./GuidetRegistrering.module.css";

type StegInfo = {
    id: StegId;
    label: string;
    ferdig: boolean;
};

type Props = {
    steg: StegInfo[];
    aktivtSteg: StegId;
    onStegValgt: (id: StegId) => void;
};

export default function Fremdriftslinje({ steg, aktivtSteg, onStegValgt }: Props) {
    return (
        <>
            {/* Desktop */}
            <nav className={styles.fremdrift} aria-label="Fremdrift i annonseregistrering">
                {steg.map((s) => {
                    const erAktiv = s.id === aktivtSteg;
                    const prikkKlasse = `${styles.fremdriftPrikk} ${
                        s.ferdig ? styles.fremdriftPrikkFerdig : erAktiv ? styles.fremdriftPrikkAktiv : ""
                    }`;

                    return (
                        <button
                            key={s.id}
                            type="button"
                            className={`${styles.fremdriftKnapp} ${erAktiv ? styles.fremdriftKnappAktiv : ""}`}
                            onClick={() => onStegValgt(s.id)}
                            aria-current={erAktiv ? "step" : undefined}
                        >
                            <span className={prikkKlasse} aria-hidden="true" />
                            <BodyShort size="small">{s.label}</BodyShort>
                        </button>
                    );
                })}
            </nav>

            {/* Mobil */}
            <nav className={styles.mobilFremdrift} aria-label="Fremdrift">
                {steg.map((s) => {
                    const erAktiv = s.id === aktivtSteg;
                    return (
                        <button
                            key={s.id}
                            type="button"
                            className={styles.mobilFremdriftChip}
                            onClick={() => onStegValgt(s.id)}
                            aria-current={erAktiv ? "step" : undefined}
                            style={{
                                padding: "var(--a-spacing-1) var(--a-spacing-3)",
                                borderRadius: "999px",
                                border: "1px solid var(--a-border-subtle)",
                                background: erAktiv
                                    ? "var(--a-surface-action-subtle)"
                                    : s.ferdig
                                      ? "var(--a-surface-success-subtle)"
                                      : "var(--a-surface-default)",
                                cursor: "pointer",
                                fontSize: "var(--a-font-size-small)",
                            }}
                        >
                            {s.ferdig ? "✓ " : ""}
                            {s.label}
                        </button>
                    );
                })}
            </nav>
        </>
    );
}
