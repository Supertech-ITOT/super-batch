import BatchView from "@/features/batch/components/batch-view";
import { connection } from "next/server";

type ViewPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function ViewPage({ searchParams }: ViewPageProps) {
  await connection();

  const { id } = await searchParams;
  const batchId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <BatchView id={batchId} />
    </div>
  );
}
