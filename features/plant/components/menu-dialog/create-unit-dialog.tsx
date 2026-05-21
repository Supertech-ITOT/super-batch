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
import { useGetAreas } from "../../hooks/use-areas";
import { useCreateUnit } from "../../hooks/use-units";
import { UnitSchema, unitSchema } from "../../schemas/unit-schema";
import { useGetUnitTypes } from "@/features/common/hooks/useMetadata";

type Props = { open: boolean; onClose: () => void };
export default function CreateUnitDialog({ open, onClose }: Props) {
    const { mutateAsync: createUnit, isPending: isCreating } = useCreateUnit();
    const { data: areas, isLoading: areasLoading } = useGetAreas();
    const { data: unitTypes, isLoading: unitTypeIsLoading } = useGetUnitTypes();
    const { register, handleSubmit, reset, control, formState: { errors, isSubmitting, isDirty } } = useForm<UnitSchema>({
        resolver: zodResolver(unitSchema),
        defaultValues: { name: "", areaId: "", unitType: "" }
    });

    const loading = isCreating || areasLoading || isSubmitting || unitTypeIsLoading;
    const onSubmit = async (formData: UnitSchema) => {
        try {
            const res = await createUnit({ name: formData.name, areaId: Number(formData.areaId), unitType: formData.unitType });
            toast.success(res.message ?? "Unit created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", areaId: "", unitType: "" });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create Unit</DialogTitle>
                        <DialogDescription>Create a new Unit entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Unit Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter unit name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Area</Label>
                        <Controller
                            control={control}
                            name="areaId"
                            render={({ field }) => (
                                <Select
                                    disabled={loading}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {areas?.map((p) => (
                                                <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormError msg={errors.areaId?.message} />
                    </div>
                    <div className="py-4 space-y-2">
                        <Label>Select Unit Type</Label>
                        <Controller
                            control={control}
                            name="unitType"
                            render={({ field }) => (
                                <Select
                                    disabled={loading}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Unit Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {unitTypes?.map((p) => (
                                                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormError msg={errors.unitType?.message} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Unit"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}