import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { PlantHierarchyResponse } from "../../types/plant.types";

type Props = { open: boolean; onClose: () => void; node?: PlantHierarchyResponse };
export default function DeleteDialog({ open, onClose, node }: Props) {
    const plantType = node ? node.type.charAt(0).toUpperCase() + node.type.slice(1).toLowerCase() : "";
    const loading = false;
    const handleDelete = async () => {

        if (!node) return;

        try {

            // DELETE API HERE

            onClose();

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {plantType}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete "${node?.name}" ${plantType}?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDelete} variant="destructive" className="min-w-34  text-white" disabled={loading}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Delete"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}