"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateArea } from "../../../hooks/use-areas";
import { useEffect } from "react";
import { useGetPlants } from "../../../hooks/use-plants";
import { areaSchema, AreaSchema, AreaSchemaLimit } from "../../../schemas/area-schema";
import CharacterProgress from "@/components/character-progress";
import { Textarea } from "@/components/ui/textarea";
import { StatusConfig, StatusType } from "../../../../common/types/status.type";
import clsx from "clsx";

type Props = { open: boolean; onClose: () => void; plantId?: number };
export default function CreateAreaDialog({ open, onClose, plantId }: Props) {
    const { mutateAsync: createArea, isPending: isCreating } = useCreateArea();
    const { data: plants, isLoading: plantsLoading } = useGetPlants(open);
    const { register, handleSubmit, reset, control, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<AreaSchema>({
        resolver: zodResolver(areaSchema),
        defaultValues: { name: "", plantId: undefined, description: "", areaType: "", status: StatusType.ACTIVE }
    });

    useEffect(() => {
        if (!open || !plantId) return;
        reset({ name: "", plantId: String(plantId), description: "", areaType: "", status: StatusType.ACTIVE })
    }, [open, plantId, reset]);

    const loading = isCreating || plantsLoading || isSubmitting;
    const onSubmit = async (formData: AreaSchema) => {
        try {
            const res = await createArea({ name: formData.name, plantId: Number(formData.plantId), description: formData.description, areaType: formData.areaType, status: formData.status });
            toast.success(res.message ?? "Area created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", plantId: undefined, description: "", areaType: "", status: StatusType.ACTIVE });
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
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Area"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}