import BatchInfoCard from "./batch-info-card";
import BatchProgressCard from "./batch-progress-card";

export default function BatchView({ id }: { id: number }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      <div className="shrink-0">
        <BatchInfoCard id={id} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[4fr_6fr]">
        <div className="min-h-0 min-w-0">
          <BatchProgressCard id={id} />
        </div>
        <div className="min-h-0 min-w-0">
          <BatchProgressCard id={id} />
        </div>
      </div>
      <div className="grid min-h-0 flex-1">
        <BatchProgressCard id={id} />
      </div>
    </div>
  );
}
