import type { SuperraskApplicationForm } from "./types";

export type SoknadValues = {
    email: string;
    telephone: string;
    answers: Record<string, string>;
};

export type SoknadErrors = {
    email?: string;
    telephone?: string;
    answers: Record<string, string>;
};

export function validateSoknad(values: SoknadValues, form: SuperraskApplicationForm): SoknadErrors {
    const errors: SoknadErrors = { answers: {} };
    const email = values.email.trim();
    const telephone = values.telephone.trim();

    if (!email) {
        errors.email = "Du må oppgi e-postadressen din";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
        errors.email = "Du må oppgi en gyldig e-postadresse";
    }

    const telephoneDigits = telephone.replace(/\D/g, "");
    if (!telephone) {
        errors.telephone = "Du må oppgi telefonnummeret ditt";
    } else if (telephoneDigits.length < 8 || telephoneDigits.length > 12) {
        errors.telephone = "Du må oppgi et gyldig telefonnummer";
    }

    for (const question of form.questions) {
        const answer = values.answers[question.id]?.trim() ?? "";
        if (!answer) {
            errors.answers[question.id] = "Du må svare på dette spørsmålet";
        } else if (answer.length > question.maxLength) {
            errors.answers[question.id] = `Svaret kan ikke være lengre enn ${question.maxLength} tegn`;
        }
    }

    return errors;
}

export function hasSoknadErrors(errors: SoknadErrors): boolean {
    return Boolean(errors.email || errors.telephone || Object.keys(errors.answers).length > 0);
}
