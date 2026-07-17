import ManagerTab from "@/features/manager/common/components/manager-tab";
import RoleView from "@/features/manager/role/components/role-view";

export default function RolePage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <ManagerTab />
            <RoleView />
        </div>


    )
}