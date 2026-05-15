"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const isDev = !electron_1.app.isPackaged;
function createWindow() {
    const splash = new electron_1.BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        alwaysOnTop: true,
        webPreferences: { nodeIntegration: false, },
    });
    splash.loadFile(path_1.default.join(__dirname, '..', 'public', 'splash.html'));
    const win = new electron_1.BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 1024,
        minHeight: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
        title: 'BatchScheduler',
        show: false,
    });
    electron_1.Menu.setApplicationMenu(null);
    if (isDev) {
        win.loadURL('http://localhost:3000');
    }
    else {
        win.loadFile(path_1.default.join(__dirname, '..', 'out', 'index.html'));
    }
    win.once('ready-to-show', () => {
        setTimeout(() => {
            splash.destroy();
            win.show();
        }, 5000);
    });
}
electron_1.app.whenReady().then(() => {
    createWindow();
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//# sourceMappingURL=main.js.map