import StatsCards from "@/common/components/stats-card";
import { Users } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
import { UserResponse } from "@/features/manager/user/types/user.types";
export default function UserStat({ data }: { data: UserResponse[]; }) {

    const stats = [
        {
            title: "Total Users",
            subtitle: "Assigned the role",
            value: data?.length ?? 0,
            Icon: Users,
            clr: "#1D4ED8",
        }
    ];

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