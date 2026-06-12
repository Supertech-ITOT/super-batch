import StatsCards from "@/components/stats-card";
import { Users } from "lucide-react";

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
                <StatsCards key={item.title} Icon={item.Icon} clr={item.clr} subtitle={item.subtitle} title={item.title} value={item.value} />
            ))}
        </div>
    )
}