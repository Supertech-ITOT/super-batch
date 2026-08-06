import ManagerTab from "@/features/manager/common/components/manager-tab";
import UserView from "@/features/manager/user/components/user-view";

export default function UserPage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <ManagerTab />
            </div>
            <UserView />
        </div>
    )
}