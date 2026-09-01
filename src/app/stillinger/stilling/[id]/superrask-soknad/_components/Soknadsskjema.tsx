"use client";

import { BodyLong, Button, ErrorSummary, Heading, LocalAlert, TextField, VStack } from "@navikt/ds-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import type { Stilling, SuperraskApplicationForm } from "@/app/stillinger/_lib/types";
import {
    hasSoknadErrors,
    type SoknadErrors,
    type SoknadValues,
    validateSoknad,
} from "@/app/stillinger/_lib/validateSoknad";
import Arbeidsgiversporsmal from "./Arbeidsgiversporsmal";
import Kvalifikasjoner from "./Kvalifikasjoner";
import LoginInfo from "./LoginInfo";
import SoknadBekreftelse from "./SoknadBekreftelse";

type SoknadsskjemaProps = {
    stilling: Stilling;
    applicationForm: SuperraskApplicationForm;
};

const emptyErrors: SoknadErrors = { answers: {} };

function getValues(formData: FormData, applicationForm: SuperraskApplicationForm): SoknadValues {
    const answers = Object.fromEntries(
        applicationForm.questions.map((question) => [
            question.id,
            String(formData.get(`question-${question.id}`) ?? ""),
        ]),
    );

    return {
        email: String(formData.get("email") ?? ""),
        telephone: String(formData.get("telephone") ?? ""),
        answers,
    };
}

export default function Soknadsskjema({ stilling, applicationForm }: SoknadsskjemaProps) {
    const [errors, setErrors] = useState<SoknadErrors>(emptyErrors);
    const [validationAttempt, setValidationAttempt] = useState(0);
    const [success, setSuccess] = useState(false);
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (validationAttempt > 0 && hasSoknadErrors(errors)) {
            errorSummaryRef.current?.focus();
        }
    }, [errors, validationAttempt]);

    if (success) {
        return <SoknadBekreftelse stillingId={stilling.id} />;
    }

    const errorEntries = [
        ...(errors.email ? [{ id: "new-application-email", message: errors.email }] : []),
        ...(errors.telephone ? [{ id: "new-application-telephone", message: errors.telephone }] : []),
        ...Object.entries(errors.answers).map(([id, message]) => ({
            id: `new-application-question-${id}`,
            message,
        })),
    ];

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validateSoknad(
            getValues(new FormData(event.currentTarget), applicationForm),
            applicationForm,
        );

        setErrors(nextErrors);
        setValidationAttempt((attempt) => attempt + 1);

        if (!hasSoknadErrors(nextErrors)) {
            event.currentTarget.reset();
            setErrors(emptyErrors);
            setSuccess(true);
        }
    }

    return (
        <form onSubmit={submit} autoComplete="off" noValidate>
            <VStack gap="space-40" paddingBlock="space-40 space-64">
                <section>
                    <Heading level="1" size="xlarge" spacing>
                        Superrask søknad
                    </Heading>
                    <BodyLong>
                        Ingen CV eller langt søknadsbrev, kun tre raske steg. Du får vanligvis beskjed på e-post når
                        bedriften har vurdert søknaden.
                    </BodyLong>
                </section>

                <LocalAlert status="warning" size="small">
                    <LocalAlert.Header>
                        <LocalAlert.Title as="h2">Bruk bare testdata</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        Dette er en prototype. Opplysningene sendes ikke, lagres ikke og slettes når skjemaet fullføres
                        eller siden lastes på nytt.
                    </LocalAlert.Content>
                </LocalAlert>

                <LoginInfo />
                <Kvalifikasjoner qualifications={applicationForm.qualifications} />
                <Arbeidsgiversporsmal
                    questions={applicationForm.questions}
                    errors={errors.answers}
                    onAnswerChange={(id) =>
                        setErrors((current) => {
                            const { [id]: _, ...remainingAnswers } = current.answers;
                            return { ...current, answers: remainingAnswers };
                        })
                    }
                />

                <VStack as="section" gap="space-16">
                    <div>
                        <Heading level="2" size="medium" spacing>
                            Din kontaktinformasjon
                        </Heading>
                        <BodyLong>Vær nøye med å bruke oppdiktet testinformasjon.</BodyLong>
                    </div>

                    <TextField label="Navn" id="new-application-name" name="name" autoComplete="off" />
                    <TextField
                        label="E-post"
                        description="Må fylles ut"
                        id="new-application-email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        error={errors.email}
                        onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
                    />
                    <TextField
                        label="Telefonnummer"
                        description="Må fylles ut"
                        id="new-application-telephone"
                        name="telephone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="off"
                        error={errors.telephone}
                        onChange={() => setErrors((current) => ({ ...current, telephone: undefined }))}
                    />
                </VStack>

                <VStack gap="space-16">
                    <BodyLong>
                        I produksjonsløsningen kan bedriften se svarene og kontaktinformasjonen du oppgir. I denne
                        prototypen forlater ingenting nettleseren.
                    </BodyLong>
                    <BodyLong>Du kan når som helst gå tilbake uten at noe blir lagret.</BodyLong>
                </VStack>

                {errorEntries.length > 0 && (
                    <ErrorSummary ref={errorSummaryRef} heading="Du må rette disse feilene før du kan fortsette">
                        {errorEntries.map((error) => (
                            <ErrorSummary.Item key={error.id} href={`#${error.id}`}>
                                {error.message}
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}

                <div>
                    <Button type="submit">Send søknad</Button>
                </div>
            </VStack>
        </form>
    );
}
