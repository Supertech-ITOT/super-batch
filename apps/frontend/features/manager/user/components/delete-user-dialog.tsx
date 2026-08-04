import { Users } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteUser, useGetUsersById } from "@/features/manager/user/hooks/use-user";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

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
        <ConfirmDialog
            open={open}
            onClose={onClose}
            onConfirm={handleDelete}
            loading={loading}
            icon={Users}
            variant="destructive"
            title="Delete User"
            description={`Are you sure you want to delete "${user?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}