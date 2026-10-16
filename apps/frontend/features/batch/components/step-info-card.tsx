import { ArrowDown, ArrowRight, CalendarClock, Clock, Cpu, Feather, Hourglass, LucideIcon, Play, Timer } from "lucide-react";
import { useGetCurrentStepInfo } from "../hook/use-batch";
import { useIsMobile } from "@/common/hooks/use-mobile";
import { Separator } from "@/common/components/ui/separator";
import { getActualMinutes, getRemainingMinutes, minutesToADuration } from "@/common/utils/duration.util";
import { format, parseISO } from "date-fns";

type Prop = {
  id: number;
};

type ProcessCardProp = {
  label: string;
  name: string;
  code: string;
  icon: LucideIcon;
  clr: string;
};
const ProcessCard = ({ label, name, code, icon: Icon, clr }: ProcessCardProp) => (
  <div className="rounded-2xl bg-card p-1.5 sm:p-3 border gap-2 shadow min-w-34 flex-1 flex min-h-16">
    <div style={{ backgroundColor: clr + "20" }} className="rounded-2xl border size-12 sm:size-14 flex justify-center items-center">
      <Icon style={{ color: clr }} className="size-6 sm:size-8  " />
    </div>
    <div className="leading-3">
      <h2 className="text-muted-foreground text-[11px] sm:text-xs">{label}</h2>
      <strong className="block max-w-16 overflow-x-auto whitespace-nowrap text-xs font-semibold sm:text-sm scrollbar-none">{code}</strong>
      <h3 className="block max-w-16 overflow-x-auto whitespace-nowrap  text-muted-foreground text-[11px] sm:text-xs scrollbar-none">{name}</h3>
    </div>
  </div>
);

type TimeCardProp = {
  label: string;
  value: string;
  icon: LucideIcon;
};
const TimeCard = ({ label, value, icon: Icon }: TimeCardProp) => (
  <div className="flex min-w-0 items-center gap-2.5 py-1">
    <Icon className="size-4 shrink-0 text-muted-foreground" />
    <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
      <h2 className="shrink-0 text-[11px] font-medium text-muted-foreground sm:w-28 sm:text-xs">{label}</h2>
      <strong
        title={String(value ?? "-")}
        className="min-w-0 overflow-x-auto whitespace-nowrap text-xs font-semibold scrollbar-none sm:flex-1 sm:text-sm"
      >
        {value ?? "-"}
      </strong>
    </div>
  </div>
);
export default function StepInfoCard({ id }: Prop) {
  const { data } = useGetCurrentStepInfo(id);
  const isMobile = useIsMobile(1536);
  const standardMinutes = minutesToADuration(data?.stdTime ?? 0);
  const actualMinutes = minutesToADuration(getActualMinutes(data?.startDateTime ?? null));
  const remainingMinutes = minutesToADuration(getRemainingMinutes(data?.startDateTime ?? null, Number(data?.stdTime ?? 0)));
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-xl space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-primary sm:text-base">Current Step</h2>
        <div className="rounded-full bg-primary/20 size-8 sm:size-10 flex justify-center items-center border">
          <strong className="text-primary text-sm sm:text-xl font-bold">{data?.stepNo ?? 0}</strong>
        </div>
      </div>
      <div className="flex items-start gap-2 w-full rounded-2xl bg-primary/10 border p-2.5  text-xs sm:text-sm">
        <Feather className="size-4 shrink-0 mt-0.5 text-primary" />
        <span className="line-clamp-2 min-w-0 flex-1 wrap-break-word" title={data?.message ?? "-"}>
          {data?.message ?? "-"}
        </span>
      </div>
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2`}>
        <div className="flex-2 grid w-full grid-cols-2 gap-2">
          <ProcessCard label="From Equipment" name={data?.fromEquipmentName ?? "-"} code={data?.fromEquipmentCode ?? "-"} icon={Cpu} clr="#6366F1" />
          <ProcessCard label="To Equipment" name={data?.toEquipmentName ?? "-"} code={data?.toEquipmentCode ?? "-"} icon={Cpu} clr="#0D9488" />
          <ProcessCard label="Transition" code={(data?.transitionName ?? "-").toUpperCase()} name="" icon={ArrowRight} clr="#D97706" />
          <ProcessCard label="Action" code={(data?.actionName ?? "-").toUpperCase()} name="" icon={Play} clr="#8B5CF6" />
        </div>
        <div className="flex-1 space-y-3">
          <TimeCard
            label="Start Date Time"
            value={data?.startDateTime ? format(parseISO(data.startDateTime), "dd MMM yyyy, hh:mm a") : "-"}
            icon={CalendarClock}
          />
          <TimeCard label="Standard Time" value={`${standardMinutes}`} icon={Timer} />
          <TimeCard label="Actual Time" value={`${actualMinutes}`} icon={Play} />
          <TimeCard label="Remaining Time" value={`${remainingMinutes}`} icon={Hourglass} />
        </div>
      </div>
    </div>
  );
}
