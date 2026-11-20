import PlantView from "@/features/plant/plant/components/plant-view";
import { connection } from "next/server";

type PlantPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function PlantPage({ searchParams }: PlantPageProps) {
  await connection();

  const { id } = await searchParams;
  const plantId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <PlantView id={plantId} />
    </div>
  );
}
