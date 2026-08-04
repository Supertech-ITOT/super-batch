"use client";

import SideBar from "./sidebar";
import BottomNavigation from "./bottom-navigation";
import { useIsMobile } from "@/common/hooks/use-mobile";

export default function Navigation() {
    const isMobile = useIsMobile();
    return isMobile ? <BottomNavigation /> : <SideBar />;
}