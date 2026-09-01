"use client";

import { ArrowRedoIcon, ArrowUndoIcon, BulletListIcon } from "@navikt/aksel-icons";
import { BodyShort, Label } from "@navikt/ds-react";
import styles from "./RichTextField.module.css";

type RichTextFieldProps = {
    id: string;
    label: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
};

export default function RichTextField({
    id,
    label,
    description,
    value,
    onChange,
    maxLength = 5_000,
}: RichTextFieldProps) {
    const descriptionId = `${id}-description`;

    return (
        <div>
            <Label htmlFor={id}>{label}</Label>
            <BodyShort id={descriptionId} size="small" textColor="subtle">
                {description}
            </BodyShort>
            <div className={styles.editor}>
                <div className={styles.toolbar} aria-hidden="true">
                    <span className={styles.textStyle}>Normal tekst</span>
                    <strong className={styles.tool}>B</strong>
                    <em className={styles.tool}>I</em>
                    <span className={styles.tool}>
                        <BulletListIcon />
                    </span>
                    <span className={styles.disabledTool}>
                        <ArrowUndoIcon />
                    </span>
                    <span className={styles.disabledTool}>
                        <ArrowRedoIcon />
                    </span>
                </div>
                <textarea
                    id={id}
                    className={styles.textarea}
                    value={value}
                    maxLength={maxLength}
                    aria-describedby={descriptionId}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
            <BodyShort size="small" textColor="subtle" align="end">
                {maxLength - value.length} tegn igjen
            </BodyShort>
        </div>
    );
}
