
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";

const currentPort = parseInt(process.env.PORT ?? "3030", 10);
const hostname = process.env.HOSTNAME ?? "localhost";
const isDev = !app.isPackaged;
const PROTOCOL = "superbatch";

const splashPath = app.isPackaged
  ? path.join(process.resourcesPath, "assets", "splash.html")
  : path.join(__dirname, "..", "assets", "splash.html");

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let pendingBatchId: number | null = null;
let isMainWindowReady = false;

function getBatchCheckUrl(id: number): string {
  return `http://${hostname}:${currentPort}/Batch/check/?id=${id}`;
}

function parseDeepLink(deepLink: string): number | null {
  try {
    const url = new URL(deepLink);

    if (
      url.protocol !== `${PROTOCOL}:` ||
      url.hostname.toLowerCase() !== "batch"
    ) {
      return null;
    }

    // Supports:
    // superbatch://batch/check/22
    // superbatch://batch/check?id=22
    const segments = url.pathname.split("/").filter(Boolean);

    if (segments[0]?.toLowerCase() !== "check") {
      return null;
    }

    const rawId = segments[1] ?? url.searchParams.get("id");

    if (!rawId || !/^\d+$/.test(rawId)) {
      return null;
    }

    const id = Number(rawId);

    return Number.isSafeInteger(id) && id > 0 ? id : null;
  } catch {
    return null;
  }
}

function showMainWindow(): void {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
}

async function navigateToBatchCheck(id: number): Promise<void> {
  if (!mainWindow || mainWindow.isDestroyed() || !isMainWindowReady) {
    pendingBatchId = id;
    return;
  }

  try {
    await mainWindow.loadURL(getBatchCheckUrl(id));

    showMainWindow();
  } catch (error) {
    console.error("Failed to open batch check page:", error);
  }
}

function handleDeepLink(deepLink: string): void {
  const id = parseDeepLink(deepLink);

  if (id === null) {
    console.warn("Invalid SuperBatch deep link:", deepLink);
    return;
  }

  void navigateToBatchCheck(id);
}

function createWindow(): void {
  splashWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    movable: false,
    closable: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  void splashWindow.loadFile(splashPath);

  mainWindow = new BrowserWindow({
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

  const initialId = pendingBatchId;
  pendingBatchId = null;

  const initialUrl =
    initialId !== null
      ? getBatchCheckUrl(initialId)
      : `http://${hostname}:${currentPort}`;

  void mainWindow.loadURL(initialUrl).catch((error) => {
    console.error("Failed to load frontend:", error);
  });

  mainWindow.once("ready-to-show", () => {
    isMainWindowReady = true;

    setTimeout(() => {
      if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.destroy();
      }

      showMainWindow();

      // Process a deep link received while the window was loading.
      if (pendingBatchId !== null) {
        const id = pendingBatchId;
        pendingBatchId = null;
        void navigateToBatchCheck(id);
      }
    }, 5000);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    isMainWindowReady = false;
  });
}

// Register IPC handlers only once.
ipcMain.on("window:minimize", () => {
  mainWindow?.minimize();
});

ipcMain.on("window:maximize", () => {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("window:close", () => {
  mainWindow?.close();
});

ipcMain.on("window:refresh", () => {
  mainWindow?.reload();
});

ipcMain.handle("window:isMaximized", () => {
  return mainWindow?.isMaximized() ?? false;
});

// Enforce a single Electron instance.
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  // Register the custom URI protocol.
  if (isDev && process.argv[1]) {
    app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  } else {
    app.setAsDefaultProtocolClient(PROTOCOL);
  }

  // Receive links when another instance is launched on Windows/Linux.
  app.on("second-instance", (_event, argv) => {
    const deepLink = argv.find((arg) =>
      arg.toLowerCase().startsWith(`${PROTOCOL}://`)
    );

    if (deepLink) {
      handleDeepLink(deepLink);
    } else {
      showMainWindow();
    }
  });

  // Receive links when the application is activated on macOS.
  app.on("open-url", (event, url) => {
    event.preventDefault();
    handleDeepLink(url);
  });

  // Handle a URI supplied during the initial launch.
  const initialDeepLink = process.argv.find((arg) =>
    arg.toLowerCase().startsWith(`${PROTOCOL}://`)
  );

  if (initialDeepLink) {
    pendingBatchId = parseDeepLink(initialDeepLink);
  }

  app.whenReady().then(() => {
    createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}
