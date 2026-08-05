import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteRole, useGetRolesById } from "@/features/manager/role/hooks/use-role";
import ConfirmDialog from "@/common/components/form/confirm-dialog";


type Props = { open: boolean; onClose: () => void; roleId?: number };
export default function DeleteRoleDialog({ open, onClose, roleId }: Props) {
    const { mutateAsync: deleteRole, isPending: deleteRoleIsPending, isSuccess } = useDeleteRole();
    const { data: role, isLoading: roleIsLoading } = useGetRolesById(roleId);
    const loading = roleIsLoading || deleteRoleIsPending;
    const handleDelete = async () => {
        if (!role || !roleId) return;
        try {
            const res = await deleteRole({ id: roleId });
            toast.success(res.message ?? `${role.name} deleted successfully.`);
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
            icon={ShieldCheck}
            dialogVariant="destructive"
            successVariant="delete"
            title="Delete Role"
            description={`Are you sure you want to delete "${role?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
            completed={isSuccess}
        />
    );
}