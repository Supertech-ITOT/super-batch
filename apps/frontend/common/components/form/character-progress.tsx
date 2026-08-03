type Props = {
    value?: string;
    max: number;
};

export default function CharacterProgress({ value, max, }: Props) {
    const current = value?.length || 0;
    return (
        <>
            <span className="text-xs text-muted-foreground">
                {current}/{max}
            </span>
        </>
    );
}