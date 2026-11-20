"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/common/components/ui/button";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" />
        </div>

        <p className="text-sm font-semibold tracking-widest text-primary">ERROR 404</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">The page you are looking for doesn&apos;t exist or may have been moved.</p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="size-4" />
            Go Back
          </Button>

          <Button asChild className="gap-2">
            <Link href={"/"}>
              <Home className="size-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
