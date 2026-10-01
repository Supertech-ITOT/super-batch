export const formatMinutes = (minutes: number) => {
    const total = Math.round(minutes);
    const hours = Math.floor(total / 60);
    const mins = total % 60;

    if (hours && mins) return `${hours}H ${mins}M`;
    if (hours) return `${hours}H`;
    return `${mins}M`;
};