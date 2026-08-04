import ManagerTab from "@/features/manager/common/components/manager-tab";
import RoleView from "@/features/manager/role/components/role-view";

export default function RolePage() {
    return (
        <div className="flex flex-col p-1 sm:h-full sm:overflow-hidden sm:p-2 gap-1">
            <ManagerTab />
            <RoleView />
        </div>
    )
}