import { Radio, RadioGroup, VStack } from "@navikt/ds-react";
import Image from "next/image";
import ProfilLogo from "@/app/_common/bedriftsprofil/ProfilLogo";
import { profileHeroes, profileLogos, profileThemes } from "@/app/_common/bedriftsprofil/profile";
import type { EmployerProfile, UpdateEmployerProfileField } from "@/app/_common/bedriftsprofil/types";
import styles from "./BedriftsprofilArbeidsflate.module.css";

type VisuellProfilVelgerProps = {
    profile: EmployerProfile;
    updateField: UpdateEmployerProfileField;
};

export default function VisuellProfilVelger({ profile, updateField }: VisuellProfilVelgerProps) {
    return (
        <VStack gap="space-32">
            <RadioGroup
                legend="Profilfarge"
                description="Palettene er kuratert for tydelig kontrast og lesbarhet."
                value={profile.themeId}
                onChange={(value) => {
                    const theme = profileThemes.find((candidate) => candidate.id === value);
                    if (theme) {
                        updateField("themeId", theme.id);
                    }
                }}
            >
                {profileThemes.map((theme) => (
                    <Radio key={theme.id} value={theme.id} className={styles.visualRadio}>
                        <span className={styles.visualOption}>
                            <span className={styles.paletteSwatch} data-color={theme.color} aria-hidden>
                                <span />
                                <span />
                            </span>
                            <span className={styles.optionCopy}>
                                <span className={styles.optionTitle}>{theme.label}</span>
                                <span className={styles.optionDescription}>{theme.description}</span>
                            </span>
                        </span>
                    </Radio>
                ))}
            </RadioGroup>

            <RadioGroup
                legend="Toppbilde"
                description="Bildene er lokale illustrasjoner og sendes ikke noe sted."
                value={profile.heroId}
                onChange={(value) => {
                    const hero = profileHeroes.find((candidate) => candidate.id === value);
                    if (hero) {
                        updateField("heroId", hero.id);
                    }
                }}
            >
                {profileHeroes.map((hero) => (
                    <Radio key={hero.id} value={hero.id} className={styles.visualRadio}>
                        <span className={styles.visualOption}>
                            <Image
                                src={hero.src}
                                alt=""
                                width={240}
                                height={128}
                                sizes="240px"
                                className={styles.heroThumbnail}
                            />
                            <span className={styles.optionCopy}>
                                <span className={styles.optionTitle}>{hero.label}</span>
                                <span className={styles.optionDescription}>{hero.description}</span>
                            </span>
                        </span>
                    </Radio>
                ))}
            </RadioGroup>

            <RadioGroup
                legend="Logovariant"
                description="Velg et uttrykk som fungerer både stort og lite."
                value={profile.logoId}
                onChange={(value) => {
                    const logo = profileLogos.find((candidate) => candidate.id === value);
                    if (logo) {
                        updateField("logoId", logo.id);
                    }
                }}
            >
                {profileLogos.map((logo) => (
                    <Radio key={logo.id} value={logo.id} className={styles.visualRadio}>
                        <span className={styles.visualOption}>
                            <span
                                className={styles.logoThumbnail}
                                data-color={profileThemes.find((theme) => theme.id === profile.themeId)?.color}
                            >
                                <ProfilLogo variant={logo.id} compact />
                            </span>
                            <span className={styles.optionCopy}>
                                <span className={styles.optionTitle}>{logo.label}</span>
                                <span className={styles.optionDescription}>{logo.description}</span>
                            </span>
                        </span>
                    </Radio>
                ))}
            </RadioGroup>
        </VStack>
    );
}
