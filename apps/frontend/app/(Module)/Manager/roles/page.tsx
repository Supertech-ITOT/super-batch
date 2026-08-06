import ManagerTab from "@/features/manager/common/components/manager-tab";
import RoleView from "@/features/manager/role/components/role-view";

export default function RolePage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <ManagerTab />
            </div>
            <RoleView />
        </div>
    )
}