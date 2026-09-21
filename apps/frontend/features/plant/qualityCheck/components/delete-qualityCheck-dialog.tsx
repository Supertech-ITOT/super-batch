"use client";

import { ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

import { showApiError } from "@/common/lib/show-api-error";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

import {
  useDeleteCheckParameter,
  useGetCheckParameterById,
} from "../hooks/use-qualityCheck";

type Props = {
  open: boolean;
  onClose: () => void;
  checkParameterId?: number;
  currentUserId: number;
};

export default function DeleteQualityCheck({
  open,
  onClose,
  checkParameterId,
  currentUserId,
}: Props) {
  const {
    mutateAsync: deleteCheckParameter,
    isPending: deleteCheckParameterIsPending,
  } = useDeleteCheckParameter();

  const { data: checkParameter, isLoading: checkParameterIsLoading } =
    useGetCheckParameterById(checkParameterId);

  const loading = checkParameterIsLoading || deleteCheckParameterIsPending;

  const handleDelete = async () => {
    if (!checkParameter || !checkParameterId) {
      return;
    }

    try {
      const res = await deleteCheckParameter({
        id: checkParameterId,
        currentUserId,
      });

      toast.success(
        res.message ?? `${checkParameter.name} deleted successfully.`,
      );

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
      icon={ClipboardCheck}
      dialogVariant="destructive"
      title="Delete Quality Check Parameter"
      description={`Are you sure you want to delete "${checkParameter?.name ?? "-"}"? This action cannot be undone.`}
      confirmText="Delete"
    />
  );
}
