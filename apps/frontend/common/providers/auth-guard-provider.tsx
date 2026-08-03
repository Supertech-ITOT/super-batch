"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTE = {
    login: "/",
    resetPassword: "/reset-first-password",
    protected: ["/PlantModel", "/Recipe", "/Roles", "/Users"],
};

export default function AuthGuardProvider({ children, }: { children: React.ReactNode; }) {
    const router = useRouter();
    const getBasePath = (path: string) => "/" + path.split("/")[1];
    const pathname = usePathname();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        const currentRoute = getBasePath(pathname);

        const isProtected = ROUTE.protected.some(
            (route) => currentRoute === getBasePath(route)
        );

        if (!user) {
            if (isProtected || currentRoute === getBasePath(ROUTE.resetPassword)) {
                router.replace(ROUTE.login);
            }
            return;
        }

        if (user.passwordChangeRequired) {
            if (currentRoute !== getBasePath(ROUTE.resetPassword)) {
                router.replace(ROUTE.resetPassword);
            }
            return;
        }

        if (
            currentRoute === getBasePath(ROUTE.login) ||
            currentRoute === getBasePath(ROUTE.resetPassword)
        ) {
            router.replace("/PlantModel");
        }
    }, [pathname, router]);

    return <>{children}</>;
}