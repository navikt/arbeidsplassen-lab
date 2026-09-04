import type { ProfileLogoId } from "../_lib/types";
import styles from "./BedriftsprofilArbeidsflate.module.css";

type ProfilLogoProps = {
    variant: ProfileLogoId;
    compact?: boolean;
};

export default function ProfilLogo({ variant, compact = false }: ProfilLogoProps) {
    const className = [styles.profileLogo, compact ? styles.profileLogoCompact : undefined].filter(Boolean).join(" ");

    if (variant === "ordmerke") {
        return (
            <span className={`${className} ${styles.profileLogoWordmark}`} aria-hidden>
                grønne dragen
            </span>
        );
    }

    if (variant === "emblem") {
        return (
            <span className={`${className} ${styles.profileLogoEmblem}`} aria-hidden>
                <span className={styles.profileLogoEmblemLetter}>D</span>
            </span>
        );
    }

    return (
        <span className={className} aria-hidden>
            GD
        </span>
    );
}
