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
        <div
            className="rounded-xl p-4 bg-card flex items-center justify-between shadow-sm min-w-55 shrink-0 border transform-gpu transition-all duration-200 ease-out hover:scale-95 hover:shadow-md"
        >
            <div>
                <p className="text-sm text-muted-foreground font-medium">
                    {title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-foreground">
                    {value}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                    {subtitle}
                </p>
            </div>

            <div
                style={{ backgroundColor: `${clr}20` }}
                className="h-12 w-12 rounded-xl flex items-center justify-center "
            >
                <Icon
                    className="w-6 h-6"
                    style={{ color: clr }}
                />
            </div>
        </div>
    );

}