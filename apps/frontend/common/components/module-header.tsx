"use client";

import { Button } from "@/common/components/ui/button";
import { ConfigurationRoutes, OperationRoutes } from "@/features/manager/module/types/module.types";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ModuleBreadcrumb } from "./module-breadcrumb";
import { useGetCurrentUser } from "@/features/manager/user/hooks/use-user";
import Link from "next/link";
import UserAvatar from "./user-avatar";
import { useIsElectron } from "../hooks/use-is-electron";
import { useSidebar } from "./navigation/sidebar-provider";
import { useIsMobile } from "../hooks/use-mobile";

export default function ModuleHeader() {
  const router = useRouter();
  const isElectron = useIsElectron();
  const pathname = usePathname();
  const getBasePath = (path: string) => "/" + path.split("/")[1];
  const routes = [...OperationRoutes, ...ConfigurationRoutes];
  const current = routes.find((route) => getBasePath(pathname) === getBasePath(route.path));
  const { data: user } = useGetCurrentUser();
  if (!current) return null;
  const Icon = current.icon;
  const normalize = (path: string) => path.replace(/\/+$/, "") || "/";
  const isRoot = normalize(pathname) === normalize(current.path);
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <header
      className={`fixed ${isElectron && !isMobile ? "top-8" : "top-2"} ${
        isMobile ? "left-2 right-2" : open ? "left-66 right-2" : "left-18 right-2"
      } z-40 h-20 rounded-2xl border bg-card/95 p-2 backdrop-blur supports-backdrop-filter:bg-card/80 sm:p-4 transition-all duration-300`}
    >
      <div className="flex items-center gap-1.5 sm:gap-4 h-full">
        {!isRoot && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="size-12 rounded-full bg-card animate-in zoom-in duration-300 shrink-0"
          >
            <ChevronLeft className="size-6!" />
          </Button>
        )}

        <div className="min-w-0 flex-1">
          <ModuleBreadcrumb />

          <div className="mt-1 flex items-center gap-1.5 sm:gap-3">
            <Icon className="size-8 sm:size-10 text-primary animate-in zoom-in duration-300 shrink-0" />
            <div className="min-w-0">
              <h1 className="truncate text-sm sm:text-lg font-bold leading-none text-primary">{current.label}</h1>

              <p className="line-clamp-2 leading-3 text-ellipsis text-[10px] sm:text-xs text-muted-foreground">{current.description}</p>
            </div>
          </div>
        </div>
        <Link href={"/Setting/profile"} className="animate-in zoom-in duration-300 shrink-0 block sm:hidden">
          <UserAvatar name={user?.name ?? ""} className="size-12! border" />
        </Link>
      </div>
    </header>
  );
}
