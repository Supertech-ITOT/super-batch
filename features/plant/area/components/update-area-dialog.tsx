"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { useGetAreaById, useUpdateArea } from "../hooks/use-areas";
import { areaSchema, AreaSchema, AreaSchemaLimit } from "../schemas/area-schema";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";
import { useGetPlants } from "../../plant/hooks/use-plants";

type Props = { open: boolean; onClose: () => void; areaId?: number };
export default function UpdateAreaDialog({ open, onClose, areaId }: Props) {
    const { mutateAsync: updateArea, isPending: isUpdating } = useUpdateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { data: area, isLoading: areaLoading } = useGetAreaById(areaId);
    const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: { name: "", plantId: undefined, description: "", areaType: "" }
    });

    useEffect(() => {
        if (!open || !area || !plants) return;
        reset({ name: area.name, plantId: String(area.plantId), areaType: area.areaType, description: area.description });
    }, [open, area, plants, reset]);
    const loading = isUpdating || plantsLoading || areaLoading || isSubmitting;

    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await updateArea({
                id: areaId!, data: {
                    name: formData.name,
                    plantId: Number(formData.plantId),
                    areaType: formData.areaType,
                    description: formData.description,
                }
            });
            toast.success(res.message ?? "Area updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const handleClose = () => {
        reset({ name: "", plantId: undefined, description: "", areaType: "" });
        onClose();
    };

    const onInvalid = (errors: FieldErrors<AreaSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Update Area</DialogTitle>
                        <DialogDescription> Update Area information</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={AreaSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="GreenLand Area"
                                maxLength={AreaSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={AreaSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief area overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={AreaSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>Area Type</Label>
                                    <CharacterProgress value={watch("areaType")} max={AreaSchemaLimit.areaType.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="Chemical Area"
                                    maxLength={AreaSchemaLimit.areaType.max}
                                    {...register("areaType")}
                                />
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label>Plant</Label>
                                <Input
                                    type="text"
                                    disabled
                                    value={plants?.find((p) => p.id === area?.plantId)?.name ?? ""}
                                />
                            </div>
                        </div>
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