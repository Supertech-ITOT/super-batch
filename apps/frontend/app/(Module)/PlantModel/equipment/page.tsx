import EquipmentView from "@/features/plant/equipment/components/equipment-view";
import { connection } from "next/server";

type EquipmentPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function EquipmentPage({ searchParams }: EquipmentPageProps) {
  await connection();

  const { id } = await searchParams;
  const equipmentId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <EquipmentView id={equipmentId} />
    </div>
  );
}
