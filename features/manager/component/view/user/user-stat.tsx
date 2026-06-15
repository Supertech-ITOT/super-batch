import StatsCards from "@/components/stats-card";
import { Users } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
export default function UserStat() {
    const stats = [
        {
            title: "Total Users",
            subtitle: "Assigned to roles",
            value: 24,
            Icon: Users,
            clr: "#1D4ED8",
        }
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