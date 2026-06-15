"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Textarea } from "@/common/components/ui/textarea";
import CharacterProgress from "@/common/components/form/character-progress";
import { useCreatePlant } from "@/features/plant/hooks/use-plants";
import { PlantSchema, plantSchema, PlantSchemaLimit } from "@/features/plant/schemas/plant-schema";

type Props = { open: boolean; onClose: () => void };
export default function CreatePlantDialog({ open, onClose }: Props) {
    const { mutateAsync: createPlant, isPending: isCreating } = useCreatePlant();
    const { register, handleSubmit, reset, watch, formState: { isSubmitting, isDirty } } = useForm<PlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: { name: "", description: "", location: "", plantType: "" }
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
        reset({ name: "", description: "", location: "", plantType: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<PlantSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };


    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Create Plant</DialogTitle>
                        <DialogDescription>Create a new plant entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={PlantSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Alpha Plant"
                                maxLength={PlantSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={PlantSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief plant overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={PlantSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative">
                                <div className="flex items-center justify-between">
                                    <Label>Location</Label>
                                    <CharacterProgress value={watch("location")} max={PlantSchemaLimit.location.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="Mumbai, India"
                                    maxLength={PlantSchemaLimit.location.max}
                                    {...register("location")}
                                />
                            </div>
                            <div className="space-y-2 relative">
                                <div className="flex items-center justify-between">
                                    <Label>Plant Type</Label>
                                    <CharacterProgress value={watch("plantType")} max={PlantSchemaLimit.plantType.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="Manufacturing"
                                    maxLength={PlantSchemaLimit.plantType.max}
                                    {...register("plantType")}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Plant"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}