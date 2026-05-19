import SettingMenu from "@/features/setting/components/SettingMenu";
import { Bolt, Settings } from "lucide-react";

export default function SettingPage() {
    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 border-b p-6">
                <div className="flex gap-2 items-center">
                    <Settings className="w-6 h-6" />
                    <h1 className="text-xl font-bold">
                        Setting
                    </h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    Manage application preferences and configurations.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex min-h-0 p-4 gap-2">
                <SettingMenu />
            </div>
        </div>
    );
}