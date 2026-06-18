import PlantTab from "@/features/plant/components/plant-tab";
import ParameterView from "@/features/plant/components/view/process-view";
export default function ParametersPage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <PlantTab />
            <ParameterView />
        </div>
    );
}