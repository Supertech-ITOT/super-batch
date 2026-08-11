"use client";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, Factory, Feather } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useCreateArea } from "../hooks/use-areas";
import { useEffect } from "react";
import { areaDefaultValues, areaSchema, AreaSchema, AreaSchemaLimit } from "../schemas/area-schema";
import { useGetPlants } from "../../plant/hooks/use-plants";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { showFormError } from "@/common/lib/show-form-error";

type Props = { open: boolean; onClose: () => void; plantId?: number };
export default function CreateAreaDialog({ open, onClose, plantId }: Props) {
    const { mutateAsync: createArea, isPending: isCreating } = useCreateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: areaDefaultValues,
    });

    useEffect(() => {
        if (!open || !plantId) return;
        reset({ ...areaDefaultValues, plantId: plantId })
    }, [open, plantId, reset]);

    const loading = isCreating || plantsLoading || isSubmitting;
    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await createArea(formData);
            toast.success(res.message ?? "Area created successfully.");
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
            title="Create Area"
            description="Create a area entity."
            submitDisabled={!isDirty}
            submitLabel="Create"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Building}
        >
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
                    value={watch("description")}
                    disabled={loading}
                    {...register("description")}
                />
            </div>
        </FormDialog>
    );
}