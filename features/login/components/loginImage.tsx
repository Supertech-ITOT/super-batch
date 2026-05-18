"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function LoginImage() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const imgSrc = isDark ? "/dark-bg.png" : "/light-bg.png";
    return (
        <div className="absolute inset-0 bg-cover bg-center">
            <Image src={imgSrc}
                alt="Background"
                fill
                className="pointer-events-none select-none object-cover"
                priority
                draggable={false}
            />
            <div className="absolute inset-0 bg-background/20" />
        </div>
    );
}