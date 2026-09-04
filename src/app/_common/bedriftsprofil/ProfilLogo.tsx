import styles from "./ProfilLogo.module.css";
import type { ProfileLogoId } from "./types";

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
