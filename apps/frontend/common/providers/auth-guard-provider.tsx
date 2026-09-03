"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PermissionResponse } from "@/features/manager/permission/types/permission.types";

const ROUTE = {
  login: "/",
  resetPassword: "/reset-first-password",
};

const MODULE_ROUTES: Record<number, string> = {
  1: "/Manager",
  2: "/PlantModel",
  3: "/Recipe",
  4: "/Scheduler",
  5: "/Audit",
};

const MODULE_HOME: Record<number, string> = {
  1: "/Manager/users",
  2: "/PlantModel",
  3: "/Recipe",
  4: "/Scheduler",
  5: "/Audit",
};

const getBasePath = (path: string) => {
  return "/" + path.split("/")[1];
};

const getFirstAllowedRoute = (
  permissions: PermissionResponse[],
): string | null => {
  const permission = [...permissions]
    .filter((p) => p.access)
    .sort((a, b) => a.moduleId - b.moduleId)
    .find((p) => MODULE_ROUTES[p.moduleId]);

  return permission ? MODULE_HOME[permission.moduleId] : null;
};

export default function AuthGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const currentRoute = getBasePath(pathname);

    // Not logged in
    if (!user) {
      if (
        currentRoute !== ROUTE.login &&
        currentRoute !== ROUTE.resetPassword
      ) {
        router.replace(ROUTE.login);
      }

      return;
    }

    // First password reset
    if (user.passwordChangeRequired) {
      if (currentRoute !== ROUTE.resetPassword) {
        router.replace(ROUTE.resetPassword);
      }

      return;
    }

    const permissions: PermissionResponse[] = user.permissions ?? [];

    const firstAllowedRoute = getFirstAllowedRoute(permissions);

    // No module permission
    if (!firstAllowedRoute) {
      return;
    }

    // Logged-in user visiting login/reset page
    if (currentRoute === ROUTE.login || currentRoute === ROUTE.resetPassword) {
      router.replace(firstAllowedRoute);
      return;
    }

    // Settings is accessible to every logged-in user
    if (currentRoute === "/Setting") {
      return;
    }

    // Check current module permission
    const currentPermission = permissions.find(
      (permission) => MODULE_ROUTES[permission.moduleId] === currentRoute,
    );

    // User does not have access to this module
    if (!currentPermission?.access) {
      router.replace(firstAllowedRoute);
    }
  }, [pathname, router]);

  return <>{children}</>;
}
