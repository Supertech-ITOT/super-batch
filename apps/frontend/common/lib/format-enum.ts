export function toDisplayText(value?: string): string {
    if (!value) return "";

    return value
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
}