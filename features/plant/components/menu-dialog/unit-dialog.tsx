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
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = { open: boolean; onClose: () => void; unitId?: number; areaId?: number, isEdit: boolean };
export default function UnitDialog({ open, onClose, unitId, areaId, isEdit }: Props) {
    const { mutateAsync: createPlant, isPending: isCreating } = useCreatePlant();
    const { mutateAsync: updatePlant, isPending: isUpdating } = useUpdatePlant();
    const { data, isLoading } = useGetPlantById(unitId);
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
                const res = await updatePlant({ id: unitId!, data: formData });
                toast.success(res.message ?? "Unit updated successfully.");
            } else {
                const res = await createPlant(formData);
                toast.success(res.message ?? "Unit created successfully.");
            }
            handleClose();
        } catch (error) {
            showApiError(error);
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
                        <DialogTitle>{isEdit ? "Edit Unit" : "Create Unit"}</DialogTitle>
                        <DialogDescription>{isEdit ? "Update unit information." : "Create a new unit entity."}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Unit Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter area name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Unit Type</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Area</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose Area" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : isEdit ? "Update Unit" : "Create Unit"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}