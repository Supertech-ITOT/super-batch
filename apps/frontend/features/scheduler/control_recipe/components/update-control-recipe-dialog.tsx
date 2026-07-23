import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import UserSelect from "@/common/components/form/user-select";
import DatetimePicker from "@/common/components/form/datetime-picker";
import { Skeleton } from "@/common/components/ui/skeleton";
import { updateControlRecipeSchema, UpdateControlRecipeSchema } from "../schemas/control-recipe-schema";
import { useGetControlRecipeById, useUpdateControlRecipe } from "../hooks/use-control-recipe";
import { useGetUser } from "@/features/manager/user/hooks/use-user";

type Props = { open: boolean; onClose: () => void; controlRecipeId: number };
export default function UpdateControlRecipeDialog({ open, onClose, controlRecipeId }: Props) {
    const { mutateAsync: updateControlRecipe, isPending: isUpdating } = useUpdateControlRecipe();
    const { data: controlRecipe, isLoading: isLoadingControlRecipe } = useGetControlRecipeById(controlRecipeId);
    const { data: units, isLoading: isLoadingUnits } = useGetUnits();
    const { data: users, isLoading: isLoadingUsers } = useGetUser();
    const { register, handleSubmit, reset, control, formState: { isSubmitting, isDirty } } = useForm<UpdateControlRecipeSchema>({
        resolver: zodResolver(updateControlRecipeSchema),
        defaultValues: { batchNo: "", batchSize: "", scheduledAt: "", shiftInchargeId: 0 }
    });
    const loading =
        isSubmitting ||
        isUpdating ||
        isLoadingControlRecipe ||
        isLoadingUnits ||
        isLoadingUsers ||
        !controlRecipe ||
        !users ||
        !units;


    useEffect(() => {
        if (!controlRecipe) return;
        reset({ batchNo: controlRecipe.batchNo, batchSize: String(controlRecipe.batchSize), scheduledAt: controlRecipe.scheduledAt, shiftInchargeId: controlRecipe.shiftIncharge.id })
    }, [reset, controlRecipe]);

    const selectedUnitMaxRange = controlRecipe?.recipe.unit.capacity;

    const onSubmit = async (formData: UpdateControlRecipeSchema) => {
        if (!selectedUnitMaxRange) return;
        if (Number(formData.batchSize) > selectedUnitMaxRange) {
            toast.error(`Batch size must be under unit capacity - ${selectedUnitMaxRange}kg`)
            return;
        }
        try {
            const res = await updateControlRecipe({ id: controlRecipeId, data: { ...formData, batchSize: Number(formData.batchSize) } });
            toast.success(res.message ?? "Batch schedule updated successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    }
    const handleClose = () => {
        reset({ batchNo: "", batchSize: "", scheduledAt: "", shiftInchargeId: 0 });
        onClose();
    };
    const onInvalid = (errors: FieldErrors<UpdateControlRecipeSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };
    if (loading) {
        return <Skeleton className="h-full" />;
    }

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <DialogHeader>
                        <DialogTitle>Edit Batch Schedule</DialogTitle>
                        <DialogDescription>
                            Update the batch details and production schedule.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Batch No</Label>
                            </div>
                            <div className="flex">
                                <Input
                                    type="text"
                                    placeholder="LOT_88"
                                    {...register("batchNo")}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex items-center justify-between">
                                <Label>Batch Size</Label>
                            </div>
                            <div className="flex">
                                <Input
                                    type="number"
                                    placeholder={selectedUnitMaxRange ? `0 - ${selectedUnitMaxRange}` : "0"}
                                    {...register("batchSize")}
                                    className="rounded-r-none"
                                />
                                <div className="flex items-center justify-center w-12 border border-l-0 rounded-r-md bg-muted text-sm">
                                    KG
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Schedule At</Label>
                            <Controller
                                name="scheduledAt"
                                control={control}
                                render={({ field }) => (
                                    <DatetimePicker
                                        disabledDates={{ before: new Date() }}
                                        className="bg-card"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="DD MM YY HH:MM:SS"
                                        disabled={loading}
                                    />
                                )}
                            />
                        </div>
                        <div className="min-w-0  space-y-2">
                            <Label>Shift Incharge</Label>
                            <Controller
                                control={control}
                                name="shiftInchargeId"
                                render={({ field }) => (
                                    <UserSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={
                                            users.map((u) => ({
                                                id: u.id,
                                                name: u.name,
                                                email: u.email,
                                                role: u.roleName
                                            }))
                                        }
                                        placeholder="Select"
                                        searchPlaceholder="Search Users..."
                                        disabled={loading}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34 text-white" disabled={loading || !isDirty}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Update"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}