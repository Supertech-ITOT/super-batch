import { cn } from "@/common/lib/utils";
import { getColorByText } from "../utils/color.util";

type UserAvatarProps = {
    name: string;
    className?: string;
};

export default function UserAvatar({ name, className, }: UserAvatarProps) {
    const initials = name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                getColorByText(name),
                className
            )}
        >
            {initials}
        </div>
    );
}