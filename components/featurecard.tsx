import { LucideIcon } from "lucide-react";
type FeatureCardProps = {
    icon: LucideIcon;
    title: string;
    subtitle: string;
};


export default function FeatureCard({ icon, title, subtitle, }: FeatureCardProps) {
    const Icon = icon;
    {
        return (
            <div className="flex h-24 max-w-28  flex-col items-center justify-center grow rounded-2xl border border-primary/10 bg-card/70 p-4 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105">

                {/* Icon */}
                <div className="mb-2 flex justify-center text-primary">
                    <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground">
                    {title}
                </h3>

                {/* Subtitle */}
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {subtitle}
                </p>
            </div>
        );
    }

}
