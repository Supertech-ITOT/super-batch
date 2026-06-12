import StatsCards from "@/components/stats-card";
import { KeyRound, LayoutGrid, Shield, User } from "lucide-react";

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (

                <StatsCards key={item.title} Icon={item.Icon} clr={item.clr} subtitle={item.subtitle} title={item.title} value={item.value} />
            ))}
        </div>
    )
}