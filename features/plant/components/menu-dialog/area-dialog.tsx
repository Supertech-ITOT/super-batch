"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useGetPlants } from "../../hooks/use-plants";
import { useEffect } from "react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { areaSchema, AreaSchema } from "../../schemas/area-schema";
import { useCreateArea, useGetAreaById, useUpdateArea } from "../../hooks/use-areas";

type Props = { open: boolean; onClose: () => void; areaId?: number; plantId?: number, isEdit: boolean };
export default function AreaDialog({ open, onClose, areaId, plantId, isEdit }: Props) {
    const { mutateAsync: createArea, isPending: isCreating } = useCreateArea();
    const { mutateAsync: updateArea, isPending: isUpdating } = useUpdateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants();
    const { data: area, isLoading: areaLoading } = useGetAreaById(areaId);
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: { name: "", plantId: plantId ?? 0, }
    });

    useEffect(() => {
        if (!open) return;
        if (area && isEdit) {
            reset({ name: area.name, plantId: area.plantId });
        }
        if (!isEdit && plantId) {
            reset({ name: "", plantId: Number(plantId) });
        }
    }, [open, isEdit, area, plantId, reset]);
    const loading = isCreating || isUpdating || plantsLoading || areaLoading || isSubmitting;

    const onSubmit = async (formData: AreaSchema) => {
        try {
            if (isEdit) {
                const res = await updateArea({ id: areaId!, data: formData });
                toast.success(res.message ?? "Area updated successfully.");
            } else {
                const res = await createArea(formData);
                toast.success(res.message ?? "Area created successfully.");
            }
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ name: "", plantId: 0, });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Area" : "Create Area"}</DialogTitle>
                        <DialogDescription>{isEdit ? "Update area information." : "Create a new area entity."}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Area Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter area name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Plant</Label>
                        <Controller
                            control={control}
                            name="plantId"
                            render={({ field }) => (
                                <Select
                                    disabled={loading}
                                    value={field.value?.toString() || ""}
                                    onValueChange={(value) => {
                                        const numericValue = parseInt(value, 10);
                                        field.onChange(numericValue);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select plant" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {plants?.map((p) => (
                                                <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormError msg={errors.plantId?.message} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : isEdit ? "Update Area" : "Create Area"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}