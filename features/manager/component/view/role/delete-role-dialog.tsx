import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteRole, useGetRolesById } from "@/features/manager/hooks/use-role";


type Props = { open: boolean; onClose: () => void; roleId?: number };
export default function DeleteRoleDialog({ open, onClose, roleId }: Props) {
    const { mutateAsync: deleteRole, isPending: deleteRoleIsPending } = useDeleteRole();
    const { data: role, isLoading: roleIsLoading } = useGetRolesById(roleId);
    const loading = deleteRoleIsPending || roleIsLoading || !role;
    const handleDelete = async () => {
        if (!role || !roleId) return;
        try {
            const res = await deleteRole({ id: roleId });
            toast.success(res.message ?? `${role.name} deleted successfully.`);
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete role "${role?.name}"?`}
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