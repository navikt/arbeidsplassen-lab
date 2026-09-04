export function getSafeExternalUrl(rawValue: string): string | undefined {
    const trimmedValue = rawValue.trim();

    if (!trimmedValue) {
        return undefined;
    }

    try {
        const url = new URL(trimmedValue);
        return url.protocol === "http:" || url.protocol === "https:" ? url.href : undefined;
    } catch {
        return undefined;
    }
}
