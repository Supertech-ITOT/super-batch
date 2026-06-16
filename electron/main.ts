import { app, BrowserWindow, Menu, screen } from 'electron';
import path from 'path';
import dotenv from "dotenv";

dotenv.config();
const HOST_IP = process.env.HOST_IP || "localhost";
const isDev = !app.isPackaged;

function createWindow(): void {
    const splash = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        alwaysOnTop: true,
        webPreferences: { nodeIntegration: false, },
    });
    splash.loadFile(path.join(__dirname, '..', '..', 'public', 'splash.html'));

    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1024,
        minHeight: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
        title: 'BatchScheduler',
        show: false,
    });

    Menu.setApplicationMenu(null);

    if (isDev) {
        win.loadURL(`http://${HOST_IP}:3000`);
        win.webContents.on("before-input-event", (_, input) => {
            if (input.control && input.shift && input.key.toLowerCase() === "i") {
                win.webContents.toggleDevTools();
            }
        });
    } else {
        win.loadFile(path.join(__dirname, '..', '..', 'out', 'index.html'));
    }

    win.once('ready-to-show', () => {
        setTimeout(() => {
            splash.destroy();
            win.show();
        }, 5000);
    });
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});