import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import type { Tips } from "../_mock/tips";
import styles from "./StillingsregistreringArbeidsflate.module.css";

type Props = {
    tips: Tips[];
};

export default function TipsPanel({ tips }: Props) {
    if (tips.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-8">
            <Heading size="xsmall" level="3">
                💡 Tips
            </Heading>
            {tips.map((tip) => (
                <div key={tip.tittel} className={styles.tipsKort}>
                    <BodyShort weight="semibold" size="small">
                        {tip.tittel}
                    </BodyShort>
                    <BodyShort size="small">{tip.innhold}</BodyShort>
                </div>
            ))}
        </VStack>
    );
}
