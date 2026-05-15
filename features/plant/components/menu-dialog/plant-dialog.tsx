"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { plantSchema, PlantSchema } from "../../schemas/plant-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

type Props = { open: boolean; onClose: () => void; plantId?: number; };
export default function PlantDialog({ open, onClose, plantId, }: Props) {
    const isEdit = !!plantId;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PlantSchema>({
        resolver: zodResolver(plantSchema),
        defaultValues: {
            name: "",
        },
    });
    const loading = isSubmitting;

    const onSubmit = () => {
        reset();
        onClose();
    }
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) { onClose(); } }}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Plant" : "Create Plant"}</DialogTitle>
                        <DialogDescription>{isEdit ? "Update plant information." : "Create a new plant entity."}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Plant Name</Label>
                        <Input
                            type="text"
                            disabled={loading}
                            placeholder="Enter plant name"
                            {...register("name")}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={loading} type="button" variant="outline" onClick={() => reset()}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="min-w-34" disabled={loading}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : isEdit ? "Update Plant" : "Create Plant"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}