import UnitView from "@/features/plant/unit/components/unit-view";
import { connection } from "next/server";

type UnitPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function UnitPage({ searchParams }: UnitPageProps) {
  await connection();

  const { id } = await searchParams;
  const unitId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <UnitView id={unitId} />
    </div>
  );
}
