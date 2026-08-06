import PlantTab from "@/features/plant/common/components/plant-tab";
import MaterialView from "@/features/plant/material/components/material-view";

export default function MaterialsPage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <PlantTab />
            </div>
            <MaterialView />
        </div>
    );
}