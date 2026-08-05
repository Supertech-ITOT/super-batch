import PlantTab from "@/features/plant/common/components/plant-tab";
import MaterialView from "@/features/plant/material/components/material-view";

export default function MaterialsPage() {
    return (
        <div className="flex flex-col p-1 h-full w-full min-h-0 flex-1 overflow-hidden sm:p-2 gap-1">
            <PlantTab />
            <MaterialView />
        </div>
    );
}