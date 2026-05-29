import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gauge, Plus } from "lucide-react";
import CreateMaterialDialog from "../menu-dialog/create-material-dialog";
import { useState } from "react";
export default function MaterialView() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="flex-1 rounded-lg border bg-card p-4 flex-col">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Gauge className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Materials</h1>
                        <p className="text-sm text-muted-foreground">Manage process materials associated with equipment.</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Button onClick={() => setOpen(true)}>
                        <Plus className="size-5!" />
                        Add Materials
                    </Button>
                    <CreateMaterialDialog onClose={() => setOpen(false)} open={open} />
                </div>
            </div>
            <Separator className="my-4" />
        </div>
    );
}