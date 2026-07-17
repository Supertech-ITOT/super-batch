import ManagerTab from "@/features/manager/common/components/manager-tab";
import UserView from "@/features/manager/user/components/user-view";

export default function UserPage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <ManagerTab />
            <UserView />
        </div>
    )
}