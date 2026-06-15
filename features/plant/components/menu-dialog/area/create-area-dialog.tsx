"use client";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useCreateArea } from "../../../hooks/use-areas";
import { useEffect } from "react";
import { useGetPlants } from "../../../hooks/use-plants";
import { areaSchema, AreaSchema, AreaSchemaLimit } from "../../../schemas/area-schema";
import CharacterProgress from "@/common/components/form/character-progress";
import { Textarea } from "@/common/components/ui/textarea";

type Props = { open: boolean; onClose: () => void; plantId?: number };
export default function CreateAreaDialog({ open, onClose, plantId }: Props) {
    const { mutateAsync: createArea, isPending: isCreating } = useCreateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { register, handleSubmit, reset, control, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: { name: "", plantId: undefined, description: "", areaType: "" }
    });

    useEffect(() => {
        if (!open || !plantId) return;
        reset({ name: "", plantId: String(plantId), description: "", areaType: "" })
    }, [open, plantId, reset]);

    const loading = isCreating || plantsLoading || isSubmitting;
    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await createArea({ name: formData.name, plantId: Number(formData.plantId), description: formData.description, areaType: formData.areaType });
            toast.success(res.message ?? "Area created successfully.");
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
                        <DialogTitle>Create Area</DialogTitle>
                        <DialogDescription>Create a new area entity.</DialogDescription>
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
                            <div className="space-y-2 flex-1 min-w-0">
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
                            </div>
                        </div>
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