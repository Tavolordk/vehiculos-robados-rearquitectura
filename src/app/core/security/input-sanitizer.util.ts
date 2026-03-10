export function sanitizeTextInput(value: string | null | undefined): string {
    return (value ?? '')
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}