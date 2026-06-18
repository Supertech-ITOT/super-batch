import PlantTab from "@/features/plant/components/plant-tab";
import MaterialView from "@/features/plant/components/view/material/material-view";

export default function MaterialsPage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <PlantTab />
            <MaterialView />
        </div>
    );
}