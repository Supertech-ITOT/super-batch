"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { useCreatePlant } from "../../hooks/use-plants";
import { PlantSchema, plantSchema, PlantSchemaLimit } from "../../schemas/plant-schema";
import { Textarea } from "@/components/ui/textarea";
import { StatusConfig, StatusType } from "../../../common/types/status.type";
import clsx from "clsx";
import CharacterProgress from "@/components/character-progress";

type Props = { open: boolean; onClose: () => void };
export default function CreatePlantDialog({ open, onClose }: Props) {
    const { mutateAsync: createPlant, isPending: isCreating } = useCreatePlant();
    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting, isDirty } } = useForm<PlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: { name: "", description: "", status: StatusType.ACTIVE, location: "", plantType: "" }
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
        reset({ name: "", description: "", status: StatusType.ACTIVE, location: "", plantType: "" });
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
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <div className="flex rounded-md border overflow-hidden transition-all duration-200">
                                {StatusConfig.map((status) => {
                                    const selected = watch("status") === status.value;
                                    return (
                                        <Button
                                            type="button"
                                            disabled={loading}
                                            variant="outline"
                                            key={status.value}
                                            onClick={() =>
                                                setValue("status", status.value as StatusType, {
                                                    shouldDirty: true,
                                                    shouldValidate: true,
                                                })
                                            }
                                            className={clsx(
                                                "relative flex-1 h-8 rounded-none border bg-card py-0.5 flex items-center justify-center gap-3 text-left hover:bg-muted/50",
                                                selected ? "bg-primary/5" : ""
                                            )}
                                        >
                                            <div className={clsx("h-3 w-3 rounded-full", status.dot)} />
                                            <span className="font-medium text-xs">{status.label}</span>
                                            {selected && <div className="absolute bottom-0 h-0.5 w-full bg-primary" />}
                                        </Button>
                                    );
                                })}
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