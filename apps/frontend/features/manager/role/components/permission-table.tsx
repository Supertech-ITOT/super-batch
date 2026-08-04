"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { Checkbox } from "@/common/components/ui/checkbox";
import { toDisplayText } from "@/common/lib/format-enum";

type Module = {
    id: number;
    name: string;
};

type PermissionTableProps<T extends FieldValues> = {
    modules?: Module[];
    control: Control<T>;
    name: Path<T>;
};

export default function PermissionTable<T extends FieldValues>({
    modules,
    control,
    name,
}: PermissionTableProps<T>) {
    return (
        <div className="overflow-hidden rounded-md border">
            <div className="grid grid-cols-2 border-b bg-muted/50 px-4 py-3 font-medium">
                <div>Module</div>
                <div className="text-center">Access</div>
            </div>

            {modules?.map((module, index) => (
                <div
                    key={module.id}
                    className="grid grid-cols-2 items-center border-b px-4 py-3 last:border-0"
                >
                    <div>{toDisplayText(module.name)}</div>

                    <div className="flex justify-center">
                        <Controller
                            control={control}
                            name={`${name}.${index}.access` as Path<T>}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}