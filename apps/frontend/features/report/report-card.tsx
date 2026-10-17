import { Button } from "@/common/components/ui/button";
import { Eye } from "lucide-react";

type Report = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconClassName: string;
  iconBgClassName: string;
};

export default function ReportCard({ report }: { report: Report }) {
  const Icon = report.icon;

  return (
    <div className="flex h-45 w-full flex-col rounded-xl border border-border bg-card p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${report.iconBgClassName}`}>
          <Icon className={`h-5 w-5 ${report.iconClassName}`} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-5 text-foreground">{report.title}</h3>

          <p className="mt-1.5 text-[12px] leading-4.5 text-muted-foreground">{report.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto border-t border-border pt-3">
        <Button variant="outline" className="h-9 w-full border-border bg-background text-xs font-medium text-foreground hover:bg-muted">
          <Eye className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Preview
        </Button>
      </div>
    </div>
  );
}
