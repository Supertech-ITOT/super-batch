export const COLOR_PALETTE = [
  "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-200",
  "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200",
  "bg-stone-100 text-stone-700 dark:bg-stone-800/50 dark:text-stone-200",

  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-200",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-200",

  "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-200",
  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-200",

  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200",
  "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200",

  "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200",
  "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-200",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200",
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