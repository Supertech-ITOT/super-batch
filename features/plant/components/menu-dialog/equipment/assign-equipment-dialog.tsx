"use client";

import { useEffect } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/common/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";
import { Label } from "@/common/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import { showApiError } from "@/common/lib/show-api-error";
import { AssignEquipmentSchema, equipmentAssignmentSchema, } from "../../../schemas/equipment-schema";
import { useAssignEquipment, useGetEquipment, } from "../../../hooks/use-equipment";

type Props = {
    open: boolean;
    onClose: () => void;
    unitId?: number;
};

export default function AssignEquipmentDialog({ open, onClose, unitId }: Props) {
    const { mutateAsync: assignEquipment, isPending } = useAssignEquipment();
    const { data: equipments, isLoading: equipmentsLoading, } = useGetEquipment();
    const {
        handleSubmit,
        reset,
        control,
        formState: { isSubmitting, isDirty },
    } = useForm<AssignEquipmentSchema>({
        resolver: zodResolver(equipmentAssignmentSchema),
        defaultValues: {
            equipmentId: "",
            unitId: String(unitId),
        },
    });

    useEffect(() => {
        if (!open) return;
        reset({
            equipmentId: "",
            unitId: String(unitId),
        });
    }, [open, unitId, reset]);

    const loading = isPending || equipmentsLoading || isSubmitting;

    const handleClose = () => {
        reset({ equipmentId: "", unitId: String(unitId), });
        onClose();
    };

    const onSubmit = async (formData: AssignEquipmentSchema) => {
        try {
            const res = await assignEquipment({
                equipmentId: Number(formData.equipmentId),
                unitId: Number(formData.unitId),
            });
            toast.success(res.message ?? "Equipment assigned successfully.");
            handleClose();
        } catch (error) {
            showApiError(error);
        }
    };

    const onInvalid = (errors: FieldErrors<AssignEquipmentSchema>) => {
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
            toast.error(firstError.message.toString());
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) handleClose();
            }}
        >
            <DialogContent className="sm:max-w-md">
                <form
                    onSubmit={handleSubmit(
                        onSubmit,
                        onInvalid
                    )}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Assign Equipment
                        </DialogTitle>

                        <DialogDescription>
                            Assign an equipment to this unit.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="space-y-2">
                            <Label>
                                Select Equipment
                            </Label>

                            <Controller
                                control={control}
                                name="equipmentId"
                                render={({ field }) => (
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={
                                            field.onChange
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Equipment" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {equipments?.map((equipment) => (
                                                    <SelectItem key={equipment.id} value={String(equipment.id)}>
                                                        {equipment.name}
                                                    </SelectItem>
                                                )
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            className="min-w-34 text-white"
                            disabled={
                                loading || !isDirty
                            }
                        >
                            {loading ? (
                                <Loader className="h-4 w-4 animate-spin text-white" />
                            ) : (
                                "Assign"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}