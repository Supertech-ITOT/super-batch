import { format, isValid, parseISO } from "date-fns";

export interface ChangedField {
    field: string;
    oldValue: unknown;
    newValue: unknown;
}

export function parseJson(value: string | null | undefined): Record<string, unknown> {
    if (!value) {
        return {};
    }
    try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            return parsed;
        }
        return {};
    } catch {
        return {};
    }
}

export function formatFieldName(field: string) {
    return field
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatAuditDate(value: unknown): string {
    if (!value || typeof value !== "string") {
        return "-";
    }
    const date = parseISO(value);
    if (!isValid(date)) {
        return "-";
    }
    return format(date, "dd MMM yyyy hh:mm a");
}

export function formatValue(value: unknown, field?: string): string {
    if (value === null || value === undefined || value === "") {
        return "-";
    }
    if (field && /date|time|at$/i.test(field) && typeof value === "string") {
        return formatAuditDate(value);
    }
    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    return String(value);
}

export function areEqual(oldValue: unknown, newValue: unknown): boolean {
    return JSON.stringify(oldValue) === JSON.stringify(newValue);
}

export function getChangedFields(oldData: Record<string, unknown>, newData: Record<string, unknown>): ChangedField[] {
    const fields = new Set([...Object.keys(oldData), ...Object.keys(newData),]);
    return Array.from(fields)
        .filter((field) => !areEqual(oldData[field], newData[field]))
        .map((field) => ({
            field,
            oldValue: oldData[field],
            newValue: newData[field],
        }));
}