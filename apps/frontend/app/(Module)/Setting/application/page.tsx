import ApplicationView from "@/features/setting/components/application/application-view";
import SettingTab from "@/features/setting/components/setting-tab";

export default function ApplicationPage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <SettingTab />
            </div>
            <ApplicationView />
        </div>
    );
}