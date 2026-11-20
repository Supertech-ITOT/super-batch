import ControlRecipeSOPView from "@/features/scheduler/control_recipe_sop/components/control-recipe-sop-view";
import { connection } from "next/server";

type ControlRecipeSOPPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function ControlRecipeSOPPage({ searchParams }: ControlRecipeSOPPageProps) {
  await connection();

  const { id } = await searchParams;
  const controlRecipeId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <ControlRecipeSOPView controlRecipeId={controlRecipeId} />
    </div>
  );
}
