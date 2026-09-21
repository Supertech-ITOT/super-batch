import PlantTab from "@/features/plant/common/components/plant/plant-tab";
import QualityCheckView from "@/features/plant/qualityCheck/components/qualityCheck-view";

export default function QualityCheckPage() {
  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <div className="shrink-0 max-w-fit">
        <PlantTab />
      </div>
      <QualityCheckView />
    </div>
  );
}
