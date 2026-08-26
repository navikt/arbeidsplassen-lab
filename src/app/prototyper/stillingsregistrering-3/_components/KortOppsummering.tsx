import { BodyShort, Button, ExpansionCard, Heading, HStack, Tag, VStack } from "@navikt/ds-react";
import type { AnnonseFormData, StegId } from "../_lib/types";
import styles from "./GuidetRegistrering.module.css";

type Props = {
    formData: AnnonseFormData;
    onRediger: (steg: StegId) => void;
};

function Rad({ label, verdi }: { label: string; verdi: string | undefined }) {
    if (!verdi) {
        return null;
    }
    return (
        <HStack gap="space-8">
            <BodyShort weight="semibold" size="small" style={{ minWidth: 140 }}>
                {label}
            </BodyShort>
            <BodyShort size="small">{verdi}</BodyShort>
        </HStack>
    );
}

export default function KortOppsummering({ formData, onRediger }: Props) {
    const lonnTekst =
        formData.lonnstype === "fastlonn" && formData.fastlonn
            ? `${Number(formData.fastlonn).toLocaleString("nb-NO")} kr/år`
            : formData.lonnstype === "lonnsspenn" && formData.lonnFra && formData.lonnTil
              ? `${Number(formData.lonnFra).toLocaleString("nb-NO")} – ${Number(formData.lonnTil).toLocaleString("nb-NO")} kr/år`
              : formData.lonnstype === "etter-avtale"
                ? "Etter avtale"
                : "";

    return (
        <VStack gap="space-16">
            <Heading size="medium" level="2">
                Oppsummering
            </Heading>

            <div className={styles.oppsummeringGrid}>
                <ExpansionCard aria-label="Det grunnleggende">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Det grunnleggende</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-4">
                            <Rad label="Stilling" verdi={formData.stillingstittel} />
                            <Rad label="Ansettelsesform" verdi={formData.ansettelsesform} />
                            <Rad label="Omfang" verdi={formData.omfang.join(", ")} />
                            <Rad label="Sted" verdi={formData.sted} />
                            <Rad label="Språk" verdi={formData.arbeidssprak.join(", ")} />
                            <Button variant="tertiary" size="xsmall" onClick={() => onRediger("grunnleggende")}>
                                Rediger
                            </Button>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="Beskrivelse">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Beskrivelse</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-4">
                            {formData.apningstekst && <BodyShort size="small">«{formData.apningstekst}»</BodyShort>}
                            <Rad label="Oppgaver" verdi={formData.arbeidsoppgaver ? "✓ Fylt ut" : "Mangler"} />
                            <Rad label="Tilbyr" verdi={formData.hvaTilbyr ? "✓ Fylt ut" : "Mangler"} />
                            <Button variant="tertiary" size="xsmall" onClick={() => onRediger("beskrivelse")}>
                                Rediger
                            </Button>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="Lønn">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Lønn</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-4">
                            <Rad label="Lønn" verdi={lonnTekst || "Ikke oppgitt"} />
                            <Button variant="tertiary" size="xsmall" onClick={() => onRediger("lonn")}>
                                Rediger
                            </Button>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="Kvalifikasjoner">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Kvalifikasjoner</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-4">
                            {formData.kvalifikasjoner.filter((k) => k.tekst).length > 0 ? (
                                formData.kvalifikasjoner
                                    .filter((k) => k.tekst)
                                    .map((k) => (
                                        <HStack key={k.id} gap="space-4" align="center">
                                            <Tag
                                                variant={k.prioritet === "ma" ? "warning-moderate" : "info-moderate"}
                                                size="xsmall"
                                            >
                                                {k.prioritet === "ma" ? "Må" : "Bør"}
                                            </Tag>
                                            <BodyShort size="small">{k.tekst}</BodyShort>
                                        </HStack>
                                    ))
                            ) : (
                                <BodyShort size="small" textColor="subtle">
                                    Ingen lagt til
                                </BodyShort>
                            )}
                            <Button variant="tertiary" size="xsmall" onClick={() => onRediger("kvalifikasjoner")}>
                                Rediger
                            </Button>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="Søknad">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Søknadsinnstillinger</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-4">
                            <HStack gap="space-4" wrap>
                                {formData.superrask && (
                                    <Tag variant="success-moderate" size="xsmall">
                                        Superrask
                                    </Tag>
                                )}
                                {formData.beOmCv && (
                                    <Tag variant="neutral-moderate" size="xsmall">
                                        CV
                                    </Tag>
                                )}
                                {formData.beOmBosted && (
                                    <Tag variant="neutral-moderate" size="xsmall">
                                        Bosted
                                    </Tag>
                                )}
                            </HStack>
                            <Rad
                                label="Frist"
                                verdi={formData.sokSnarest ? "Snarest" : formData.soknadsfrist || "Ikke satt"}
                            />
                            <Button variant="tertiary" size="xsmall" onClick={() => onRediger("soknad")}>
                                Rediger
                            </Button>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard aria-label="Bedrift">
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">Om bedriften</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-4">
                            <Rad label="Bedrift" verdi={formData.bedriftsnavn || "Ikke oppgitt"} />
                            <Rad label="Kontakt" verdi={formData.kontaktFornavn || "Ikke oppgitt"} />
                            <Button variant="tertiary" size="xsmall" onClick={() => onRediger("bedrift")}>
                                Rediger
                            </Button>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </div>

            <HStack justify="center" gap="space-8">
                <Button variant="primary" size="medium">
                    Publiser annonsen
                </Button>
                <Button variant="secondary" size="medium">
                    Lagre utkast
                </Button>
            </HStack>
        </VStack>
    );
}
