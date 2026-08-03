"use client";

import { useEffect, useState } from "react";

export function useIsElectron() {
    const [isElectron, setIsElectron] = useState(false);

    useEffect(() => {
        setIsElectron(!!window.electron);
    }, []);

    return isElectron;
}