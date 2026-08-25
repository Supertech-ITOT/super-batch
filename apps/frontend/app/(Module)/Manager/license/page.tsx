import ManagerTab from "@/features/manager/common/components/manager-tab";
import LicenseView from "@/features/manager/license/component/license-view";

export default function LicensePage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <ManagerTab />
            </div>
            <LicenseView />
        </div>
    );
}