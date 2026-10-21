import RecipeSOPView from "@/features/recipe/recipe_sop/components/recipe-sop-view";
import { connection } from "next/server";

type RecipePageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function RecipePage({ searchParams }: RecipePageProps) {
  await connection();

  const { id } = await searchParams;
  const recipeId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <RecipeSOPView recipeId={recipeId} />
    </div>
  );
}
