import PlantTab from "@/features/plant/common/components/plant-tab";
import ParameterView from "@/features/plant/common/components/process-view";
export default function ParametersPage() {
    return (
        <div className="flex flex-col p-1 h-full w-full min-h-0 flex-1 overflow-hidden sm:p-2 gap-1">
            <PlantTab />
            <ParameterView />
        </div>
    );
}