const COLOR_PALETTE = [
    "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    "bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-300",
    "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
] as const;

export const getColorByText = (text: string, colors: readonly string[] = COLOR_PALETTE) => {
    if (!text) return colors[0];
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};



export const CHART_COLORS = [
  "#f87171", // red-400
  "#fb923c", // orange-400
  "#fbbf24", // amber-400
  "#facc15", // yellow-400
  "#a3e635", // lime-400
  "#4ade80", // green-400
  "#34d399", // emerald-400
  "#2dd4bf", // teal-400
  "#22d3ee", // cyan-400
  "#38bdf8", // sky-400
  "#60a5fa", // blue-400
  "#818cf8", // indigo-400
  "#a78bfa", // violet-400
  "#c084fc", // purple-400
  "#f472b6", // pink-400
] as const;

export const getChartColorByText = (text: string) => {
  if (!text) return CHART_COLORS[0];

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  return CHART_COLORS[Math.abs(hash) % CHART_COLORS.length];
};