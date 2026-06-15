import { Input } from "@/common/components/ui/input";

export default function AppVerCard() {
    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-2 flex-col justify-between gap-2">
                <h1 className="font-bold text-sm">Application Version</h1>
                <p className="text-muted-foreground text-xs font-semibold">Current application version.</p>
            </div>
            <div className="flex-1">
                <Input defaultValue="1.0.0" disabled />
            </div>
        </div>
    );
}