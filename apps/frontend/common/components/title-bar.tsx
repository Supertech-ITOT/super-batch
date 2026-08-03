"use client";

import { Minus, Square, X, RefreshCw, PanelLeft } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "./sidebar-provider";
import { useIsElectron } from "../hooks/use-is-electron";
export default function TitleBar() {
    const { setOpen } = useSidebar();
    const isElectron = useIsElectron();
    if (!isElectron) { return null; }
    return (
        <div
            className="h-8 bg-card flex items-center justify-between border-b select-none text-foreground"
            style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
        >
            {/* Left */}
            <div className="flex items-center gap-3 px-2" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                <div
                    className="group relative flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-background"
                    onClick={() => setOpen((prev) => !prev)}
                    style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
                >
                    {/* Logo */}
                    <Image
                        src="/icon.png"
                        alt="SuperBatch"
                        width={22}
                        height={22}
                        draggable={false}
                        className="select-none transition-opacity duration-200 group-hover:opacity-0"
                    />

                    {/* Hover Icon */}
                    <PanelLeft
                        size={18}
                        className="absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                </div>
                <strong className="flex-1 min-w-0 truncate text-sm sm:text-lg tracking-wider">
                    SUPER <span className="text-primary">BATCH</span>
                </strong>
            </div>

            {/* Right */}
            <div className="flex h-full" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                <button
                    onClick={() => window?.electron?.refresh()}
                    className="px-2 hover:bg-background flex items-center justify-center"
                >
                    <RefreshCw size={18} />
                </button>
                <button
                    onClick={() => window?.electron?.minimize()}
                    className="px-2 hover:bg-background flex items-center justify-center"
                >
                    <Minus size={18} />
                </button>
                <button
                    onClick={() => window?.electron?.maximize()}
                    className="px-2 hover:bg-background flex items-center justify-center"
                >
                    <Square size={15} />
                </button>
                <button
                    onClick={() => window?.electron?.close()}
                    className="px-2 hover:bg-red-600 flex items-center justify-center"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}