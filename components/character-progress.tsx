type Props = {
    value?: string;
    max: number;
};

export default function CharacterProgress({ value, max, }: Props) {
    const current = value?.length || 0;
    const percentage = (current / max) * 100;

    return (
        <>
            <span className="text-xs text-muted-foreground">
                {current}/{max}
            </span>

            <div className="absolute -bottom-2 left-0 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </>
    );
}