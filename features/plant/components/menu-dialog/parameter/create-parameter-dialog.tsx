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
import { useGetUomTypes } from "@/features/common/hooks/useMetadata";
import { useCreateParameter } from "../../../hooks/use-parameters";
import { parameterSchema, ParameterSchema, ParameterSchemaLimit } from "../../../schemas/parameter-schema";
import CharacterProgress from "@/components/character-progress";
import { Textarea } from "@/components/ui/textarea";
import { PlantSchema } from "../../../schemas/plant-schema";

type Props = { open: boolean; onClose: () => void; };
export default function CreateParameterDialog({ open, onClose }: Props) {
    const { mutateAsync: createParameter, isPending: isCreating } = useCreateParameter();
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty } } = useForm<ParameterSchema>({
        resolver: zodResolver(parameterSchema),
        defaultValues: { name: "", description: "", code: "", uom: "" }
    });
    const loading = isCreating || isSubmitting || uomTypesIsLoading;
    const onSubmit = async (formData: ParameterSchema) => {
        try {
            const res = await createParameter({
                name: formData.name,
                description: formData.description,
                code: formData.code,
                uom: formData.uom
            });
            toast.success(res.message ?? "Parameter created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", description: "", code: "", uom: "" });
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
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Create Parameter</DialogTitle>
                        <DialogDescription>Create a new parameter entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Name</Label>
                                <CharacterProgress value={watch("name")} max={ParameterSchemaLimit.name.max} />
                            </div>
                            <Input
                                type="text"
                                disabled={loading}
                                placeholder="Temperature"
                                maxLength={ParameterSchemaLimit.name.max}
                                {...register("name")}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="space-y-2 relative flex-1">
                                <div className="flex items-center justify-between">
                                    <Label>Parameter Code</Label>
                                    <CharacterProgress value={watch("code")} max={ParameterSchemaLimit.code.max} />
                                </div>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="TT101"
                                    maxLength={ParameterSchemaLimit.code.max}
                                    {...register("code")}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label>Select Uom Type</Label>
                                <Controller
                                    control={control}
                                    name="uom"
                                    render={({ field }) => (
                                        <Select
                                            disabled={loading}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Uom Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {uomTypes?.map((e) => (
                                                        <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <CharacterProgress value={watch("description")} max={ParameterSchemaLimit.description.max} />
                            </div>
                            <Textarea
                                disabled={loading}
                                placeholder="Brief parameter overview"
                                className="min-h-30 w-full resize-none break-all overflow-hidden"
                                maxLength={ParameterSchemaLimit.description.max}
                                {...register("description")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Create Parameter"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}