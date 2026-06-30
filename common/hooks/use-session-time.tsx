import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";

type JwtPayload = {
    exp: number;
};

type SessionInfo = {
    remaining: string;
    expiresAt: string;
    expired: boolean;
};

export function useSessionTime(): SessionInfo {
    const [session, setSession] = useState<SessionInfo>({
        remaining: "--:--:--",
        expiresAt: "--",
        expired: false,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const stored = localStorage.getItem("user");
        if (!stored) return;

        const { accessToken } = JSON.parse(stored);
        if (!accessToken) return;

        const { exp } = jwtDecode<JwtPayload>(accessToken);

        const expiryDate = new Date(exp * 1000);

        const updateSession = () => {
            const diff = expiryDate.getTime() - Date.now();

            if (diff <= 0) {
                setSession({
                    remaining: "Expired",
                    expiresAt: format(expiryDate, "ddMMMyy hh:mm:ss a"),
                    expired: true,
                });

                return false;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setSession({
                remaining: `${String(hours).padStart(2, "0")}:${String(
                    minutes
                ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
                expiresAt: format(expiryDate, "hh:mm a"),
                expired: false,
            });

            return true;
        };

        updateSession();

        const interval = setInterval(() => {
            const active = updateSession();

            if (!active) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return session;
}