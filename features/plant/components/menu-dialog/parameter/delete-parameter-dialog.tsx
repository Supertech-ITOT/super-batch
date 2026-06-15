import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useDeleteParameter, useGetParameterById } from "@/features/plant/hooks/use-parameters";
import { showApiError } from "@/common/lib/show-api-error";

type Props = { open: boolean; onClose: () => void; parameterId?: number };
export default function DeleteParameterDialog({ open, onClose, parameterId }: Props) {
    const { mutateAsync: deleteParameter, isPending: deleteParameterIsPending } = useDeleteParameter();
    const { data: parameter, isLoading: parameterIsLoading } = useGetParameterById(parameterId);
    const loading = deleteParameterIsPending || parameterIsLoading || !parameter;
    const handleDelete = async () => {
        if (!parameter || !parameterId) return;
        try {
            const res = await deleteParameter({ id: parameterId });
            toast.success(res.message ?? `${parameter.name} deleted successfully.`);
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {parameter?.name}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete parameter "${parameter?.name}"?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDelete} variant="destructive" className="min-w-34 bg-destructive!  text-white" disabled={loading}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Delete"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}