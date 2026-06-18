import RoleView from "@/features/manager/role/components/role-view";
import { ShieldCheck, } from "lucide-react";

export default function RolePage() {
    return (
        <div className="flex overflow-hidden h-full flex-col">
            {/* Header */}
            <div>
                <div className="shrink-0 border-b p-6">
                    <div className="flex gap-2 items-center">
                        <ShieldCheck className="w-6 h-6" />
                        <h1 className="text-xl font-bold">
                            Role Management
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Create, manage and configure roles and their permissions.
                    </p>
                </div>
            </div>
            {/* content */}
            <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
                <RoleView />
            </div>

        </div>


    )
}