import { Separator } from "@/common/components/ui/separator";
import AppNameCard from "./AppNameCard";
import AppVerCard from "./AppVerCard";
import AppThemeCard from "./AppThemeCard";
export default function GeneralSetting() {
    return (
        <div className="flex flex-col p-4">
            <div>
                <h1 className="font-bold text-lg">General Settings</h1>
                <p className="text-muted-foreground text-sm">Configure basic application settings and preferences.</p>
            </div>

            <div className="flex flex-col space-y-4 mt-6">
                <AppNameCard />
                <Separator />
                <AppVerCard />
                <Separator />
                <AppThemeCard />
                <Separator />
            </div>
        </div>
    );
}