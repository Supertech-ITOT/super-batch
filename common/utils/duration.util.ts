/**
 * HH:MM:SS -> Minutes
 *
 * 01:00:00 -> "60.00"
 * 01:30:00 -> "90.00"
 * 00:01:30 -> "1.50"
 */
export const durationToMinutes = (duration: string): string => {
    if (!duration) return "0.00";
    const [hh = "0", mm = "0", ss = "0"] = duration.split(":");
    const totalMinutes =
        Number(hh) * 60 +
        Number(mm) +
        Number(ss) / 60;
    return totalMinutes.toFixed(2);
};

/**
 * Minutes -> HH:MM:SS
 *
 * 60 -> 01:00:00
 * 90 -> 01:30:00
 * 1.5 -> 00:01:30
 */
export const minutesToDuration = (minutes: number | string): string => {
    const totalSeconds = Math.round(Number(minutes) * 60);
    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;
    return [
        String(hh).padStart(2, "0"),
        String(mm).padStart(2, "0"),
        String(ss).padStart(2, "0"),
    ].join(":");
};