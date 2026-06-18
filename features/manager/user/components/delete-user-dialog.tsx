import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteUser, useGetUsersById } from "@/features/manager/user/hooks/use-user";

type Props = { open: boolean; onClose: () => void; userId?: number };
export default function DeleteUserDialog({ open, onClose, userId }: Props) {
    const { mutateAsync: deleteUser, isPending: deleteUserIsPending } = useDeleteUser();
    const { data: user, isLoading: userIsLoading } = useGetUsersById(userId);
    const loading = deleteUserIsPending || userIsLoading || !user;
    const handleDelete = async () => {
        if (!user || !userId) return;
        try {
            const res = await deleteUser({ id: userId });
            toast.success(res.message ?? `${user.name} deleted successfully.`);
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {user?.name}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete user "${user?.name} - [${user?.email}]"?`}
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