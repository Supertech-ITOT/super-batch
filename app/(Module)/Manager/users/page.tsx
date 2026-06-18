import UserView from "@/features/manager/user/components/user-view";
import { UsersIcon } from "lucide-react";

export default function UserPage() {
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
            <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
                <UserView />
            </div>

        </div>
    )
}