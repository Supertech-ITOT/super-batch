"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Factory, Feather } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetAreaById, useUpdateArea } from "../hooks/use-areas";
import { areaDefaultValues, areaSchema, AreaSchema, AreaSchemaLimit } from "../schemas/area-schema";
import { TextInput } from "@/common/components/form/text-input";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import FormDialog from "@/common/components/form/form-dialog";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import { showFormError } from "@/common/lib/show-form-error";
import SearchableSelect from "@/common/components/form/searchable-select";
import { Label } from "@/common/components/ui/label";
import { useGetPlants } from "../../plant/hooks/use-plants";

type Props = { open: boolean; onClose: () => void; areaId?: number };
export default function UpdateAreaDialog({ open, onClose, areaId }: Props) {
    const { mutateAsync: updateArea, isPending: isUpdating } = useUpdateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { data: area, isLoading: areaLoading } = useGetAreaById(areaId);
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: areaDefaultValues
    });

    useEffect(() => {
        if (!open || !area) return;
        reset({ name: area.name, plantId: area.plantId, description: area.description });
    }, [open, area, reset]);
    const loading = isUpdating || areaLoading || plantsLoading || isSubmitting;

    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await updateArea({ id: areaId!, data: formData });
            toast.success(res.message ?? "Area updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset(areaDefaultValues);
        onClose();
    };

    const onInvalid = (errors: FieldErrors<AreaSchema>) => {
        toast.error(showFormError(errors));
    };

    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Update Area"
            description="Update a area entity."
            footer={
                <FormLoadingButton form="update-area-form" type="submit" loading={loading} disabled={!isDirty}>
                    Update
                </FormLoadingButton>
            }
            icon={Building}
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} id="update-area-form">
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <TextInput
                            label="Name"
                            counter
                            maxCharacters={AreaSchemaLimit.name.max}
                            icon={Building}
                            placeholder="Area Name"
                            maxLength={AreaSchemaLimit.name.max}
                            disabled={loading}
                            value={watch("name")}
                            {...register("name")}
                        />
                        <Controller
                            control={control}
                            name="plantId"
                            render={({ field }) => (
                                <SearchableSelect
                                    value={field.value}
                                    label="Plant"
                                    icon={Factory}
                                    onChange={field.onChange}
                                    options={plants?.map((a) => ({
                                        value: a.id,
                                        label: a.name,
                                    })) ?? []}
                                    placeholder="Select Plant"
                                    searchPlaceholder="Search Plants..."
                                    disabled={loading}
                                />
                            )}
                        />
                    </div>
                    <TextAreaInput
                        label="Description"
                        placeholder="Brief Area Overview"
                        icon={Feather}
                        counter
                        maxCharacters={AreaSchemaLimit.description.max}
                        maxLength={AreaSchemaLimit.description.max}
                        disabled={loading}
                        value={watch("description")}
                        {...register("description")}
                    />


                </div>
            </form>
        </FormDialog>
    );
}