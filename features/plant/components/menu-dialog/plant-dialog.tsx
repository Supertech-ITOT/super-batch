"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { plantSchema, PlantSchema } from "../../schemas/plant-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useCreatePlant, useGetPlantById, useUpdatePlant } from "../../hooks/use-plants";
import { useEffect } from "react";
import FormError from "@/components/form-error";
import { toast } from "sonner";

type Props = { open: boolean; onClose: () => void; plantId?: number; isEdit: boolean };
export default function PlantDialog({ open, onClose, plantId, isEdit }: Props) {
    const { mutateAsync: createPlant, isPending: isCreating } = useCreatePlant();
    const { mutateAsync: updatePlant, isPending: isUpdating } = useUpdatePlant();
    const { data, isLoading } = useGetPlantById(plantId as number);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm<PlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: { name: "" }
    });

    useEffect(() => {
        if (data && isEdit) {
            reset({ name: data.name });
        }
    }, [data, isEdit, reset]);

    const loading = isSubmitting || isLoading || isCreating || isUpdating;

    const onSubmit = async (formData: PlantSchema) => {
        try {
            if (isEdit) {
                await updatePlant({
                    id: plantId!,
                    data: formData,
                });
            } else {
                const res = await createPlant(formData);

            }
            toast.success(`Plant "${formData.name}" ${isEdit ? "updated" : "created"} successfully.`)
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Plant" : "Create Plant"}</DialogTitle>
                        <DialogDescription>{isEdit ? "Update plant information." : "Create a new plant entity."}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Plant Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter plant name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : isEdit ? "Update Plant" : "Create Plant"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}