import ReportDetail from "@/features/report/components/report-detail";
import { connection } from "next/server";

type ReportDetailPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function ReportDetailPage({ searchParams }: ReportDetailPageProps) {
  await connection();
  const { id } = await searchParams;
  const batchId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <ReportDetail id={batchId} />
    </div>
  );
}
