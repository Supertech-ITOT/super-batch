/**
 * HH:MM -> Minutes
 * 01:00 -> 60
 * 01:30 -> 90
 */
export const durationToMinutes = (duration: string): number => {
    if (!duration) return 0;
    const [hh = "0", mm = "0"] = duration.split(":");
    const totalMinutes = Number(hh) * 60 + Number(mm)
    return Number(totalMinutes.toFixed(2));
};

/**
 * Minutes -> HH:MM
 * 60 -> 01:00
 * 90 -> 01:30
 */
export const minutesToDuration = (minutes: number | string): string => {
    const totalSeconds = Math.round(Number(minutes) * 60);
    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    return [String(hh).padStart(2, "0"), String(mm).padStart(2, "0"),].join(":");
};


/**
 * Minutes -> Human readable duration
 * 90   -> 1H 30M
 * 0.5  -> 1M
 * 0    -> 0M
 */
export const minutesToADuration = (minutes: number | string): string => {
    const totalMinutes = Math.round(Number(minutes));

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const parts: string[] = [];

    if (hours > 0) parts.push(`${hours}H`);
    if (mins > 0) parts.push(`${mins}M`);

    return parts.length ? parts.join(" ") : "0M";
};