
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const ROUTE = {
    public: ["/"],
    protected: ["/PlantModel", "/Recipe", "/Roles", "/Users"],
};

export default function AuthGuardProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const user = localStorage.getItem("user");

        const isProtected = ROUTE.protected.some((route) =>
            pathname.startsWith(route)
        );

        if (isProtected && !user) {
            router.replace("/");
        }

        if (pathname === "/" && user) {
            router.replace("/PlantModel");
        }
    }, [pathname, router]);

    return <>{children}</>;
}