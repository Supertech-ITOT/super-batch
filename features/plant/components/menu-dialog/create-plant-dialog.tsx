"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import FormError from "@/components/form-error";
import { toast } from "sonner";
import { showApiError } from "@/lib/show-api-error";
import { useCreatePlant } from "../../hooks/use-plants";
import { PlantSchema, plantSchema } from "../../schemas/plant-schema";

type Props = { open: boolean; onClose: () => void };
export default function CreatePlantDialog({ open, onClose }: Props) {
    const { mutateAsync: createPlant, isPending: isCreating } = useCreatePlant();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm<PlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: { name: "" }
    });

    const loading = isCreating || isSubmitting;
    const onSubmit = async (formData: PlantSchema) => {
        try {
            const res = await createPlant({ name: formData.name });
            toast.success(res.message ?? "Plant created successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };
    const handleClose = () => {
        reset({ name: "" });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create Plant</DialogTitle>
                        <DialogDescription>Create a new plant entity.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Plant Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter plant name"
                            {...register("name")}
                        />
                        <FormError msg={errors.name?.message} />
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