import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    minimize: () => ipcRenderer.send("window:minimize"),
    maximize: () => ipcRenderer.send("window:maximize"),
    close: () => ipcRenderer.send("window:close"),
    refresh: () => ipcRenderer.send("window:refresh"),
    isMaximized: () => ipcRenderer.invoke("window:isMaximized"),
});