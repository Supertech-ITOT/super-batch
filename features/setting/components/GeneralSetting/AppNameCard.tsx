import { Input } from "@/common/components/ui/input";

export default function AppNameCard() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-2 flex-col justify-between gap-2">
                <h1 className="font-bold text-sm">Application Name</h1>
                <p className="text-muted-foreground text-xs font-semibold">The name of the application.</p>
            </div>
            <div className="flex-1">
                <Input defaultValue="Super Batch" disabled />
            </div>
        </div>
    );
}