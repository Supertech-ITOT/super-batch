import ManagerTab from "@/features/manager/common/components/manager-tab";
import UserView from "@/features/manager/user/components/user-view";

export default function UserPage() {
    return (
        <div className="flex flex-col p-1 sm:h-full sm:overflow-hidden sm:p-2 gap-1">
            <ManagerTab />
            <UserView />
        </div>
    )
}