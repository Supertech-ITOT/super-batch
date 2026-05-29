import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gauge, Plus } from "lucide-react";
export default function ParameterView() {
    return (
        <div className="flex-1 rounded-lg border bg-card p-4 flex-col">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Gauge className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Parameters</h1>
                        <p className="text-sm text-muted-foreground">Manage process parameters associated with equipment.</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Button>
                        <Plus className="size-5!" />
                        Add Parameters
                    </Button>
                </div>
            </div>
            <Separator className="my-4" />
        </div>
    );
}