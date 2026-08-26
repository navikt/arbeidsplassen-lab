import { GuidePanel } from "@navikt/ds-react";
import type { AssistentMelding } from "../_mock/assistentData";

type Props = {
    melding: AssistentMelding;
};

export default function Assistent({ melding }: Props) {
    return (
        <GuidePanel poster>
            <p>{melding.tekst}</p>
            {melding.tips && (
                <p>
                    <strong>💡 Tips:</strong> {melding.tips}
                </p>
            )}
        </GuidePanel>
    );
}
