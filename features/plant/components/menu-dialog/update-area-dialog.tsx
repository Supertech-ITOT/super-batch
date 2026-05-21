"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { useGetAreaById, useUpdateArea } from "../../hooks/use-areas";
import { useGetPlants } from "../../hooks/use-plants";
import { areaSchema, AreaSchema } from "../../schemas/area-schema";

type Props = { open: boolean; onClose: () => void; areaId?: number };
export default function UpdateAreaDialog({ open, onClose, areaId }: Props) {
    const { mutateAsync: updateArea, isPending: isUpdating } = useUpdateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { data: area, isLoading: areaLoading } = useGetAreaById(areaId);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: { name: "", plantId: "" }
    });

    useEffect(() => {
        if (!open || !area || !plants) return;
        reset({ name: area.name, plantId: String(area.plantId) });
    }, [open, area, plants, reset]);
    const loading = isUpdating || plantsLoading || areaLoading || isSubmitting;

    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await updateArea({
                id: areaId!, data: {
                    name: formData.name,
                    plantId: Number(formData.plantId)
                }
            });
            toast.success(res.message ?? "Area updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ name: "", plantId: "" });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Update Area</DialogTitle>
                        <DialogDescription> Update Area information</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Area Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter Area Name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Plant</Label>
                        <Input
                            type="text"
                            disabled
                            value={plants?.find((p) => p.id === area?.plantId)?.name ?? ""}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Area"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}