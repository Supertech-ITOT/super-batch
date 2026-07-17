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
        <div className="rounded-xl border bg-card p-6 shadow-sm min-h-30 min-w-[320px] shrink-0 overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        style={{ backgroundColor: clr }}
                        className="flex h-16 w-16 items-center justify-center rounded-xl shrink-0"
                    >
                        <Icon className="h-8 w-8 text-white" />
                    </div>

                    <div>
                        <p className="font-semibold text-foreground">
                            {title}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <span
                    className="text-4xl font-bold"
                    style={{ color: clr }}
                >
                    {value}
                </span>
            </div>
        </div>
    );

}