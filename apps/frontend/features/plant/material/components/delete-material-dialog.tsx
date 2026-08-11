"use client";
import { PackageCheck } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteMaterial, useGetMaterialById } from "../hooks/use-materials";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; materialId?: number };
export default function DeleteMaterialDialog({ open, onClose, materialId }: Props) {
    const { mutateAsync: deleteMaterial, isPending: deleteMaterialIsPending } = useDeleteMaterial();
    const { data: material, isLoading: materialIsLoading } = useGetMaterialById(materialId);
    const loading = deleteMaterialIsPending || materialIsLoading;
    const handleDelete = async () => {
        if (!material || !materialId) return;
        try {
            const res = await deleteMaterial({ id: materialId });
            toast.success(res.message ?? `${material?.name} deleted successfully.`);
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
            icon={PackageCheck}
            dialogVariant="destructive"
            title="Delete Material"
            description={`Are you sure you want to delete "${material?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}