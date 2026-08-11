"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cpu } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { AssignEquipmentSchema, equipmentAssignmentSchema, } from "../schemas/equipment-schema";
import { useAssignEquipment, useGetEquipment, } from "../hooks/use-equipment";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import { showFormError } from "@/common/lib/show-form-error";
import SearchableSelect from "@/common/components/form/searchable-select";

type Props = {
    open: boolean;
    onClose: () => void;
    unitId?: number;
};

export default function AssignEquipmentDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: assignEquipment, isPending } = useAssignEquipment();
    const { data: equipments, isLoading: equipmentsLoading, } = useGetEquipment();
    const { handleSubmit, reset, control, formState: { isSubmitting, isDirty }, } = useForm<AssignEquipmentSchema>({
        resolver: zodResolver(equipmentAssignmentSchema),
        defaultValues: { equipmentId: 0, unitId: unitId },
    });

    const loading = isPending || equipmentsLoading || isSubmitting;
    const onSubmit = async (formData: AssignEquipmentSchema) => {
        try {
            const res = await assignEquipment(formData);
            toast.success(res.message ?? "Equipment assigned successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ equipmentId: 0, unitId: 0 });
        onClose();
    };

    const onInvalid = (errors: FieldErrors<AssignEquipmentSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Assign Equipment"
            description="Assign a equipment to unit."
            submitDisabled={!isDirty}
            submitLabel="Assign"
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
            =        </FormDialog>
    );
}