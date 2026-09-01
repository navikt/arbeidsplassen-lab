"use client";

import { ArrowDownIcon, ArrowUpIcon, PlusIcon, XMarkIcon } from "@navikt/aksel-icons";
import { Accordion, BodyShort, Box, Button, Fieldset, HGrid, HStack, Tag, VStack } from "@navikt/ds-react";
import type { ScreeningQuestion } from "../_lib/types";
import { screeningQuestionSuggestions } from "../_mock/data";
import styles from "./ScreeningQuestions.module.css";

type ScreeningQuestionsProps = {
    questions: ScreeningQuestion[];
    onChange: (questions: ScreeningQuestion[]) => void;
};

const MAX_QUESTIONS = 5;

export default function ScreeningQuestions({ questions, onChange }: ScreeningQuestionsProps) {
    const availableQuestions = screeningQuestionSuggestions.filter(
        (suggestion) => !questions.some((question) => question.id === suggestion.id),
    );

    const moveQuestion = (from: number, to: number) => {
        if (to < 0 || to >= questions.length) {
            return;
        }

        const nextQuestions = [...questions];
        const [question] = nextQuestions.splice(from, 1);
        if (!question) {
            return;
        }
        nextQuestions.splice(to, 0, question);
        onChange(nextQuestions);
    };

    return (
        <Fieldset
            legend={
                <HStack gap="space-8" align="center">
                    <span>Screeningspørsmål</span>
                    <Tag data-color="accent" variant="strong" size="small">
                        Beta
                    </Tag>
                </HStack>
            }
            description="Legg til minst ett spørsmål. Du kan legge til inntil 5."
        >
            <VStack gap="space-12">
                {questions.map((question, index) => (
                    <Box
                        key={question.id}
                        borderWidth="1"
                        borderRadius="4"
                        padding="space-12"
                        borderColor="neutral-subtle"
                    >
                        <HGrid columns="minmax(0, 1fr) auto" align="center" gap="space-12">
                            <HStack gap="space-12" wrap={false}>
                                <BodyShort as="span">{index + 1}.</BodyShort>
                                <BodyShort>{question.label}</BodyShort>
                            </HStack>
                            <HStack gap="space-2" align="center" wrap={false}>
                                <Button
                                    type="button"
                                    variant="tertiary-neutral"
                                    size="small"
                                    icon={<ArrowUpIcon aria-hidden="true" />}
                                    aria-label={`Flytt opp: ${question.label}`}
                                    disabled={index === 0}
                                    onClick={() => moveQuestion(index, index - 1)}
                                />
                                <Button
                                    type="button"
                                    variant="tertiary-neutral"
                                    size="small"
                                    icon={<ArrowDownIcon aria-hidden="true" />}
                                    aria-label={`Flytt ned: ${question.label}`}
                                    disabled={index === questions.length - 1}
                                    onClick={() => moveQuestion(index, index + 1)}
                                />
                                <Button
                                    type="button"
                                    variant="tertiary-neutral"
                                    size="small"
                                    icon={<XMarkIcon aria-hidden="true" />}
                                    aria-label={`Fjern: ${question.label}`}
                                    onClick={() =>
                                        onChange(questions.filter((candidate) => candidate.id !== question.id))
                                    }
                                />
                            </HStack>
                        </HGrid>
                    </Box>
                ))}

                <BodyShort size="small" textColor="subtle" aria-live="polite">
                    {questions.length} av {MAX_QUESTIONS} spørsmål lagt til
                </BodyShort>

                <Accordion size="medium" indent={false} className="bg-brand-green-subtle">
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>Legg til spørsmål</Accordion.Header>
                        <Accordion.Content>
                            {availableQuestions.length > 0 && questions.length < MAX_QUESTIONS ? (
                                <ul className={styles.suggestions} aria-label="Forslag til screeningspørsmål">
                                    {availableQuestions.map((question) => (
                                        <li key={question.id}>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                icon={<PlusIcon aria-hidden="true" />}
                                                className={styles.suggestionButton}
                                                onClick={() => onChange([...questions, question])}
                                            >
                                                {question.label}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <BodyShort>Du har lagt til maksimalt fem spørsmål.</BodyShort>
                            )}
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </VStack>
        </Fieldset>
    );
}
