"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, CircleCheckBig, Save, Trash2, } from "lucide-react";
import { cn } from "@/common/lib/utils";

export type SuccessVariant = | "create" | "update" | "delete" | "payment";

type Props = {
    open: boolean;
    variant: SuccessVariant;
    onFinish?: () => void;
    duration?: number;
};

const config = {
    create: {
        title: "Created Successfully",
        description: "The new record has been created successfully.",
        icon: CircleCheckBig,
        splash: "bg-primary",
        badge: "text-primary",
        subtitle: "text-white/85",
    },

    update: {
        title: "Updated Successfully",
        description: "Your changes have been saved successfully.",
        icon: Save,
        splash: "bg-primary",
        badge: "text-primary",
        subtitle: "text-white/85",
    },

    delete: {
        title: "Deleted Successfully",
        description: "The selected record has been deleted successfully.",
        icon: Trash2,
        splash: "bg-red-600 dark:bg-red-500",
        badge: "text-red-600 dark:text-red-400",
        subtitle: "text-white/85",
    },

    payment: {
        title: "Payment Successful",
        description: "The payment has been processed successfully.",
        icon: BadgeCheck,
        splash: "bg-primary",
        badge: "text-primary",
        subtitle: "text-white/85",
    },
} as const;

export default function SuccessOverlay({ open, variant, onFinish, duration = 1200, }: Props) {
    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => {
            onFinish?.();
        }, duration);
        return () => clearTimeout(timer);
    }, [open, duration, onFinish]);

    const item = config[variant];
    const Icon = item.icon;
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 z-100 flex items-center justify-center overflow-hidden rounded-2xl bg-background"
                >
                    {/* Large expanding splash */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 16 }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={cn(
                            "absolute h-24 w-24 rounded-full",
                            item.splash
                        )}
                    />

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: Math.cos((i * 60 * Math.PI) / 180) * 110,
                                y: Math.sin((i * 60 * Math.PI) / 180) * 110,
                            }}
                            transition={{
                                delay: 0.15,
                                duration: 0.3,
                            }}
                            className="absolute h-3 w-3 rounded-full bg-white/60"
                        />
                    ))}

                    <motion.div
                        initial={{
                            scale: 0.4,
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.3,
                            duration: 0.45,
                        }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {/* Icon Badge */}
                        <motion.div
                            initial={{ rotate: -20 }}
                            animate={{ rotate: 0 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                stiffness: 250,
                            }}
                            className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl ring-8 ring-white/20 dark:ring-white/10"
                        >
                            <Icon
                                className={cn("size-10", item.badge)}
                                strokeWidth={2.5}
                            />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-center text-2xl font-bold tracking-tight text-white"
                        >
                            {item.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={cn(
                                "max-w-xs text-center text-sm leading-4",
                                item.subtitle
                            )}
                        >
                            {item.description}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}