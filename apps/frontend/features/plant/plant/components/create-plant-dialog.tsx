"use client";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Factory, Feather, MapPin } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { plantDefaultValues, PlantSchema, plantSchema, PlantSchemaLimit } from "@/features/plant/plant/schemas/plant-schema";
import { useCreatePlant } from "../hooks/use-plants";
import { showFormError } from "@/common/lib/show-form-error";
import FormDialog from "@/common/components/form/form-dialog";
import FormLoadingButton from "@/common/components/form/form-loading-button";
import { TextInput } from "@/common/components/form/text-input";
import { TextAreaInput } from "@/common/components/form/text-area-input";

type Props = { open: boolean; onClose: () => void };
export default function CreatePlantDialog({ open, onClose }: Props) {
    const { mutateAsync: createPlant, isPending: isCreating } = useCreatePlant();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<PlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: plantDefaultValues,
    });
    const loading = isCreating || isSubmitting;
    const onSubmit = async (formData: PlantSchema) => {
        try {
            const res = await createPlant(formData);
            toast.success(res.message ?? "Plant created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset(plantDefaultValues);
        onClose();
    };
    const onInvalid = (errors: FieldErrors<PlantSchema>) => {
        toast.error(showFormError(errors));
    };


    return (
        <FormDialog
            open={open}
            loading={loading}
            onClose={handleClose}
            title="Create Plant"
            description="Create a plant entity."
            submitDisabled={!isDirty}
            submitLabel="Create"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            icon={Factory}
        >
            <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <TextInput
                        label="Name"
                        counter
                        maxCharacters={PlantSchemaLimit.name.max}
                        placeholder="Plant Name"
                        maxLength={PlantSchemaLimit.name.max}
                        disabled={loading}
                        icon={Factory}
                        value={watch("name")}
                        {...register("name")}
                    />
                    <TextInput
                        label="Location"
                        counter
                        icon={MapPin}
                        maxCharacters={PlantSchemaLimit.location.max}
                        placeholder="Location"
                        maxLength={PlantSchemaLimit.location.max}
                        disabled={loading}
                        value={watch("location")}
                        {...register("location")}
                    />
                </div>
                <TextAreaInput
                    label="Description"
                    placeholder="Brief Plant Overview"
                    counter
                    icon={Feather}
                    maxCharacters={PlantSchemaLimit.description.max}
                    maxLength={PlantSchemaLimit.description.max}
                    value={watch("description")}
                    disabled={loading}
                    {...register("description")}
                />
            </div>
        </FormDialog>
    );
}