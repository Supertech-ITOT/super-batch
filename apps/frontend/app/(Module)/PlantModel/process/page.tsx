import PlantTab from "@/features/plant/common/components/plant/plant-tab";
import ParameterView from "@/features/plant/common/components/process/process-view";
export default function ParametersPage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <div className="shrink-0 max-w-fit">
                <PlantTab />
            </div>
            <ParameterView />
        </div>
    );
}