"use client";
import { Gauge } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteParameter, useGetParameterById } from "../hooks/use-parameters";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; parameterId?: number };
export default function DeleteParameterDialog({ open, onClose, parameterId }: Props) {
    const { mutateAsync: deleteParameter, isPending: deleteParameterIsPending } = useDeleteParameter();
    const { data: parameter, isLoading: parameterIsLoading } = useGetParameterById(parameterId);
    const loading = deleteParameterIsPending || parameterIsLoading;
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
        <ConfirmDialog
            open={open}
            onClose={onClose}
            onConfirm={handleDelete}
            loading={loading}
            icon={Gauge}
            dialogVariant="destructive"
            title="Delete Parameter"
            description={`Are you sure you want to delete "${parameter?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}