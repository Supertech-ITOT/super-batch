import StatsCards from "@/common/components/stats-card";
import { KeyRound, LayoutGrid, ShieldCheck } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
import { RoleResponse } from "@/features/manager/types/role.types";
export default function RoleStat({ data, isLoading }: { data: RoleResponse[], isLoading: boolean }) {
    const stats = [
        {
            title: "Total Roles",
            subtitle: "Active roles",
            value: data?.length ?? 0,
            Icon: ShieldCheck,
            clr: "#15803D",
        },
        {
            title: "Total Modules",
            subtitle: "System modules",
            value: data?.length ?? 0,
            Icon: LayoutGrid,
            clr: "#BE185D",
        },
        {
            title: "Total Permissions",
            subtitle: "Granted permissions",
            value: data?.length ?? 0,
            Icon: KeyRound,
            clr: "#D97706",
        },

    ]
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <Carousel opts={{ align: "start", dragFree: true, }} className="w-full">
            <CarouselContent>
                {stats.map((item) => (
                    <CarouselItem
                        key={item.title}
                        className="basis-auto"
                    >
                        <StatsCards
                            Icon={item.Icon}
                            clr={item.clr}
                            subtitle={item.subtitle}
                            title={item.title}
                            value={item.value}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}