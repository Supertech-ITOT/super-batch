import AreaView from "@/features/plant/area/components/area-view";
import { connection } from "next/server";

type AreaPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function AreaPage({ searchParams }: AreaPageProps) {
  await connection();

  const { id } = await searchParams;
  const areaId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <AreaView id={areaId} />
    </div>
  );
}
