"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cpu } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { UnAssignEquipmentSchema, equipmentAssignmentSchema, } from "../schemas/equipment-schema";
import { useUnAssignEquipment, useGetEquipmentsByUnitId, } from "../hooks/use-equipment";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import SearchableSelect from "@/common/components/form/searchable-select";
import { showFormError } from "@/common/lib/show-form-error";

type Props = {
    open: boolean;
    onClose: () => void;
    unitId?: number;
    equipmentId?: number;
};

export default function UnAssignEquipmentDialog({ open, onClose, unitId, equipmentId }: Props) {
    const { mutateAsync: unAssignEquipment, isPending } = useUnAssignEquipment();
    const { data: equipments, isLoading: equipmentsLoading, } = useGetEquipmentsByUnitId(unitId);
    const { handleSubmit, reset, control, formState: { isSubmitting, isDirty }, } = useForm<UnAssignEquipmentSchema>({
        resolver: zodResolver(equipmentAssignmentSchema),
        defaultValues: { equipmentId: equipmentId, unitId: unitId }
    });
    const loading = isPending || equipmentsLoading || isSubmitting;

    const onSubmit = async (formData: UnAssignEquipmentSchema) => {
        try {
            const res = await unAssignEquipment(formData);
            toast.success(res.message ?? "Equipment UnAssigned successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ equipmentId: 0, unitId: 0 });
        onClose();
    };

    const onInvalid = (errors: FieldErrors<UnAssignEquipmentSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="UnAssign Equipment"
            description="UnAssign a equipment to unit."
            submitDisabled={!isDirty}
            submitLabel="UnAssign"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Cpu}
        >
            <Controller
                control={control}
                name="equipmentId"
                render={({ field }) => (
                    <SearchableSelect
                        label="Equipment"
                        value={field.value}
                        icon={Cpu}
                        onChange={field.onChange}
                        options={equipments?.map((a) => ({
                            value: a.id,
                            label: a.name,
                        })) ?? []}
                        placeholder="Select Equipment"
                        searchPlaceholder="Search Equipments..."
                        disabled={loading}
                    />
                )}
            />
        </FormDialog>
    );
}