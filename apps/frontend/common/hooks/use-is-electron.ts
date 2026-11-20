"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => { };

const getSnapshot = () => !!window.electron;

const getServerSnapshot = () => false;

export function useIsElectron() {
    return useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
}