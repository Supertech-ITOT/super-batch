"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateArea } from "../../hooks/use-areas";
import { useEffect } from "react";
import { useGetPlants } from "../../hooks/use-plants";
import { areaSchema, AreaSchema } from "../../schemas/area-schema";

type Props = { open: boolean; onClose: () => void; plantId?: number };
export default function CreateAreaDialog({ open, onClose, plantId }: Props) {
    const { mutateAsync: createArea, isPending: isCreating } = useCreateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: { name: "", plantId: "" }
    });

    useEffect(() => {
        if (!open || !plantId) return;
        reset({ name: "", plantId: String(plantId) })
    }, [open, plantId, reset]);

    const loading = isCreating || plantsLoading || isSubmitting;
    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await createArea({ name: formData.name, plantId: Number(formData.plantId) });
            toast.success(res.message ?? "Area created successfully.");
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
                        <DialogTitle>Create Area</DialogTitle>
                        <DialogDescription>Create a new area entity.</DialogDescription>
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
                                    disabled={loading || !!plantId}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Plant" />
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
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Area"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}