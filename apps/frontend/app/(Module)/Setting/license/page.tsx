import LicenseView from "@/features/setting/components/license/license-view";
import SettingTab from "@/features/setting/components/setting-tab";

export default function LicensePage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <SettingTab />
            </div>
            <LicenseView />
        </div>
    );
}