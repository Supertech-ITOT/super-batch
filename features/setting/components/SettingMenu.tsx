"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Monitor, Settings } from "lucide-react";
import { useState } from "react";
import GeneralSetting from "./GeneralSetting/GeneralSetting";

type SettingMenuType = { Icon: LucideIcon; label: string; desc: string; value: SettingOptions }
const Menus: SettingMenuType[] = [
    { Icon: Settings, label: "General", desc: "Basic application setting", value: "general" },
    { Icon: Monitor, label: "System", desc: "System configuration", value: "system" }
]
type SettingOptions = | "general" | "system" | null;
export default function SettingMenu() {
    const [option, setOption] = useState<SettingOptions>("general");
    return (
        <>
            <div className="h-full min-w-80 overflow-y-auto rounded-sm border bg-card p-3 scrollbar-none">
                <div className="flex flex-col gap-2">
                    {Menus.map((m, idx) => {
                        const isActive = option === m.value;
                        const activeCn = cn("border-primary bg-primary/5! text-primary! shadow");
                        const unactiveCn = cn("bg-card! hover:border-muted! hover:bg-background/80! text-foreground hover:shadow");
                        return (
                            <Button
                                key={m.label + idx}
                                onClick={() => setOption(m.value)}
                                className={`border-0! border-l-2! h-14! px-4!  flex gap-4 justify-start! items-center ${isActive ? activeCn : unactiveCn}`}>
                                <m.Icon className="w-6! h-6! text-inherit" />
                                <div className="flex flex-col items-start justify-between">
                                    <span className="text-inherit text-sm font-medium">{m.label}</span>
                                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                                </div>
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className="h-full w-full rounded-sm border bg-card p-3">
                {option === "general" && <GeneralSetting />}
            </div>
        </>
    );
}