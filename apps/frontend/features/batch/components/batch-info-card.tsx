import { BookOpen, ClipboardList, Factory, Hash, Package, UserRound } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/common/components/ui/carousel";
import { useGetBatchInfo } from "../hook/use-batch";
import { Skeleton } from "@/common/components/ui/skeleton";
import { BatchStatusConfig } from "@/features/dashboard/type/dashboard.types";

type CardProp = {
  label: string;
  value: string;
  icon: React.ElementType;
  bgClass: string;
  iconClass: string;
  glowClass: string;
};

function StatusCard({ data }: { data: CardProp }) {
  const Icon = data.icon;
  return (
    <div className="relative h-21 overflow-hidden rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-xl">
      <div className={`pointer-events-none absolute -bottom-8 -right-8 size-24 rounded-full blur-3xl ${data.glowClass}`} />
      <div className="relative z-10 flex items-center gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${data.bgClass}`}>
          <Icon className={`h-6 w-6 ${data.iconClass}`} strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">{data.label}</p>
          <p className="mt-1 w-full overflow-x-auto whitespace-nowrap text-xl font-semibold scrollbar-none">{data.value}</p>
        </div>
      </div>
    </div>
  );
}

type Props = {
  id: number;
};
export default function BatchInfoCard({ id }: Props) {
  const { data, isLoading, isError } = useGetBatchInfo(id);

  if (isLoading) {
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6">
              <Skeleton className="h-21 rounded-2xl border bg-card p-4 shadow-sm" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-31.5 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 text-sm text-destructive">
        Failed to load batch info.
      </div>
    );
  }

  const statusConfig = BatchStatusConfig[data.batchStatus];

  const cards: CardProp[] = [
    {
      label: "Status",
      value: statusConfig.label,
      icon: statusConfig.icon,
      iconClass: statusConfig.iconClass,
      bgClass: statusConfig.bgClass,
      glowClass: statusConfig.glowClass,
    },
    {
      label: "Batch No",
      value: data.batchNo,
      icon: Hash,
      iconClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      glowClass: "bg-blue-500/20",
    },
    {
      label: "Product",
      value: data.product,
      icon: Package,
      iconClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-50 dark:bg-violet-950/40",
      glowClass: "bg-violet-500/20",
    },
    {
      label: "Unit",
      value: data.unit,
      icon: Factory,
      iconClass: "text-cyan-600 dark:text-cyan-400",
      bgClass: "bg-cyan-50 dark:bg-cyan-950/40",
      glowClass: "bg-cyan-500/20",
    },
    {
      label: "Shift Incharge",
      value: data.shiftIncharge,
      icon: UserRound,
      iconClass: "text-amber-600 dark:text-amber-400",
      bgClass: "bg-amber-50 dark:bg-amber-950/40",
      glowClass: "bg-amber-500/20",
    },
    {
      label: "Master Recipe",
      value: data.masterRecipe.name,
      icon: BookOpen,
      iconClass: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/40",
      glowClass: "bg-indigo-500/20",
    },
    {
      label: "Control Recipe",
      value: data.controlRecipe.name,
      icon: ClipboardList,
      iconClass: "text-teal-600 dark:text-teal-400",
      bgClass: "bg-teal-50 dark:bg-teal-950/40",
      glowClass: "bg-teal-500/20",
    },
  ];
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {cards.map((c) => (
          <CarouselItem key={c.label} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/6">
            <StatusCard data={c} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
