import { Button } from "@/common/components/ui/button";
import UserView from "@/features/manager/component/view/user/user-view";
import { Plus, UsersIcon } from "lucide-react";

export default function Users() {
    return (
        <div className="flex overflow-hidden h-full flex-col">
            {/* Header */}
            <div>
                <div className="shrink-0 border-b p-6">
                    <div className="flex gap-2 items-center">
                        <UsersIcon className="w-6 h-6" />
                        <h1 className="text-xl font-bold">
                            User Management
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Create, manage and configure system users.
                    </p>
                </div>
            </div>
            {/* content */}
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-2">
                <UserView />
            </div>

        </div>
    )
}