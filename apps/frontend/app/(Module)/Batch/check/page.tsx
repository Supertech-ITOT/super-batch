import CheckView from "@/features/check/components/check-view";
import { connection } from "next/server";

type CheckPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function CheckPage({ searchParams }: CheckPageProps) {
  await connection();

  const { id } = await searchParams;
  const checkId = Number(id);

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <CheckView id={checkId} />
    </div>
  );
}
