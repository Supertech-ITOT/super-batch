import { Database, LucideIcon, TriangleAlert, } from "lucide-react";
type FeedbackStateProps = {
    variant?: "empty" | "error";
    icon?: LucideIcon;
    title?: string;
    message?: string;
    className?: string;
};

const DEFAULTS = {
    empty: {
        Icon: Database,
        title: "No data available",
        message:
            "There's nothing to display right now. Once data becomes available, it will appear here.",
    },
    error: {
        Icon: TriangleAlert,
        title: "Something went wrong",
        message:
            "We couldn't load the requested information. Please try again. If the problem continues, contact your administrator.",
    },
};

export default function FeedbackState({ variant = "empty", icon, title, message, className = "", }: FeedbackStateProps) {
    const config = DEFAULTS[variant];
    const Icon = icon ?? config.Icon;
    return (
        <div className={`flex-1 rounded border shadow h-full bg-card flex flex-col items-center justify-center gap-4 text-center ${className}`}>
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                <Icon className="size-10 text-muted-foreground" />
            </div>

            <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                    {title ?? config.title}
                </h3>

                <p className="max-w-sm text-sm text-muted-foreground leading-4">
                    {message ?? config.message}
                </p>
            </div>
        </div>
    );
}