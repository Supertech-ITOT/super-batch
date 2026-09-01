import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";

const HOST = process.env.ELECTRON_HOST || "localhost";
const isDev = !app.isPackaged;
const splashPath = app.isPackaged
  ? path.join(process.resourcesPath, "assets", "splash.html")
  : path.join(__dirname, "..", "assets", "splash.html");

function createWindow(): void {
  const splash = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    movable: false,
    closable: false,
    webPreferences: { nodeIntegration: false },
  });
  splash.loadFile(splashPath);

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    backgroundColor: "#0f172a",

    show: false,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  Menu.setApplicationMenu(null);
  win.loadURL(`http://${HOST}:3000`);
  win.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      win.show();
    }, 5000);
  });

  ipcMain.on("window:minimize", () => {
    win.minimize();
  });

  ipcMain.on("window:maximize", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on("window:close", () => {
    win.close();
  });

  ipcMain.on("window:refresh", () => {
    win.reload();
  });

  ipcMain.handle("window:isMaximized", () => {
    return win.isMaximized();
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
