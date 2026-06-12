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
import { useGetParameterById, useUpdateParameter } from "../../../hooks/use-parameters";
import { parameterSchema, ParameterSchema, ParameterSchemaLimit } from "../../../schemas/parameter-schema";
import CharacterProgress from "@/components/form/character-progress";
import { useEffect } from "react";

type Props = { open: boolean; onClose: () => void; parameterId?: number };
export default function UpdateParameterDialog({ open, onClose, parameterId }: Props) {
    const { mutateAsync: updateParameter, isPending: isUpdating } = useUpdateParameter();
    const { data: parameter, isLoading: parameterIsLoading } = useGetParameterById(parameterId);
    const { data: uomTypes, isLoading: uomTypesIsLoading } = useGetUomTypes(open);
    const { register, handleSubmit, reset, control, watch, setValue, formState: { isSubmitting, isDirty } } = useForm<ParameterSchema>({
        resolver: zodResolver(parameterSchema),
        defaultValues: { name: "", uom: "" }
    });

    useEffect(() => {
        if (!open || !parameter) return;
        reset({
            name: parameter.name,
            uom: parameter.uom.value,
        });
    }, [open, parameter, reset]);

    const loading = isUpdating || isSubmitting || uomTypesIsLoading || parameterIsLoading;
    const onSubmit = async (formData: ParameterSchema) => {
        try {
            const res = await updateParameter({
                id: parameterId!, data: formData
            });
            toast.success(res.message ?? "Parameter updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "", uom: "" });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<ParameterSchema>) => {
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
                        <DialogTitle>Update Parameter</DialogTitle>
                        <DialogDescription>Update parameter information.</DialogDescription>
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
                        <div className="space-y-2 relative">
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update Parameter"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}