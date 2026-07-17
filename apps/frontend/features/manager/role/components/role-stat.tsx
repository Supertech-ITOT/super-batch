import StatsCards from "@/common/components/stats-card";
import { KeyRound, LayoutGrid, ShieldCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/common/components/ui/carousel";

type RoleStatProp = {
    totalRole: number;
    totalModule: number;
}
export default function RoleStat({ totalRole, totalModule }: RoleStatProp) {

    const stats = [
        {
            title: "Total Roles",
            subtitle: "Active roles",
            value: totalRole ?? 0,
            Icon: ShieldCheck,
            clr: "#15803D",
        },
        {
            title: "Total Modules",
            subtitle: "System modules",
            value: totalModule ?? 0,
            Icon: LayoutGrid,
            clr: "#BE185D",
        },
        {
            title: "Total Permissions",
            subtitle: "Granted permissions",
            value: (totalModule ?? 0),
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