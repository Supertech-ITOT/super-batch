export const showFormError = (obj: any): string | undefined => {
    if (!obj) return;
    if (typeof obj.message === "string") {
        return obj.message;
    }
    for (const value of Object.values(obj)) {
        const message = showFormError(value);
        if (message) return message;
    }
};