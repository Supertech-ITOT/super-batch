import { Button } from "@/common/components/ui/button";
import RoleView from "@/features/manager/component/view/role/role-view";

import { Plus, Shield, } from "lucide-react";

export default function RolePage() {
    return (
        <div className="flex overflow-hidden h-full flex-col">
            {/* Header */}
            <div>
                <div className="shrink-0 border-b p-6">
                    <div className="flex gap-2 items-center">
                        <Shield className="w-6 h-6" />
                        <h1 className="text-xl font-bold">
                            Role Management
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Create, manage and configure roles and their permissions.
                    </p>

                    <div className="flex justify-end mt-0 ">
                        <Button className="-mt-7 hover:bg-primary text-white">
                            <Plus className="h-5 w-5 mr-2 " />
                            Add Role
                        </Button>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-2">
                <RoleView />
            </div>

        </div>


    )
}