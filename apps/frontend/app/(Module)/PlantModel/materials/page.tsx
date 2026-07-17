import PlantTab from "@/features/plant/common/components/plant-tab";
import MaterialView from "@/features/plant/material/components/material-view";

export default function MaterialsPage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <PlantTab />
            <MaterialView />
        </div>
    );
}