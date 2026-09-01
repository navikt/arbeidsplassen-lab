import { BodyLong, Heading, Textarea, VStack } from "@navikt/ds-react";
import type { ScreeningQuestion } from "@/app/stillinger/_lib/types";

type ArbeidsgiversporsmalProps = {
    questions: ScreeningQuestion[];
    errors: Record<string, string>;
    onAnswerChange: (id: string) => void;
};

export default function Arbeidsgiversporsmal({ questions, errors, onAnswerChange }: ArbeidsgiversporsmalProps) {
    if (questions.length === 0) {
        return null;
    }

    return (
        <VStack as="section" gap="space-16">
            <div>
                <Heading level="2" size="medium" spacing>
                    Spørsmål fra arbeidsgiver
                </Heading>
                <BodyLong>Svar på spørsmålene under for å søke på stillingen.</BodyLong>
            </div>
            {questions.map((question) => (
                <Textarea
                    key={question.id}
                    id={`new-application-question-${question.id}`}
                    name={`question-${question.id}`}
                    label={question.label}
                    maxLength={question.maxLength}
                    error={errors[question.id]}
                    onChange={() => onAnswerChange(question.id)}
                    autoComplete="off"
                />
            ))}
        </VStack>
    );
}
