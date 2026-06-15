import StatsCards from "@/common/components/stats-card";
import { KeyRound, LayoutGrid, Shield, User } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
export default function RoleStat() {
    const stats = [
        {
            title: "Total Roles",
            subtitle: "Active roles",
            value: 7,
            Icon: Shield,
            clr: "#15803D",
        },
        {
            title: "Total Users",
            subtitle: "Assigned to roles",
            value: 24,
            Icon: User,
            clr: "#1D4ED8",
        },
        {
            title: "Total Modules",
            subtitle: "System modules",
            value: 22,
            Icon: LayoutGrid,
            clr: "#BE185D",
        },
        {
            title: "Total Permissions",
            subtitle: "Granted permissions",
            value: 88,
            Icon: KeyRound,
            clr: "#D97706",
        },

    ]
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