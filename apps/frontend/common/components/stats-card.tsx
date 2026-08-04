import { LucideIcon } from "lucide-react";

type Prop = {
    title: string;
    value?: number;
    subtitle: string;
    clr: string;
    Icon: LucideIcon;
}
export default function StatsCards({ title, value, subtitle, clr, Icon }: Prop) {
    return (
        <div className="rounded-2xl border bg-card p-2 sm:p-6 shadow-sm min-h-10 min-w-52 w-full shrink-0 overflow-hidden">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4">
                    <div
                        style={{ backgroundColor: clr }}
                        className="flex size-10 sm:size-16 items-center justify-center rounded-2xl shrink-0"
                    >
                        <Icon className="size-5 sm:size-8 text-white" />
                    </div>

                    <div>
                        <p className="font-semibold text-foreground text-xs sm:text-lg">
                            {title}
                        </p>

                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <span
                    className="text-xl sm:text-4xl font-bold"
                    style={{ color: clr }}
                >
                    {value}
                </span>
            </div>
        </div>
    );

}