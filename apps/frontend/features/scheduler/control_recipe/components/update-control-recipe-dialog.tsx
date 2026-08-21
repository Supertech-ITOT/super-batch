"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { CalendarClock, Hash, Scale, User } from "lucide-react";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import UserSelect from "@/common/components/form/user-select";
import DatetimePicker from "@/common/components/form/datetime-picker";
import { controlRecipeDefaultValues, ControlRecipeSchemaLimit, updateControlRecipeSchema, UpdateControlRecipeSchema } from "../schemas/control-recipe-schema";
import { useGetControlRecipeById, useUpdateControlRecipe } from "../hooks/use-control-recipe";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { NumberInput } from "@/common/components/form/number-input";
import FormDialog from "@/common/components/form/form-dialog";
import { TextInput } from "@/common/components/form/text-input";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; controlRecipeId: number };
export default function UpdateControlRecipeDialog({ open, onClose, controlRecipeId }: Props) {
    const { mutateAsync: updateControlRecipe, isPending: isUpdating } = useUpdateControlRecipe();
    const { data: controlRecipe, isLoading: isLoadingControlRecipe } = useGetControlRecipeById(controlRecipeId);
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: users, isLoading: isLoadingUsers } = useGetUser();
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<UpdateControlRecipeSchema>({
        resolver: zodResolver(updateControlRecipeSchema),
        defaultValues: controlRecipeDefaultValues,
    });
    const loading =
        isSubmitting ||
        isUpdating ||
        isLoadingControlRecipe ||
        isLoadingUnits ||
        isLoadingUsers ||
        !controlRecipe ||
        !users ||
        !units;


    useEffect(() => {
        if (!controlRecipe) return;
        reset({
            ...controlRecipeDefaultValues,
            batchNo: controlRecipe.batchNo,
            batchSize: controlRecipe.batchSize,
            scheduledAt: controlRecipe.scheduledAt,
            shiftInchargeId: controlRecipe.shiftIncharge.id
        })
    }, [reset, controlRecipe]);

    const selectedUnitMaxRange = controlRecipe?.recipe.unit.capacity;

    const onSubmit = async (formData: UpdateControlRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (formData.batchSize > selectedUnitMaxRange) {
            toast.error(`Batch size must be under unit capacity - ${selectedUnitMaxRange}kg`)
            return;
        }
        try {
            const res = await updateControlRecipe({ id: controlRecipeId, data: { ...formData, batchSize: Number(formData.batchSize) } });
            toast.success(res.message ?? "Batch schedule updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    }
    const handleClose = () => {
        reset(controlRecipeDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UpdateControlRecipeSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Schedule"
            description="Configure the batch details and production schedule."
            submitDisabled={!isDirty}
            submitLabel="Update"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={CalendarClock}
        >
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Batch No"
                        icon={Hash}
                        counter
                        maxCharacters={ControlRecipeSchemaLimit.batchNo.max}
                        placeholder="Batch No"
                        maxLength={ControlRecipeSchemaLimit.batchNo.max}
                        disabled={loading}
                        value={watch("batchNo")}
                        {...register("batchNo")}
                    />
                    <NumberInput
                        label="Batch Size"
                        icon={Scale}
                        suffix="KG"
                        placeholder={selectedUnitMaxRange ? `0 - ${selectedUnitMaxRange}` : "0"}
                        disabled={loading}
                        value={watch("batchSize")}
                        {...register("batchSize", {
                            valueAsNumber: true,
                        })}
                    />
                </div>

                <Controller
                    control={control}
                    name="shiftInchargeId"
                    render={({ field }) => (
                        <UserSelect
                            label="Shift Incharge"
                            icon={User}
                            value={field.value}
                            onChange={field.onChange}
                            options={
                                users?.map((u) => ({
                                    id: u.id,
                                    name: u.name,
                                    email: u.email,
                                    role: u.roleName
                                })) ?? []
                            }
                            placeholder="Select User"
                            searchPlaceholder="Search Users..."
                            disabled={loading}
                        />
                    )}
                />
                <Controller
                    name="scheduledAt"
                    control={control}
                    render={({ field }) => (
                        <DatetimePicker
                            icon={CalendarClock}
                            label="Schedule At"
                            disabledDates={{ before: new Date() }}
                            className="bg-card"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="DD MM YY HH:MM"
                            disabled={loading}
                        />
                    )}
                />
            </div>
        </FormDialog>

    )

}